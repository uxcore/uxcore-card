/**
 * Card Component for uxcore
 * @author eternalsky
 *
 * Copyright 2017-2018, Uxcore Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import Tooltip from 'uxcore-tooltip';
import Icon from 'uxcore-icon';
import Animate from 'uxcore-animate';
import classnames from 'classnames';
import util from './util';

class Card extends React.Component {
  static displayName = 'Card';

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.node,
    tip: PropTypes.node,
    extra: PropTypes.node,
    children: PropTypes.node,
    showCollapseIcon: PropTypes.bool,
    onCollapseChange: PropTypes.func,
    contentHeight: PropTypes.number,
    contentPaddingSize: PropTypes.oneOf(['middle', 'none']),
    defaultCollapsed: PropTypes.bool,
    keepAlive: PropTypes.bool
  };

  static defaultProps = {
    prefixCls: 'uxcore-card',
    className: undefined,
    icon: undefined,
    title: undefined,
    tip: undefined,
    extra: undefined,
    children: undefined,
    showCollapseIcon: false,
    onCollapseChange: () => {
    },
    contentHeight: undefined,
    contentPaddingSize: 'middle',
    defaultCollapsed: false,
    keepAlive: false
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.defaultCollapsed,
    };
    if (props.keepAlive) {
      this.height = props.contentHeight
    }
  }

  componentDidMount() {
    if (this.props.keepAlive) {
      if (!this.state.collapsed) {
        this.height = ReactDom.findDOMNode(this.content).getBoundingClientRect().height
      }
    }
  }

  handleCollapseIconClick = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }), () => {
      const { onCollapseChange } = this.props;
      const { collapsed } = this.state;
      onCollapseChange(collapsed);
    });
  }

  renderHeader() {
    const {
      prefixCls, icon, title, tip, extra, showCollapseIcon,
    } = this.props;
    if (!icon && !title && !tip && !extra) return null;
    return (
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`}>
          {icon ? (
            <div className={`${prefixCls}-title-icon`}>
              {icon}
            </div>
          ) : null}
          <div
            className={classnames(`${prefixCls}-title-text`, {
              [`${prefixCls}-title-text__has-icon`]: !!icon,
              [`${prefixCls}-title-text__has-tip`]: !!tip,
            })}
          >
            {title}
          </div>
          {tip ? (
            <div className={`${prefixCls}-title-tip`}>
              <Tooltip overlay={tip} placement="top" trigger={['hover']} overlayClassName="kuma-tooltip-dark">
                <Icon usei name="xinxitishicopy" className={`${prefixCls}-title-tip-icon`} />
              </Tooltip>
            </div>
          ) : null}
        </div>
        {(extra || showCollapseIcon) ? (
          <div className={`${prefixCls}-extra`}>
            {extra}
            {this.renderCollapseIcon()}
          </div>
        ) : null}
      </div>
    );
  }

  renderCollapseIcon() {
    const { prefixCls, showCollapseIcon } = this.props;
    if (!showCollapseIcon) {
      return null;
    }
    const { collapsed } = this.state;
    return (
      <Icon
        usei
        name="bottom"
        className={classnames(`${prefixCls}-collapse-icon`, {
          [`${prefixCls}-collapse-icon__collapsed`]: !collapsed,
        })}
        onClick={this.handleCollapseIconClick}
      />
    );
  }

  renderContent() {
    const { collapsed } = this.state;
    const {
      prefixCls,
      children,
      contentPaddingSize,
      contentHeight,
      keepAlive
    } = this.props;
    let style = {}
    if (!keepAlive) {
      if (collapsed ) return null;
      if (contentHeight) {
        style = {
          height: contentHeight
        };
      }
    } else {
      style = {
        height: collapsed ? 0 : this.height ,
        paddingTop: collapsed ? 0 : 24,
        paddingBottom: collapsed ? 0 : 24
      }
    }

    return (
      <div
        className={classnames(`${prefixCls}-content`, {
          [`${prefixCls}-content-${contentPaddingSize}-padding`]: !!contentPaddingSize,
        })}
        ref={(c) => {this.content = c}}
        style={style}
      >
        {children}
      </div>
    );
  }

  render() {
    const { prefixCls, className, contentHeight, keepAlive } = this.props;

    return (
      <div className={classnames(prefixCls, className)}>
        {this.renderHeader()}
        {
          !keepAlive ?
            <Animate
              component=""
              animation={{
                enter: (node, done) => {
                  util.toggleHeightAnim(node, true, contentHeight, done);
                },
                leave: (node, done) => {
                  util.toggleHeightAnim(node, false, contentHeight, done);
                },
              }}
            >
              {this.renderContent()}
            </Animate> :
            this.renderContent()
        }
      </div>
    );
  }
}

export default Card;

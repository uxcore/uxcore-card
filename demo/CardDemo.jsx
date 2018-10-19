/**
 * Card Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2017-2018, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import Icon from 'uxcore-icon';
import Card from '../src';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const cardProps = {
      title: 'Title Title Title Title Title',
      tip: '这是一个提示',
      // icon: <Icon usei name="shangchuan" />,
      extra: (
        <a>
        Action
        </a>
      ),
      className: 'card-demo',
      showCollapseIcon: true,
      // contentPaddingSize: 'none',
      defaultCollapsed: true,
    };
    return (
      <div>
        <Card {...cardProps}>
          <div style={{ height: 300 }}>
            一些内容一些内容一些内容一些内容一些内容
          </div>
        </Card>
      </div>
    );
  }
}

export default Demo;

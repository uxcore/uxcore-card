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
        自定义操作
        </a>
      ),
      className: 'card-demo',
      // showCollapseIcon: true,
      contentPaddingSize: 'none',
    };
    return (
      <div>
        <Card {...cardProps}>
          <div style={{ height: 300 }} />
        </Card>
      </div>
    );
  }
}

export default Demo;

import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="h-screen">
        <NavMenu />
        <div className="flex justify-center w-full ">
          {this.props.children}
        </div>
      </div>
    );
  }
}

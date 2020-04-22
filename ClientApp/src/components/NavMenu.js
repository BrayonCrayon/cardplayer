import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-t-8 border-purple-500 shadow-md mb-3 bg-white" light>
          <div className="flex w-full">
            <NavbarBrand className="w-1/2 text-center font-weight-bold text-4xl p-0 hover:text-purple-800" href="/" to="/">The CodeCove Cards</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="w-full flex justify-end" isOpen={!this.state.collapsed} navbar>
                <ul className="flex m-0">
                  <NavItem>
                    <NavLink href="/" className="text-black text-lg font-semibold hover:text-purple-800" to="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/game" className="text-black text-lg font-semibold hover:text-purple-800" to="/game">Game</NavLink>
                  </NavItem>
                  <LoginMenu>
                  </LoginMenu>
                </ul>
            </Collapse>
          </div>
        </Navbar>
      </header>
    );
  }
}

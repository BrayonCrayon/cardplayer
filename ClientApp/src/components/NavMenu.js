import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
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
        <Navbar className="navbar-expand-md navbar-toggleable-md border-t-8 border-purple-500 shadow-md mb-3 bg-white" light>
          <div className="flex flex-wrap w-full justify-between md:flex-auto">
            <NavbarBrand className="w-3/4 text-center font-weight-bold text-2xl p-0 hover:text-purple-800 sm:m-0 sm:w-2/3 md:w-1/3  lg:text-4xl" href="/" to="/">The CodeCove Cards</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar className="md:justify-end">
              <Nav className="p-0" navbar>
                <ul className="flex flex-col m-0 w-full sm:flex-row">
                  <NavItem className="self-center">
                    <NavLink href="/" className="text-black text-lg font-semibold hover:text-purple-800" to="/">Home</NavLink>
                  </NavItem>
                  <NavItem className="self-center">
                    <NavLink href="/game" className="text-black text-lg font-semibold hover:text-purple-800" to="/game">Game</NavLink>
                  </NavItem>
                  <LoginMenu>
                  </LoginMenu>
                </ul>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </header>
    );
  }
}

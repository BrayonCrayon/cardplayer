import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
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
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 bg-white" light>
          <div className="flex w-full">
            <NavbarBrand className="w-1/2 text-center" tag={Link} to="/">CardPlayer</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="w-full flex justify-end" isOpen={!this.state.collapsed} navbar>
              <div>
                <ul className="navbar-nav">
                  <NavItem>
                    <NavLink tag={Link} className="text-gray-500 hover:text-black" to="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-gray-500 hover:text-black" to="/game">Game</NavLink>
                  </NavItem>
                  <LoginMenu>
                  </LoginMenu>
                </ul>
              </div>
            </Collapse>
          </div>
        </Navbar>
      </header>
    );
  }
}

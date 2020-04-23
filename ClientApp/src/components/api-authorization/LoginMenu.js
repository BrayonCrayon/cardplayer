import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, {
                    profilePath, 
                    logoutPath
                }
            );
        }
    }

    authenticatedView(userName, appPaths) {
        return (<Fragment>
            <NavItem className="self-center">
                <NavLink href={appPaths.profilePath} tag={Link} className="text-black text-lg font-semibold hover:text-purple-800" to={appPaths.profilePath}>{userName}</NavLink>
            </NavItem>
            <NavItem className="self-center">
                <NavLink href={appPaths.logoutPath} tag={Link} className="text-black text-lg font-semibold hover:text-purple-800" to={appPaths.logoutPath}>Logout</NavLink>
            </NavItem>
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem className="self-center">
                <NavLink href={registerPath} tag={Link} className="text-black text-lg font-semibold hover:text-purple-800" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem className="self-center">
                <NavLink href={loginPath} tag={Link} className="text-black text-lg font-semibold hover:text-purple-800" to={loginPath}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }
}

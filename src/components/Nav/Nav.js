import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar, Button } from 'beautiful-react-ui';
import AuthState from '../../state/AuthState';

const navContainerStyles = {
  position: 'fixed',
  height: '100vh',
  left: 0,
  top: 0,
  zIndex: 98,
  background: 'transparent',
  overflow: 'hidden',
};

const Nav = ({ user }) => {
  const [ open, setOpen ] = useState(false);
  const { logout } = AuthState.useContainer();

  return (
    <>
      <Button color="primary" style={{ zIndex: 99, visibility: open ? 'hidden' : 'inherit' }} onClick={() => setOpen(true)} icon="bars" />
      <div style={navContainerStyles}>
        <Sidebar
          isOpen={open}
          onToggle={() => setOpen(!open)}
          toggleIcon={open ? 'times' : 'bars'}
          title="CHT DB"
          accent="primary"
          titleColor="success"
          type="offcanvas"
          NavRender={({ className, children }) => {
            return <nav style={{ backgroundColor: '#f8f8f8' }} className={className}>{children}</nav>
          }}
        >
          <Sidebar.Item text="Home" icon="home" LinkRender={(props) => {
            return <NavLink onClick={() => setOpen(false)} exact to="/">{ props.children }</NavLink>;
          }} />
          <Sidebar.Item text="Converter" icon="exchange-alt" LinkRender={(props) => {
            return <NavLink onClick={() => setOpen(false)} exact to="/converter">{ props.children }</NavLink>;
          }} />
          <Sidebar.Item text="Cheats" icon="gamepad" LinkRender={props => {
            return <NavLink onClick={() => setOpen(false)} exact to="/cheats">{ props.children }</NavLink>;
          }} />
          <Sidebar.Item text="Tutorial" icon="book" LinkRender={(props) => {
            return <NavLink onClick={() => setOpen(false)} exact to="/tutorial">{ props.children }</NavLink>;
          }} />
          <Sidebar.Item text="Profile" icon="address-card" LinkRender={props => {
            return user ? <NavLink onClick={() => setOpen(false)} exact to="/profile">{ props.children }</NavLink> : null;
          }} />
          <Sidebar.Item text="Login" icon="user" LinkRender={props => {
            return user ? null : <NavLink onClick={() => setOpen(false)} to="/login">{ props.children }</NavLink>;
          }} />
          <Sidebar.Item text="Signup" icon="user-plus" LinkRender={props => {
            return user ? null : <NavLink onClick={() => setOpen(false)} to="/signup">{ props.children }</NavLink>;
          }} />
          <Sidebar.Item ElementRender={props => user ? <Button color="secondary" onClick={logout}>Logout</Button> : null} />
        </Sidebar>
      </div>
    </>
  );
}

export default Nav;
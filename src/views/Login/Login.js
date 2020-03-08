import React, { useState } from 'react';
import {
  Grid,
  FormPanel,
  FormGroup,
  Label,
  Input,
  Button
} from 'beautiful-react-ui';
import AuthState from '../../state/AuthState';

const Login = ({ history, location }) => {
  const { login } = AuthState.useContainer();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    login({ email, password })
    .then(() => {
      if(location.pathname === '/login' || location.pathname === '/signup') {
        history.push('/');
      }
    });
  }

  return (
    <Grid>
      <Grid.Column size="8" offset="2" sm="10" offsetSm="1">
        <form onSubmit={handleLogin}>
          <FormPanel label="LOGIN" labelType="title">
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fluid
                placeholder="Enter your email"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fluid
                placeholder="Enter your password"
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary">Login</Button>
            </FormGroup>
          </FormPanel>
        </form>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
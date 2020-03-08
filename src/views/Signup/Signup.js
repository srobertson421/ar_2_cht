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

const Signup = ({ history, location }) => {
  const { signup } = AuthState.useContainer();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSignup = e => {
    e.preventDefault();
    signup({ email, password })
    .then(() => {
      if(location.pathname === '/login' || location.pathname === '/signup') {
        history.push('/');
      }
    });
  }

  return (
    <Grid>
      <Grid.Column size="8" offset="2" sm="10" offsetSm="1">
        <FormPanel label="SIGNUP" labelType="title">
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
            <Button type="submit" color="primary">Signup</Button>
          </FormGroup>
        </FormPanel>
      </Grid.Column>
    </Grid>
  );
}

export default Signup;
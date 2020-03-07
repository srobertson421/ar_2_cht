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

const Login = () => {
  const { login } = AuthState.useContainer();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = e => {
    login({ email, password });
  }

  return (
    <Grid>
      <Grid.Column size="8" offset="2" sm="10" offsetSm="1">
        <FormPanel label="LOGIN" labelType="title">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={email} fluid placeholder="Enter your email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Email</Label>
            <Input id="password" name="password" value={password} fluid placeholder="Enter your password" />
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="primary">Login</Button>
          </FormGroup>
        </FormPanel>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
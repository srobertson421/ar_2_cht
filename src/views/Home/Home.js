import React from 'react';
import {
  Grid,
  Title,
  Button,
  Icon,
} from 'beautiful-react-ui'

const Home = ({ user, history }) => {
  return (
    <Grid itemsAlign="center">
      <Grid.Column size="12">
        <Title textAlign="center">{user ? `Welcome ${user.email} To` : null} CHT DB</Title>
      </Grid.Column>
      { !user && (
        <>
          <Grid.Column size="12" md="10" offsetMd="1" lg="8" offsetLg="2" xl="8" offsetXl="2">
            <Title textAlign="center" tagName="h3">Login / Signup To Start Adding To the Database!</Title>
            <Grid>
              <Grid.Column size="6" offset="3">
                <Button fluid color="primary" onClick={() => history.push('/login')}>Login <Icon name="arrow-right" /></Button>
              </Grid.Column>
              <Grid.Column size="6" offset="3">
                <Button fluid color="secondary" onClick={() => history.push('/signup')}>Signup <Icon name="arrow-right" /></Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column size="12">
            <Title tagName="h5" textAlign="center">OR</Title>
          </Grid.Column>
        </>
      ) }
      <Grid.Column size="12" md="10" offsetMd="1" lg="8" offsetLg="2" xl="8" offsetXl="2">
        <Title textAlign="center" tagName="h3">Go Convert Some Codes!</Title>
        <Grid.Column size="6" offset="3">
          <Button fluid color="primary" onClick={() => history.push('/converter')}>Code Converter <Icon name="arrow-right" /></Button>
        </Grid.Column>
      </Grid.Column>
      <Grid.Column size="12">
        <Title tagName="h5" textAlign="center">OR</Title>
      </Grid.Column>
      <Grid.Column size="12" md="10" offsetMd="1" lg="8" offsetLg="2" xl="8" offsetXl="2">
        <Title textAlign="center" tagName="h3">Check out the existing DB of .CHT Files</Title>
        <Grid.Column size="6" offset="3">
          <Button fluid color="primary" onClick={() => history.push('/cheats')}>Cheat DB <Icon name="arrow-right" /></Button>
        </Grid.Column>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
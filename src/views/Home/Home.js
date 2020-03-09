import React from 'react';
import {
  Grid,
  Title,
  Button,
  Icon,
  Image
} from 'beautiful-react-ui'
import logo from '../../assets/cover.png';

const Home = ({ user, history }) => {
  return (
    <Grid itemsAlign="center">
      <Grid.Column size="12">
        <Image src={logo} alt="CHT Database Logo" />
        { user && (
          <Title textAlign="center">Welcome ${user.email}</Title>
        ) }
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
      <Grid.Column size="12">
        <Title tagName="h5" textAlign="center">OR</Title>
      </Grid.Column>
      <Grid.Column size="12" md="10" offsetMd="1" lg="8" offsetLg="2" xl="8" offsetXl="2">
        <Title textAlign="center" tagName="h3">Check out the existing CHT content from EZ-Flash</Title>
        <Grid.Column size="6" offset="3">
          <Button fluid color="primary" onClick={() => history.push('/ez-flash-cheats')}>EZ-Flash Cheats <Icon name="arrow-right" /></Button>
        </Grid.Column>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
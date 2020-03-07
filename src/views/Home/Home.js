import React from 'react';
import {
  Grid,
  Title,
} from 'beautiful-react-ui'

const Home = ({ user, history }) => {
  return (
    <Grid>
      <Grid.Column sm="12">
        <Title>Home</Title>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
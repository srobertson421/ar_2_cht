import React from 'react';
import {
  Grid,
  Title
} from 'beautiful-react-ui';
import CodeConverter from '../../components/CodeConverter';

const Converter = () => {
  return (
    <Grid>
      <Grid.Column sm="12">
        <Title textAlign="center">Converter</Title>
        <Title tagName="h3" textAlign="center">
          Head to <a target="_blank" href="https://gamehacking.org">gamehacking.org</a> for decrypted AR codes, 
          they are awesome people doing awesome things
        </Title>
        <CodeConverter download />
      </Grid.Column>
    </Grid>
  );
}

export default Converter;
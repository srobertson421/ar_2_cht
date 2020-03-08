import React, { useEffect, useState } from 'react';
import {
  Grid,
  Title,
  Spinner,
  Card,
  Paragraph,
  Button
} from 'beautiful-react-ui'
import OriginalCheatsState from '../../state/OriginalCheatsState';
import { db, auth } from '../../firebase';
import generateCHT from '../../utils/generateCHT';

const OriginalCheatView = ({ user, history, match: { params } }) => {
  const {
    games,
    fetchingGames,
    fetchError,
    initGames,
  } = OriginalCheatsState.useContainer();
  const [ currentGame, setCurrentGame ] = useState(null);
  const [ currentGameError, setCurrentGameError ] = useState(null);
  const [ currentGameFetching, setCurrentGameFetching ] = useState(false);
  const [ chtURL, setChtURL ] = useState('');

  useEffect(() => {
    if(!currentGame) {
      const game = games.find(g => g.id === params.id);
      if(game) {
        setCurrentGame(game);
      } else {
        setCurrentGameFetching(true);
        db.collection('games')
        .doc(params.id)
        .onSnapshot(docSnap => {
          if(docSnap.exists) {
            setCurrentGame({ id: docSnap.id, ...docSnap.data() });
            setCurrentGameFetching(false);
          }
        }, err => {
          setCurrentGameError(err);
          setCurrentGameFetching(false);
        });
      }
    }

    if(currentGame) {
      console.log(currentGame);
    }
  }, [games, currentGame]);

  const downloadCHT = () => {
    if(currentGame) {
      const chtURL = generateCHT(currentGame.cheats, currentGame.gameName);
      const a = document.createElement('a');
      a.href = chtURL;
      a.download = 'ez-flash-cheats.cht';
      a.click();
    }
  }

  return (
    <>
      { currentGameFetching && <Spinner type="pulse" color="primary" size="large" /> }

      { currentGame && !currentGameError && !currentGameFetching && (
        <>
          <Grid>
            <Grid.Column size="9">
              <Title>{ currentGame.gameName }</Title>
            </Grid.Column>
            <Grid.Column size="3">
              <Button color="primary" onClick={downloadCHT} fluid>Download .cht File</Button>
            </Grid.Column>
          </Grid>
          { currentGame.cheats.map((cheat, cheatIndex) => (
            <Card key={`${cheat.value}-${cheatIndex}`}>
              <Card.Title>{ cheat.name || 'NO NAME' }</Card.Title>
              <Card.Content>
                <Paragraph>{`
                  [${cheat.name}]
                  ${cheat.label}=${cheat.value}
                `}</Paragraph>
              </Card.Content>
            </Card>
          )) }
        </>
      ) }

      { !currentGame && currentGameError && !currentGameFetching && (
        <Grid>
          <Grid.Column sm="12">
            <Title>Error! { currentGameError.message }</Title>
          </Grid.Column>
        </Grid>
      ) }
    </>
  );
}

export default OriginalCheatView;
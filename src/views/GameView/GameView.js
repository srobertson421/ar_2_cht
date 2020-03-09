import React, { useEffect, useState } from 'react';
import {
  Grid,
  Title,
  Spinner,
  Card,
  Paragraph,
  Button,
  Modal,
  Accordion,
} from 'beautiful-react-ui'
import GamesState from '../../state/GamesState';
import { db } from '../../firebase';
import downloadCHT from '../../utils/downloadCHT';
import CodeConverter from '../../components/CodeConverter';

const GameView = ({ user, history, match: { params } }) => {
  const {
    games,
    addCheatsToGame
  } = GamesState.useContainer();
  const [ currentGame, setCurrentGame ] = useState(null);
  const [ currentGameError, setCurrentGameError ] = useState(null);
  const [ currentGameFetching, setCurrentGameFetching ] = useState(false);
  const [ addCheatAccordionOpen, setAddCheatAccordionOpen ] = useState(null);

  useEffect(() => {
    if(!currentGame) {
      const game = games.find(g => g.id === params.id);
      if(game) {
        setCurrentGame(game);
      } else {
        setCurrentGameFetching(true);
        db.collection('newGames')
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
  }, [games, currentGame]);

  const handleCheatsExport = cheats => {
    addCheatsToGame({
      cheats,
      game: currentGame,
    })
    .then(() => {
      setAddCheatAccordionOpen(null);
    });
  }

  return (
    <>
      { currentGameFetching && <Spinner type="pulse" color="primary" size="large" /> }

      { currentGame && !currentGameError && !currentGameFetching && (
        <>
          <Grid>
            <Grid.Column size="9" sm="12">
              <Title textAlign="center">{ currentGame.name }</Title>
            </Grid.Column>
            <Grid.Column size="3" sm="12">
              <Button color="info" icon="save" onClick={() => downloadCHT(currentGame)} fluid>Download .cht File</Button>
            </Grid.Column>
          </Grid>
          { user && (
            <Accordion
              onChange={(e, next) => {
                if(next !== undefined) {
                  setAddCheatAccordionOpen(next === addCheatAccordionOpen ? null : next);
                }
              }}
              active={addCheatAccordionOpen}
            >
              <Accordion.Content title="Add Cheats Here">
                <Card fluid>
                  <Card.Title>Add Cheats</Card.Title>
                  <Card.Content>
                    <CodeConverter exportCallback={handleCheatsExport} />
                  </Card.Content>
                  <Card.Footer>
                    <Paragraph color="danger">
                      Please make sure to double check that the cheat you are looking to add does not exist 
                      yet to avoid duplicates. Also, if possible, have tested your cheat before uploading. 
                      Thanks for your diligence!
                    </Paragraph>
                  </Card.Footer>
                </Card>
              </Accordion.Content>
            </Accordion>
          ) }
          { !user && (
            <Title tagName="h5">Please Login/Signup to Add Cheats</Title>
          ) }
          { currentGame.cheats.map((cheat, cheatIndex) => (
            <Card fluid key={`${cheat.value}-${cheatIndex}`}>
              <Card.Title>{ cheat.name || 'NO NAME' }</Card.Title>
              <Card.Content>
                <Paragraph>
                  [{cheat.name}]
                  <br/>
                  ON={cheat.value}
                </Paragraph>
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

export default GameView;
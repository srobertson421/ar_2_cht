import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Grid,
  Title,
  Spinner,
  Button,
  Icon,
  Paragraph,
  Modal,
  FormGroup,
  FormPanel,
  Label,
  Input,
  Select
} from 'beautiful-react-ui';
import { useDidMount } from 'beautiful-react-hooks';
import GamesState from '../../state/GamesState';

const Cheats = ({ user, history }) => {
  const {
    games,
    fetchingGames,
    fetchError,
    initGames,
    nextPage,
    previousPage,
    pageNum,
    pageLimit,
    addGame
  } = GamesState.useContainer();

  const [ addGameModalOpen, setAddGameModalOpen ] = useState(false);
  const [ newGameName, setNewGameName ] = useState('');
  const [ newGameRegion, setNewGameRegion ] = useState('');

  useDidMount(initGames);

  const handleAddGameClick = () => {
    setAddGameModalOpen(true);
  }

  const handleAddGameForm = () => {
    if(newGameName && newGameRegion) {
      addGame({
        name: newGameName,
        region: newGameRegion,
        uid: user.uid,
        email: user.email,
        username: 'Anon'
      })
      .then(gameDoc => {
        history.push(`/cheats/${gameDoc.id}/${window.encodeURI(newGameName)}`);
      });
    } else {
      return;
    }
  }

  return (
    <>
      <Modal animation="slideBottom" centered isOpen={addGameModalOpen} onBackdropClick={() => setAddGameModalOpen(false)}>
        <Modal.Title>
          Add Game
          <Button 
            icon="times"
            color="transparent" 
            style={{ position:'absolute', top:0, right:0, padding:'1rem' }} 
            onClick={() => setAddGameModalOpen(false)}
          />
        </Modal.Title>
        <Modal.Body>
          <FormPanel>
            <FormGroup>
              <Label>Game Title</Label>
              <Input
                fluid
                type="text"
                value={newGameName}
                onChange={e => setNewGameName(e.target.value)}
                placeholder="Enter the title of the game"
              />
            </FormGroup>
            <FormGroup>
              <Label>Game Region</Label>
              <Select
                fluid
                value={newGameRegion}
                onChange={item => setNewGameRegion(item)}
                options={[
                  {
                    label: 'USA',
                    value: 'USA'
                  },
                  {
                    label: 'EUROPE',
                    value: 'EUROPE'
                  },
                  {
                    label: 'SPAIN',
                    value: 'SPAIN'
                  },
                  {
                    label: 'GERMANY',
                    value: 'GERMANY'
                  },
                  {
                    label: 'ITALY',
                    value: 'ITALY'
                  },
                  {
                    label: 'JAPAN',
                    value: 'JAPAN'
                  }
                ]}
              />
            </FormGroup>
          </FormPanel>
          <Button onClick={handleAddGameForm} color="success">Add Game</Button>
        </Modal.Body>
        <Modal.Footer>
          <Paragraph color="danger">
            Please make sure to double check that the game you are looking to add does not exist 
            yet to avoid duplicates. Thanks for your diligence!
          </Paragraph>
        </Modal.Footer>
      </Modal>

      <Grid>
        <Grid.Column size="8" sm="12">
          <Title textAlign="center">Games</Title>
        </Grid.Column>
        <Grid.Column size="4" sm="12">
          { user && (
            <Button color="success" onClick={handleAddGameClick} icon="plus">Add Game</Button>
          ) }
          { !user && (
            <Title tagName="h5">Please Login/Signup to Add Games</Title>
          ) }
        </Grid.Column>
      </Grid>

      { fetchingGames && <Spinner type="pulse" color="primary" size="large" /> }

      { !fetchingGames && fetchError && (
        <Grid>
          <Grid.Column sm="12">
            <Title>Game Fetch Error!</Title>
            <Title tagName="h4">{fetchError.message}</Title>
          </Grid.Column>
        </Grid>
      ) }

      { !fetchingGames && !fetchError && (
        <>
          <Grid itemsAlign="center">
            <Grid.Column size="3" offsetMd="2" offsetLg="2" offsetXl="2" sm="4">
              <Button fluid onClick={previousPage} disabled={pageNum <= 1} icon="arrow-left">Previous Page</Button>
            </Grid.Column>
            <Grid.Column size="2" sm="4">
              <Title textAlign="center" tagName="h6">Page: {pageNum}</Title>
            </Grid.Column>
            <Grid.Column size="3" sm="4">
              <Button fluid onClick={nextPage} disabled={games.length < pageLimit}>Next Page <Icon name="arrow-right" /></Button>
            </Grid.Column>
          </Grid>
          <Grid>
            { games.map(game => (
              <Fragment key={game.id}>
                <Grid.Column md="6" lg="6" xl="6" offsetMd="2" offsetLg="2" offsetXl="2" sm="9">
                  <NavLink to={`/cheats/${game.id}/${window.encodeURI(game.name)}`}>
                    <Title tagName="h5">{ game.name || 'No Name' }</Title>
                  </NavLink>
                </Grid.Column>
                <Grid.Column md="2" lg="2" xl="2" sm="3">
                  <Title tagName="h5">Region: { game.region || 'USA' }</Title>
                </Grid.Column>
              </Fragment>
            )) }
          </Grid>
          <Grid itemsAlign="center">
            <Grid.Column size="3" offsetMd="2" offsetLg="2" offsetXl="2" sm="4">
              <Button fluid onClick={previousPage} disabled={pageNum <= 1} icon="arrow-left">Previous Page</Button>
            </Grid.Column>
            <Grid.Column size="2" sm="4">
              <Title textAlign="center" tagName="h6">Page: {pageNum}</Title>
            </Grid.Column>
            <Grid.Column size="3" sm="4">
              <Button fluid onClick={nextPage} disabled={games.length < pageLimit}>Next Page <Icon name="arrow-right" /></Button>
            </Grid.Column>
          </Grid>
        </>
      ) }
    </>
  );
}

export default Cheats;
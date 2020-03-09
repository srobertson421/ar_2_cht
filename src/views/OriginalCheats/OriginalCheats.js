import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Grid,
  Title,
  Spinner,
  Button,
  Icon,
} from 'beautiful-react-ui';
import { useDidMount } from 'beautiful-react-hooks';
import OriginalCheatsState from '../../state/OriginalCheatsState';

const OriginalCheats = () => {
  const {
    games,
    fetchingGames,
    fetchError,
    initGames,
    nextPage,
    previousPage,
    pageNum,
    pageLimit,
  } = OriginalCheatsState.useContainer();

  useDidMount(initGames);

  return (
    <>
      <Grid>
        <Grid.Column sm="12">
          <Title textAlign="center">EZ-Flash Original CHT files</Title>
          <Title textAlign="center" tagName="h4">WARNING: Only slightly edited from original download from EZ-Flash site. Lots of missing data, wrong regions, etc. Use at own risk!</Title>
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
            <Grid.Column size="3" offset="2">
              <Button fluid onClick={previousPage} disabled={pageNum <= 1} icon="arrow-left">Previous Page</Button>
            </Grid.Column>
            <Grid.Column size="2">
              <Title textAlign="center" tagName="h6">Page: {pageNum}</Title>
            </Grid.Column>
            <Grid.Column size="3">
              <Button fluid onClick={nextPage} disabled={games.length < pageLimit}>Next Page <Icon name="arrow-right" /></Button>
            </Grid.Column>
          </Grid>
          <Grid>
            { games.map(game => (
              <Fragment key={game.id}>
                <Grid.Column size="8">
                  <NavLink to={`/ez-flash-cheats/${game.id}/${window.encodeURI(game.gameName)}`}>
                    <Title tagName="h5">{ game.gameName || 'No Name' }</Title>
                  </NavLink>
                </Grid.Column>
                <Grid.Column size="2">
                  <Title tagName="h5">Original Game ID: { game.gameId || 'N/A' }</Title>
                </Grid.Column>
                <Grid.Column size="2">
                  <Title tagName="h5">Region: { game.region || 'USA' }</Title>
                </Grid.Column>
              </Fragment>
            )) }
          </Grid>
          <Grid itemsAlign="center">
            <Grid.Column size="3" offset="2">
              <Button fluid onClick={previousPage} disabled={pageNum <= 1} icon="arrow-left">Previous Page</Button>
            </Grid.Column>
            <Grid.Column size="2">
              <Title textAlign="center" tagName="h6">Page: {pageNum}</Title>
            </Grid.Column>
            <Grid.Column size="3">
              <Button fluid onClick={nextPage} disabled={games.length < pageLimit}>Next Page <Icon name="arrow-right" /></Button>
            </Grid.Column>
          </Grid>
        </>
      ) }
    </>
  );
}

export default OriginalCheats;
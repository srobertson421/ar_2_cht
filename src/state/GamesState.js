import { useState } from 'react';
import { createContainer } from 'unstated-next';
import firebase from 'firebase/app';
import { db } from '../firebase';

const initial = {
  games: [],
  fetchingGames: false,
  fetchError: null,
  firstCursor: null,
  lastCursor: null,
  pageLimit: 50,
  pageNum: 1,
};

const useGames = (initialState = initial) => {
  const [ games, setGames ] = useState(initialState.games);
  const [ fetchingGames, setFetchingGames ] = useState(initialState.fetchingGames);
  const [ fetchError, setFetchError ] = useState(initialState.fetchError);
  const [ firstCursor, setFirstCursor ] = useState(initialState.firstCursor);
  const [ lastCursor, setLastCursor ] = useState(initialState.lastCursor);
  const [ pageLimit, setPageLimit ] = useState(initialState.pageLimit);
  const [ pageNum, setPageNum ] = useState(initialState.pageNum);

  const createFetchError = err => {
    console.log('Games Fetch Error', err);
    setFetchingGames(false);
    setFetchError(err);
  }

  const createUpdateError = err => {
    console.log('Error adding or updating game');
  }

  const initGames = () => {
    setFetchingGames(true);
    if(!firstCursor) {
      db.collection('newGames')
      .orderBy('name')
      .limit(pageLimit)
      .get()
      .then(querySnap => {
        if(!querySnap.empty) {
          setGames(querySnap.docs.map((gameDoc, docIndex) => {
            if(docIndex === 0) {
              setFirstCursor(gameDoc);
            } else if(docIndex === querySnap.docs.length - 1) {
              setLastCursor(gameDoc);
            }

            return { id: gameDoc.id, ...gameDoc.data() }
          }));
        }

        setFetchingGames(false);
      })
      .catch(createFetchError);
    } else {
      db.collection('newGames')
      .orderBy('name')
      .limit(pageLimit)
      .startAt(firstCursor)
      .get()
      .then(querySnap => {
        if(!querySnap.empty) {
          setGames(querySnap.docs.map((gameDoc, docIndex) => {
            if(docIndex === 0) {
              setFirstCursor(gameDoc);
            } else if(docIndex === querySnap.docs.length - 1) {
              setLastCursor(gameDoc);
            }

            return { id: gameDoc.id, ...gameDoc.data() }
          }));
        }

        setFetchingGames(false);
      })
      .catch(createFetchError);
    }
  }

  const nextPage = () => {
    if(lastCursor) {
      db.collection('newGames')
      .orderBy('name')
      .limit(pageLimit)
      .startAfter(lastCursor)
      .get()
      .then(querySnap => {
        if(!querySnap.empty) {
          setGames(querySnap.docs.map((gameDoc, docIndex) => {
            if(docIndex === 0) {
              setFirstCursor(gameDoc);
            } else if(docIndex === querySnap.docs.length - 1) {
              setLastCursor(gameDoc);
            }

            return { id: gameDoc.id, ...gameDoc.data() }
          }));
        }

        setFetchingGames(false);
        setPageNum(pageNum + 1);
      })
      .catch(createFetchError);
    }
  }

  const previousPage = () => {
    if(firstCursor) {
      db.collection('newGames')
      .orderBy('name')
      .endBefore(firstCursor)
      .limitToLast(pageLimit)
      .get()
      .then(querySnap => {
        if(!querySnap.empty) {
          setGames(querySnap.docs.map((gameDoc, docIndex) => {
            if(docIndex === 0) {
              setFirstCursor(gameDoc);
            } else if(docIndex === querySnap.docs.length - 1) {
              setLastCursor(gameDoc);
            }

            return { id: gameDoc.id, ...gameDoc.data() }
          }));
        }

        setFetchingGames(false);
        setPageNum(pageNum - 1);
      })
      .catch(createFetchError);
    }
  }

  const addGame = ({ name, region, uid, email, username }) => {
    if(name && region && uid && email && username) {
      return db.collection('newGames')
      .add({
        name,
        region,
        submittedBy: {
          uid,
          email,
          username,
        },
        cheats: [],
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .catch(createUpdateError);
    }

    return;
  }

  const addCheatsToGame = ({ cheats, game }) => {
    const tmpCheats = [ ...game.cheats, ...cheats ];

    return db.collection('newGames')
    .doc(game.id)
    .update({
      cheats: tmpCheats,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date())
    })
    .catch(createUpdateError);
  }

  return {
    games,
    fetchingGames,
    fetchError,
    initGames,
    nextPage,
    previousPage,
    pageNum,
    pageLimit,
    addGame,
    addCheatsToGame
  }
}

const GamesState = createContainer(useGames);

export default GamesState;
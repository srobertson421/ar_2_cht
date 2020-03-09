import { useState } from 'react';
import { createContainer } from 'unstated-next';
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

const useOriginalCheats = (initialState = initial) => {
  const [ games, setGames ] = useState(initialState.games);
  const [ fetchingGames, setFetchingGames ] = useState(initialState.fetchingGames);
  const [ fetchError, setFetchError ] = useState(initialState.fetchError);
  const [ firstCursor, setFirstCursor ] = useState(initialState.firstCursor);
  const [ lastCursor, setLastCursor ] = useState(initialState.lastCursor);
  const [ pageLimit, setPageLimit ] = useState(initialState.pageLimit);
  const [ pageNum, setPageNum ] = useState(initialState.pageNum);

  const createFetchError = err => {
    console.log('Original Games Fetch Error', err);
    setFetchingGames(false);
    setFetchError(err);
  }

  const initGames = () => {
    setFetchingGames(true);
    if(!firstCursor) {
      db.collection('games')
      .orderBy('gameName')
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
      db.collection('games')
      .orderBy('gameName')
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
      db.collection('games')
      .orderBy('gameName')
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
      db.collection('games')
      .orderBy('gameName')
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

  return {
    games,
    fetchingGames,
    fetchError,
    initGames,
    nextPage,
    previousPage,
    pageNum,
    pageLimit,
  }
}

const OriginalCheatsState = createContainer(useOriginalCheats);

export default OriginalCheatsState;
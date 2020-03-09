import React from 'react';
import AuthState from './state/AuthState';
import OriginalCheatsState from './state/OriginalCheatsState';
import GamesState from './state/GamesState';
import Routes from './Routes';

function App() {
  return (
    <AuthState.Provider>
      <OriginalCheatsState.Provider>
        <GamesState.Provider>
          <Routes />
        </GamesState.Provider>
      </OriginalCheatsState.Provider>
    </AuthState.Provider>
  );
}

export default App;

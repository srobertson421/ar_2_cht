import React from 'react';
import AuthState from './state/AuthState';
import OriginalCheatsState from './state/OriginalCheatsState';
import Routes from './Routes';

function App() {
  return (
    <AuthState.Provider>
      <OriginalCheatsState.Provider>
        <Routes />
      </OriginalCheatsState.Provider>
    </AuthState.Provider>
  );
}

export default App;

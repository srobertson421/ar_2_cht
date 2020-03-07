import React from 'react';
import AuthState from './state/AuthState';
import Routes from './Routes';

function App() {
  return (
    <AuthState.Provider>
      <Routes />
    </AuthState.Provider>
  );
}

export default App;

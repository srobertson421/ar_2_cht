import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { auth } from '../firebase';

const initialState = {
  user: null,
  isAuthenticating: false,
  authError: null,
}

const useAuthState = (initial = initialState) => {
  const [ user, setUser ] = useState(initial.user);
  const [ isAuthenticating, setIsAuthenticating ] = useState(initial.isAuthenticating);
  const [ authError, setAuthError ] = useState(initial.authError);

  const createAuthError = err => {
    console.log('Auth Error', err);
    setAuthError(err);
    setIsAuthenticating(false);
  }

  const initAuthListener = () => {
    setIsAuthenticating(true);
    auth.onAuthStateChanged(
      user => {
        setUser(user);
        setIsAuthenticating(false);
      },
      createAuthError
    );
  }

  const signup = ({ email, password }) => {
    if(email && password && typeof email === 'string' && typeof password === 'string') {
      setIsAuthenticating(true);
      return auth.createUserWithEmailAndPassword(email, password)
      .catch(createAuthError)
    }

    // Alert user that they need to provide strings
    return;
  }

  const login = ({ email, password }) => {
    if(email && password && typeof email === 'string' && typeof password === 'string') {
      setIsAuthenticating(true);
      return auth.signInWithEmailAndPassword(email, password)
      .catch(createAuthError)
    }

    // Alert user that they need to provide strings
    return;
  }

  const logout = () => {
    setIsAuthenticating(true);
    return auth.signOut()
    .catch(createAuthError)
  }

  return {
    user,
    isAuthenticating,
    authError,
    initAuthListener,
    signup,
    login,
    logout,
  }
}

const AuthState = createContainer(useAuthState);

export default AuthState;
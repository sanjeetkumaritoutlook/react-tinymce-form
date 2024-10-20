// src/react-auth0-wrapper.js
import React, { useState, useEffect, useContext } from 'react';
//https://www.npmjs.com/package/@auth0/auth0-spa-js
//https://github.com/auth0/auth0-spa-js/issues/39
//export 'default' (imported as 'createAuth0Client') was not found in '@auth0/auth0-spa-js'
import {createAuth0Client} from '@auth0/auth0-spa-js';
//https://www.npmjs.com/package/universal-cookie
import Cookies from 'universal-cookie';
import axios from 'axios';
import { lipapiUrl } from './utils/url-utils';

const cookies = new Cookies();

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState();
  const [intent, setIntent] = useState('liberty.idea.portal:user_intent');
  const [auth0Client, setAuth0] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [claims, setClaims] = useState();
  const [token, setToken] = useState();

  async function countLogin() {
    axios
      .post(
        `${lipapiUrl()}/metrics`,
        {
          eventType: 'login_event',
        },
        {
          headers: {
            Authorization: `Bearer ${await getTokenSilently()}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {})
      .catch((e) => {
        //Fail silently
        console.log(e.response.data);
      });
  }

  useEffect(() => {
    if (user !== undefined) {
      countLogin();
      if (
        Object.keys(user['https://lmig.com/authorization_details']).length !== 0
      )
        setUserDetails(
          user['https://lmig.com/authorization_details']['lmig:user_details'][0]
        );
    }
  }, [user]);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0 = await createAuth0Client(initOptions);
      setAuth0(auth0);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        setUser(await auth0.getUser());
        setClaims(await auth0.getIdTokenClaims());
        setToken(await auth0.getTokenSilently());
      }
      setIsLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithRedirect = async (options = {}) => {
    options.intent = intent;
    await auth0Client.loginWithRedirect(options);
  };

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
      const user = await auth0Client.getUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
  };

  const getTokenSilently = async (...p) => {
    if (auth0Client) {
      try {
        const token = await auth0Client.getTokenSilently(...p);
        setToken(token);
      } catch (e) {
        console.log('Probably the Session has expired. ', e);
        await loginWithRedirect({
          appState: {
            targetUrl: window.location.pathname,
          },
        });
      }
      return token;
    }
  };

  const updateIntent = async (intent) => {
    cookies.set('auth0.tx.intent', intent);
    setIntent(intent);
    await getTokenSilently({ intent: intent, ignoreCache: true });
  };

  const handleRedirectCallback = async () => {
    setIsLoading(true);
    await auth0Client.handleRedirectCallback();

    setUser(await auth0Client.getUser());
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        popupOpen,
        claims,
        intent,
        token,
        userDetails,
        updateIntent,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect,
        getTokenSilently,
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

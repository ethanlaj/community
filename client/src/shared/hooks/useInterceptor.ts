/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { AccountInfo, IPublicClientApplication, SilentRequest } from '@azure/msal-browser';
import { toast } from 'react-toastify';
import { msalConfig } from '@/config';

const urlsToUseMsal = [
  'https://community-production-c11b.up.railway.app',
  'http://localhost:3001',
];

const useInterceptor = () => {
  function setInterceptors(instance: IPublicClientApplication, account: AccountInfo) {
    axios.interceptors.request.clear();
    axios.interceptors.request.use(async (config) => {
      if (!urlsToUseMsal.some((url) => config.url && config.url.startsWith(url))) return config;
      if (!account) return config;

      const token = await getTokenSilently(instance, account);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axios.interceptors.response.clear();
    axios.interceptors.response.use(null, async (error) => {
      const originalRequest = error.config;

      // Check if the error was a 401 and the request wasn't a retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Try to get a new token
        const token = await getTokenSilently(instance, account);
        if (token) {
          // Update the request header
          originalRequest.headers.Authorization = `Bearer ${token}`;

          // Retry the request
          return axios(originalRequest);
        }

        // No new token, attempt to initiate a popup for login
        try {
          const response = await instance.loginPopup();

          if (response.accessToken) {
            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
            return axios(originalRequest);
          }
        } catch (popupError) {
          toast.warn('Popup failed. Falling back to redirect');

          // If popup fails, redirect for login
          return instance.loginRedirect();
        }
      }

      const expectedError = error.response
              && error.response.status >= 400
              && error.response.status < 500;

      if (!expectedError) {
        toast.error('An unexpected error occurrred.');
      }

      return Promise.reject(error);
    });
  }

  const getTokenSilently = async (instance: IPublicClientApplication, account: AccountInfo) => {
    if (!account) return null;

    try {
      const request: SilentRequest = {
        scopes: ['openid', 'profile', `${msalConfig.auth.clientId}/.default`],
        account,
      };
      const response = await instance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      console.error('Failed to get token silently', error);
      return null;
    }
  };

  return setInterceptors;
};

export default useInterceptor;

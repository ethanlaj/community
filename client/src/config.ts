import { Configuration } from '@azure/msal-browser';

export const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://community-production-c11b.up.railway.app'
  : 'http://localhost:3001';

export const msalConfig: Configuration = {
  auth: {
    clientId: '94952df3-5850-48b0-bdd7-62a983062134',
    authority: 'https://login.microsoftonline.com/1d884f12-a0d7-42f0-8b15-3a91c853bcb5',
    redirectUri: 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

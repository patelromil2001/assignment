// scripts/generate-env.js
const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  SPOTIFY_CLIENT_ID: '${process.env.SPOTIFY_CLIENT_ID || ''}',
  SPOTIFY_REDIRECT_URI: '${process.env.SPOTIFY_REDIRECT_URI || ''}',
  SPOTIFY_API_BASE: '${process.env.SPOTIFY_API_BASE || 'https://api.spotify.com/v1'}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
console.log('Wrote environment.prod.ts');

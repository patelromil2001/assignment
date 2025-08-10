const fs = require('fs');
const path = require('path');

const envDir = path.resolve(__dirname, '../src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const targetPath = path.join(envDir, 'environment.prod.ts');

const envConfigFile = `export const environment = {
  production: true,
  spotifyApiBase: '${process.env.SPOTIFY_API_BASE}',
  spotifyClientId: '${process.env.SPOTIFY_CLIENT_ID}',
  spotifyRedirectUri: '${process.env.SPOTIFY_REDIRECT_URI}'
};`;

fs.writeFileSync(targetPath, envConfigFile);

const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0ZSZ29TNEFYNjQ4eVNOZGZTQldmandDcjFkaFVQdTZnd01zOUR0TGEycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1RaWHJybDBiRUdQa09qeFovQ29wUjdUdmszb1RXZ3Q0RTF1YkNzb2lXbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SUU0QlRHaExnM0thenZOOWJXdUEraGhLYTZTZWg3S0hKQ3VmTnhtbVhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsRFZtS3BwZnl3bHVycmROT2tiWUVJdGNvN0NzNjJ3KzRVWWtqaWtvMEFJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMUVlJUEhzeFpNdHdJdHdjbTJIUGhuZlp1QXJQR0N3SHlueWJGRU1WazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJoZEFaNlRqZWd5UGJqT1ZISUJ3OVJHbkFkMkhDSTFKeThDa2tuZ2tvU3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1A4KzB3dnI1YmMzNCtaNWhjOE1VK3B2ZGI0aGtkc2RVL1JNVXFOY0duND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjJWYUZ6aHFLMGFDMTdiN2g0V3RlWFozMzNUMXREK1h5QXlTL29zZUgzcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjYrc0w4MTVhdzZQdXRUcHBVQUh6ckdzNlVHUlZJMzhlRTU2V1VoWktQTklUUWQwNWZoTC9mdFJXUDBNTmdEMUpKcCt0WVgxeWdmbTMxTThFYXN6QkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiJkOWszSytuaGwzTStGam1OMC9MYUh0STk0Q2RjVkR1L2YvYk1yWGNWMnVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwNWpQTm1hMFIwcURpUVBNUVlsVUZRIiwicGhvbmVJZCI6IjY1MDBmYjEwLTY5NGQtNDJmMC04YjFjLTk2ZGZlNWE0NzMzOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLcG5JWUIyQXZxcUYwWVJGa3lCamVmdDdoZWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDhvbXpSeStVUytqUmZpSS8vWG9QMExhNFJjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZGTkpENFkzIiwibWUiOnsiaWQiOiIxNjU4MjE0ODExODo2NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHUxbko4QkVJS1g5TGdHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZXZFVFl1K0JwUlk3cUMyQW9MUGx1SUJNVmdGbnA5ZGF3cmlsTDRHcVpucz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ203RDhLUzdYdWZDdWllNVlPN2pHT01LT1lFV1p1aXdNb3NFRWErOWhnc1dBdGdFMVhVRXp4L2hJZWxtbmlFNzBaZ1VoRXlEUE56S0tiUkZiemdWQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6ImxPU2FlcmFBTHQ5amh5Ym9zQ1NocVY5VGI4b0wyRE1UY1FvOEdERmxqSERIdlJGekZ5Qld2QkhaRU5qek9EQnMzRkFZR3ZzQWIzSnZXZkFhUmhTb0RBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTY1ODIxNDgxMTg6NjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWHJ4RTJMdmdhVVdPNmd0Z0tDejViaUFURllCWjZmWFdzSzRwUytCcW1aNyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTk1Njc1MywibXlBcHBTdGF0ZUtleUlkIjoiQUQ0QUFOTkUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "dontaye",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "16582148118",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

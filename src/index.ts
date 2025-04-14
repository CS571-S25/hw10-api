import fs from 'fs'

import express, { Express } from 'express';
import cookies from "cookie-parser";

import { CS571Initializer } from '@cs571/api-framework'
import HW10PublicConfig from './model/configs/hw10-public-config';
import HW10SecretConfig from './model/configs/hw10-secret-config';
import { CS571AllChatroomsRoute } from './routes/chatrooms';
import { CS571GetMessagesRoute } from './routes/get-messages';
import { CS571HW10DbConnector } from './services/hw10-db-connector';
import { CS571HW10TokenAgent } from './services/hw10-token-agent';


console.log("Welcome to HW10!");

const app: Express = express();

app.use(cookies());

// https://github.com/expressjs/express/issues/5275
declare module "express-serve-static-core" {
  export interface CookieOptions {
    partitioned?: boolean;
  }
}

const appBundle = CS571Initializer.init<HW10PublicConfig, HW10SecretConfig>(app, {
  allowNoAuth: [],
  skipAuth: false
});

const db = new CS571HW10DbConnector(appBundle.config);
const ta = new CS571HW10TokenAgent(appBundle.config);

db.init();

const chatrooms = JSON.parse(fs.readFileSync('includes/chatrooms.json').toString());

appBundle.router.addRoutes([
  new CS571AllChatroomsRoute(chatrooms, db),
  new CS571GetMessagesRoute(chatrooms, db)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});

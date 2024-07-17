import { Database } from '@external/database.external';
import { TechChallengeApp } from './api';

const database = new Database(); // TODO implement database
const app = new TechChallengeApp(database);

app.start();

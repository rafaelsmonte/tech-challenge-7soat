import { TechChallengeApp } from './api';
import { PrismaDatabase } from './external/database.external';

const database = new PrismaDatabase();
const app = new TechChallengeApp(database);

app.start();

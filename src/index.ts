import { TechChallengeApp } from './api';
import { PrismaDatabase } from './external/database.external';
import {  MercadoPago} from './external/payment.external';

const database = new PrismaDatabase();
const payment = new MercadoPago();
const app = new TechChallengeApp(database,payment);

app.start();

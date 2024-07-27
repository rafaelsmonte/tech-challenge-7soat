import { TechChallengeApp } from './api';
import { MercadoPago } from './external/mercado-pago-payment.external';
import { PrismaDatabase } from './external/prisma-database.external';

const database = new PrismaDatabase();
const payment = new MercadoPago();

const app = new TechChallengeApp(database, payment);

app.start();

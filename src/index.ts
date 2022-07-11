import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import ratelimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
// import db from './database'; //! Testing your Database Connections

const PORT = config.port || 3000;
//* Create instance server
const app: Application = express();
//* Middleware to parse incoming requests
app.use(express.json());

//* HTTP request logger middleware
app.use(morgan('common'));
//* HTTP security middleware
app.use(helmet());
//* Apply Rate limiting middleware to all requests
app.use(
  ratelimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after an hour',
  })
);
//* add routing for/path
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'true', message: 'Hello World ❤️👀' });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'false',
    message:
      'I think you are lost 😒, and when we are lost we just go back to Home 🤣',
  });
});

//* Testing database
// db.connect().then((client) => {
//   return client
//     .query('SELECT NOW()')
//     .then((res) => {
//       client.release();
//       console.log(res.rows);
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.stack);
//     });
// });

app.use(errorMiddleware);

//* start express server
app.listen(PORT, () => {
  console.log(`Server is now opened on port: ${PORT}`);
});

export default app;

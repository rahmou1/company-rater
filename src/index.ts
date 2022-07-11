import express, { Application, Request, Response } from 'express';

const PORT = 3000;
//* Create instance server
const app: Application = express();

//* add routing for/path
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'true', message: 'Hello World ❤️👀' });
});

//* start express server
app.listen(PORT, () => {
  console.log(`Server is now opened on port: ${PORT}`);
});

export default app;

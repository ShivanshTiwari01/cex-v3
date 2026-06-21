import chalk from 'chalk';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too may requests from this IP, please try again later',
});

app.use(limiter);

app.use((req, res, next) => {
  console.log(`${chalk.yellow(req.method)} ${chalk.green(req.url)}`);
  next();
});

app.get('/', async (req, res) => {
  res.send('UNAUTHORIZED');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

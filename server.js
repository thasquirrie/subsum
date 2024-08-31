import './config.js';

import app from './app.js';
import { connectDB } from './connectDB.js';

connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  createLogger.info(
    `Deepcode server kickstart to life on port ${port}`.bold.cyan
  );
});

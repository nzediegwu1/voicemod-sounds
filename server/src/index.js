import HTTP from 'http';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

export const http = HTTP.Server(app);

const { PORT } = process.env;
const port = PORT || 4000;

http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

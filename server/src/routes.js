import express from 'express';
import Sound from './controllers';
import { validateId, handleValidation } from './middlewares/validator';

const app = express.Router();

app.get('/sounds/:soundId', validateId, handleValidation, Sound.get);
app.put('/sounds/:soundId/play', validateId, handleValidation, Sound.play);

app.route('/sounds').get(Sound.getAll).post(Sound.import);

export default app;

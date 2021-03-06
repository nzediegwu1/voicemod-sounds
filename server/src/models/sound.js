import mongoose from 'mongoose';
import { requiredNumber, requiredString } from '../utils/constants';

const Sound = new mongoose.Schema({
  name: requiredString,
  icon: requiredString,
  playbacks: requiredNumber,
  price: requiredNumber,
});

export default mongoose.model('sound', Sound);

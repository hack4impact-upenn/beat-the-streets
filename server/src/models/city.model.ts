/**
 * Defines the City model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  isAccredited: {
    type: Boolean,
    required: true,
  },
  countiesCovered: {
    type: [String],
    required: true,
  },
  indicators: {
    type: Map,
    of: {
      type: Map,
      of: Number,
    },
    required: true,
  },
});

interface ICity extends mongoose.Document {
  _id: string;
  cityName: string;
  isAccredited: boolean;
  countiesCovered: [string];
  indicators: Map<string, Map<string, number>>;
}

const City = mongoose.model<ICity>('City', CitySchema);

export { ICity, City };

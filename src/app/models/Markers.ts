import { Schema, Document, model } from 'mongoose';
import shortid from 'shortid';

type MarkerProps = {
  title: string;
  address: string;
  numbers: string[];
  latitude: number;
  longitude: number;
  uniqueId: string;
} & Document;

const MarkerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  numbers: {
    type: Schema.Types.Array,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  uniqueId: {
    type: String
  }
});

MarkerSchema.pre<MarkerProps>('save', function (next) {
  let todo = this;
  if (!todo.uniqueId) {
    todo.uniqueId = shortid.generate();
  }
  next();
});

const Marker = model<MarkerProps>('Marker', MarkerSchema);

export default Marker;

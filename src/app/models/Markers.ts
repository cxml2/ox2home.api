import { Schema, Document, model } from 'mongoose';
import shortid from 'shortid';
import autoIncrement from 'mongoose-auto-increment';

type MarkerProps = {
  title: string;
  address: string;
  numbers: string[];
  latitude: number;
  longitude: number;
  uniqueId: string;
  mid: number;
} & Document;

const MarkerSchema = new Schema(
  {
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
    },
    mId: {
      type: Number
    }
  },
  { timestamps: true }
);

MarkerSchema.plugin(autoIncrement.plugin, {
  model: 'Marker',
  field: 'mId',
  startAt: 1,
  incrementBy: 1
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

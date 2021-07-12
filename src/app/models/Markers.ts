import mongoose, { Schema, Document, model } from 'mongoose';
// import shortid from 'shortid';
import autoIncrement from 'mongoose-auto-increment';

type MarkerProps = {
  title: string;
  address: string;
  phoneNumbers: string[];
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
    phoneNumbers: {
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
    markerId: {
      type: Number
    }
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);

MarkerSchema.plugin(autoIncrement.plugin, {
  model: 'Marker',
  field: 'markerId',
  startAt: 1,
  incrementBy: 1
});

// MarkerSchema.pre<MarkerProps>('save', function (next) {
//   let todo = this;
//   if (!todo.uniqueId) {
//     todo.uniqueId = shortid.generate();
//   }
//   next();
// });

MarkerSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  }
});

const Marker = model<MarkerProps>('Marker', MarkerSchema);

export default Marker;

import { Schema, Document, model } from 'mongoose';
import shortid from 'shortid';

type ProductProps = {
  name: string;
  address: string;
  phoneNumbers: string[];
  message: string;
  facebookLink: string;
  uniqueId: string;
} & Document;

const ProductSchema = new Schema(
  {
    name: {
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
    message: {
      type: String,
      required: true
    },
    facebookLink: {
      type: String
    },
    uniqueId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.pre<ProductProps>('save', function (next) {
  let product = this;
  if (!product.uniqueId) {
    product.uniqueId = shortid.generate();
  }
  next();
});

const Product = model<ProductProps>('Product', ProductSchema);

export default Product;

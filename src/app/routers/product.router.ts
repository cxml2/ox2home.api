import { Router } from 'express';
import {
  addNewProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/products', getAllProducts);
productRouter.post('/product', addNewProduct);
productRouter.put('/product/:uniqueId', updateProduct);
productRouter.delete('/product/:uniqueId', deleteProduct);

export default productRouter;

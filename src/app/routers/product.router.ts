import { Router } from 'express';
import {
  addNewProduct,
  getAllProducts,
  updateProduct,
  getAllActiveProducts,
  deleteProduct
} from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/products', getAllProducts);
productRouter.get('/products/active', getAllActiveProducts);
productRouter.post('/product', addNewProduct);
productRouter.put('/product/:uniqueId', updateProduct);
productRouter.delete('/product/:uniqueId', deleteProduct);

export default productRouter;

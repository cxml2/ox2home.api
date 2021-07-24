import { Request, Response } from 'express';
import Product from '../models/Products';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const response = await Product.find();
    return res.status(200).json({ success: true, data: response, error: null });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: [], error: null });
  }
};

export const getAllActiveProducts = async (req: Request, res: Response) => {
  try {
    const response = await Product.find();
    const activeData = response.filter((product) => product.active === 1);
    return res
      .status(200)
      .json({ success: true, data: activeData, error: null });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: [], error: null });
  }
};

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    const { name, address, phoneNumbers, message, facebookLink } = req.body;
    const payload = { name, address, phoneNumbers, message, facebookLink };

    const newProduct = new Product(payload);
    const response = await newProduct.save();

    return res.status(200).json({ success: true, data: response, error: null });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: {}, error: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { uniqueId } = req.params;
    await Product.findOneAndDelete({ uniqueId }).then((response) =>
      res.status(200).json({ success: true, data: response, error: null })
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: {}, error: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { uniqueId } = req.params;
    await Product.findOneAndUpdate(
      { uniqueId },
      {
        $set: {
          ...req.body
        }
      }
    ).then((response) =>
      res.status(200).json({ success: true, data: response, error: null })
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: {}, error: err });
  }
};

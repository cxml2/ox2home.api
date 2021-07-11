import { Request, Response } from 'express';
import Marker from '../models/Markers';

export const getAllMarkers = async (req: Request, res: Response) => {
  try {
    const response = await Marker.find();
    return res.status(200).json({ success: true, data: response, error: null });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: [], error: null });
  }
};

export const addNewMarker = async (req: Request, res: Response) => {
  try {
    const { title, address, phoneNumbers, latitude, longitude } = req.body;
    const payload = { title, address, phoneNumbers, latitude, longitude };

    const newMarker = new Marker(payload);
    const response = await newMarker.save();

    return res.status(200).json({ success: true, data: response, error: null });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: {}, error: err });
  }
};

export const deleteMarker = async (req: Request, res: Response) => {
  try {
    const { markerId } = req.params;
    await Marker.findOneAndDelete({ markerId }).then((response) =>
      res.status(200).json({ success: true, data: response, error: null })
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, data: {}, error: err });
  }
};

export const updateMarker = async (req: Request, res: Response) => {
  try {
    const { markerId } = req.params;
    await Marker.findOneAndUpdate(
      { markerId },
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

import { Router } from 'express';
import {
  addNewMarker,
  getAllMarkers,
  updateMarker,
  deleteMarker
} from '../controllers/marker.controller';

const markerRouter = Router();

markerRouter.get('/markers', getAllMarkers);
markerRouter.post('/marker', addNewMarker);
markerRouter.put('/marker/:uniqueId', updateMarker);
markerRouter.delete('/marker/:uniqueId', deleteMarker);

export default markerRouter;

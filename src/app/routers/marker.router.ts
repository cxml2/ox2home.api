import { Router } from 'express';
import {
  addNewMarker,
  getAllMarkers,
  updateMarker,
  deleteMarker,
  getAllActiveMarkers
} from '../controllers/marker.controller';

const markerRouter = Router();

markerRouter.get('/markers', getAllMarkers);
markerRouter.get('/markers/active', getAllActiveMarkers);
markerRouter.post('/marker', addNewMarker);
markerRouter.put('/marker/:markerId', updateMarker);
markerRouter.delete('/marker/:markerId', deleteMarker);

export default markerRouter;

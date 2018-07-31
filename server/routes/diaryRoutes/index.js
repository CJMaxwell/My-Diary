import { Router } from 'express';
import DiaryController from '../../controllers/DiaryController';
import verifyToken from '../../middleware/verifyToken';

const diaryRoutes = Router();

// diaryRoutes.get('/entries', DiaryController.getEntries);
diaryRoutes.post('/entries', verifyToken, DiaryController.createEntry);
// diaryRoutes.get('/entries/:entryId', DiaryController.getEntry);
// diaryRoutes.put('/entries/:entryId', DiaryController.updateEntry);

export default diaryRoutes;

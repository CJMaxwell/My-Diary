import { Router } from 'express';
import DiaryController from '../../controllers/DiaryController';
import verifyToken from '../../middleware/verifyToken';

const diaryRoutes = Router();

diaryRoutes.get('/entries', verifyToken, DiaryController.getEntries);
diaryRoutes.post('/entries', verifyToken, DiaryController.createEntry);
diaryRoutes.get('/entries/:entryId', verifyToken, DiaryController.getEntry);
diaryRoutes.put('/entries/:entryId', verifyToken, DiaryController.updateEntry);
diaryRoutes.delete('/entries/:entryId', verifyToken, DiaryController.deleteEntry);

export default diaryRoutes;

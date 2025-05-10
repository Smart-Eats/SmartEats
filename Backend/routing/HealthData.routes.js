import express from 'express';
import { AuthenticateUser } from '../middlewares/AuthenticatedUser.middleware.js';
import { ANALYZE_RESULT, HEALTH_DATA_FORM } from '../controller/healthdata.controller.js';
import { SEARCH_FOOD_ITEM } from '../controller/searchFood.controller.js';
const router = express.Router();

router.post('/user-data',AuthenticateUser,HEALTH_DATA_FORM);
router.post('/analyze-result',AuthenticateUser,ANALYZE_RESULT);
router.post('/search-food-item',AuthenticateUser,SEARCH_FOOD_ITEM)

export default router;
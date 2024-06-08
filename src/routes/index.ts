import { Router } from 'express';
import { getExample } from '../controllers';

const router: Router = Router();

router.get('/example', getExample);

export default router;

import express from 'express';
import {getAudio} from "../controllers/audioController.js";
import {addSong} from "../controllers/audioController.js";
import {getAll} from "../controllers/audioController.js";

const router=express.Router();

router.get('/song/:id',getAudio);
router.get('/getOne',getAudio);
router.get('/all',getAll);
router.post('/add',addSong);

export default router;
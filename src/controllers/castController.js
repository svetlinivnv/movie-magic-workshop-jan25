import { Router } from "express";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const castController = Router();

castController.use(isAuth);

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) => {
    const castData = req.body;
    await castService.create(castData);

    res.redirect('/');
});
export default castController;
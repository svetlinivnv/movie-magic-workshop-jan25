import { Router } from "express";
import homeController from "./controllers/homeController.js";
import moviesController from "./controllers/movieController.js";
import castController from "./controllers/castController.js";
import authController from "./controllers/authController.js";

const routes = Router();

routes.use(homeController);
routes.use('/movies',moviesController);
routes.use('/casts', castController);
routes.use('/auth', authController);

routes.get('*', (req, res) => {
    res.render('404');
})

export default routes;
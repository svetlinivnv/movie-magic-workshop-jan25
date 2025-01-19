import { Router } from "express";
import homeController from "./controllers/homeController.js";
import moviesController from "./controllers/moviesController.js";

const routes = Router();

routes.use(homeController);
routes.use(moviesController);

routes.get('*', (req, res) => {
    res.render('404');
})

export default routes;
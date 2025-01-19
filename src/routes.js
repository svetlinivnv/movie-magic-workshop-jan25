import { Router } from "express";
import homeController from "./controllers/homeController.js";
import moviesController from "./controllers/movieController.js";

const routes = Router();

routes.use(homeController);
routes.use('/movies',moviesController);

routes.get('*', (req, res) => {
    res.render('404');
})

export default routes;
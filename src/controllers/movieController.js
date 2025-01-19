import { Router } from "express";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', (req, res) => {
    res.render('search');
});

export default movieController;
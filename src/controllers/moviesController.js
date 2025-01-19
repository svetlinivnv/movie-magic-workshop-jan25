import { Router } from "express";

const router = Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/search', (req, res) => {
    res.render('search');
});

export default router;
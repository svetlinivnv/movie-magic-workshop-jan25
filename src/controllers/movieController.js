import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;
    await movieService.create(newMovie, userId);

    res.redirect('/');
})

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/details', async (req, res) => {    
    const movieId = req.params.movieId;
    const movie = await movieService.getOneWithCasts(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({exclude: movie.casts});

    res.render('movie/attach-cast', { movie, casts});
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;  
    const movieId = req.params.movieId;  
    await movieService.attachCast(movieId, castId);
    
    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    if (!movie.creator?.equals(req.user?.id)) {
        return res.redirect('/404');
    }
    
    await movieService.delete(movieId);
    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    const categories = getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    // TODO: check if user is creator
    
    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
});

function getCategoriesViewData(category) {
    let categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short Film',
    };

    const categories = Object.keys(categoriesMap).map(value => ({ 
        value: value, 
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }));

    return categories;
}

export default movieController;
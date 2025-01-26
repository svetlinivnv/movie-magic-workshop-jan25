// import movies from "../movies.js";
import Movies from "../models/movie.js";

export default {
    getAll(filter = {}) {
        let query = Movies.find({}); 

        if (filter.search) {
          // TODO: fix partial case insensitive search
            query = query.where({title: filter.search});
        }

        if (filter.genre) {
          // TODO: fix case insensitive search
            query = query.where({genre: filter.genre});
        }

        if (filter.year) {
            query = query.where({year: Number(filter.year)});
        }
        
        return query;
    },
  getOne(movieId) {
    // TODO if movie is missing?

    const result = Movies.findById(movieId);
    return result;
  },
  create(movieData) {
    const result = Movies.create({
      ...movieData,
      rating: Number(movieData.rating),
      year: Number(movieData.year),
  });
    return result;
  }
};

import Movie from "../models/movie.js";

export default {
    getAll(filter = {}) {
        let query = Movie.find({}); 

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

    const result = Movie.findById(movieId);
    return result;
  },
  getOneWithCasts(movieId) {
    return this.getOne(movieId).populate('casts');
  },
  create(movieData) {
    const result = Movie.create({
      ...movieData,
      rating: Number(movieData.rating),
      year: Number(movieData.year),
  });
    return result;
  },

  async attachCast(movieId, castId) {
    // First way to attach cast to movie
    const movie = await Movie.findById(movieId);
    movie.casts.push(castId);
    await movie.save();
    
    return movie;

    // Second way to attach cast to movie
  }
};

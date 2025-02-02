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
  create(movieData, creatorId) {
    const result = Movie.create({
      ...movieData,
      rating: Number(movieData.rating),
      year: Number(movieData.year),
      creator: creatorId,
  });
    return result;
  },

  attachCast(movieId, castId) {
    // TODO: Check if castId is not added already
    return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
  },
  
  delete(movieId) {
    return Movie.findByIdAndDelete(movieId);
  },

  update(movieId, movieData) {
    console.log(movieData);
    
    return Movie.findByIdAndUpdate(movieId, movieData);
  }
};

import { v4 as uuid } from "uuid";
// import movies from "../movies.js";
import Movies from "../models/movie.js";

export default {
    getAll(filter = {}) {
        let result = Movies.find({}); 

        // if (filter.search) {
        //     result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        // }

        // if (filter.genre) {
        //     result = result.filter(movie => movie.genre.toLowerCase().includes(filter.genre.toLowerCase()));
        // }

        // if (filter.year) {
        //     result = result.filter(movie => movie.year === filter.year);
        // }
        
        return result;
    },
  getOne(movieId) {
    // TODO if movie is missing?

    const result = Movies.findById(movieId);
    return result;
  },
  create(movieData) {
    const newId = uuid();
    movies.push({ 
        id: newId, 
        ...movieData,
        rating: Number(movieData.rating)
    });
    return newId;
  }
};

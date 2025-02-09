import { Schema, model, Types } from 'mongoose'

// Create schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Minimum length is 5 characters!'],
        maxLength: [250, 'Maximum length is 250 characters!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Title should be alphanumeric, digits and whitespaces!'],
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'Minimum length is 5 characters!'],
        maxLength: [250, 'Maximum length is 250 characters!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Genre should be alphanumeric, digits and whitespaces!'],
    },
    director: {
        type: String,
        minLength: [5, 'Minimum length is 5 characters!'],
        maxLength: [250, 'Maximum length is 250 characters!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Director should be alphanumeric, digits and whitespaces!'],
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025 ,
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        minLength: 20,
        match:  /^[a-zA-Z 0-9]+$/,
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast',
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});


// Create model
const Movie = model('Movie', movieSchema);

export default Movie;
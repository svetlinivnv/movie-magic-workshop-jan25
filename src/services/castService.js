import Cast from "../models/Cast.js";

export default {
    getAll(filter = {}) {
        let query = Cast.find({});

        if (filter.exclude) {
            // MongoDB variant:
            // query = query.find({_id: {$nin: filter.exclude}});
            // Mongoose variant:
            query = query.nin('_id', filter.exclude);
        }

        return query;
    },
    create(castData) {
        // TODO: Create cast
        return Cast.create(castData);
    }
}
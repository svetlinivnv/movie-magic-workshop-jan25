import Cast from "../models/Cast.js";

export default {
    getAll() {
        return Cast.find({});
    },
    create(castData) {
        // TODO: Create cast
        return Cast.create(castData);
    }
}
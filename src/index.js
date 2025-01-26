import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import 'dotenv/config';

import routes from "./routes.js";
import showRatingHelper from "./helpers/ratingHelper.js";

const app = express();

// db configuration
try {
  // const uri = 'mongodb://localhost:27017/magic-movies-jan2025';
  // await mongoose.connect(uri);
  await mongoose.connect(process.env.DATABASE_URI);

  console.log('DB connected successfully');
} catch (err) {
  console.log('Cannot connect to DB');
  console.log(err.message);
}

// handlebars configuration
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: { 
        showRating: showRatingHelper 
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");


// express configuration
app.use("/static", express.static("src/public"));
app.use(express.urlencoded({ extended: false }));

// setup routes
app.use(routes);


// start server
app.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000...");
});

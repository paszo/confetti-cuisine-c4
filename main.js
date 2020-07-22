const express = require('express');
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const subscribersController = require('./controllers/subscribersController');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbstring = process.env.CONFETTIDB;
mongoose.connect(dbstring, {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded( {extended: false}));
app.use(express.json());
app.use(layouts);

app.get("/", homeController.showHome);
app.get("/courses", homeController.showCourses);
app.get("/contact", subscribersController.getSubscriptionPage);
// app.post("/contact", homeController.postedSignUpForm);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server is running at port ${app.get("port")} ...`);
});
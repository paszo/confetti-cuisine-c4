const express = require('express');
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const subscribersController = require('./controllers/subscribersController');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const router = express.Router();
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

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
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
app.use("/", router);

app.get("/", homeController.showHome);
app.get("/courses", homeController.showCourses);
// app.get("/contact", subscribersController.getSubscriptionPage);
// app.post("/contact", homeController.postedSignUpForm);


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server is running at port ${app.get("port")} ...`);
});
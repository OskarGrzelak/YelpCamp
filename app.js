const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Schema setup

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// compiling schema into the model
const Campground = mongoose.model('Campground', campgroundSchema);

/* Campground.create(
    {
        name: 'Granite Hill',
        image: 'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=1051&q=80',
        description: 'This is a huge granite hill, no bathrooms. No water. Just beautiful granite!'
    }, (error, campground) => {
    if (error) {
        console.log(error);
    } else {
        // redirect back to campgrounds page
        console.log(campground);
    }
}); */

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (error, allCampgrounds) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    // get data from the form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    // create a new campground and save to DB
    Campground.create({name: name, image: image, description: description}, (error, campground) => {
        if (error) {
            console.log(error);
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id, (error, foundCampground) => {
        if (error) {
            console.log(error);
        } else {
            // render show template with that campground
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log('YelpCamp has strarted');
});
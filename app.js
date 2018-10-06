const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const campgrounds = [
    {name: 'Salmon Creek', image: 'https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Granite Hill', image: 'https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Mountain Goat\'s Rest', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Salmon Creek', image: 'https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Granite Hill', image: 'https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Mountain Goat\'s Rest', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Salmon Creek', image: 'https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Granite Hill', image: 'https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'},
    {name: 'Mountain Goat\'s Rest', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b5bf_340.jpg'}
];

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
    // get data from the form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    campgrounds.push({name: name, image: image});
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
});

app.listen(3000, () => {
    console.log('YelpCamp has strarted');
});
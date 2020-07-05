const path = require('path');
const express = require('express');
const chalk = require('chalk'); 
const hbs = require('hbs');
const geocode = require('./utils2/geocode');
const forecast = require('./utils2/forecast')
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel Santos'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel Santos'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Daniel Santos',
        message: 'This is a help page created with handlebars'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Error! You must provide a valid address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
    forecast(latitude, longitude, (error, forecastData)=>{
        if(error){
            return res.send({
                message: 'Error!!!'
            })
        }
        res.send({
            search: req.query.address,
            location,
            forecast: forecastData,
        })
    })
    });
    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Daniel Santos',
        message: 'Help Article not found',
        title: '404'
    })
});

app.get('*', (req, res) => {
    res.render('404',{
        name: 'Daniel Santos', 
        message: 'Page not found',
        title: '404'
    })
});

app.listen(3000, () => {console.log(chalk.green('Server running on port 3000.'))});
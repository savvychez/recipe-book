const express = require('express');
const router = express.Router();

const fs = require('fs');
const multer = require('multer');
const axios = require('axios')
const upload = multer({ dest: 'uploads/' })
const FormData = require('form-data');
require('dotenv').config()


const Article = require('../models/article')

//ARTICLES
//Gets all articles
router.get('/articles', (req, res, next) => {
    Article.find({}, 'title date')
        .then(data => res.json(data))
        .catch(next)
})

//Gets article by ID
router.get('/articles/:id', (req, res, next) => {
    Article.find({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
})

//Adds article
router.post('/articles', (req, res, next) => {
    if (req.body.title && req.body.content) {
        Article.create(req.body)
            .then(data => res.json(data))
            .catch(next)
    } else {
        res.json({
            error: "One or more fields are emptys"
        })
    }
})

//Deletes article by ID
router.delete('/articles/:id', (req, res, next) => {
    Article.findByIdAndDelete(req.params.id)
        .then(data => res.json())
        .catch(next)
})


//IMAGES
//Converts image to URL using imgBB API
router.post('/images/', upload.single('image'), (req, res, next) => {
    const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API}`;
    var formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path))
    const formHeaders = formData.getHeaders();
    axios.post(url, formData, {
        headers: {
            ...formHeaders,
        },
    })
        .then(response => {
            res.json(response.data.data)
        })
        .catch(error => {
            res.json("Error: Internal Server Error")
        })
})

module.exports = router
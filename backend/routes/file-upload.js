'use strict';
let SingleFile = require('../models/singleFile.model');

const express = require('express');
const {upload} = require('../src/components/upload-file.component');
const {singleFileUpload} = require('../model/singlefile.model');
const router = express.Router();


router.post('/singleFile', upload.single('file'), singleFileUpload);
// router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
// router.get('/getMultipleFiles', getallMultipleFiles);


module.exports = {
    routes: router
}

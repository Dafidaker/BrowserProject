var express = require('express');
var router = express.Router();
var rModel = require("../models/roomsModel");
            
router.get('/', async function(req, res, next) {
    let result = await rModel.getAllRooms();
    res.status(result.status).send(result.result);
});
            
module.exports = router;
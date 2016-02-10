/**
 * Created by IlyaLitvinov on 01.12.15.
 */
/**
 * Created by IlyaLitvinov on 01.12.15.
 */
var express = require('express'),
    commentsModel = require('../models/comments.js'),
    router = express.Router();



router.get('/', function (req, res) {
    setTimeout(function () {
        res.status(200).send(commentsModel.getItems());
    }, 1000);
});

router.post('/', function (req, res) {
    var response;

    if (req.body) {
        response = commentsModel.setItem(req.body);
        res.status(200).send(response);
    } else {
        res.status(500).send('Bad request, please specify comment field').end();
    }
});

router.put('/:id', function (req, res) {
    console.log(req.body);
    if (req.params.id && req.body) {
        res.status(200).send(commentsModel.updateItem(req.body, req.params.id));
    } else if (!req.params.id) {
        res.status(404).send('Not found').end()
    }
    else {
        res.status(500).send('Bad request').end()
    }
});

router.delete('/:id', function (req, res) {
    if (req.params.id) {
        var responseData = commentsModel.deleteItem(req.params.id);
        if(responseData) {
            res.status(200).send(responseData);
        } else {
            res.status(404).send('Not found');
        }
    }
});

module.exports = router;

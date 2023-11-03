// Create web server for comments
//
// Written by: Corey Fournier
// Date:       2015-02-22
//

var express = require('express');
var router = express.Router();

var comments = [];
var nextId = 0;

// GET comments
router.get('/', function(req, res) {
    res.json(comments);
});

// POST comments
router.post('/', function(req, res) {
    var comment = req.body;
    comment.id = nextId++;
    comments.push(comment);
    res.json(comment);
});

// PUT comments
router.put('/:id', function(req, res) {
    var id = req.params.id;
    var comment = req.body;

    if (comment.id != id) {
        res.status(400).json({error: 'Id does not match'});
        return;
    }

    var index = comments.findIndex(function(element, index, array) {
        return element.id == id;
    });

    if (index == -1) {
        res.status(404).json({error: 'Comment not found'});
        return;
    }

    comments[index] = comment;
    res.json(comment);
});

// DELETE comments
router.delete('/:id', function(req, res) {
    var id = req.params.id;

    var index = comments.findIndex(function(element, index, array) {
        return element.id == id;
    });

    if (index == -1) {
        res.status(404).json({error: 'Comment not found'});
        return;
    }

    comments.splice(index, 1);
    res.json({success: 'Comment deleted'});
});

module.exports = router;
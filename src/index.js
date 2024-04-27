"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.route('/users/:userId')
    .get(function (req, res) {
    res.send('Got user');
})
    .put(function (req, res) {
    res.send('Updated user');
})
    .delete(function (req, res) {
    res.send('Deleted user');
});
app.post('/users', function (req, res) {
    res.send('User created');
});

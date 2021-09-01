const express = require('express');
const usersBL = require('../models/usersBL');
const appRouter = express.Router();

appRouter.route('/').get(async(req,resp)=>{
    var users = await usersBL.getAllUsers();
    return resp.json(users);
})

appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var user = await usersBL.getUser(id);
    return resp.json(user);
})

appRouter.route('/').post(async(req,resp)=>{
    var newUser = req.body;
    var user = await usersBL.addUser(newUser);
    return resp.json(user);
})

module.exports = appRouter;
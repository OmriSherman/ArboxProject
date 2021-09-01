const { Router } = require('express');
const express = require('express');
const membershipsBL = require('../models/membershipsBL');
const appRouter = express.Router();

appRouter.route('/').get(async(req,resp)=>{
    var memberships = await membershipsBL.getAllMemberships();
    return resp.json(memberships);
})

appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id;
    var membership = await membershipsBL.getMembership(id);
    return resp.json(membership);
})

appRouter.route('/').post(async(req,resp)=>{
    var newMembership = req.body;
    var membership = await membershipsBL.addMembership(newMembership);
    return resp.json(membership);
})

module.exports = appRouter;
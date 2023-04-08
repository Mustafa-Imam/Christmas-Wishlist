let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let gifts = require('../models/gifts');

module.exports.displayGiftList = (req,res,next)=>{
    gifts.find((err, giftlist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('gifts/gifts',{
                title:'Gift List', 
                giftlist: giftlist,
                displayName: req.user ? req.user.displayName:''
            })
        }
    });
};

module.exports.displayAddPage = (req,res,next)=>{
    res.render('gifts/add',{
        title: 'Add Gift',
        displayName: req.user ? req.user.displayName:''
    })
};

module.exports.processAddPage = (req,res,next)=>{
    let newGift = gifts ({
        "name":req.body.name,
        "retailer":req.body.retailer,
        "price":req.body.price,
        "discount":req.body.discount
    });
    gifts.create(newGift,(err,gifts) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/gift-list');
        }
    });
};

module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;
    gifts.findById(id,(err,giftToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('gifts/edit',{title:'Edit item', 
            gifts:giftToEdit,
            displayName: req.user ? req.user.displayName:''});
        }
    });
};

module.exports.processEditPage = (req,res,next)=>{
    let id=req.params.id;
    let updateGift= gifts ({
        "_id":id,
        "name":req.body.name,
        "retailer":req.body.retailer,
        "price":req.body.price,
        "discount":req.body.discount
    });
    gifts.updateOne({_id:id},updateGift,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/gift-list');
        }
    });
};

module.exports.performDelete = (req,res,next)=>{
    let id=req.params.id;
    gifts.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/gift-list');
        }
    });
};
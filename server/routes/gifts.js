let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



let gifts = require('../models/gifts');
let giftsController = require('../controller/gifts');

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

router.get('/',giftsController.displayGiftList);

/*Create*/
router.get('/add',requireAuth, giftsController.displayAddPage);
router.post('/add',requireAuth, giftsController.processAddPage);

/*Edit*/
router.get('/edit/:id',requireAuth, giftsController.displayEditPage);
router.post('/edit/:id',requireAuth, giftsController.processEditPage);

/*Delete*/
router.get('/delete/:id',requireAuth, giftsController.performDelete);

module.exports=router;
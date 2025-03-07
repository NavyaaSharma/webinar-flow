let router      = require('express').Router({mergeParams: true}),
    middleware  = require('../middleware')


const Webinar = require('../models/webinarListModel');

// list of past and upcoming webinars
router.get('/', middleware.checkToken, (req,res) => {
    Webinar.find({})
            .then((allWebinars) => {
                res.json({'success' : true, 'webinars': allWebinars});
            })
            .catch((err) => {
                console.log('cant get the data. error = ',err)
                res.json({'success' : false});
            });
})
// "tutor": "pseudorandom guy",

// add new webinar
router.post('/newWebinar', middleware.checkToken, (req,res) => {   
      
    new Webinar(req.body)
            .save()
            .then((webinar) =>{
                console.log(webinar);
                res.json({'save' : true, id: webinar._id});
            })
            .catch((err) => {
                console.log(err)
                res.json({'save' : false})
            })   
})

router.get('/:objId/edit', middleware.checkToken, (req,res) => {
    Webinar.findOne({_id: req.params.objId})
            .then((webinar) => {
                res.json({'found': true, 'data': webinar});
            })
            .catch((err) => {
                console.log('error=', err, 'while finding ',req.params.objId);
                res.json({'found': false});
            })
})

// received edited data of webinar and making changes to db
router.post('/:objId/edit', middleware.checkToken, (req,res) => {
  
    Webinar.findOneAndUpdate({_id: req.params.objId},{$set: req.body},{new: true})
            .then((webinar) => {
                console.log('updated webinar is : ', webinar);
                res.json({'edit' : true});
            })
            .catch((err) => {
                console.log('error while updating db: ',err);
                res.json({'edit' : false});
            })
})


// delete a webinar
router.get('/:objId/delete', middleware.checkToken, (req,res) => {
    Webinar.findOneAndDelete({_id: req.params.objId})
            .then((webinar) => {
                console.log('deleted webinar=', webinar);
                res.json({'delete' : true});
            })
            .catch((err) => {
                console.log('error while deleting: ', err);
                res.json({'delete' : false});
            })
})

module.exports = router;
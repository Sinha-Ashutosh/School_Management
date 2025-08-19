const express = require('express');
const { locationMiddleware } = require('../../middlewares/index');

const SchoolController = require('../../controllers/school-controllers');


const router = express.Router();

router.post('/addSchool', SchoolController.create);
router.delete('/deleteSchool/:id', SchoolController.destroy);
router.get('/getSchool/:id', SchoolController.get);
router.patch('/updateSchool', SchoolController.update);
router.get('/listSchools',locationMiddleware.Nearby, SchoolController.listSchools)


module.exports = router;
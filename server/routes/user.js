const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create, find, update, delete
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/adduser',userController.form);
router.post('/adduser',userController.create);
router.get('/edituser/:id',userController.edit);
router.post('/edituser/:id',userController.modify);
router.get('/viewuser/:id',userController.viewUser);
router.get('/:id',userController.delete);

module.exports = router;
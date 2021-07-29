const express = require('express')
const router = express.Router()

// Require controller modules.
const bike_category_ctrl = require('../controllers/bike_category_ctrl') 
const bike_ctrl = require('../controllers/bike_ctrl')
const components_category_ctrl = require('../controllers/components_category_ctrl')
const wheels_ctrl = require('../controllers/wheels_ctrl')
const suspension_ctrl = require('../controllers/suspension_ctrl')
const gear_ctrl = require('../controllers/gear_ctrl')

// GET catalog home page.
router.get('/', bike_category_ctrl.get_category_list)

                // BIKE ROUTES //

// Bike Index (road, mountain, etc)
router.get('/bikes', bike_category_ctrl.get_category_list)

// GET request for a bike list
router.get('/bikes/:catName', bike_ctrl.get_bike_list)

//GET request for creating bike.
router.get('/bike/create', bike_ctrl.get_create_bike)

//POST request for creating bike.
router.post('/bike/create', bike_ctrl.post_create_bike)

// GET request to delete bike.
router.get('/bike/:id/delete', bike_ctrl.get_delete_bike)

// POST request to delete bike.
router.post('/bike/:id/delete', bike_ctrl.post_delete_bike)

// GET request to update bike.
router.get('/bike/:id/update', bike_ctrl.get_update_bike)

// POST request to update bike.
router.post('/bike/:id/update', bike_ctrl.post_update_bike)

// GET bike
router.get('/bikes/:catName/:id/', bike_ctrl.get_bike)
router.get('/bike/:id/', bike_ctrl.get_bike)

            // COMPONENTS ROUTES //

// Components Index (suspension)
router.get('/components', components_category_ctrl.get_list)

// WHEELS \\

// READ
//GET 
router.get('/components/wheels', wheels_ctrl.get_list)
//GET
router.get('/components/wheels/:d', wheels_ctrl.get_item)

// CREATE
// GET 
router.get('/components/wheel/create', wheels_ctrl.get_create)
// POST 
router.post('/components/wheel/create', wheels_ctrl.post_create)

// DELETE
// GET
router.get('/components/wheel/:id/delete', wheels_ctrl.get_delete)
// POST
router.post('/components/wheel/:id/delete', wheels_ctrl.post_delete)

// UPDATE
// GET
router.get('/components/wheel/:id/update', wheels_ctrl.get_update)
// POST
router.post('/components/wheel/:id/update', wheels_ctrl.post_update)

// SUSPENSION \\

// READ
// GET
router.get('/components/suspensions', suspension_ctrl.get_list)
router.get('/components/suspension/:id', suspension_ctrl.get_item)

// CREATE
// GET
router.get('/components/suspension/create', suspension_ctrl.get_create)
// POST
router.post('/components/suspension/create', suspension_ctrl.post_create)

// DELETE
// GET
router.get('/components/suspension/:id/delete', suspension_ctrl.get_delete)
// POST
router.post('/components/suspension/:id/delete', suspension_ctrl.post_delete)

// UPDATE
// GET
router.get('/components/suspension/:id/update', suspension_ctrl.get_update)
//POST
router.post('/components/suspension/:id/update', suspension_ctrl.post_update)

// GEAR \\

// READ
// GET
router.get('/components/gears', gear_ctrl.get_list)
router.get('/components/gear/:id', gear_ctrl.get_item)

// CREATE
// GET
router.get('/components/gear/create', gear_ctrl.get_create)
// POST
router.post('/components/gear/create', gear_ctrl.post_create)

// DELETE
// GET
router.get('/components/gear/:id/delete', gear_ctrl.get_delete)
// POST
router.post('/components/gear/:id/delete', gear_ctrl.post_delete)

// UPDATE
// GET
router.get('./components/gear/:id/update', gear_ctrl.get_update)
//POST
router.post('./components/gear/:id/update', gear_ctrl.post_update)
module.exports = router
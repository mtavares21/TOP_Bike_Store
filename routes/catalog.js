const express = require('express')
const router = express.Router()

// Require controller modules.
const category_ctrl = require('../controllers/category_ctrl')
const bike_category_ctrl = require('../controllers/bike_category_ctrl') 
const bike_ctrl = require('../controllers/bike_ctrl')
const components_category_ctrl = require('../controllers/components_category_ctrl')
const wheels_ctrl = require('../controllers/wheels_ctrl')
const suspension_ctrl = require('../controllers/suspension_ctrl')
const gear_ctrl = require('../controllers/gear_ctrl')
const ADMIN = process.env.ADMIN_PASS

// GET catalog home page.
router.get('/', category_ctrl.get_list)

                // BIKE ROUTES //

// Bike Index (road, mountain, etc)
router.get('/bikes', bike_category_ctrl.get_list)

// GET request for a bike list
router.get('/bikes/:catName', bike_ctrl.get_list)

//GET request for creating bike.
router.get('/bike/create', bike_ctrl.get_create)

//POST request for creating bike.
router.post('/bike/create', bike_ctrl.post_create)

// GET request to delete bike.
router.get('/bikes/:catName/:id/delete', bike_ctrl.get_delete)

// POST request to delete bike.
router.post('/bikes/:catName/:id/delete', bike_ctrl.post_delete)

// GET request to update bike.
router.get('/bikes/:catName/:id/update', bike_ctrl.get_update)

// POST request to update bike.
router.post('/bikes/:catName/:id/update', bike_ctrl.post_update)

// GET bike
router.get('/bikes/:catName/:id/', bike_ctrl.get_item)
router.get('/bike/:id/', bike_ctrl.get_item)

            // COMPONENTS ROUTES //

// Components Index 
router.get('/components', components_category_ctrl.get_list)

// WHEELS \\

// CREATE
// GET 
router.get('/components/wheel/create', wheels_ctrl.get_create)
// POST 
router.post('/components/wheel/create', wheels_ctrl.post_create)

// DELETE
// GET
router.get('/components/wheels/:id/delete', wheels_ctrl.get_delete)
// POST
router.post('/components/wheels/:id/delete', wheels_ctrl.post_delete)

// UPDATE
// GET
router.get('/components/wheels/:id/update', wheels_ctrl.get_update)
// POST
router.post('/components/wheels/:id/update', wheels_ctrl.post_update)

// READ
//GET 
router.get('/components/wheels', wheels_ctrl.get_list)
//GET
router.get('/components/wheels/:d', wheels_ctrl.get_item)


// SUSPENSION \\

// CREATE
// GET
router.get('/components/suspension/create', suspension_ctrl.get_create)
// POST
router.post('/components/suspension/create', suspension_ctrl.post_create)

// DELETE
// GET
router.get('/components/suspensions/:id/delete', suspension_ctrl.get_delete)
// POST
router.post('/components/suspensions/:id/delete', suspension_ctrl.post_delete)

// UPDATE
// GET
router.get('/components/suspensions/:id/update', suspension_ctrl.get_update)
//POST
router.post('/components/suspensions/:id/update', suspension_ctrl.post_update)

// READ
// GET
router.get('/components/suspensions', suspension_ctrl.get_list)
router.get('/components/suspension/:id', suspension_ctrl.get_item)

// GEAR \\

// CREATE
// GET
router.get('/components/gear/create', gear_ctrl.get_create)
// POST
router.post('/components/gear/create', gear_ctrl.post_create)

// DELETE
// GET
router.get('/components/gears/:id/delete', gear_ctrl.get_delete)
// POST
router.post('/components/gears/:id/delete', gear_ctrl.post_delete)

// UPDATE
// GET
router.get('/components/gears/:id/update', gear_ctrl.get_update)
//POST
router.post('/components/gears/:id/update', gear_ctrl.post_update)

// READ
// GET
router.get('/components/gears', gear_ctrl.get_list)
router.get('/components/gear/:id', gear_ctrl.get_item)

module.exports = router
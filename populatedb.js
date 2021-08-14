#! /usr/bin/env node
console.log('This script populates database');
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')

const Bike = require('./models/bike')
const BikeCategory = require('./models/bike_category')
const Category = require('./models/category')
const CompCat = require('./models/components_categories')
const Suspension = require('./models/suspension')
const Wheel = require('./models/wheels')
const Gear = require('./models/gear')

const mongoose = require('mongoose');
const mongoDB = process.env.MONGOURL_DEV
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const bikes = []
const bikeCategories = []
const categories = []
const compCats = []
const suspensions = []
const wheels = []
const gears = []

function bikeCreate( brand, model, wheels, suspension_front, suspension_rear, gear, bike_category, category, price) {

  const bikeDetail = Object.assign(
    {},
    { brand, model, wheels, suspension_front, suspension_rear, gear, bike_category, category, price })

  const bike = new Bike(bikeDetail);

  bike.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("New Bike: " + bike);
    bikes.push(bike);
  });
}

function bikeCategoryCreate(name, cb) {
  const bikeCat = new BikeCategory({ name });

  bikeCat.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Bike Category: ' + bikeCat);
    bikeCategories.push(bikeCat)
    cb(null, bikeCat);
  }   );
}

function categoryCreate(name, cb) {
  const catDetail = { name }

  const cat = new Category(catDetail);
  cat.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Category: ' + cat);
      cb(err, null)
      return
    }
    console.log('New Category: ' + cat);
    categories.push(cat)
    cb(null, cat)
  }  );
}

function createCompCat (name,cb){
  const compCatDetail = { name }

  const compCat = new CompCat(compCatDetail)
  compCat.save( function (err) {
  if(err){
    console.log('ERROR CREATING COMP CAT')
    cb(err, null)
  }
  compCats.push(compCat)
  cb(null, compCat)
  })
}

function createWheels(brand, model, size, width, category, compCat, price,cb){
  const wheelDetail = Object.assign({},{brand, model, size, width, category, compCat, price})

  const wheel = new Wheel(wheelDetail);
  wheel.save(function (err) {
    if (err) {
      console.log('ERROR CREATING wheels: ' + wheel);
      cb(err, null)
      return
    }
    console.log('New wheels: ' + wheel);
    wheels.push(wheel)
    cb(null, wheel)
  }  );
}

function createSuspension(brand, model, position, travel, category,compCat, price,cb){
  const suspensionDetail = Object.assign({},{brand, model, position, travel, category, compCat, price})

  const suspension = new Suspension(suspensionDetail);
  suspension.save(function (err) {
    if (err) {
      console.log('ERROR CREATING suspension: ' + suspension);
      cb(err, null)
      return
    }
    console.log('New suspension: ' + suspension);
    suspensions.push(suspension)
    cb(null, suspension)
  }  );
}

function createGear(brand, model, speeds, category, compCat, price,cb){
  const gearDetail = Object.assign({},{brand, model, speeds, category, compCat, price,cb})

  const gear = new Gear(gearDetail);
  gear.save(function (err) {
    if (err) {
      console.log('ERROR CREATING gear: ' + gear);
      cb(err, null)
      return
    }
    console.log('New gear: ' + gear);
    gears.push(gear)
    cb(null, gear)
  }  );
}

function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('components', callback);
        },
        function(callback) {
          categoryCreate('bikes', callback);
        },
        function(callback) {
          bikeCategoryCreate('road', callback)
        },
        function(callback) {
          bikeCategoryCreate('mountain', callback)
        },
        function(callback) {
          createCompCat('wheels', callback)
        },
        function(callback) {
          createCompCat('suspension', callback)
        },
         function(callback) {
          createCompCat('gear', callback)
        }
        ],
        // optional callback
        cb);
}


function createComponents(cb) {
    async.series([
      // Create wheels
        function(callback) {
          createWheels('Shimano', 'EnduroX', '26', '300', categories[0], compCats[0], '200',callback)
        },
          function(callback) {
          createWheels('Rym', 'TrailDown', '29', '320', categories[0], compCats[0], '100',callback)
        },
          function(callback) {
          createWheels('Shimano', 'DownRoad', '29', '320', categories[0], compCats[0], '200',callback)
        },
      // Create suspensions
        function(callback) {
          createSuspension('Marzocchi', 'Bomber Z1', 'front', '180', categories[0], compCats[1], '929.22',callback)
        },
        function(callback) {
          createSuspension('Fox', 'Race xs', 'front', '100', categories[0], compCats[1], '629.22',callback)
        },
         function(callback) {
          createSuspension('Fox', 'Race rear xs', 'rear', '50', categories[0], compCats[1], '329.22',callback)
        },
      // Create gears
        function(callback) {
          createGear('Shimano', 'Deore', '14', categories[0], compCats[2], '120',callback)
        },
        function(callback) {
          createGear('Shimano', 'XT', '18', categories[0], compCats[1], '230',callback)
        },
        function(callback) {
          createGear('SRAM', 'DW3', '14', categories[0], compCats[0], '220',callback)
        }
        ],
        // optional callback
        cb);
}


function createBikes(cb) {
    async.parallel([
        function(callback) {
          bikeCreate( 'Specialized', 'P2',wheels[0], suspensions[0],null, gears[2], bikeCategories[1], categories[1], '1800',cb)
        },
          function(callback) {
          bikeCreate( 'Specialized', 'Roadster',wheels[2], null, null, gears[0], bikeCategories[0], categories[1],'950' ,cb)
        },
        function(callback) {
          bikeCreate( 'Merida', 'Gonzalez',wheels[2], null, null, gears[0], bikeCategories[0], categories[1],'950' ,cb)
        },
        function(callback) {
          bikeCreate( 'Trek', 'Wind',wheels[2], null, null, gears[1], bikeCategories[0], categories[1],'1550' ,cb)
        },
          function(callback) {
          bikeCreate( 'Trek', '5000',wheels[1], suspensions[0], null, gears[0], bikeCategories[1], categories[1], '1500',cb)
        },
          function(callback) {
          bikeCreate( 'Kona', 'Stinky',wheels[1], suspensions[0], suspensions[2], gears[2], bikeCategories[1], categories[1], '3456',cb)
        },
        function(callback) {
          bikeCreate( 'Mondraker', 'Stinky',wheels[1], suspensions[1], suspensions[2], gears[2], bikeCategories[1], categories[1], '3456',cb)
        },
        function(callback) {
          bikeCreate( 'BH', 'Alpine',wheels[1], suspensions[1], gears[2], bikeCategories[1], categories[1], '3456',cb)
        }
        ],
   
        // Optional callback
        cb);
}

async.series([
    createCategories,
    createComponents,
    createBikes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BIKES: '+bikes);
       

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
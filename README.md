## Bike Store Inventory

### Objective

Build and inventory app with NodeJs's Express framework and Bootstrap for styling

### Description

The first steps into this project consisted in choosing de 'theme' for the inventory and build a database model.
The ideia for the Bike Store came mostly from the fact that I like mountain biking and almost everyone is familiarized
with the main bike parts: suspensions, wheels, gears, etc.

Being an academic project, with the objective of giving the first steps into backend with Javascript, the scope of the
models should give enough challenges to really make the workings of this kind of app sink in without making the project
too long.

It was fairly easy and tempting to add more models to the database, to be as close to what a real app, used in a real store,
should be like. 
In the end I just wanted to be able to try out all the CRUDE operations with models that share some sort of connection so I,
simplify the models so that a bike is only created with already existing components ( suspension, wheels, etc) and the components
can only be deleted if there's no bike using it.
Also, only someone with access to the admin password can delete a bike.
Of course this is not an effective way of modeling a real life project, mainly the part were the user has to create all the
bike components before creating the bike, but is enough to gain a good understanding of the logic of it and get used to the tools:

- Express;
- Pug for the views templates;
- Mongoose (to work with MongoDB);
- Async Library ( to deal with asynchronous operations, for the database operations ).

Having the Model done, was a matter of setting all the routes with correspondent Controllers and setting the Views templates with
Pug.

I also used Bootstrap for the first time with this project witch allowed me to focus on the main concepts that I needed to learn
but still have an acceptable styling.

### Live Preview

https://morning-brushlands-79297.herokuapp.com/catalog
// database migrations
// https://github.com/TelescopeJS/Telescope/blob/master/server/migrations.js
// http://stackoverflow.com/questions/10365496/meteor-how-to-perform-database-migrations
Migrations = new Meteor.Collection('migrations');

Meteor.startup(function () {
  allMigrations = Object.keys(migrationsList);
  _.each(allMigrations, function(migrationName){
    runMigration(migrationName);
  });
});

Meteor.methods({
  removeMigration: function (name) {
    if (isAdmin(Meteor.user())) {
      console.log('// removing migration: '+name)
      Migrations.remove({name: name});
    }
  }
});

// wrapper function for all migrations
var runMigration = function (migrationName) {
  var migration = Migrations.findOne({name: migrationName});

  if (migration){
    if(typeof migration.finishedAt === 'undefined'){
      // if migration exists but hasn't finished, remove it and start fresh
      console.log('!!! Found incomplete migration "'+migrationName+'", removing and running again.');
      Migrations.remove({name: migrationName});
    }else{
      // do nothing
      // console.log('Migration "'+migrationName+'" already exists, doing nothing.')
      return
    }
  }

  console.log("//----------------------------------------------------------------------//");
  console.log("//------------//    Starting "+migrationName+" Migration    //-----------//");
  console.log("//----------------------------------------------------------------------//");
  Migrations.insert({name: migrationName, startedAt: new Date(), completed: false});

  // execute migration function
  var itemsAffected = migrationsList[migrationName]() || 0;

  Migrations.update({name: migrationName}, {$set: {finishedAt: new Date(), completed: true, itemsAffected: itemsAffected}});
  console.log("//----------------------------------------------------------------------//");
  console.log("//------------//     Ending "+migrationName+" Migration     //-----------//");
  console.log("//----------------------------------------------------------------------//");
};

var migrationsList = {
  
};
var User = require('../models/user');
var mongoose = require('mongoose');



module.exports = async function () {

  console.log('\nUser-Seed called for execute\n');


  if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI);

    // User.remove({}, function () {
    //   console.log('Database Cleared');
    // });

    User.create({
      userName: 'admin',
      email: 'admin@megtraders.com',
      mobileNumber: 9865326598,
      password: 'Testing@123',
      userStatus: 'active',
      userRole: 'ROLE1FF-5961-4F2F-8270-D6MEGTRADERS'
    }, function (err, user) {
      if (err) {
        console.log("\n\n\n\n Seed Failed", err)
      } else {
        console.log("\n\n\n\n Seed Success", user)
      }
    })
  }
};

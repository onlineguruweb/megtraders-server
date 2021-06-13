const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   // _id: {
   //    type: String,
   //    unique: true,
   //    default: 'FA6281FF-5961-4F2F-8270-D6AB9954410D'
   // },
   userName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   mobileNumber: {
      type: Number,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   userStatus: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active'
   },
   userRole: {
      type: String,
      default: 'ROLE1FF-5961-4F2F-8270-D6MEGTRADERS'
   }
});

// Save password in encrypted format and Update date
userSchema.pre('save', function (next) {
   var user = this;
   user.updatedAt = new Date;

   if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
         if (err) {
            return next(err);
         }
         bcrypt.hash(user.password ? user.password : '', salt, function (err, hash) {
            if (err) {
               return next(err);
            }
            user.password = hash;
            next();
         });
      });
   } else {
      return next();
   }
});


// Create method to compare password input to password saved in database
userSchema.methods.comparePassword = function (pw, cb) {
   bcrypt.compare(pw, this.password, function (err, isMatch) {
      if (err) {
         return cb(err);
      }
      cb(null, isMatch);
   });
};

module.exports = mongoose.model("user", userSchema, "users");
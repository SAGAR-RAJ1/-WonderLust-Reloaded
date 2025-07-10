const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require:true,

  }
});

//Password salting hashing passport khud implement kr deta hai usk liye ye plugin k use kiye hai
//OR isliye v upar bs email define kiye h password nhi baki agar mn  kre toh name ya kuch or field v daal skhte usko v hash salt kr dega

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
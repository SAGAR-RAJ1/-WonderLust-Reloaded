const Listing = require("../models/listing");

module.exports.index = async function (req, res) {
  let allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};
module.exports.New = async function (req, res) {
  res.render("./listings/new.ejs");
};
module.exports.Show = async function (req, res) {
  let { id } = req.params; //populate add kiye kuki  object k id k sath sath uska data v is m aaye  islye add kiye
  // const listing = await Listing.findById(id).populate("reviews").populate("owner");
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  res.render("./listings/show.ejs", { listing });
};
module.exports.Create = async function (req, res) {

  let { title, description,  price, location, country } = req.body;
  console.log("Received body:", req.body);
  let url = req.file.path;
  let filename = req.file.filename;


  if (!title || !description || !price || !location || !country) {
    throw new ExpressError("All fields are required", 400);
  }
  if (isNaN(price)) {
    throw new ExpressError("Price must be a number", 400);
  }

  // console.log("Price after conversion:", price);
  const newListing = new Listing({
    title: title,
    description: description, //Dono method shi h naam same h toh direct v likh skhte ho
    price,
    location,
    country,
  });
  newListing.image={url,filename}
  newListing.owner = req.user._id; //Username alag se dalna pdega

  await newListing.save();
  //todo using flash
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
  // res.send("Listing saved successfully!");
};

module.exports.Edit = async function (req, res) {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  let originalImageUrl = listing.image.url;
  originalImageUrl= originalImageUrl.replace('/upload','/upload/w_300') //decreasing the pixel sixe by using api of cloudinary

  res.render("listings/edit.ejs", { listing ,originalImageUrl });
};

module.exports.Update = async function (req, res) {
  let { id } = req.params;
  let { title, description, price, location, country } = req.body;

  // Listing.findByIdAndUpdate()
  let newlisting = await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true }
  );

  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename =req.file.filename;
  newlisting.image = {url,filename};
  
  await newlisting.save();
  }

  res.redirect(`/listings/${id}`);
};
module.exports.Delete = async function (req, res) {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  // res.redirect(`/listing/{$id}`);  mistake i have made in the syntax
  res.redirect("/listings");
};

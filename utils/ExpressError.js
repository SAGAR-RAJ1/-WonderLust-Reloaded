//todo ye wrapasync k baad bna rhe hai
//todo ye custom message shor krne k liye hai constructor m jo msg ayeaga wo show ho jayega
class ExpressError extends Error {
  constructor( status,message) {
    super();
   
    this.status = status;
    this.message = message;
  }
}
module.exports = ExpressError;

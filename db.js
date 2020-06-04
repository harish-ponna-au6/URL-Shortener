var mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://HarishPonna:123456Nani@cluster0-kuahz.mongodb.net/shorten-your-url?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(function () {
    console.log("Database connected successfully");
  })
  .catch(function (err) {
    console.log(err.message);
  });

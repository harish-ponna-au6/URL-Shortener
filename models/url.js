var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var urlSchema = new Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    urlCode: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

var URL = mongoose.model("url", urlSchema);

module.exports = URL;

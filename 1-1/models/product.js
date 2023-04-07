const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    shipping: {
      weight: {type:Number},
      dimensions: {
        width: {type:Number},
        height: {type:Number},
        depth: {type:Number}
      }
    },
    pricing: {
      list: {type:Number},
      retail: {type:Number},
      savings: {type:Number},
      pct_savings: {type:Number}
    },
    details: {
      title: {
        type: String,
        unique: true
      },
      artist: {type: String},
      genre: {type: [String]},
      tracks: {type: [String]},
      director: {type: [String]},
      writer: {type: [String]},
      aspect_ratio: {type: String}
    }

})

module.exports = mongoose.model("product", productSchema)
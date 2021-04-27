const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    imagesPath: {
        type: String,
    }
})

module.exports = FoodCategory = mongoose.model('FoodCategory', foodCategorySchema)


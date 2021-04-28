const express = require('express');
const fileUpload = require('express-fileupload');
const FoodCategory = require('./models/FoodCategory');
const mongoose = require('mongoose');
const app = express();

app.use(fileUpload());


// Database
mongoose.connect('mongodb://127.0.0.1/Test',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected"))
  .catch(() => console.log("DidNR"))




// Upload Endpoint
app.post('/upload', (req, res) => {

  try {
    // Check if user unloaded file
    if (req.files === null) return res.status(400).send('No file uploaded');

    const file = req.files.file;
    const format = file.mimetype.split('/')
    const allowedFormats = ['webp', 'png', 'jpg', 'jpeg', 'tiff']

    if (!allowedFormats.includes(format[1])) return res.status(400).send('Image has to be (png, jpg, jpeg, tiff)');
    // Check the size of the image not ove then 1.5 MB
    if (file.size >= 1500000) return res.status(400).send('Image\'s size must be equal or smaller than 1.5 MB');


    file.mv(`${__dirname}/client/public/uploads/${file.name}`, async err => {

      if (err) return res.status(500).send(err);

      const foodCategory = new FoodCategory({
        imagesPath: `/uploads/${file.name}`,
        fileName: file.name
      });

      res.send(await foodCategory.save());
    });
  } catch (error) {
    res.send("Couldn't completed the upload process " + error.message);
  }

});

app.listen(5000, () => console.log('Server Started...'));

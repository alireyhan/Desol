const express = require('express');
const router = express.Router();
const multer = require('multer');
const Car = require('../models/Car');
const { validateCarSubmission } = require('../middleware/validation');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.array('pictures', 10), validateCarSubmission, async (req, res) => {
  const { carModel, price, phone, city, maxPictures } = req.body;

  try {
    if (!req.files || req.files.length === 0) {
      throw Error('No pictures uploaded');
    }

    const pictureFiles = req.files;
    const pictureUrls = pictureFiles.map(file => `url_to_storage/${file.originalname}`);

    const newCar = new Car({
      carModel,
      price,
      phone,
      city,
      maxPictures,
      pictures: pictureUrls,
    });

    const car = await newCar.save();
    res.json(car);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
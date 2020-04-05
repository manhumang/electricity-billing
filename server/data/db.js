/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import mongoose from 'mongoose';

const csv = require('csv-parser');
const fs = require('fs');

mongoose.Promise = global.Promise;

// Define Electric Billing Schema
const electricBillingSchema = new mongoose.Schema({
  date: String,
  hour: Number,
  ingestion: Number,
  price: Number,
  cost: Number,
});

const ElectricBilling = mongoose.model('electricBilling', electricBillingSchema);

ElectricBilling.deleteMany({}, (err) => {
  if (err) {
    return handleError(err);
  }
  // Read csv file and insert content in MongoDB
  fs.createReadStream('./data/csvFiles/consumo-2019-01.csv')
    .pipe(csv())
    .on('data', (data) => {
      const newElectricBilling = new ElectricBilling({
        date: data.date,
        hour: data.hour,
        ingestion: data.ingestion,
        price: data.price,
        cost: data.cost,
      });

      newElectricBilling.save((err, item) => {
        if (err) {
          console.log('Error');
        }
      });
    })
    .on('end', () => {
      console.log('Data inserted in database successfully');
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/electricBilling', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true });

export default ElectricBilling;

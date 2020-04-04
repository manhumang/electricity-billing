import mongoose from 'mongoose';
const csv = require('csv-parser');
const fs = require('fs');

mongoose.Promise = global.Promise;

// Definir el schema de clientes
const electricBillingSchema = new mongoose.Schema({
  date: String,
  hour: Number,
  ingestion: Number,
  price: Number,
  cost: Number
});

const ElectricBilling = mongoose.model('electricBilling', electricBillingSchema);

ElectricBilling.deleteMany({}, function (err) {
  if (err) {
    return handleError(err);
  }else{
  // Read csv file and insert content in MongoDB
  fs.createReadStream('./data/csvFiles/consumo-2019-01.csv')
    .pipe(csv())
    .on('data', (data) => {
      var newElectricBilling = new ElectricBilling({
        date: data['date'],
        hour:data['hour'],
        ingestion:data['ingestion'],
        price:data['price'],
        cost:data['cost'],
      });

      newElectricBilling.save(function(err, item) {
        if (err) {
        console.log("Error")
        }
      });
      })
    .on('end', () => {
      console.log("Data inserted in database successfully");
    });
  }
});

  mongoose.connect('mongodb://127.0.0.1:27017/electricBilling', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true });

export { ElectricBilling };
import { ElectricBilling } from './db';
import { rejects } from 'assert';

export const resolvers = {
  Query: {
    getElectricBillingElements: (root, {limit, offset}) => {
      return ElectricBilling.find({}).limit(limit).skip(offset);
    },
    getElectricBillingElement: (root, {id}) => {
      return new Promise((resolve, object) => {
        ElectricBilling.findById(id, (error, electricBillingElement) => {
          if (error) rejects(error)
          else resolve(electricBillingElement)
        });
      });
    },
    totalElectricBillingElements: (root) => {
      return new Promise((resolve, object) => {
        ElectricBilling.countDocuments({}, (error, count) => {
          if(error) rejects(error)
          else resolve(count)
        })
      });
    },
  },
  Mutation: {
    createElectricBillingElement: (root, { input }) => {
      const newElectricBillingElement = new ElectricBilling({
        date : input.date,
        hour : input.hour,
        ingestion : input.ingestion,
        price : input.price,
        cost : input.cost
      });
      newElectricBillingElement.id = newElectricBillingElement._id;

      return new Promise((resolve, object) => {
        newElectricBillingElement.save((error) => {
          if (error) rejects(error)
          else resolve(newElectricBillingElement)
        });
      });
    },
    updateElectricBillingElement: (root, { input }) => {
      return new Promise((resolve, object) => {
        ElectricBilling.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, electricBillingElement) => {
          if (error) rejects(error)
          else resolve(electricBillingElement)
        });
      });
    },
    removeElectricBillingElement: (root, { id }) => {
      return new Promise((resolve, object) => {
        ElectricBilling.findOneAndRemove({ _id: id }, (error) => {
          if (error) rejects(error)
          else resolve("The electric billing Element was removed correctly")
        });
      });
    }
  }
}
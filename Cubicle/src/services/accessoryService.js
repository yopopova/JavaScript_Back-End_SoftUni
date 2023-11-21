const Accessory = require('./../models/Accessory');

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAll = () => Accessory.find();

exports.getWithoutOwned = (accessoryIds) => {
    return Accessory.find({_id: {$nin: accessoryIds}});
}
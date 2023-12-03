const Creature = require('./../models/Creature');

exports.create = (createData) => Creature.create(createData);

exports.getAll = () => Creature.find();
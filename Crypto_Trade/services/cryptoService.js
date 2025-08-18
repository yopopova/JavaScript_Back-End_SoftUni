const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.search = async (name, paymentMethod) => {
    let crypto = await this.getAll();

    if (name) {
        crypto = crypto.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if (paymentMethod) {
        crypto = crypto.filter(x => x.paymentMethod == paymentMethod);
    }

    return crypto;
}

exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    // TODO: check if the user has already bought the crypto
    crypto.buyers.push(userId);
    return crypto.save();

    // Alternative to the upper code lines
    // Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } });
}

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);
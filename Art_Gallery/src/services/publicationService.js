const Publication = require('../models/Publication');

exports.create = (paintingData) => Publication.create(paintingData);

exports.getAll = () => Publication.find();

exports.getSinglePublication = (publicationId) => Publication.findById(publicationId);

exports.update = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData);

exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.getMyPublications = (authorId) => Publication.find({ author: authorId }); // Here we can use .populate('author')

exports.addSharesToPublication = async (publicationId, userId) => {
    const publication = await this.getSinglePublication(publicationId);

    const isExistingInSharings = publication.usersSharing.some((share) => share?.toString() === userId);

    if (isExistingInSharings) {
        return;
    }

    publication.usersSharing.push(userId);
    return publication.save();
}
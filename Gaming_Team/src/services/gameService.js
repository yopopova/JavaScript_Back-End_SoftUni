const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getSingleGame = (gameId) => Game.findById(gameId);

exports.update = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

// exports.getMyPublications = (authorId) => Game.find({ author: authorId }); // Here we can use .populate('author')

exports.addBoughtsToGame = async (gameId, userId) => {
    const game = await this.getSingleGame(gameId);

    const isExistingInBoughts = game.boughtBy.some((buy) => buy?.toString() === userId);

    if (isExistingInBoughts) {
        return;
    }

    game.boughtBy.push(userId);
    return game.save();
}

exports.search = async (name, platform) => {
    let allGames = await this.getAll();

    if (name) {
        allGames = allGames.filter(g => g.name.toLowerCase() == name);
    }

    if (platform) {
        allGames = allGames.filter(g => g.platform == platform);
    }

    return allGames;
}
const Cube = require('./../models/Cube');

const cubes = [
    {
        name: 'Cube1',
        description: 'n/a',
        imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_74983d16-c9f3-4e62-9051-2a6a9fff5660?wid=488&hei=488&fmt=pjpeg',
        difficultyLevel: '3'
    },
    {
        name: 'Cube2',
        description: 'bhgdukgs',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Scramble.svg/640px-Scramble.svg.png',
        difficultyLevel: '3'
      }
];

exports.create = async (cubeData) => {
    const cube = await Cube.create(cubeData);

    return cube;
}

exports.getAll = async (search, from, to) => {
    const filterCubes = await Cube.find().lean();

    if (search) {
        filterCubes = filterCubes.filter((cube) =>
            cube.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (from) {
        filterCubes = filterCubes.filter(
            (cube) => cube.difficultyLevel >= Number(from)
        );
    }

    if (to) {
        filterCubes = filterCubes.filter(
            (cube) => cube.difficultyLevel <= Number(to)
        );
    }

    return filterCubes;
}

exports.getSingleCube = (id) => Cube.findById(id);

exports.attachAccessory = async (cubeId, accessoryId) => {
    // return Cube.findByIdAndUpdate(cubeId, {
    //   $push: { accessories: accessoryId },
    // });

    const cube = await this.getSingleCube(cubeId);
    cube.accessories.push(accessoryId);

    return cube.save();
}
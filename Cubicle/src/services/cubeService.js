const uniqid = require('uniqid');

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

exports.create = (cubeData) => {

    const newCube = {
        id: uniqid(),
        ...cubeData
    }

    cubes.push(newCube);

    return newCube;
}

exports.getAll = (search, from, to) => {
    let filterCubes = [...cubes];

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

exports.getSingleCube = (id) => {
    return cubes.find((cube) => cube.id === id);
};
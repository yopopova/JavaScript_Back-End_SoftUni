const uniqid = require('uniqid');

const cubes = [
    {
        name: 'Cube1',
        description: 'n/a',
        imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_74983d16-c9f3-4e62-9051-2a6a9fff5660?wid=488&hei=488&fmt=pjpeg',
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

exports.getAll = () => {
    return [...cubes];
}
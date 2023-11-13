const activator = require('activator')
const populationControl = require('populationControl');

module.exports.loop = function () {

    let name;
    for(name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    populationControl.run('Base1');
    activator.run();

}
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {

    let newName;
    let name;
    for(name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    console.log('Harvesters: ' + harvesters.length + ' Builders: ' + builders.length + ' Upgraders: ' + upgraders.length);

    /*
    if(harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Base1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    */

    if(upgraders.length < 1) {
        newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Base1'].spawnCreep([WORK, CARRY, MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(builders.length < 2) {
        newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Base1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }


    if(Game.spawns['Base1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Base1'].spawning.name];
        Game.spawns['Base1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Base1'].pos.x + 1,
            Game.spawns['Base1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(name in Game.creeps) {
        const creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }
}
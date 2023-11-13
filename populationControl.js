const populationControl = {
    
    run: function (base) {

        let newName;
        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        console.log('Harvesters: ' + harvesters.length + ' Builders: ' + builders.length + ' Upgraders: ' + upgraders.length);

        if(harvesters.length < 1) {
            newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns[base].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }

        if(upgraders.length < 1) {
            newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns[base].spawnCreep([WORK, CARRY, MOVE], newName,
                {memory: {role: 'upgrader'}});
        }

        if(builders.length < 2) {
            newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns[base].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
        }

        if(Game.spawns[base].spawning) {
            const spawningCreep = Game.creeps[Game.spawns[base].spawning.name];
            Game.spawns[base].room.visual.text(
                spawningCreep.memory.role,
                Game.spawns[base].pos.x + 1,
                Game.spawns[base].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
}

module.exports = populationControl;
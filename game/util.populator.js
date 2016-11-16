var utilPopulator = {
    run: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        console.log('Harvesters: ' + harvesters.length + ', Builders: ' + builders.length + ', Upgraders: ' + upgraders.length);

        if(harvesters.length < 3 && Game.spawns['Spawn1'].room.energyAvailable >= 300) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        } else if(builders.length < 3 && Game.spawns['Spawn1'].room.energyAvailable >= 400) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        } else if(upgraders.length < 3 && Game.spawns['Spawn1'].room.energyAvailable >= 300) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
    }
}

module.exports = utilPopulator;

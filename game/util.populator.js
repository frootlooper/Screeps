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

        //TODO: calculated constants to determine population needed
        var totalPossibleEnergy = Game.spawns['Spawn1'].room.energyCapacity;
        var numConstructionSites = Game.constructionSites.length;
        var basicBodyParts = [MOVE,CARRY,WORK];
        var basicBodyPartsEnergyCost = 200;

        if(harvesters.length < 3 && Game.spawns['Spawn1'].room.energyAvailable == totalPossibleEnergy) {
          var harvesterBodyParts = basicBodyParts.slice();
          var harvesterBodyPartsEnergyCost = 200;
          while (harvesterBodyPartsEnergyCost < totalPossibleEnergy + BODYPART_COST["work"]) {
            harvesterBodyParts.push(WORK);
            harvesterBodyPartsEnergyCost = harvesterBodyPartsEnergyCost + BODYPART_COST["work"];
          }
          var newName = Game.spawns['Spawn1'].createCreep(bodyParts, undefined, {role: 'harvester'});
          console.log('Spawning new harvester: ' + newName);
        } else if(upgraders.length < 3 && Game.spawns['Spawn1'].room.energyAvailable == totalPossibleEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        } else if(builders.length < 10 && Game.spawns['Spawn1'].room.energyAvailable == totalPossibleEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
    }
}

module.exports = utilPopulator;

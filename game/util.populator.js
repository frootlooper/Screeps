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

        console.log('Harvesters: ' + harvesters.length + ', Upgraders: ' + upgraders.length + ', Builders: ' + builders.length);

        var totalRoomCapacity = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        var totalRoomAvailable = Game.spawns['Spawn1'].room.energyAvailable;
        var basicBodyParts = [MOVE,CARRY,WORK];
        console.log('Energy: '+totalRoomAvailable+'/'+totalRoomCapacity);

        if (harvesters.length < 3 && totalRoomAvailable == totalRoomCapacity) {
            var harvesterBodyParts = basicBodyParts.slice();
            var harvesterBodyPartsEnergyCost = BODYPART_COST["move"] + BODYPART_COST["carry"] + BODYPART_COST["work"];
            while (harvesterBodyPartsEnergyCost <= totalRoomAvailable + BODYPART_COST["work"]) {
                harvesterBodyParts.push(WORK);
                harvesterBodyPartsEnergyCost = harvesterBodyPartsEnergyCost + BODYPART_COST["work"];
            }
            var newName = Game.spawns['Spawn1'].createCreep(harvesterBodyParts, undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        } else if (upgraders.length < 3 && totalRoomAvailable == totalRoomCapacity) {
            var upgraderBodyParts = basicBodyParts.slice();
            var upgraderBodyPartsEnergyCost = BODYPART_COST["move"] + BODYPART_COST["carry"] + BODYPART_COST["work"];
            while (upgraderBodyPartsEnergyCost <= totalRoomAvailable + BODYPART_COST["work"]) {
                upgraderBodyParts.push(WORK);
                upgraderBodyPartsEnergyCost = upgraderBodyPartsEnergyCost + BODYPART_COST["work"];
            }
            var newName = Game.spawns['Spawn1'].createCreep(upgraderBodyParts, undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        } else if (builders.length < 10 && totalRoomAvailable == totalRoomCapacity) {
            var builderBodyParts = basicBodyParts.slice();
            var builderBodyPartsEnergyCost = BODYPART_COST["move"] + BODYPART_COST["carry"] + BODYPART_COST["work"];
            while (builderBodyPartsEnergyCost <= totalRoomAvailable + BODYPART_COST["work"]) {
                builderBodyParts.push(WORK);
                builderBodyPartsEnergyCost = builderBodyPartsEnergyCost + BODYPART_COST["work"];
            }
            var newName = Game.spawns['Spawn1'].createCreep(builderBodyParts, undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
    }
}

module.exports = utilPopulator;

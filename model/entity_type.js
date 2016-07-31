/**
 * Created by boot on 7/31/16.
 */
function EntityType() {

}

EntityType.GOVERNMENTAL = new EntityType();
EntityType.GOVERNMENTAL.toString = function() { return 'GOVERNMENTAL'};
EntityType.PHARMACY = new EntityType();
EntityType.PHARMACY.toString = function() { return 'PHARMACY'};

EntityType.parse = function(name) { return EntityType[name];}

module.exports = EntityType;
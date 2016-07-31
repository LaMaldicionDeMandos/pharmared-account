/**
 * Created by boot on 7/31/16.
 */
function EntityType() {

}

EntityType.GOVERNMENTAL = new EntityType();
EntityType.GOVERNMENTAL.toString = function() { return 'GOVERNMENTAL'};
EntityType.GOVERNMENTAL.name = 'GOVERNMENTAL';
EntityType.PHARMACY = new EntityType();
EntityType.PHARMACY.name = 'PHARMACY';

EntityType.parse = function(name) { return EntityType[name];}

module.exports = EntityType;
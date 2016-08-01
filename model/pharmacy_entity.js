/**
 * Created by boot on 7/31/16.
 */
var SCOPE = require('./scope').ELIGIBLE;
var TYPE = require('./entity_type').PHARMACY;
function Pharmacy(dto) {
    this.id = dto ? dto.id : undefined;
    this.name = dto ? dto.name : undefined;
    this.image = dto ? dto.image : undefined;

    this.scope = SCOPE;
    this.isParent = false;
    this.unique = false;
    this.type = TYPE;

}
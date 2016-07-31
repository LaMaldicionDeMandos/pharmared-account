/**
 * Created by boot on 7/31/16.
 */
var DB = require('./services/database');
var Scope = require('./model/scope');
var db = new DB('mongodb://localhost/pharamared_accounts');
var Entity = db.Entity;
var ObjectId = db.ObjectId;
var entity = new Entity();
entity._id = new ObjectId();
entity.name = 'A.N.M.A.T';
entity.scope = Scope.GLOBAL.toString();
entity.isParent = false;
entity.unique = true;
entity.image = 'http://www.anmat.gov.ar/imagenes/logo_anmat.png';
entity.save(function(err) {
   process.exit();
});
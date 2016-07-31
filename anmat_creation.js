/**
 * Created by boot on 7/31/16.
 */
var config = require('./services/config');
var async = require('async');
var sha = require('sha256');
var DB = require('./services/database');
var Scope = require('./model/scope');
var pass = process.argv[2];

var db = new DB(config.db_connection);
var ObjectId = db.ObjectId;
var Entity = db.Entity;
var User = db.User;

var anmat = new Entity();
anmat._id = new ObjectId();
anmat.name = 'A.N.M.A.T';
anmat.scope = Scope.GLOBAL.toString();
anmat.isParent = false;
anmat.unique = true;
anmat.image = 'http://www.anmat.gov.ar/imagenes/logo_anmat.png';

var anmatUser = new User();
anmatUser._id = new ObjectId();
anmatUser.username = 'anmat';
anmatUser.password = sha(pass);
anmatUser.type = 'root';
anmatUser.entity = anmat._id;
anmatUser.role = ['root'];

var functions = [function(callback) {
    anmat.save(function(err) {
        if(err) {
            console.log(err);
            callback(err)
        } else {
            console.log("Anmat saved saved");
            callback();
        }
    });
},
function(callback) {
        anmatUser.save(function(err) {
            if(err) {
                console.log(err);
                callback(err)
            } else {
                console.log("Anmat user saved");
                callback();
            }
        });
    }]

var save = function(callback) {
    async.parallel(functions, function(err) {
        console.log("anmat creation saccess!!");
        callback(err);
    });
};

async.series([save], function() {
    console.log("End");
    process.exit();
});


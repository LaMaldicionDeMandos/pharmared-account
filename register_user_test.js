/**
 * Created by boot on 8/11/16.
 */
var config = require('./services/config');
var async = require('async');
var sha = require('sha256');
var DB = require('./services/database');
var Scope = require('./model/scope');
var EntityType = require('./model/entity_type');
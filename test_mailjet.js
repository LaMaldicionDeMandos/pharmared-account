/**
 * Created by boot on 9/10/16.
 */
var mailjet = require ('node-mailjet')
    .connect('74ba2afdd8212966d8f20964e843ea9b', '235d83beb6ce1c3f4b0aee7329b3aacb');
var request = mailjet
    .post("send")
    .request({
        "FromEmail": "pasutmarcelo@gmail.com",
        "FromName":"Equipo de Farmared",
        "MJ-TemplateID": "48974",
        "MJ-TemplateLanguage": true,
        "Recipients": [
            { "Email": "anbenito@yahoo.com.ar", "Vars": {"full_name": "Aída"}},
            { "Email": "pasutmarcelo@gmail.com", "Vars": {"full_name": "Marcelo"}}
        ],
        "Vars": {
            "confirmation_link": "http://staging.farmared.com.ar"
        }
    });
request.then(function (response, body) {
        console.log (response.statusCode, body);
    },
    function (err, response) {
        console.log (response.statusCode, err);
    });
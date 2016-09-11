/**
 * Created by boot on 9/10/16.
 */
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
var Mailjet = require ('node-mailjet');
function Service(config) {
    var mailjet = Mailjet.connect(config.mailjet_apikey, config.mailjet_secret);
    var options = {
        "FromEmail": config.mail_from,
        "FromName": config.mail_from_name,
        "MJ-TemplateID": config.mailjet_welcome_template,
        "MJ-TemplateLanguage": true,
        "Recipients": [],
        "Vars": {
            "confirmation_link": config.confirmation_link
        }
    };
    this.sendConfirmationMail = function (user, password) {
        var opts = clone(options);
        opts['Recipients'] = [
            {"Email": user.email, "Vars": {
                "full_name": user.profile.first_name,
                "password": password,
                "confirmation_link": config.confirmation_link + user._id
            }}];
        var promise = mailjet.post("send").request(opts);
        return promise;
    };
}

module.exports = Service;
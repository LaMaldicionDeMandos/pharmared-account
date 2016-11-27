var passwordGenerator = require('generate-password');
var NUMBER_RE = /([\d])/g;
function PasswordService() {
    var password;
    var numberMatches = 0;
    do {
        password = passwordGenerator.generate({length: 8, numbers: true});
        numberMatches = password.match(NUMBER_RE);
    } while (!numberMatches || numberMatches.length <= 0);
    return password;

}

module.exports = PasswordService;
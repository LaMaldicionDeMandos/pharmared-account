/**
 * Created by boot on 8/2/16.
 */
function validateEmpty(value) {
    return value != undefined && value.length > 0;
}

exports.validateEmpty = validateEmpty;
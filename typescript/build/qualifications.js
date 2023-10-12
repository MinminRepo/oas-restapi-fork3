"use strict";
module.exports.checkHeight = (height, sex, isIP) => {
    let minHeight = 0;
    if (sex === 'MALE')
        minHeight = 157.48;
    else if (sex === 'FEMALE')
        minHeight = 152.40;
    if (isIP === true)
        return true;
    else {
        if (height >= minHeight)
            return true;
        else
            return false;
    }
};
module.exports.checkAge = (age) => {
    const minDate = new Date("2002-06-02").getTime();
    const maxDate = new Date("2007-06-01").getTime();
    const birthDate = new Date(age).getTime();
    if (maxDate >= birthDate && birthDate >= minDate) {
        return true;
    }
    else {
        return false;
    }
};
module.exports.checkBMI = (bmi) => {
    if (bmi >= 28)
        return false;
    else
        return true;
};

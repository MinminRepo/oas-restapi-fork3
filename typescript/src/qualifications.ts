
/**
 * checks applicant height using the height, sex, and if the applicant
 * is a member of the indigenous people
 */
module.exports.checkHeight = (height: number, sex: string, isIP: boolean): boolean => {

    let minHeight: number = 0;
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

}

/**
 * checks if overage or underage
 */
module.exports.checkAge = (age: Date): boolean | Error => {

    /** simulate minimum and maximum birthdates */
    const minDate = new Date("2002-06-02").getTime();
    const maxDate = new Date("2007-06-01").getTime();

    const birthDate = new Date(age).getTime();

    if (maxDate >= birthDate && birthDate >= minDate) {
        return true;
    } else {
        return false;
    }

}

module.exports.checkBMI = (bmi: number): boolean => {
    if (bmi >= 28)
        return false;
    else
        return true;
}
import {isAlpha,isEmail,isMobilePhone} from 'validator';

export const validate = (validateString, validateType ) =>{
    let flag = false
    const checkString = validateString.toString();
    switch (validateType) {
        case "alpha":
            flag = isAlpha(checkString)
        break;
        case "email":
            flag = isEmail(checkString)
        break;
        case "phone":
            flag = isMobilePhone(checkString,'en-IN')
        break;
    
        default:
            flag = false
            break;
            

    }
    console.log(`string validation for ${checkString} is ${flag}`);
    return flag;

} 

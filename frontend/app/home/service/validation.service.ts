import { FormBuilder, Validators, ControlGroup, Control} from 'angular2/common';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'passwordNotMatch':'Password not match',
            'invalidFileExt':'File type should be doc ,docx ,pdf'

        };

        return config[validatorName];
    }



     static   emailValidator(control:any) {
       
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static checkFileExtention(fileName)
    {       

                var allowedFiles = [".doc", ".docx", ".pdf"];
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        if (fileName.toLowerCase().match(regex))
           return null;
        else {
            return { 'invalidFileExt': true };
        }

    }
    static checkEqualPassword(group: ControlGroup) {
          if (group.controls['password'].value != group.controls['rePassword'].value) {
            return {
            passwordNotMatch: true 
            };


        }
        else
        return null;
    }

}

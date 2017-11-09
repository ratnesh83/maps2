import { FormControl } from '@angular/forms';

export class NameValidator {

    static nameValid(control: FormControl): { [s: string]: boolean } {

        let NAME = /^[a-zA-Z ]*$/;

        if (control.value && control.value !== '' && !NAME.test(control.value)) {
            return { invalidName: true };
        }
    }

    static password(control: FormControl): { [s: string]: boolean } {

        let PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;

        if (control.value && control.value !== '' && !PASSWORD.test(control.value)) {
            return { invalidPassword: true };
        }
    }
}

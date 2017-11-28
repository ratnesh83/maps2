import { FormControl } from '@angular/forms';
export class PaymentValidator {

  static cardNumber(control: FormControl): { [s: string]: boolean } {

    let CARD_NUMBER_REGEXP = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

    if (control.value && control.value !== '' && ( !CARD_NUMBER_REGEXP.test(control.value))) {
      return { invalid : true };
    }
  }
  static expiryDate(control: FormControl): { [s: string]: boolean } {

    let EXPIRY_DATE_REGEXP = /^(0[1-9]|1[0-2])\-?([0-9]{4}|[0-9]{2})$/;

    if (control.value && control.value !== '' && ( !EXPIRY_DATE_REGEXP.test(control.value))) {
      return { invalid : true };
    }
  }
static cvvValid (control: FormControl): { [s: string]: boolean } {

    let CVV_REGEXP = /^[0-9]{3,4}$/;

    if (control.value && control.value !== '' && ( !CVV_REGEXP.test(control.value))) {
      return { invalid : true };
    }
  }
}

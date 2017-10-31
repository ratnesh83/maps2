import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import 'style-loader!./address.scss';

@Component({
    selector: 'address',
    templateUrl: './address.html',
})
export class Address {

    public storeData;
    public form: FormGroup;
    public streetAddress: AbstractControl;
    public locationAddress: AbstractControl;
    public city: AbstractControl;
    public zipCode: AbstractControl;
    public state: AbstractControl;
    public country: AbstractControl;
    public latitude: AbstractControl;
    public longitude: AbstractControl;

    public submitted: boolean = false;

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private cdRef: ChangeDetectorRef) {

        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {

            });

        this.form = fb.group({
            'streetAddress': ['', Validators.compose([Validators.required])],
            'locationAddress': [''],
            'latitude': [''],
            'longitude': [''],
            'city': [''],
            'state': [''],
            'zipCode': [''],
            'country': ['']
        });

        this.streetAddress = this.form.controls['streetAddress'];
        this.locationAddress = this.form.controls['locationAddress'];
        this.latitude = this.form.controls['latitude'];
        this.longitude = this.form.controls['longitude'];
        this.city = this.form.controls['city'];
        this.state = this.form.controls['state'];
        this.zipCode = this.form.controls['zipCode'];
        this.country = this.form.controls['country'];
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.storeData) {
            this.storeData.unsubscribe();
        }
    }

    getAddress(event) {
        let addressComponents = event.address_components;
        let latitude = event.geometry.location.lat();
        let longitude = event.geometry.location.lng();
        let formattedAddress = event.formatted_address;
        let locationName = event.streetAddress;
        let route = '';
        let locality = '';
        let city = '';
        let state = '';
        let country = '';
        let postal = '';
        for (let i = 0; i < addressComponents.length; i++) {
            let types = addressComponents[i].types;
            for (let j = 0; j < types.length; j++) {
                if (types[j] == 'administrative_area_level_1') {
                    state = addressComponents[i].long_name;
                } else if (types[j] == 'administrative_area_level_2') {
                    city = addressComponents[i].long_name;
                } else if (types[j] == 'locality') {
                    locality = addressComponents[i].long_name;
                } else if (types[j] == 'country') {
                    country = addressComponents[i].long_name;
                } else if (types[j] == 'postal_code') {
                    postal = addressComponents[i].long_name;
                } else if (types[j] == 'route') {
                    route = addressComponents[i].long_name;
                }
            }
        }
        this.locationAddress.setValue(formattedAddress);
        this.streetAddress.setValue(locationName);
        this.latitude.setValue(latitude);
        this.longitude.setValue(longitude);
        this.city.setValue(city);
        this.state.setValue(state);
        this.zipCode.setValue(postal);
        this.country.setValue(country);
    }

    onSubmit(values: Object): void {
        this.submitted = true;
        console.log(values);
        if (this.form.valid) {
            // your code goes here
            // console.log(values);
        }
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}

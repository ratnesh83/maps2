import { Component, ViewContainerRef, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as employer from '../../state/user.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { EmailValidator, EqualPasswordsValidator } from '../../../../theme/validators';
import { OpenDocumentModal } from '../open-document-modal/open-document-modal.component';
import { ConfirmModal } from '../confirm-modal/confirm-modal.component';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./edit-employer.scss';

@Component({
    selector: 'edit-employer',
    templateUrl: 'edit-employer.html',
})

export class EditEmployer {

    @ViewChild('imageProfile') public _imageProfile: ElementRef;
    @ViewChild('imageOrg') public _imageOrg: ElementRef;
    @ViewChild('stateBuilding') public _stateBuilding: ElementRef;
    @ViewChild('incomeProtection') public _incomeProtection: ElementRef;
    @ViewChild('publicLiability') public _publicLiability: ElementRef;
    @ViewChild('SWMSInput') public _SWMS: ElementRef;
    @ViewChild('ABNInput') public _ABN: ElementRef;
    @ViewChildren('incomeProtections') public _incomeProtections: QueryList<HTMLInputElement>;
    @ViewChildren('publicLiabilitys') public _publicLiabilitys: QueryList<HTMLInputElement>;
    public form: FormGroup;
    public userID: AbstractControl;
    public employerID: AbstractControl;
    public name: AbstractControl;
    public mobile: AbstractControl;
    public email: AbstractControl;
    public countryCode: AbstractControl;
    public organisationID: AbstractControl;
    public organisationName: AbstractControl;
    public organisationPic: AbstractControl;
    public contactName: AbstractControl;
    public organisationEmail: AbstractControl;
    public organisationCountryCode: AbstractControl;
    public organisationMobile: AbstractControl;
    public about: AbstractControl;
    public organisationAddress: FormGroup;
    public locationName: AbstractControl;
    public locationAddress: AbstractControl;
    public city: AbstractControl;
    public state: AbstractControl;
    public zipCode: AbstractControl;
    public latitude: AbstractControl;
    public longitude: AbstractControl;
    public profilePic: AbstractControl;
    public previousProject: FormGroup;
    public projectDate: FormGroup;
    public startDate: AbstractControl;
    public endDate: AbstractControl;
    public dollarValue: AbstractControl;
    public location: AbstractControl;
    public projectName: AbstractControl;
    public stateBuildingLicence: FormGroup;
    public stateBuildingLicenceNumber: AbstractControl;
    public stateBuildingLicenceExpiry: AbstractControl;
    public stateBuildingLicenceDocument: AbstractControl;
    public incomeProtectionCertificate: FormGroup;
    public incomeProtectionCertificateNumber: AbstractControl;
    public incomeProtectionCertificateExpiry: AbstractControl;
    public incomeProtectionCertificateDocument: AbstractControl;
    public publicLiabilityInsuranceCertificate: FormGroup;
    public publicLiabilityInsuranceCertificateExpiry: AbstractControl;
    public publicLiabilityInsuranceCertificateDocument: AbstractControl;
    public SWMS: FormGroup;
    public SWMSDocument: AbstractControl;
    public ABN: FormGroup;
    public ABNExpiry: AbstractControl;
    public ABNNumber: AbstractControl;
    public ABNDocument: AbstractControl;

    public submitted: boolean = false;
    public updateLoading: boolean = false;
    public isEditable = false;

    newUserData;
    activeEmployer;
    profilePicture;
    organisationPicture;
    stateBuildingLicenceFile;
    incomeProtectionCertificateFile;
    SWMSFile;
    ABNFile;
    startDt;
    profilePictureChange: boolean = false;
    organisationPictureChange: boolean = false;
    ABNUploading: boolean = false;
    stateBuildingLicenceUploadingChange: boolean = false;
    SWMSUploading: boolean = false;
    SWMSUploadingChange: boolean = false;
    ABNUploadingChange: boolean = false;
    publicLiabilityInsuranceCertificateUploading: boolean = false;
    fileUploading: boolean = false;
    fileOrgUploading: boolean = false;
    incomeProtectionCertificateUploading: boolean = false;
    stateBuildingLicenceUploading: boolean = false;

    incomeProtectionCertificateUploadingChange: boolean = false;
    publicLiabilityInsuranceCertificateUploadingChange: boolean = false;
    publicLiabilityInsuranceCertificateFile: boolean = false;
    stateBuildingLicenceFiles = [];
    incomeProtectionCertificateFiles = [];
    publicLiabilityInsuranceCertificateFiles = [];
    SWMSFiles = [];
    publicLiabilitysArray = [];
    incomeProtectionsArray = [];
    countryCodes = [];

    minDate = new Date();

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private router: Router,
        private renderer: Renderer,
        private toastrService: ToastrService,
        public dialog: MdDialog
    ) {
        this.form = fb.group({
            'userID': ['', Validators.compose([])],
            'employerID': ['', Validators.compose([])],
            'name': ['', Validators.compose([])],
            'mobile': ['', Validators.compose([])],
            'email': ['', Validators.compose([])],
            'countryCode': ['', Validators.compose([])],
            'profilePic': ['', Validators.compose([])],
            'contactName': ['', Validators.compose([])],
            'organisationID': ['', Validators.compose([])],
            'organisationName': ['', Validators.compose([])],
            'organisationEmail': ['', Validators.compose([])],
            'organisationCountryCode': ['', Validators.compose([])],
            'organisationMobile': ['', Validators.compose([])],
            'organisationPic': ['', Validators.compose([])],
            'about': [''],
            'organisationAddress': fb.group({
                'locationName': [''],
                'locationAddress': ['', Validators.compose([])],
                'city': [''],
                'state': [''],
                'zipCode': [''],
                'latitude': ['', Validators.compose([])],
                'longitude': ['', Validators.compose([])],
            }),
            'previousProject': fb.group({
                'dollarValue': [''],
                'location': [''],
                'name': [''],
                'projectDate': fb.group({
                    'startDate': [''],
                    'endDate': ['']
                })
            }),
            'stateBuildingLicence': fb.group({
                'number': ['', Validators.compose([])],
                'expiryDate': [''],
                'document': ['', Validators.compose([])],
                'isRejected': [false, Validators.compose([])],
                'isReuploaded': [false, Validators.compose([])]
            }),
            'incomeProtectionCertificate': fb.group({
                'number': ['', Validators.compose([])],
                'expiryDate': ['', Validators.compose([])],
                'document': ['', Validators.compose([])],
                'isRejected': [false, Validators.compose([])],
                'isReuploaded': [false, Validators.compose([])]
            }),
            'publicLiabilityInsuranceCertificate': fb.group({
                'expiryDate': ['', Validators.compose([])],
                'document': ['', Validators.compose([])],
                'isRejected': [false, Validators.compose([])],
                'isReuploaded': [false, Validators.compose([])]
            }),
            'SWMS': fb.group({
                'document': ['', Validators.compose([])],
                'isRejected': [false, Validators.compose([])],
                'isReuploaded': [false, Validators.compose([])]
            }),
            'ABN': fb.group({
                'number': ['', Validators.compose([])],
                'expiryDate': ['', Validators.compose([])],
                'document': ['', Validators.compose([])],
                'isRejected': [false, Validators.compose([])],
                'isReuploaded': [false, Validators.compose([])]
            })
        });

        this.userID = this.form.controls['userID'];
        this.employerID = this.form.controls['employerID'];
        this.name = this.form.controls['name'];
        this.mobile = this.form.controls['mobile'];
        this.email = this.form.controls['email'];
        this.countryCode = this.form.controls['countryCode'];
        this.profilePic = this.form.controls['profilePic'];
        this.contactName = this.form.controls['contactName'];
        this.organisationID = this.form.controls['organisationID'];
        this.organisationName = this.form.controls['organisationName'];
        this.organisationEmail = this.form.controls['organisationEmail'];
        this.organisationCountryCode = this.form.controls['organisationCountryCode'];
        this.organisationMobile = this.form.controls['organisationMobile'];
        this.organisationPic = this.form.controls['organisationPic'];
        this.about = this.form.controls['about'];
        this.organisationAddress = <FormGroup>this.form.controls['organisationAddress'];
        this.locationName = this.organisationAddress.controls['locationName'];
        this.locationAddress = this.organisationAddress.controls['locationAddress'];
        this.city = this.organisationAddress.controls['city'];
        this.state = this.organisationAddress.controls['state'];
        this.zipCode = this.organisationAddress.controls['zipCode'];
        this.latitude = this.organisationAddress.controls['latitude'];
        this.longitude = this.organisationAddress.controls['longitude'];
        this.previousProject = <FormGroup>this.form.controls['previousProject'];
        this.projectName = this.previousProject.controls['name'];
        this.dollarValue = this.previousProject.controls['dollarValue'];
        this.location = this.previousProject.controls['location'];
        this.projectDate = <FormGroup>this.previousProject.controls['projectDate'];
        this.startDate = this.projectDate.controls['startDate'];
        this.endDate = this.projectDate.controls['endDate'];
        this.stateBuildingLicence = <FormGroup>this.form.controls['stateBuildingLicence'];
        this.stateBuildingLicenceNumber = this.stateBuildingLicence.controls['number'];
        this.stateBuildingLicenceDocument = this.stateBuildingLicence.controls['document'];
        this.stateBuildingLicenceExpiry = this.stateBuildingLicence.controls['expiryDate'];
        this.incomeProtectionCertificate = <FormGroup>this.form.controls['incomeProtectionCertificate'];
        this.incomeProtectionCertificateNumber = this.incomeProtectionCertificate.controls['number'];
        this.incomeProtectionCertificateDocument = this.incomeProtectionCertificate.controls['document'];
        this.incomeProtectionCertificateExpiry = this.incomeProtectionCertificate.controls['expiryDate'];
        this.publicLiabilityInsuranceCertificate = <FormGroup>this.form.controls['publicLiabilityInsuranceCertificate'];
        this.publicLiabilityInsuranceCertificateDocument = this.publicLiabilityInsuranceCertificate.controls['document'];
        this.publicLiabilityInsuranceCertificateExpiry = this.publicLiabilityInsuranceCertificate.controls['expiryDate'];
        this.SWMS = <FormGroup>this.form.controls['SWMS'];
        this.SWMSDocument = this.SWMS.controls['document'];
        this.ABN = <FormGroup>this.form.controls['ABN'];
        this.ABNDocument = this.ABN.controls['document'];
        this.ABNExpiry = this.ABN.controls['expiryDate'];
        this.ABNNumber = this.ABN.controls['number'];

        /* this.form.get('name').disable(); */

        this.store
            .select('employer')
            .subscribe((res: any) => {
                //console.log(res);
                if (res.activeEmployer) {
                    this.activeEmployer = res.activeEmployer.employer;
                }
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
                
                if (!res.uploadFileProcess && !res.uploadFileSuccess && !res.uploadMultipleFilesProcess && !res.uploadMultipleFilesSuccess && !res.editEmployerProcess) {
                    if (this.activeEmployer) {
                        this.name.setValue(this.activeEmployer.name);
                        this.email.setValue(this.activeEmployer.email);
                    }

                    if (this.activeEmployer && this.activeEmployer.employerID) {
                        this.userID.setValue(this.activeEmployer._id);
                        this.employerID.setValue(this.activeEmployer.employerID._id);
                        if (this.profilePictureChange == false) {
                            if (this.activeEmployer.employerID.profilePic) {
                                this.profilePic.setValue(this.activeEmployer.employerID.profilePic);
                                this.profilePicture = this.activeEmployer.employerID.profilePic;
                            } else {
                                this.form.removeControl('profilePic');
                            }
                        }
                    }

                    if (this.activeEmployer && this.activeEmployer.contacts && this.activeEmployer.contacts.length > 0 && this.activeEmployer.contacts[0].mobile) {
                        this.mobile.setValue(this.activeEmployer.contacts[0].mobile);
                        this.countryCode.setValue(this.activeEmployer.contacts[0].countryCode);
                    }

                    if (this.activeEmployer && this.activeEmployer.employerID && this.activeEmployer.employerID.organisationID) {
                        this.organisationID.setValue(this.activeEmployer.employerID.organisationID._id);
                        this.organisationName.setValue(this.activeEmployer.employerID.organisationID.organisationName);
                        this.contactName.setValue(this.activeEmployer.employerID.organisationID.contactName);
                        this.organisationEmail.setValue(this.activeEmployer.employerID.organisationID.organisationEmail);
                        this.organisationMobile.setValue(this.activeEmployer.employerID.organisationID.organisationMobile);
                        this.organisationCountryCode.setValue(this.activeEmployer.employerID.organisationID.organisationCountryCode);
                        if (this.activeEmployer.employerID.organisationID.about) {
                            this.about.setValue(this.activeEmployer.employerID.organisationID.about);
                        } else {

                        }
                        if (this.activeEmployer.employerID.organisationID.organisationAddress) {
                            if (this.activeEmployer.employerID.organisationID.organisationAddress.locationName) {
                                this.locationName.setValue(this.activeEmployer.employerID.organisationID.organisationAddress.locationName);
                            } else {
                                this.form.removeControl('organisationPic');
                            }
                            this.locationAddress.setValue(this.activeEmployer.employerID.organisationID.organisationAddress.locationAddress);
                            this.latitude.setValue(this.activeEmployer.employerID.organisationID.organisationAddress.latitude);
                            this.longitude.setValue(this.activeEmployer.employerID.organisationID.organisationAddress.longitude);
                            if (this.activeEmployer.employerID.organisationID.organisationAddress.city) {
                                this.city.setValue(this.activeEmployer.employerID.organisationID.organisationAddress.city);
                            } else {

                            }
                            if (this.activeEmployer.employerID.organisationID.organisationAddress.state) {
                                this.state.setValue(this.activeEmployer.employerID.organisationID.organisationAddress.state);
                            } else {

                            }
                            if (this.activeEmployer.employerID.organisationID.organisationAddress.zipCode) {
                                this.zipCode.setValue(this.activeEmployer.employerID.organisationID.organisationAddress.zipCode);
                            } else {

                            }
                        }
                        if (this.organisationPictureChange == false) {
                            if (this.activeEmployer.employerID.organisationID.organisationPic) {
                                this.organisationPic.setValue(this.activeEmployer.employerID.organisationID.organisationPic);
                                this.organisationPicture = this.activeEmployer.employerID.organisationID.organisationPic;
                            } else {
                                this.form.removeControl('organisationPic');
                            }
                        }
                        if (this.activeEmployer.employerID.organisationID.stateBuildingLicence) {
                            if (this.stateBuildingLicenceUploadingChange == false) {
                                this.stateBuildingLicenceFile = this.activeEmployer.employerID.organisationID.stateBuildingLicence.document;
                                this.stateBuildingLicenceFiles = this.activeEmployer.employerID.organisationID.stateBuildingLicence.document;
                                this.stateBuildingLicenceDocument.setValue(this.activeEmployer.employerID.organisationID.stateBuildingLicence.document);
                            }
                            this.stateBuildingLicenceExpiry.setValue(new Date(this.activeEmployer.employerID.organisationID.stateBuildingLicence.expiryDate));
                            this.stateBuildingLicenceNumber.setValue(this.activeEmployer.employerID.organisationID.stateBuildingLicence.number);
                        }

                        if (this.activeEmployer.employerID.organisationID.incomeProtectionCertificate) {
                            if (this.incomeProtectionCertificateUploadingChange == false) {
                                this.incomeProtectionCertificateFile = this.activeEmployer.employerID.organisationID.incomeProtectionCertificate.document[0];
                                this.incomeProtectionCertificateFiles = this.activeEmployer.employerID.organisationID.incomeProtectionCertificate.document;
                                this.incomeProtectionCertificateDocument.setValue(this.activeEmployer.employerID.organisationID.incomeProtectionCertificate.document);
                            }
                            this.incomeProtectionCertificateExpiry.setValue(new Date(this.activeEmployer.employerID.organisationID.incomeProtectionCertificate.expiryDate));
                            this.incomeProtectionCertificateNumber.setValue(this.activeEmployer.employerID.organisationID.incomeProtectionCertificate.number);
                        }

                        if (this.activeEmployer.employerID.organisationID.publicLiabilityInsuranceCertificate) {
                            if (this.publicLiabilityInsuranceCertificateUploadingChange == false) {
                                this.publicLiabilityInsuranceCertificateFile = this.activeEmployer.employerID.organisationID.publicLiabilityInsuranceCertificate.document[0];
                                this.publicLiabilityInsuranceCertificateFiles = this.activeEmployer.employerID.organisationID.publicLiabilityInsuranceCertificate.document;
                                this.publicLiabilityInsuranceCertificateDocument.setValue(this.activeEmployer.employerID.organisationID.publicLiabilityInsuranceCertificate.document);
                            }
                            this.publicLiabilityInsuranceCertificateExpiry.setValue(new Date(this.activeEmployer.employerID.organisationID.publicLiabilityInsuranceCertificate.expiryDate));
                        }

                        if (this.activeEmployer.employerID.organisationID.SWMS) {
                            if (this.SWMSUploadingChange == false) {
                                this.SWMSFile = this.activeEmployer.employerID.organisationID.SWMS.document;
                                this.SWMSFiles = this.activeEmployer.employerID.organisationID.SWMS.document;
                                this.SWMSDocument.setValue(this.activeEmployer.employerID.organisationID.SWMS.document);
                            }
                        }

                        if (this.activeEmployer.employerID.ABN) {
                            if (this.ABNUploadingChange == false) {
                                this.ABNFile = this.activeEmployer.employerID.ABN.document;
                                this.ABNDocument.setValue(this.activeEmployer.employerID.ABN.document);
                            }
                            this.ABNExpiry.setValue(new Date(this.activeEmployer.employerID.ABN.expiryDate));
                            this.ABNNumber.setValue(this.activeEmployer.employerID.ABN.number);
                        }

                        if (this.activeEmployer.employerID.organisationID.previousProject) {
                            this.projectName.setValue(this.activeEmployer.employerID.organisationID.previousProject.name);
                            this.location.setValue(this.activeEmployer.employerID.organisationID.previousProject.location);
                            this.dollarValue.setValue(this.activeEmployer.employerID.organisationID.previousProject.dollarValue);
                            if (this.activeEmployer.employerID.organisationID.previousProject.projectDate) {
                                this.startDt = new Date(this.activeEmployer.employerID.organisationID.previousProject.projectDate.startDate);
                                this.startDate.setValue(new Date(this.activeEmployer.employerID.organisationID.previousProject.projectDate.startDate));
                                this.endDate.setValue(new Date(this.activeEmployer.employerID.organisationID.previousProject.projectDate.endDate));
                            }
                        }
                    }
                }

                if (res.fileUpload) {
                    if (res.fileUpload.type == 'profilePic') {
                        this.fileUploading = false;
                        this.profilePictureChange = true;
                        this.profilePicture = res.fileUpload.fileUploadUrl;
                        this.form.addControl('profilePic', this.profilePic);
                        this.profilePic.setValue(res.fileUpload.fileUploadUrl);
                    }
                    if (res.fileUpload.type == 'organisationPic') {
                        this.fileOrgUploading = false;
                        this.organisationPicture = res.fileUpload.fileUploadUrl;
                        this.organisationPictureChange = true;
                        this.form.addControl('organisationPic', this.organisationPic);
                        this.organisationPic.setValue(res.fileUpload.fileUploadUrl);
                    }
                    if (res.fileUpload.type == 'stateBuildingLicenceFile') {
                        this.stateBuildingLicenceUploading = false;
                        this.stateBuildingLicenceFile = res.fileUpload.fileUploadUrl;
                        this.stateBuildingLicenceUploadingChange = true;
                        this.stateBuildingLicenceDocument.setValue(res.fileUpload.fileUploadUrl);
                    }
                    if (res.fileUpload.type == 'incomeProtectionCertificateFile') {
                        let files = [];
                        if (this.incomeProtectionCertificateFiles && this.incomeProtectionCertificateFiles.length > 0) {
                            files = this.incomeProtectionCertificateFiles;
                        }
                        files[res.fileUpload.index] = res.fileUpload.fileUploadUrl;
                        this.incomeProtectionCertificateUploading = false;
                        this.incomeProtectionCertificateFiles = files;
                        this.incomeProtectionCertificateUploadingChange = true;
                        this.incomeProtectionCertificateDocument.setValue(files);
                    }
                    if (res.fileUpload.type == 'publicLiabilityInsuranceCertificateFile') {
                        let files = [];
                        if (this.publicLiabilityInsuranceCertificateFiles && this.publicLiabilityInsuranceCertificateFiles.length > 0) {
                            files = this.publicLiabilityInsuranceCertificateFiles;
                        }
                        files[res.fileUpload.index] = res.fileUpload.fileUploadUrl;
                        this.publicLiabilityInsuranceCertificateUploading = false;
                        this.publicLiabilityInsuranceCertificateFiles = files;
                        this.publicLiabilityInsuranceCertificateUploadingChange = true;
                        this.publicLiabilityInsuranceCertificateDocument.setValue(files);
                    }
                    if (res.fileUpload.type == 'SWMSFile') {
                        this.SWMSUploading = false;
                        this.SWMSFile = res.fileUpload.fileUploadUrl;
                        this.SWMSUploadingChange = true;
                        this.SWMSDocument.setValue(res.fileUpload.fileUploadUrl);
                    }
                    if (res.fileUpload.type == 'ABNFile') {
                        this.ABNUploading = false;
                        this.ABNFile = res.fileUpload.fileUploadUrl;
                        this.ABNUploadingChange = true;
                        this.ABNDocument.setValue(res.fileUpload.fileUploadUrl);
                    }
                }

                if (res.editEmployerSuccess) {
                    this.isEditable = false;
                    this.updateLoading = false;
                }

                if (res.approveEmployerSuccess) {

                }

                if (res.error) {
                    this.updateLoading = false;
                    this.fileUploading = false;
                    this.fileOrgUploading = false;
                    this.stateBuildingLicenceUploading = false;
                    this.incomeProtectionCertificateUploading = false;
                    this.publicLiabilityInsuranceCertificateUploading = false;
                }
            });
    };

    getEmployer() {
        if (localStorage.getItem('editEmployerId') != undefined) {
            this.store.dispatch({
                type: employer.actionTypes.APP_GET_EMPLOYER_DETAIL,
                payload: {
                    userId: localStorage.getItem('editEmployerId')
                }
            });
        }
    }

    ngOnInit() {
        this.onLoad();
        this.store.dispatch({
            type: employer.actionTypes.GET_COUNTRY_CODE
        });
        this.countries = this.countryCode.valueChanges
            .startWith(null)
            .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
        this.organisationCountries = this.organisationCountryCode.valueChanges
            .startWith(null)
            .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
    }

    countries: Observable<any[]>;
    organisationCountries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
    }

    ngOnDestroy() {
        localStorage.removeItem('editEmployerId');
    }

    onLoad() {
        this.getEmployer();
    };

    getAddress(event) {
        let addressComponents = event.address_components;
        let latitude = event.geometry.location.lat();
        let longitude = event.geometry.location.lng();
        let formattedAddress = event.formatted_address;
        let locationName = event.name;
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
        this.locationName.setValue(locationName);
        this.locationAddress.setValue(formattedAddress);
        this.latitude.setValue(latitude);
        this.longitude.setValue(longitude);
        this.city.setValue(city);
        this.state.setValue(state);
        this.zipCode.setValue(postal);
    }

    getProjectAddress(event) {
        this.location.setValue(event.formatted_address);
    }

    bringFileSelector(value): boolean {
        switch (value) {
            case 1: this.renderer.invokeElementMethod(this._imageProfile.nativeElement, 'click');
                break;
            case 2: this.renderer.invokeElementMethod(this._imageOrg.nativeElement, 'click');
                break;
            case 3: this.renderer.invokeElementMethod(this._stateBuilding.nativeElement, 'click');
                break;
            case 4: this.renderer.invokeElementMethod(this._incomeProtection.nativeElement, 'click');
                break;
            case 5: this.renderer.invokeElementMethod(this._publicLiability.nativeElement, 'click');
                break;
            case 6: this.renderer.invokeElementMethod(this._SWMS.nativeElement, 'click');
                break;
            case 7: this.renderer.invokeElementMethod(this._ABN.nativeElement, 'click');
                break;
            default:
                break;
        }
        return false;
    }

    bringFilesSelector(index, value): boolean {
        switch (value) {
            case 1: this.renderer.invokeElementMethod(this.incomeProtectionsArray[index].nativeElement, 'click');
                break;
            case 2: this.renderer.invokeElementMethod(this.publicLiabilitysArray[index].nativeElement, 'click');
                break;
            default:
                break;
        }
        return false;
    }

    ngAfterViewInit() {
        this.incomeProtectionsArray = this._incomeProtections.toArray();
        this.publicLiabilitysArray = this._publicLiabilitys.toArray();
        this._incomeProtections.changes.subscribe(childern => {
            this.incomeProtectionsArray = childern.toArray();
        });
        this._publicLiabilitys.changes.subscribe(childern => {
            this.publicLiabilitysArray = childern.toArray();
        });
    }

    checkDocFileSize(size): boolean {
        if (size > 5000000) {
            return false;
        } else {
            return true;
        }
    }

    checkDocFileType(type): boolean {
        if (type.indexOf('image') != -1 || type.indexOf('pdf') != -1) {
            return true;
        } else {
            return false;
        }
    }

    checkFileSize(size): boolean {
        if (size > 5000000) {
            return false;
        } else {
            return true;
        }
    }

    checkFileType(type): boolean {
        if (type.indexOf('image') != -1) {
            return true;
        } else {
            return false;
        }
    }

    selectProfileImage(event) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only images are allowed', 'Error');
            return;
        }
        if (!this.checkFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 5MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.fileUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'profilePic' }
        });
        event.target.value = null;
    }

    selectOrganisationImage(event) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only images are allowed', 'Error');
            return;
        }
        if (!this.checkFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 5MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.fileOrgUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'organisationPic' }
        });
        event.target.value = null;
    }

    selectStateBuildingLicence(event) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkDocFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only pdf and images are allowed', 'Error');
            return;
        }
        if (!this.checkDocFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 20MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.stateBuildingLicenceUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'stateBuildingLicenceFile' }
        });
        event.target.value = null;
    }

    selectIncomeProtectionCertificate(event, index) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkDocFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only pdf and images are allowed', 'Error');
            return;
        }
        if (!this.checkDocFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 20MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.incomeProtectionCertificateUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'incomeProtectionCertificateFile', index: index }
        });
        event.target.value = null;
    }

    selectIncomeProtectionCertificateMulti(event, index) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkDocFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only pdf and images are allowed', 'Error');
            return;
        }
        if (!this.checkDocFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 20MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.incomeProtectionCertificateUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'incomeProtectionCertificateFile', index: index }
        });
        event.target.value = null;
    }

    selectPublicLiabilityInsuranceCertificate(event, index) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkDocFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only pdf and images are allowed', 'Error');
            return;
        }
        if (!this.checkDocFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 20MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.publicLiabilityInsuranceCertificateUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'publicLiabilityInsuranceCertificateFile', index: index }
        });
        event.target.value = null;
    }

    selectPublicLiabilityInsuranceCertificateMulti(event, index) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkDocFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only pdf and images are allowed', 'Error');
            return;
        }
        if (!this.checkDocFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 20MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.publicLiabilityInsuranceCertificateUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'publicLiabilityInsuranceCertificateFile', index: index }
        });
        event.target.value = null;
    }

    selectSWMS(event) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkDocFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only pdf and images are allowed', 'Error');
            return;
        }
        if (!this.checkDocFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 20MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.SWMSUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'SWMSFile' }
        });
        event.target.value = null;
    }

    selectABN(event) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkDocFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only pdf and images are allowed', 'Error');
            return;
        }
        if (!this.checkDocFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 20MB', 'Error');
            return;
        }
        let formData: FormData = new FormData();
        formData.append('image', event.target.files[0]);
        this.ABNUploading = true;
        this.store.dispatch({
            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE,
            payload: { data: formData, type: 'ABNFile' }
        });
        event.target.value = null;
    }

    onSubmit(formValue) {

        if (formValue.name === '' || formValue.name == null) {
            this.toastrService.clear();
            this.toastrService.error('Name is required', 'Error');
            return;
        }
        if (formValue.countryCode === '' || formValue.countryCode == null) {
            this.toastrService.clear();
            this.toastrService.error('Country code is required', 'Error');
            return;
        }
        if (formValue.mobile === '' || formValue.mobile == null) {
            this.toastrService.clear();
            this.toastrService.error('Phone number is required', 'Error');
            return;
        }
        if (formValue.email === '' || formValue.email == null) {
            this.toastrService.clear();
            this.toastrService.error('Email is required', 'Error');
            return;
        }
        if (formValue.contactName === '' || formValue.contactName == null) {
            this.toastrService.clear();
            this.toastrService.error('Contact name is required', 'Error');
            return;
        }
        if (formValue.organisationAddress.locationName === '' || formValue.organisationAddress.locationName == null) {
            delete formValue.organisationAddress.locationName;
        }
        if (formValue.organisationAddress.locationAddress === '' || formValue.organisationAddress.locationAddress == null) {
            this.toastrService.clear();
            this.toastrService.error('Address is required', 'Error');
            return;
        }
        if (formValue.organisationAddress.city === '' || formValue.organisationAddress.city == null) {
            delete formValue.organisationAddress.city;
        }
        if (formValue.organisationAddress.state === '' || formValue.organisationAddress.state == null) {
            delete formValue.organisationAddress.state;
        }
        if (formValue.organisationAddress.zipCode === '' || formValue.organisationAddress.zipCode == null) {
            delete formValue.organisationAddress.zipCode;
        }
        if (formValue.about === '' || formValue.about == null) {
            delete formValue.about;
        }
        if ((formValue.previousProject.name != '' && formValue.previousProject.name != null) ||
            (formValue.previousProject.dollarValue != '' && formValue.previousProject.dollarValue != null) ||
            (formValue.previousProject.location != '' && formValue.previousProject.location != null) ||
            (formValue.previousProject.projectDate.startDate != '' && formValue.previousProject.projectDate.startDate != null) ||
            (formValue.previousProject.projectDate.endDate != '' && formValue.previousProject.projectDate.endDate != null)) {

            if (formValue.previousProject.name === '' || formValue.previousProject.name == null) {
                this.toastrService.clear();
                this.toastrService.error('Project name is required', 'Error');
                return;
            }
            if (formValue.previousProject.dollarValue === '' || formValue.previousProject.dollarValue == null) {
                this.toastrService.clear();
                this.toastrService.error('Dollar value is required', 'Error');
                return;
            }
            if (formValue.previousProject.location === '' || formValue.previousProject.location == null) {
                this.toastrService.clear();
                this.toastrService.error('Project location is required', 'Error');
                return;
            }
            /* if(formValue.previousProject.projectDate.startDate === '' || formValue.previousProject.projectDate.startDate == null) {
                this.toastrService.clear();
                this.toastrService.error('Start date is required', 'Error');
                return;
            }
            if(formValue.previousProject.projectDate.endDate === '' || formValue.previousProject.projectDate.endDate == null) {
                this.toastrService.clear();
                this.toastrService.error('End dater is required', 'Error');
                return;
            } */
        }
        if (formValue.previousProject.name === '' || formValue.previousProject.name == null) {
            delete formValue.previousProject;
        }
        if (formValue.stateBuildingLicence.number === '' || formValue.stateBuildingLicence.number == null) {
            this.toastrService.clear();
            this.toastrService.error('State building licence number is required', 'Error');
            return;
        }
        if (formValue.stateBuildingLicence.expiryDate === '' || formValue.stateBuildingLicence.expiryDate == null || (formValue.stateBuildingLicence.expiryDate && formValue.stateBuildingLicence.expiryDate == 'Invalid Date')) {
            delete formValue.stateBuildingLicence.expiryDate;
        }
        if (formValue.incomeProtectionCertificate.number === '' || formValue.incomeProtectionCertificate.number == null) {
            this.toastrService.clear();
            this.toastrService.error('Income protection certificate number is required', 'Error');
            return;
        }
        if (formValue.incomeProtectionCertificate.expiryDate === '' || formValue.incomeProtectionCertificate.expiryDate == null || (formValue.incomeProtectionCertificate.expiryDate && formValue.incomeProtectionCertificate.expiryDate == 'Invalid Date')) {
            this.toastrService.clear();
            this.toastrService.error('Income protection certificate expiry date is required', 'Error');
            return;
        }
        if (formValue.publicLiabilityInsuranceCertificate.expiryDate === '' || formValue.publicLiabilityInsuranceCertificate.expiryDate == null || (formValue.publicLiabilityInsuranceCertificate.expiryDate && formValue.publicLiabilityInsuranceCertificate.expiryDate == 'Invalid Date')) {
            this.toastrService.clear();
            this.toastrService.error('Public liability insurance certificate expiry date is required', 'Error');
            return;
        }
        if (formValue.ABN.number === '' || formValue.ABN.number == null) {
            this.toastrService.clear();
            this.toastrService.error('ABN number is required', 'Error');
            return;
        }

        this.updateLoading = true;
        this.store.dispatch({
            type: employer.actionTypes.EDIT_THIS_EMPLOYER,
            payload: formValue
        });
    }

    approveEmployer() {
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'employer';
        dialogRef.componentInstance.singleDocAction = false;
        dialogRef.componentInstance.rejectAction = false;
        dialogRef.componentInstance.userId = this.activeEmployer._id;
        dialogRef.componentInstance.message = 'Are you sure you want to approve ' + this.activeEmployer.name + '?';
    }

    rejectEmployer() {
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'employer';
        dialogRef.componentInstance.singleDocAction = false;
        dialogRef.componentInstance.rejectAction = true;
        dialogRef.componentInstance.userId = this.activeEmployer._id;
        dialogRef.componentInstance.message = 'Are you sure you want to reject employer?';
    }

    rejectDocument(document, key, documentName) {
        let updateData;
        let doc = JSON.parse(JSON.stringify(document));
        doc.isRejected = true;
        doc.isReuploaded = false;
        updateData = {
            userID: this.activeEmployer._id,
            employerID: this.activeEmployer.employerID._id,
            organisationID: this.activeEmployer.employerID.organisationID._id,
            [key]: doc
        };
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'employer';
        dialogRef.componentInstance.singleDocAction = true;
        dialogRef.componentInstance.rejectAction = true;
        dialogRef.componentInstance.document = updateData;
        dialogRef.componentInstance.message = 'Are you sure you want to reject ' + documentName + ' document?';
    }

    approveDocument(document, key, documentName) {
        let updateData;
        let doc = JSON.parse(JSON.stringify(document));
        doc.isRejected = false;
        doc.isReuploaded = false;
        updateData = {
            userID: this.activeEmployer._id,
            employerID: this.activeEmployer.employerID._id,
            organisationID: this.activeEmployer.employerID.organisationID._id,
            [key]: doc
        };
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'employer';
        dialogRef.componentInstance.singleDocAction = true;
        dialogRef.componentInstance.rejectAction = false;
        dialogRef.componentInstance.document = updateData;
        dialogRef.componentInstance.message = 'Are you sure you want to approve ' + documentName + ' document?';
    }

    openDocument(document) {
        let dialogRef = this.dialog.open(OpenDocumentModal);
        dialogRef.componentInstance.document = document;
    }

    openEdit() {
        this.isEditable = true;
    }

    closeEdit() {
        this.getEmployer();
        this.profilePictureChange = false;
        this.organisationPictureChange = false;
        this.stateBuildingLicenceUploadingChange = false;
        this.incomeProtectionCertificateUploadingChange = false;
        this.publicLiabilityInsuranceCertificateUploadingChange = false;
        this.SWMSUploadingChange = false;
        this.ABNUploadingChange = false;
        this.isEditable = false;
    }

    goBack() {
        this.router.navigate(['pages/users/employers']);
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    _keyPressFloat(event: any) {
        const pattern = /^([0-9]*[.])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    _keyPressCountryCode(event: any) {
        const pattern = /^([+])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}

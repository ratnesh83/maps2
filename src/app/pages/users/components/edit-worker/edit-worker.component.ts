import { Component, ViewContainerRef, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as worker from '../../state/user.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { EmailValidator, EqualPasswordsValidator } from '../../../../theme/validators';
import { OpenDocumentModal } from '../open-document-modal/open-document-modal.component';
import { ConfirmModal } from '../confirm-modal/confirm-modal.component';

import 'style-loader!./edit-worker.scss';

@Component({
    selector: 'edit-worker',
    templateUrl: 'edit-worker.html',
})
export class EditWorker {

    @ViewChild('imageProfile') public _imageProfile: ElementRef;
    @ViewChild('whiteCardInput') public _whiteCardFile: ElementRef;
    @ViewChild('ABNInput') public _ABN: ElementRef;
    @ViewChild('insuranceProofInput') public _insuranceProofFile: ElementRef;
    @ViewChild('licenceInput') public _licenceFile: ElementRef;
    @ViewChild('qualificationInput') public _qualificationFile: ElementRef;
    @ViewChildren('insuranceProofsInput') public _insuranceProofFiles: QueryList<HTMLInputElement>;
    @ViewChildren('licencesInput') public _licenceFiles: QueryList<HTMLInputElement>;
    @ViewChildren('qualificationsInput') public _qualificationFiles: QueryList<HTMLInputElement>;
    public form: FormGroup;
    public userID: AbstractControl;
    public addressID: AbstractControl;
    public workerID: AbstractControl;
    public name: AbstractControl;
    public serviceType: AbstractControl;
    public mobile: AbstractControl;
    public email: AbstractControl;
    public countryCode: AbstractControl;
    public serviceLocation: FormGroup;
    public locationName: AbstractControl;
    public locationAddress: AbstractControl;
    public city: AbstractControl;
    public state: AbstractControl;
    public zipCode: AbstractControl;
    public latitude: AbstractControl;
    public longitude: AbstractControl;
    public serviceRadius: AbstractControl;
    public profilePic: AbstractControl;
    public insuranceProof: FormGroup;
    public insuranceProofExpiry: AbstractControl;
    public insuranceProofDocument: AbstractControl;
    public licence: FormGroup;
    public licenceExpiry: AbstractControl;
    public licenceDocument: AbstractControl;
    public whiteCard: FormGroup;
    public whiteCardDocument: AbstractControl;
    public ABN: FormGroup;
    public ABNExpiry: AbstractControl;
    public ABNNumber: AbstractControl;
    public ABNDocument: AbstractControl;

    public submitted: boolean = false;
    public updateLoading: boolean = false;
    public isEditable = false;

    newUserData;
    activeWorker;
    seviceTypeModel;
    profilePicture;
    insuranceProofFile;
    licenceFile;
    whiteCardFile;
    ABNFile;
    insuranceProofFiles = [];
    qualificationDocuments = [];
    licenceFiles = [];
    radii = [];
    expertise = [];
    expertiseDisplay = [];
    selectedExpertise = [];
    selectedExpertiseDisplay = [];
    machines = [];
    machinesDisplay = [];
    selectedmachines = [];
    selectedmachinesDisplay = [];
    services = [
        { value: 0, name: 'I want to work' },
        { value: 1, name: 'I want to hire' }
    ];
    profilePictureChange: boolean = false;
    organisationPictureChange: boolean = false;
    insuranceProofUploadingChange: boolean = false;
    ABNUploading: boolean = false;
    fileUploading: boolean = false;
    fileOrgUploading: boolean = false;
    licenceUploading: boolean = false;
    insuranceProofUploading: boolean = false;
    licenceUploadingChange: boolean = false;
    ABNUploadingChange: boolean = false;
    whiteCardUploading: boolean = false;
    whiteCardUploadingChange: boolean = false;
    qualificationUploading: boolean[] = [];
    fileId: string;
    file: File[] = [];
    insuranceProofFilesArray = [];
    licenceFilesArray = [];
    qualificationFilesArray = [];
    countryCodes = [];

    minDate = new Date();

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private router: Router,
        public dialog: MdDialog,
        private renderer: Renderer,
        private toastrService: ToastrService
    ) {

        this.form = fb.group({
            'userID': ['', Validators.compose([])],
            'workerID': ['', Validators.compose([])],
            'addressID': ['', Validators.compose([])],
            'name': ['', Validators.compose([])],
            'mobile': ['', Validators.compose([])],
            'email': ['', Validators.compose([])],
            'countryCode': ['', Validators.compose([])],
            'profilePic': ['', Validators.compose([])],
            'serviceType': ['', Validators.compose([])],
            'serviceLocation': fb.group({
                'locationName': [''],
                'locationAddress': ['', Validators.compose([])],
                'city': [''],
                'state': [''],
                'zipCode': [''],
                'latitude': ['', Validators.compose([])],
                'longitude': ['', Validators.compose([])],
                'serviceRadius': ['', Validators.compose([])],
            }),
            'insuranceProof': fb.group({
                'expiryDate': ['', Validators.compose([])],
                'document': ['', Validators.compose([])],
                'isRejected': [false, Validators.compose([])],
                'isReuploaded': [false, Validators.compose([])]
            }),
            'licence': fb.group({
                'expiryDate': ['', Validators.compose([])],
                'document': ['', Validators.compose([])],
                'isRejected': [false, Validators.compose([])],
                'isReuploaded': [false, Validators.compose([])]
            }),
            'whiteCard': fb.group({
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
        this.workerID = this.form.controls['workerID'];
        this.addressID = this.form.controls['addressID'];
        this.name = this.form.controls['name'];
        this.mobile = this.form.controls['mobile'];
        this.email = this.form.controls['email'];
        this.serviceType = this.form.controls['serviceType'];
        this.countryCode = this.form.controls['countryCode'];
        this.profilePic = this.form.controls['profilePic'];
        this.serviceLocation = <FormGroup>this.form.controls['serviceLocation'];
        this.locationName = this.serviceLocation.controls['locationName'];
        this.locationAddress = this.serviceLocation.controls['locationAddress'];
        this.city = this.serviceLocation.controls['city'];
        this.state = this.serviceLocation.controls['state'];
        this.zipCode = this.serviceLocation.controls['zipCode'];
        this.latitude = this.serviceLocation.controls['latitude'];
        this.longitude = this.serviceLocation.controls['longitude'];
        this.serviceRadius = this.serviceLocation.controls['serviceRadius'];
        this.insuranceProof = <FormGroup>this.form.controls['insuranceProof'];
        this.insuranceProofDocument = this.insuranceProof.controls['document'];
        this.insuranceProofExpiry = this.insuranceProof.controls['expiryDate'];
        this.licence = <FormGroup>this.form.controls['licence'];
        this.licenceDocument = this.licence.controls['document'];
        this.licenceExpiry = this.licence.controls['expiryDate'];
        this.whiteCard = <FormGroup>this.form.controls['whiteCard'];
        this.whiteCardDocument = this.whiteCard.controls['document'];
        this.ABN = <FormGroup>this.form.controls['ABN'];
        this.ABNDocument = this.ABN.controls['document'];
        this.ABNExpiry = this.ABN.controls['expiryDate'];
        this.ABNNumber = this.ABN.controls['number'];
        this.fileId = null;
        this.file = [];

        this.store
            .select('worker')
            .subscribe((res: any) => {
                if (res.activeWorker) {
                    this.activeWorker = res.activeWorker.worker;
                }
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
                //console.log(res);
                if (!res.uploadFileProcess && !res.uploadFileSuccess && !res.uploadMultipleFilesProcess && !res.uploadMultipleFilesSuccess && !res.editWorkerProcess) {
                    if (res.settings) {
                        this.radii = res.settings[0].radius;
                    }

                    if (res.qualifications) {

                    }

                    if (res.equipments) {
                        this.machines = [];
                        for (let i = 0; i < res.equipments.length; i++) {
                            if (res.equipments[i].parentID == null || res.equipments[i].parentID == undefined) {
                                this.machines.push(res.equipments[i]);
                            }
                        }

                        for (let j = 0; j < this.machines.length; j++) {
                            let children = [];
                            let i = 0;
                            for (; i < res.equipments.length; i++) {
                                if (this.machines[j]._id === res.equipments[i].parentID) {
                                    children.push(res.equipments[i]);
                                }
                            }
                            this.machines[j].childern = children;
                        }
                    }

                    if (res.expertise) {
                        this.expertise = [];
                        this.expertiseDisplay = [];
                        for (let i = 0; i < res.expertise.length; i++) {
                            this.expertise.push(res.expertise[i]);
                            let expert = {
                                id: res.expertise[i]._id,
                                text: res.expertise[i].expertiseName
                            };
                            this.expertiseDisplay.push(expert);
                        }
                    }

                    if (this.activeWorker) {
                        this.name.setValue(this.activeWorker.name);
                        this.email.setValue(this.activeWorker.email);
                        if (this.activeWorker.workerID.insuranceProof) {
                            if (this.insuranceProofUploadingChange == false) {
                                this.insuranceProofFile = this.activeWorker.workerID.insuranceProof.document[0];
                                this.insuranceProofFiles = this.activeWorker.workerID.insuranceProof.document;
                                this.insuranceProofDocument.setValue(this.activeWorker.workerID.insuranceProof.document);
                            }
                            this.insuranceProofExpiry.setValue(new Date(this.activeWorker.workerID.insuranceProof.expiryDate));
                        }

                        if (this.activeWorker.workerID.serviceType != undefined) {
                            this.serviceType.setValue(this.activeWorker.workerID.serviceType);
                        }

                        if (this.activeWorker.workerAddressID) {
                            this.addressID.setValue(this.activeWorker.workerAddressID._id);
                            this.locationName.setValue(this.activeWorker.workerAddressID.locationName);
                            this.locationAddress.setValue(this.activeWorker.workerAddressID.locationAddress);
                            this.latitude.setValue(this.activeWorker.workerAddressID.latitude);
                            this.longitude.setValue(this.activeWorker.workerAddressID.longitude);
                            this.city.setValue(this.activeWorker.workerAddressID.city);
                            this.state.setValue(this.activeWorker.workerAddressID.state);
                            this.zipCode.setValue(this.activeWorker.workerAddressID.zipCode);
                            this.serviceRadius.setValue(this.activeWorker.workerAddressID.serviceRadius);
                        }

                        if (this.activeWorker.workerID.machineID && this.activeWorker.workerID.machineID.length > 0) {

                        }

                        if (this.activeWorker.workerID.qualification && this.activeWorker.workerID.qualification.length > 0) {
                            this.qualificationDocuments = this.activeWorker.workerID.qualification;
                            for (let i = 0; i < this.activeWorker.workerID.qualification.length; i++) {
                                this.qualificationUploading[i] = false;
                            }
                        }

                        if (this.activeWorker.workerID.expertiseID && this.activeWorker.workerID.expertiseID.length > 0) {
                            this.selectedExpertise = [];
                            this.selectedExpertiseDisplay = [];
                            for (let i = 0; i < this.activeWorker.workerID.expertiseID.length; i++) {
                                for (let j = 0; j < this.expertise.length; j++) {
                                    if (this.expertise[j]._id === this.activeWorker.workerID.expertiseID[i]._id) {
                                        this.selectedExpertise.push(this.expertise[j]);
                                        let expert = {
                                            id: this.expertise[j]._id,
                                            text: this.expertise[j].expertiseName
                                        };
                                        this.selectedExpertiseDisplay.push(expert);
                                        break;
                                    }
                                }
                            }
                        }

                        if (this.activeWorker.workerID.licence) {
                            if (this.licenceUploadingChange == false) {
                                this.licenceFile = this.activeWorker.workerID.licence.document[0];
                                this.licenceFiles = this.activeWorker.workerID.licence.document;
                                this.licenceDocument.setValue(this.activeWorker.workerID.licence.document);
                            }
                            this.licenceExpiry.setValue(new Date(this.activeWorker.workerID.licence.expiryDate));
                        }

                        if (this.activeWorker.workerID.whiteCard) {
                            if (this.whiteCardUploadingChange == false) {
                                this.whiteCardFile = this.activeWorker.workerID.licence.document;
                                this.whiteCardDocument.setValue(this.activeWorker.workerID.whiteCard.document);
                            }
                        }

                        if (this.activeWorker.workerID.ABN) {
                            if (this.ABNUploadingChange == false) {
                                this.ABNFile = this.activeWorker.workerID.ABN.document;
                                this.ABNDocument.setValue(this.activeWorker.workerID.ABN.document);
                            }
                            this.ABNExpiry.setValue(new Date(this.activeWorker.workerID.ABN.expiryDate));
                            this.ABNNumber.setValue(this.activeWorker.workerID.ABN.number);
                        }
                    }

                    if (this.activeWorker && this.activeWorker.workerID) {
                        this.userID.setValue(this.activeWorker._id);
                        this.workerID.setValue(this.activeWorker.workerID._id);
                        if (this.profilePictureChange == false) {
                            if (this.activeWorker.workerID.profilePic) {
                                this.profilePic.setValue(this.activeWorker.workerID.profilePic);
                                this.profilePicture = this.activeWorker.workerID.profilePic;
                            } else {
                                this.form.removeControl('profilePic');
                            }
                        }
                    }

                    if (this.activeWorker && this.activeWorker.contacts && this.activeWorker.contacts.length > 0 && this.activeWorker.contacts[0].mobile) {
                        this.mobile.setValue(this.activeWorker.contacts[0].mobile);
                        this.countryCode.setValue(this.activeWorker.contacts[0].countryCode);
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

                    if (res.fileUpload.type == 'insuranceProofFile') {
                        let files = [];
                        if (this.insuranceProofFiles && this.insuranceProofFiles.length > 0) {
                            files = this.insuranceProofFiles;
                        }
                        files[res.fileUpload.index] = res.fileUpload.fileUploadUrl;
                        this.insuranceProofUploading = false;
                        this.insuranceProofFile = res.fileUpload.fileUploadUrl;
                        this.insuranceProofFiles = files;
                        this.insuranceProofUploadingChange = true;
                        this.insuranceProofDocument.setValue(files);
                    }
                    if (res.fileUpload.type == 'licenceFile') {
                        let files = [];
                        if (this.licenceFiles && this.licenceFiles.length > 0) {
                            files = this.licenceFiles;
                        }
                        files[res.fileUpload.index] = res.fileUpload.fileUploadUrl;
                        this.licenceUploading = false;
                        this.licenceFile = res.fileUpload.fileUploadUrl;
                        this.licenceFiles = files;
                        this.licenceUploadingChange = true;
                        this.licenceDocument.setValue(files);
                    }
                    if (res.fileUpload.type == 'qualificationFile') {
                        let files = [];
                        if (this.qualificationDocuments[res.fileUpload.parentIndex] && this.qualificationDocuments[res.fileUpload.parentIndex].document && this.qualificationDocuments[res.fileUpload.parentIndex].document.length > 0) {
                            files = this.qualificationDocuments[res.fileUpload.parentIndex].document;
                        }
                        files[res.fileUpload.index] = res.fileUpload.fileUploadUrl;
                        this.qualificationUploading[res.fileUpload.parentIndex] = false;
                        this.qualificationDocuments[res.fileUpload.parentIndex].document = files;
                    }
                    if (res.fileUpload.type == 'whiteCardFile') {
                        this.whiteCardUploading = false;
                        this.whiteCardFile = res.fileUpload.fileUploadUrl;
                        this.whiteCardUploadingChange = true;
                        this.whiteCardDocument.setValue(res.fileUpload.fileUploadUrl);
                    }
                    if (res.fileUpload.type == 'ABNFile') {
                        this.ABNUploading = false;
                        this.ABNFile = res.fileUpload.fileUploadUrl;
                        this.ABNUploadingChange = true;
                        this.ABNDocument.setValue(res.fileUpload.fileUploadUrl);
                    }
                }

                if (res.editWorkerSuccess) {
                    this.isEditable = false;
                    this.updateLoading = false;
                }

                if (res.error) {
                    this.updateLoading = false;
                    this.fileUploading = false;
                    this.insuranceProofUploading = false;
                    this.licenceUploading = false;
                    this.ABNUploading = false;
                    this.whiteCardUploading = false;
                    for (let i = 0; i < this.qualificationUploading.length; i++) {
                        this.qualificationUploading[i] = false;
                    }
                }
            });
    };

    getWorker() {
        if (localStorage.getItem('editWorkerId') != undefined) {
            this.store.dispatch({
                type: worker.actionTypes.APP_GET_WORKER_DETAIL,
                payload: {
                    userId: localStorage.getItem('editWorkerId')
                }
            });
        }
    }

    ngOnInit() {
        this.onLoad();
        this.store.dispatch({
            type: worker.actionTypes.GET_COUNTRY_CODE
        });
        this.countries = this.countryCode.valueChanges
            .startWith(null)
            .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
    }

    countries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
    }

    ngOnDestroy() {
        localStorage.removeItem('editWorkerId');
    }

    onLoad() {
        this.getWorker();
    };

    public refreshValue(value) {
        let selectedExpertise = [];
        for (let i = 0; i < this.expertise.length; i++) {
            for (let j = 0; j < value.length; j++) {
                if (value[j].id === this.expertise[i]._id) {
                    selectedExpertise.push(this.expertise[i]);
                    break;
                }
            }
        }
        this.selectedExpertise = selectedExpertise;
    }

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

    approveWorker() {
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'worker';
        dialogRef.componentInstance.singleDocAction = false;
        dialogRef.componentInstance.rejectAction = false;
        dialogRef.componentInstance.userId = this.activeWorker._id;
        dialogRef.componentInstance.message = 'Are you sure you want to approve ' + this.activeWorker.name + '?';
    }

    rejectDocument(document, key, documentName) {
        let updateData;
        let doc = JSON.parse(JSON.stringify(document));
        doc.isRejected = true;
        doc.isReuploaded = false;
        updateData = {
            userID: this.activeWorker._id,
            workerID: this.activeWorker.workerID._id,
            [key]: doc
        };
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'worker';
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
            userID: this.activeWorker._id,
            workerID: this.activeWorker.workerID._id,
            [key]: doc
        };
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'worker';
        dialogRef.componentInstance.singleDocAction = true;
        dialogRef.componentInstance.rejectAction = false;
        dialogRef.componentInstance.document = updateData;
        dialogRef.componentInstance.message = 'Are you sure you want to approve ' + documentName + ' document?';
    }

    approveQualificationDocument(document, index) {
        let updateData;
        let doc = JSON.parse(JSON.stringify(document));
        doc[index].name.isRejected = false;
        doc[index].name.isReuploaded = false;
        updateData = {
            userID: this.activeWorker._id,
            workerID: this.activeWorker.workerID._id,
            qualification: doc
        };
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'worker';
        dialogRef.componentInstance.singleDocAction = true;
        dialogRef.componentInstance.rejectAction = false;
        dialogRef.componentInstance.document = updateData;
        dialogRef.componentInstance.message = 'Are you sure you want to approve document?';
    }

    rejectQualificationDocument(document, index) {
        let updateData;
        let doc = JSON.parse(JSON.stringify(document));
        doc[index].name.isRejected = true;
        doc[index].name.isReuploaded = false;
        updateData = {
            userID: this.activeWorker._id,
            workerID: this.activeWorker.workerID._id,
            qualification: doc
        };
        let dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.userType = 'worker';
        dialogRef.componentInstance.singleDocAction = true;
        dialogRef.componentInstance.rejectAction = true;
        dialogRef.componentInstance.document = updateData;
        dialogRef.componentInstance.message = 'Are you sure you want to reject document?';
    }

    bringFileSelector(value): boolean {
        switch (value) {
            case 1: this.renderer.invokeElementMethod(this._imageProfile.nativeElement, 'click');
                break;
            case 2: this.renderer.invokeElementMethod(this._insuranceProofFile.nativeElement, 'click');
                break;
            case 3: this.renderer.invokeElementMethod(this._licenceFile.nativeElement, 'click');
                break;
            case 4: this.renderer.invokeElementMethod(this._whiteCardFile.nativeElement, 'click');
                break;
            case 5: this.renderer.invokeElementMethod(this._ABN.nativeElement, 'click');
                break;
            case 6: this.renderer.invokeElementMethod(this._qualificationFile.nativeElement, 'click');
                break;
            default:
                break;
        }
        return false;
    }

    bringFilesSelector(index, value): boolean {
        switch (value) {
            case 1: this.renderer.invokeElementMethod(this.insuranceProofFilesArray[index].nativeElement, 'click');
                break;
            case 2: this.renderer.invokeElementMethod(this.licenceFilesArray[index].nativeElement, 'click');
                break;
            case 3: this.renderer.invokeElementMethod(this.qualificationFilesArray[index].nativeElement, 'click');
                break;
            default:
                break;
        }
        return false;
    }

    ngAfterViewInit() {
        this.insuranceProofFilesArray = this._insuranceProofFiles.toArray();
        this.licenceFilesArray = this._licenceFiles.toArray();
        this.qualificationFilesArray = this._qualificationFiles.toArray();
        this._insuranceProofFiles.changes.subscribe(childern => {
            this.insuranceProofFilesArray = childern.toArray();
        });
        this._licenceFiles.changes.subscribe(childern => {
            this.licenceFilesArray = childern.toArray();
        });
        this._qualificationFiles.changes.subscribe(childern => {
            this.qualificationFilesArray = childern.toArray();
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
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'profilePic' }
        });
        event.target.value = null;
    }

    selectInsuranceProof(event, index) {
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
        this.insuranceProofUploading = true;
        formData.append('image', event.target.files[0]);
        this.store.dispatch({
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'insuranceProofFile', index: index }
        });
        event.target.value = null;
    }

    selectInsuranceProofMulti(event, index) {
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
        this.insuranceProofUploading = true;
        formData.append('image', event.target.files[0]);
        this.store.dispatch({
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'insuranceProofFile', index: index }
        });
        event.target.value = null;
    }

    selectLicence(event, index) {
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
        this.licenceUploading = true;
        this.store.dispatch({
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'licenceFile', index: index }
        });
        event.target.value = null;
    }

    selectLicenceMulti(event, index) {
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
        this.licenceUploading = true;
        this.store.dispatch({
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'licenceFile', index: index }
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
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'ABNFile' }
        });
        event.target.value = null;
    }

    selectWhiteCard(event) {
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
        this.whiteCardUploading = true;
        this.store.dispatch({
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'whiteCardFile' }
        });
        event.target.value = null;
    }

    selectQualification(event, index, parentIndex) {
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
        this.qualificationUploading[parentIndex] = true;
        this.store.dispatch({
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'qualificationFile', index: index, parentIndex: parentIndex }
        });
        event.target.value = null;
    }

    selectQualificationMulti(event, index, parentIndex) {
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
        this.qualificationUploading[parentIndex] = true;
        this.store.dispatch({
            type: worker.actionTypes.UPLOAD_WORKER_FILE,
            payload: { data: formData, type: 'qualificationFile', index: index, parentIndex: parentIndex }
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
        if (formValue.serviceLocation.locationName === '' || formValue.serviceLocation.locationName == null) {
            delete formValue.serviceLocation.locationName;
        }
        if (formValue.serviceLocation.locationAddress === '' || formValue.serviceLocation.locationAddress == null) {
            this.toastrService.clear();
            this.toastrService.error('Location address is required', 'Error');
            return;
        }
        if (formValue.serviceLocation.city === '' || formValue.serviceLocation.city == null) {
            delete formValue.serviceLocation.city;
        }
        if (formValue.serviceLocation.state === '' || formValue.serviceLocation.state == null) {
            delete formValue.serviceLocation.state;
        }
        if (formValue.serviceLocation.zipCode === '' || formValue.serviceLocation.zipCode == null) {
            delete formValue.serviceLocation.zipCode;
        }
        if (formValue.serviceLocation.serviceRadius == null || formValue.serviceLocation.serviceRadius === '') {
            this.toastrService.clear();
            this.toastrService.error('Service radius is required', 'Error');
            return;
        }
        if (formValue.serviceType == null || formValue.serviceType === '') {
            this.toastrService.clear();
            this.toastrService.error('Service type is required', 'Error');
            return;
        }
        if (formValue.insuranceProof.expiryDate === '' || formValue.insuranceProof.expiryDate == null || (formValue.insuranceProof.expiryDate && formValue.insuranceProof.expiryDate == 'Invalid Date')) {
            this.toastrService.clear();
            this.toastrService.error('Insurance proof expiry date is required', 'Error');
            return;
        }
        if (formValue.licence.expiryDate === '' || formValue.licence.expiryDate == null || (formValue.licence.expiryDate && formValue.licence.expiryDate == 'Invalid Date')) {
            this.toastrService.clear();
            this.toastrService.error('License expiry date is required', 'Error');
            return;
        }
        if (formValue.ABN.number === '' || formValue.ABN.number == null) {
            this.toastrService.clear();
            this.toastrService.error('ABN number is required', 'Error');
            return;
        }
        formValue.expertiseID = this.selectedExpertise;
        formValue.qualification = this.qualificationDocuments;
        this.updateLoading = true;
        this.store.dispatch({
            type: worker.actionTypes.EDIT_THIS_WORKER,
            payload: formValue
        });
    }

    openDocument(document) {
        let dialogRef = this.dialog.open(OpenDocumentModal);
        dialogRef.componentInstance.document = document;
    }

    openEdit() {
        this.isEditable = true;
    }

    closeEdit() {
        this.getWorker();
        this.profilePictureChange = false;
        this.insuranceProofUploadingChange = false;
        this.licenceUploadingChange = false;
        this.whiteCardUploadingChange = false;
        this.ABNUploadingChange = false;
        this.isEditable = false;
    }

    goBack() {
        this.router.navigate(['pages/users/workers']);
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
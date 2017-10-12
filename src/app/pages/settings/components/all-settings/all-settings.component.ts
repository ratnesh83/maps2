import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as setting from '../../state/setting.actions';
import * as app from '../../../../state/app.actions';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./all-settings.scss';

@Component({
    selector: 'all-settings',
    templateUrl: './all-settings.html',
})
export class AllSettings {

    @ViewChild('file') public _fileUpload: ElementRef;
    @ViewChildren('file') public _filesUpload: QueryList<HTMLInputElement>;
    @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
    @ViewChild('scrollBottomQual') private _scrollContainerQual: ElementRef;
    @ViewChild('scrollBottomExp') private _scrollContainerExp: ElementRef;
    @ViewChild('machineName') private _machineName: ElementRef;
    @ViewChild('qualificationName') private _qualificationName: ElementRef;
    @ViewChild('expertiseName') private _expertiseName: ElementRef;
    public settings;
    public form: FormGroup;
    public serviceRadii: AbstractControl;
    public editRadius: boolean = false;
    public imageUploading: boolean = false;
    public editQualification: boolean = false;
    public editExpertise: boolean[] = [];
    public showChildEquipments: boolean[] = [];
    public showAllChildEquipments: boolean = false;
    public equipmentImage;
    public equipmentsData;
    public qualificationsData;
    public expertiseData;
    public radii;
    public fileUploadIndex;
    public imageUploadChildrenArray;
    public settingStore;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private renderer: Renderer
    ) {

        this.form = fb.group({
            'serviceRadii': ['', Validators.compose([Validators.pattern(/^(\d+(,\d+)*)?$/)])],
            'qualifications': this.fb.array([
                this.initQualification(null),
            ]),
            'expertise': this.fb.array([
                this.initExpertise(null),
            ]),
            'equipments': this.fb.array([
                this.initEquipments(null),
            ])
        });

        this.serviceRadii = this.form.controls['serviceRadii'];

        this.form.get('serviceRadii').disable();

        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {
                // console.log(res);
                if (res.setServiceRadiiSuccess) {
                    this.form.get('serviceRadii').disable();
                    this.editRadius = false;
                }
                if (res.setQualificationSuccess) {

                }
                if (res.setExpertiseSuccess) {

                }
                if (res.deleteQualificationSuccess) {

                }
                if (res.updateExpertiseSuccess) {
                    const control = <FormArray>this.form.controls['expertise'];
                    if (res.updateRequest && res.updateRequest.deleteRequest) {
                        // control.removeAt(res.updateRequest.deleteIndex);
                    }
                }
                if (res.settings) {
                    if (!res.setServiceRadiiProcess && !res.setExpertiseProcess && !res.deleteQualificationProcess && !res.updateExpertiseProcess && !res.updateEquipmentProcess && !res.addMachineProcess) {
                        this.settings = res.settings[0];
                        this.serviceRadii.setValue(res.settings[0].radius);
                        this.radii = res.settings[0].radius;
                    }
                }
                if (res.equipments && !res.uploadFileProcess && !res.uploadFileSuccess) {
                    this.addEquipmentsWithValue(res.equipments.machineData);
                    this.equipmentsData = res.equipments.machineData;
                }
                if (res.qualifications) {
                    if (!res.setQualificationProcess && !res.deleteQualificationProcess) {
                        this.addQualificationWithValue(res.qualifications);
                    }
                    this.qualificationsData = res.qualifications;
                }
                if (res.expertise) {
                    if (!res.setExpertiseProcess && !res.updateExpertiseProcess) {
                        let expert = [];
                        for (let i = 0; i < res.expertise.length; i++) {
                            expert.push(res.expertise[i]);
                        }
                        this.addExpertiseWithValue(expert);
                    }
                    this.expertiseData = res.expertise;
                }

                if (res.fileUpload) {
                    this.imageUploading = false;
                    const control = <FormArray>this.form.controls['equipments'];
                    control.controls[res.fileUpload.index].get('picture').setValue(res.fileUpload.fileUploadUrl);
                    this.equipmentImage = res.fileUpload.fileUploadUrl;
                    this.fileUploadIndex = -1;
                }

                if (res.error) {
                    this.imageUploading = false;
                    this.fileUploadIndex = -1;
                }
            });
    };

    toggleAllChildEquipments(data) {
        const control = <FormArray>this.form.controls['equipments'];
        for (let i = 0; i < control.length; i++) {
            if (this.showAllChildEquipments == false) {
                this.showChildEquipments[i] = true;

            } else {
                this.showChildEquipments[i] = false;
            }
        }
        this.showAllChildEquipments = !this.showAllChildEquipments;
    }

    toggleChildEquipments(data, index) {
        if (this.showChildEquipments[index] == undefined) {
            this.showChildEquipments[index] = true;
        } else {
            this.showChildEquipments[index] = !this.showChildEquipments[index];
        }
    }

    initEquipments(value) {
        if (value) {
            return this.fb.group({
                'id': [value._id],
                'machineName': [value.machineName, Validators.required],
                'picture': [value.picture],
                'icon': [value.icon],
                'description': [value.description],
                'isDeleted': [value.isDeleted],
                'hasChild': [value.hasChild],
                'parentID': [value.parentID],
                'disable': [true],
                'children': this.fb.array(
                    this.addChildEquipmentsWithValue(value.children)
                )
            });
        } else {
            return this.fb.group({
                'machineName': ['', Validators.required],
                'picture': [''],
                'icon': [''],
                'description': [''],
                'isDeleted': [false],
                'disable': [false],
                'children': this.fb.array([])
            });
        }
    }

    bringFileSelector(): boolean {
        this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    }

    bringFilesSelector(index): boolean {
        this.renderer.invokeElementMethod(this.imageUploadChildrenArray[index].nativeElement, 'click');
        return false;
    }

    addChildEquipmentsWithValue(values): any[] {
        let childArray = [];
        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            childArray.push(this.fb.group({
                'id': [value._id],
                'machineName': [value.machineName, Validators.required],
                'picture': [value.picture],
                'icon': [value.icon],
                'description': [value.description],
                'isDeleted': [value.isDeleted],
                'hasChild': [value.hasChild],
                'parentID': [value.parentID],
                'disable': [true]
            }));
        }
        childArray.push(this.fb.group({
            'machineName': ['', Validators.required],
            'picture': [''],
            'icon': [''],
            'description': [''],
            'isDeleted': [false],
            'disable': [false]
        }));
        return childArray;
    }

    scrollToBottom() {
        if (this._machineName) {
            setTimeout(() => {
                this._machineName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainer.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    scrollToBottomQual() {
        if (this._qualificationName) {
            setTimeout(() => {
                this._qualificationName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    scrollToBottomExp() {
        if (this._expertiseName) {
            setTimeout(() => {
                this._expertiseName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainerExp.nativeElement.scrollHeight + this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    addEquipmentsWithValue(values) {
        this.form.controls['equipments'] = this.fb.array([]);
        const control = <FormArray>this.form.controls['equipments'];
        let newValues = [];
        for (let i = 0; i < values.length; i++) {
            if (values[i].parentID == null) {
                values[i].children = [];
                for (let j = 0; j < values.length; j++) {
                    if (values[i]._id == values[j].parentID) {
                        values[i].children.push(values[j]);
                    }
                }
                newValues.push(values[i]);
            }
        }
        for (let i = 0; i < newValues.length; i++) {
            let value = newValues[i];
            control.push(this.initEquipments(value));
            control.at(i).disable();
            let childControl = <FormArray>control.controls[i].get('children');
            childControl.at(childControl.length - 1).enable();
        }
        control.push(this.initEquipments(null));
    }

    initQualification(value) {
        if (value) {
            return this.fb.group({
                'id': [value._id],
                'qualification': [value.qualificationName, Validators.required],
                'specialization': [value.specialization, Validators.required],
                'description': [value.description, Validators.required],
                'isDeleted': [value.isDeleted],
                'disable': [true]
            });
        } else {
            return this.fb.group({
                'qualification': ['', Validators.required],
                'specialization': ['', Validators.required],
                'description': ['', Validators.required],
                'isDeleted': [false],
                'disable': [false]
            });
        }
    }

    addQualification(qualification, specialization, description) {
        this.store.dispatch({
            type: setting.actionTypes.APP_SET_QUALIFICATION,
            payload: {
                qualificationName: qualification.value,
                specialization: specialization.value,
                description: description.value
            }
        });
    }

    addQualificationWithValue(values) {
        this.form.controls['qualifications'] = this.fb.array([]);
        const control = <FormArray>this.form.controls['qualifications'];
        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            control.push(this.initQualification(value));
        }
        control.disable();
        control.push(this.initQualification(null));
    }

    updateQualification(index, control, isDeleted, controlName, controlSpecial, controlDesc, disableControl) {
        if (!disableControl.value) {
            if (controlName.invalid) {
                let message = 'Qualification name is required';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            if (controlSpecial.invalid) {
                let message = 'Qualification specialization is required';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            if (controlDesc.invalid) {
                let message = 'Qualification description is required';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            this.store.dispatch({
                type: setting.actionTypes.APP_DELETE_QUALIFICATION,
                payload: {
                    index: index,
                    ID: {
                        qualificationID: control.value,
                        qualificationData: {
                            qualificationName: controlName.value,
                            specialization: controlSpecial.value,
                            description: controlDesc.value,
                            isDeleted: isDeleted
                        }
                    }
                }
            });
        } else {
            const ctrl = <FormArray>this.form.controls['qualifications'];
            ctrl.at(index).enable();
            disableControl.setValue(false);
        }
    }

    initExpertise(value) {
        if (value) {
            return this.fb.group({
                'id': [value._id],
                'expertiseName': [value.expertiseName, Validators.required],
                'isDeleted': [value.isDeleted],
                'disable': [true]
            });
        } else {
            return this.fb.group({
                'expertiseName': ['', Validators.required],
                'isDeleted': [false],
                'disable': [false]
            });
        }
    }

    addExpertise(expertiseName) {
        this.store.dispatch({
            type: setting.actionTypes.APP_SET_EXPERTISE,
            payload: {
                expertiseName: expertiseName.value,
            }
        });
    }

    addEquipment(machineName, description, picture) {
        let equipment = {
            machineName: machineName.value,
            description: description.value,
            picture: picture.value,
            hasChild: true
        };
        if (!description.value) {
            delete equipment.description;
        }
        if (!picture.value) {
            delete equipment.picture;
        }
        this.store.dispatch({
            type: setting.actionTypes.APP_ADD_MACHINE,
            payload: equipment
        });
    }

    addChildEquipment(machineName, parentID) {
        this.store.dispatch({
            type: setting.actionTypes.APP_ADD_MACHINE,
            payload: {
                parentID: parentID.value,
                machineName: machineName.value,
                hasChild: false
            }
        });
    }

    removeEquipment(index, IDControl, nameControl) {
        this.store.dispatch({
            type: setting.actionTypes.APP_UPDATE_EQUIPMENTS,
            payload: {
                index: index,
                deleteRequest: true,
                ID: {
                    machineID: IDControl.value,
                    machineData: {
                        machineName: nameControl.value,
                        isDeleted: true,
                        hasChild: true
                    }
                }
            }
        });
    }

    removeChildEquipment(index, IDControl, nameControl, parentIDControl) {
        this.store.dispatch({
            type: setting.actionTypes.APP_UPDATE_EQUIPMENTS,
            payload: {
                index: index,
                deleteRequest: true,
                ID: {
                    machineID: IDControl.value,
                    machineData: {
                        machineName: nameControl.value,
                        parentID: parentIDControl.value,
                        isDeleted: true,
                        hasChild: true
                    }
                }
            }
        });
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

    selectImage(event, index) {
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
        this.imageUploading = true;
        this.fileUploadIndex = index;
        this.equipmentImage = null;
        this.store.dispatch({
            type: setting.actionTypes.UPLOAD_FILE,
            payload: {
                data: formData,
                index: index
            }
        });
        event.target.value = null;
    }

    addExpertiseWithValue(values) {
        this.form.controls['expertise'] = this.fb.array([]);
        const control = <FormArray>this.form.controls['expertise'];
        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            control.push(this.initExpertise(value));
        }
        control.disable();
        control.push(this.initExpertise(null));
    }

    removeExpertise(index, IDControl, nameControl) {
        this.store.dispatch({
            type: setting.actionTypes.APP_UPDATE_EXPERTISE,
            payload: {
                index: index,
                deleteRequest: true,
                ID: {
                    expertiseID: IDControl.value,
                    expertiseName: nameControl.value,
                    isDeleted: true
                }
            }
        });
    }

    updateEquipment(index, IDControl, nameControl, disableControl, isDeleted, descriptionControl, pictureControl) {
        if (!disableControl.value) {
            if (nameControl.invalid) {
                let message = 'Equipment Name is required';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            let equipment = {
                machineName: nameControl.value,
                description: descriptionControl.value,
                picture: pictureControl.value,
                isDeleted: isDeleted,
                hasChild: true
            };
            if (!descriptionControl.value) {
                delete equipment.description;
            }
            if (!pictureControl.value) {
                delete equipment.picture;
            }
            this.store.dispatch({
                type: setting.actionTypes.APP_UPDATE_EQUIPMENTS,
                payload: {
                    index: index,
                    ID: {
                        machineID: IDControl.value,
                        machineData: equipment
                    }
                }
            });
        } else {
            const control = <FormArray>this.form.controls['equipments'];
            control.at(index).enable();
            let childControl = <FormArray>control.controls[index].get('children');
            for (let i = 0; i < childControl.length - 1; i++) {
                childControl.at(i).disable();
            }
            disableControl.setValue(false);
        }
    }

    updateChildEquipment(index, IDControl, nameControl, parentIDControl, disableControl, isDeleted, parentIndex) {
        if (!disableControl.value) {
            if (nameControl.invalid) {
                let message = 'Expertise is required';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            this.store.dispatch({
                type: setting.actionTypes.APP_UPDATE_EQUIPMENTS,
                payload: {
                    index: index,
                    ID: {
                        machineID: IDControl.value,
                        machineData: {
                            machineName: nameControl.value,
                            parentID: parentIDControl.value,
                            isDeleted: isDeleted,
                            hasChild: false
                        }
                    }
                }
            });
        } else {
            const control = <FormArray>this.form.controls['equipments'];
            let childControl = <FormArray>control.controls[parentIndex].get('children');
            childControl.at(index).enable();
            disableControl.setValue(false);
        }
    }

    updateExpertise(index, IDControl, nameControl, disableControl, isDeleted) {
        if (!disableControl.value) {
            if (nameControl.invalid) {
                let message = 'Expertise is required';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            this.store.dispatch({
                type: setting.actionTypes.APP_UPDATE_EXPERTISE,
                payload: {
                    index: index,
                    ID: {
                        expertiseID: IDControl.value,
                        expertiseName: nameControl.value,
                        isDeleted: isDeleted
                    }
                }
            });
        } else {
            const control = <FormArray>this.form.controls['expertise'];
            control.at(index).enable();
            disableControl.setValue(false);
        }
    }

    getServiceRadii() {
        this.store.dispatch({
            type: setting.actionTypes.APP_GET_SERVICE_RADIUS,
            payload: {}
        });
    }

    ngOnInit() {
        this.getServiceRadii();
    }

    ngOnDestroy() {
        /* if (this.settingStore) {
            this.settingStore.unsubscribe();
        } */
    }

    ngAfterViewInit() {
        this.imageUploadChildrenArray = this._filesUpload.toArray();
        this._filesUpload.changes.subscribe(childern => {
            this.imageUploadChildrenArray = childern.toArray();
        });
    }

    submitServiceRadii() {
        if (this.editRadius) {
            if (this.radii == '' || this.radii == undefined || this.radii == null) {
                let message = 'Radius is required';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            if (this.form.controls['serviceRadii'].invalid) {
                let message = 'Radius must be in csv format';
                let title = 'Error';
                this.toastrService.clear();
                this.toastrService.error(message, title);
                return;
            }
            let radius = this.radii.toString().split(',');
            radius = radius.sort(function (a, b) { return (a - b); });
            for (let i = 0; i < radius.length - 1; i++) {
                if (radius[i] == radius[i + 1]) {
                    radius.splice(i, 1);
                }
            }
            this.store.dispatch({
                type: setting.actionTypes.APP_SET_SERVICE_RADIUS,
                payload: {
                    radius: radius
                }
            });
        } else {
            this.form.get('serviceRadii').enable();
            this.editRadius = true;
        }
    }

    _keyPressCsvNumber(event: any) {
        const pattern = /^[0-9,]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}
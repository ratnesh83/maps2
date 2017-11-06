import { Component, ChangeDetectorRef, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { DataService } from '../../../services/data-service/data.service';
import { FileUploader } from 'ng2-file-upload';

import 'style-loader!./document.scss';

declare const FB: any;

@Component({
    selector: 'document',
    templateUrl: './document.html',
})
export class Documents {

    @ViewChild('profilePictureInput') public _profilePicture: ElementRef;
    @ViewChildren('documentInput') public _document: QueryList<HTMLInputElement>;
    @ViewChildren('inputDocumentsName') public _documents: QueryList<HTMLInputElement>;
    @ViewChild('inputDocumentName') public _documentName: ElementRef;
    public storeData;
    public form: FormGroup;
    public profilePicture: AbstractControl;
    public documentName: AbstractControl;
    public documents: AbstractControl;
    public uploader: FileUploader[] = [];
    public hasBaseDropZoneOver: boolean = false;
    public userId;
    public documentArray;
    public documentsArray;

    public submitted: boolean = false;

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private renderer: Renderer,
        private toastrService: ToastrService,
        private dataService: DataService,
        private cdRef: ChangeDetectorRef) {

        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {

            });

        this.form = this.fb.group({
            'profilePicture': [''],
            'documentName': [''],
            'documents': fb.array([this.initDocument()])
        });
        this.uploader.push(new FileUploader({ url: '' }));
        this.profilePicture = this.form.controls['profilePicture'];
        this.documentName = this.form.controls['documentName'];
        this.documents = this.form.controls['documents'];
    }

    ngOnInit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
    }

    ngOnDestroy() {
        if (this.storeData) {
            //this.storeData.unsubscribe();
        }
    }

    fileOverBase(e) {
        this.hasBaseDropZoneOver = e;
    }

    checkFileSize(size): boolean {
        if (size > 20000000) {
            return false;
        } else {
            return true;
        }
    }

    checkFileType(type): boolean {
        if (type.indexOf('image') != -1 || type.indexOf('pdf') != -1) {
            return true;
        } else {
            return false;
        }
    }

    checkFileSizeImage(size): boolean {
        if (size > 5000000) {
            return false;
        } else {
            return true;
        }
    }

    checkFileTypeImage(type): boolean {
        if (type.indexOf('image') != -1) {
            return true;
        } else {
            return false;
        }
    }

    droppedFile(files, index) {
        if (files.length == 0) {
            this.uploader[index].queue.pop();
            return;
        }
        if (!this.checkFileType(files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only images and pdf are allowed', 'Error');
            this.uploader[index].queue.pop();
            return;
        }
        if (!this.checkFileSize(files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select file less than 20MB', 'Error');
            this.uploader[index] = new FileUploader({ url: '' });
            return;
        }
        const control = <FormArray>this.form.controls['documents'];
        const reader = new FileReader();
        reader.addEventListener('load', (element: Event) => {
            const childControl = <FormGroup>control.at(index);
            childControl.controls['document'].setValue(reader.result);
        }, false);
        reader.readAsDataURL(files[0]);
    }

    selectImage(event) {
        if (event.target.files.length == 0) {
            return;
        }
        if (!this.checkFileTypeImage(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only images are allowed', 'Error');
            event.target.value = null;
            return;
        }
        if (!this.checkFileSizeImage(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select an image less than 5MB', 'Error');
            event.target.value = null;
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (element: Event) => {
            this.profilePicture.setValue(reader.result);
        }, false);
        reader.readAsDataURL(event.target.files[0]);
        event.target.value = null;
    }

    selectDocumentImage(event, index) {
        if (event.target.files.length == 0) {
            this.uploader[index].queue.pop();
            return;
        }
        if (!this.checkFileType(event.target.files[0].type)) {
            this.toastrService.clear();
            this.toastrService.error('Only images and pdf are allowed', 'Error');
            this.uploader[index].queue.pop();
            event.target.value = null;
            return;
        }
        if (!this.checkFileSize(event.target.files[0].size)) {
            this.toastrService.clear();
            this.toastrService.error('Please select file less than 20MB', 'Error');
            this.uploader[index] = new FileUploader({ url: '' });
            event.target.value = null;
            return;
        }
        const control = <FormArray>this.form.controls['documents'];
        const reader = new FileReader();
        reader.addEventListener('load', (element: Event) => {
            const childControl = <FormGroup>control.at(index);
            childControl.controls['document'].setValue(reader.result);
        }, false);
        reader.readAsDataURL(event.target.files[0]);
        event.target.value = null;
    }

    bringFileSelector(): boolean {
        this.renderer.invokeElementMethod(this._profilePicture.nativeElement, 'click');
        return false;
    }

    bringFilesSelector(index): boolean {
        this.renderer.invokeElementMethod(this.documentArray[index].nativeElement, 'click');
        return false;
    }

    ngAfterViewInit() {
        this.documentArray = this._document.toArray();
        this._document.changes.subscribe(childern => {
            this.documentArray = childern.toArray();
        });
        this.documentsArray = this._documents.toArray();
        this._documents.changes.subscribe(childern => {
            this.documentsArray = childern.toArray();
        });
    }

    initDocument() {
        return this.fb.group({
            'documentName': ['', Validators.compose([Validators.required])],
            'document': ['', Validators.compose([Validators.required])],
        });
    }

    addDocument() {
        const control = <FormArray>this.form.controls['documents'];
        control.push(this.initDocument());
        this.uploader.push(new FileUploader({ url: '' }));
    }

    removeDocument(index) {
        const control = <FormArray>this.form.controls['documents'];
        control.removeAt(index);
        this.uploader.splice(index, 1);
    }

    onSubmit() {
        this.submitted = true;
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
        const control = <FormArray>this.documents;
        /* if (!this.documentName.value) {
            this.toastrService.clear();
            this.toastrService.error('Document name is required', 'Error');
            if (this._documentName) {
                this._documentName.nativeElement.focus();
            }
            return;
        } */
        let documents = [];
        let documentsName = [];
        for (let i = 0; i < control.value.length; i++) {
            if(!control.value[i].documentName && i == 0) {
                this.toastrService.clear();
                this.toastrService.error('Document name is required', 'Error');
                if (this.documentsArray[i]) {
                    this.documentsArray[i].nativeElement.focus();
                }
                return;
            } else if(!control.value[i].documentName && control.value[i].document) {
                this.toastrService.clear();
                this.toastrService.error('Document name is required', 'Error');
                if (this.documentsArray[i]) {
                    this.documentsArray[i].nativeElement.focus();
                }
                return;
            } else if(control.value[i].documentName && !control.value[i].document) {
                this.toastrService.clear();
                this.toastrService.error('Document is required', 'Error');
                return;
            }
            if (control.value[i] && control.value[i].document) {
                documents.push(control.value[i].document);
                documentsName.push(control.value[i].documentName);
            }
        }
        if (documents.length == 0) {
            this.toastrService.clear();
            this.toastrService.error('Please upload a document', 'Error');
            return;
        }
        let data = {
            userId: this.userId,
            stepNumber: 3,
            profilePicture: this.profilePicture.value,
            info: this.documentName.value,
            documents: documents
        };
        if (!this.profilePicture.value) {
            delete data.profilePicture;
        }
        
        let formData = new FormData();
        formData.append('userId', this.userId);
        formData.append('stepNumber', '3');
        if (this.profilePicture.value) {
            formData.append('profilePicture', this.profilePicture.value);
        }
        formData.append('info', JSON.stringify(documentsName));
        formData.append('documents', JSON.stringify(documents));

        this.store.dispatch({
            type: auth.actionTypes.AUTH_REGISTER_DOCUMENTS,
            payload: formData
        });
    }

}

import { Component, ChangeDetectorRef, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
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
    public storeData;
    public form: FormGroup;
    public profilePicture: AbstractControl;
    public documentName: AbstractControl;
    public uploader: FileUploader[] = [];
    public hasBaseDropZoneOver: boolean = false;
    public documentArray;

    public submitted: boolean = false;

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private renderer: Renderer,
        private toastrService: ToastrService,
        private cdRef: ChangeDetectorRef) {

        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                
            });

        this.form = this.fb.group({
            'profilePicture': [''],
            'documents': fb.array([this.initDocument()])
        });
        this.uploader.push(new FileUploader({ url: '' }));
        this.profilePicture = this.form.controls['profilePicture'];
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.storeData) {
            this.storeData.unsubscribe();
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
    }

    initDocument() {
        return this.fb.group({
            'documentName': [''],
            'document': [''],
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

    onSubmit(values: Object): void {
        this.submitted = true;
        console.log(values, this.uploader);
        if (this.form.valid) {
            // your code goes here
            // console.log(values);
        }
    }

}

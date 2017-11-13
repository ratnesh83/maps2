import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GETALL_JOB: 'APP_GETALL_JOB',
    APP_JOB_DETAIL_SUCCESS: 'APP_JOB_DETAIL_SUCCESS',
    APP_GETALL_JOB_BY_ID: 'APP_GETALL_JOB_BY_ID',
    APP_GETALL_JOB_BY_ID_SUCCESS: 'APP_GETALL_JOB_BY_ID_SUCCESS',
    APP_BLOCK_JOB_BY_ID: 'APP_BLOCK_JOB_BY_ID',
    APP_BLOCK_JOB_BY_ID_SUCCESS: 'APP_BLOCK_JOB_BY_ID_SUCCESS',
    SHOW_JOB_DETAIL: 'SHOW_JOB_DETAIL',
    APP_GET_JOB_DETAIL_SUCCESS : 'APP_GET_JOB_DETAIL_SUCCESS',
    APP_GET_JOB_DETAIL: 'APP_GET_JOB_DETAIL',
    DELETE_JOB_RECORD: 'DELETE_JOB_RECORD',
    BLOCK_THIS_JOB: 'BLOCK_THIS_JOB',
    ADD_THIS_JOB: 'ADD_THIS_JOB',
    ADD_THIS_JOB_SUCCESS: 'ADD_THIS_JOB_SUCCESS',
    APP_DELETE_JOB_BY_ID: 'APP_DELETE_JOB_BY_ID',
    APP_DELETE_JOB_BY_ID_SUCCESS: 'APP_DELETE_JOB_BY_ID_SUCCESS',
    DELETE_JOB_RECORD_CONFIRM: 'DELETE_JOB_RECORD_CONFIRM',
    BLOCK_THIS_JOB_CONFIRM: 'BLOCK_THIS_JOB_CONFIRM',
    EDIT_THIS_JOB_CONFIRM: 'EDIT_THIS_JOB_CONFIRM',
    EDIT_THIS_JOB: 'EDIT_THIS_JOB',
    EDIT_JOB_SUCCESS: 'EDIT_JOB_SUCCESS',
    CREATE_JOB: 'CREATE_JOB',
    CREATE_JOB_SUCCESS: 'CREATE_JOB_SUCCESS',
    JOB_ERROR: 'JOB_ERROR',
    SEARCH_JOB_DETAIL: 'SEARCH_JOB_DETAIL',
    CHANGE_ALL_JOB: 'CHANGE_ALL_JOB',
    NEW_JOB_DATA: 'NEW_JOB_DATA',
    APPROVE_JOB: 'APPROVE_JOB',
    APPROVE_JOB_SUCCESS: 'APPROVE_JOB_SUCCESS',
    REJECT_JOB: 'REJECT_JOB',
    CHANGE_JOB_DOCUMENT_APPROVAL: 'CHANGE_JOB_DOCUMENT_APPROVAL',
    UPLOAD_JOB_FILE: 'UPLOAD_JOB_FILE',
    UPLOAD_JOB_FILE_SUCCESS: 'UPLOAD_JOB_FILE_SUCCESS',
    UPLOAD_JOB_MULTIPLE_FILE: 'UPLOAD_JOB_MULTIPLE_FILE',
    UPLOAD_JOB_MULTIPLE_FILE_SUCCESS: 'UPLOAD_JOB_MULTIPLE_FILE',

    GET_COUNTRY_CODE: 'GET_COUNTRY_CODE',
    GET_COUNTRY_CODE_SUCCESS: 'GET_COUNTRY_CODE_SUCCESS'

};

type credentials = {};

export class AppGetAllPostDetail implements Action {
    type = actionTypes.APP_GETALL_JOB;
    constructor(public payload: credentials) { }
}

export class SearchPost implements Action {
    type = actionTypes.SEARCH_JOB_DETAIL;
    constructor(public payload: credentials) { }
};

export class ShowPostDetail implements Action {
    type = actionTypes.SHOW_JOB_DETAIL;
    constructor(public payload: credentials) { }
};

export class AppPostDetailSuccess implements Action {
    type = actionTypes.APP_JOB_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppPostError implements Action {
    type = actionTypes.JOB_ERROR;
    constructor() { }
}

export class AppGetPostDetail implements Action {
    type = actionTypes.APP_GET_JOB_DETAIL;
    constructor(public payload: credentials) { }
};

export class AppGetPostDetailSuccess implements Action {
    type = actionTypes.APP_GET_JOB_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppApprovePost implements Action {
    type = actionTypes.APPROVE_JOB;
    constructor(public payload: credentials) { }
};

export class AppRejectPost implements Action {
    type = actionTypes.REJECT_JOB;
    constructor(public payload: credentials) { }
};

export class AppApprovePostSuccess implements Action {
    type = actionTypes.APPROVE_JOB_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppChangePostApproval implements Action {
    type = actionTypes.CHANGE_JOB_DOCUMENT_APPROVAL;
    constructor(public payload: credentials) { }
};

export class AppUploadPostFile implements Action {
    type = actionTypes.UPLOAD_JOB_FILE;
    constructor(public payload: credentials) { }
};

export class AppUploadPostFileSuccess implements Action {
    type = actionTypes.UPLOAD_JOB_FILE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppUploadPostMultipleFile implements Action {
    type = actionTypes.UPLOAD_JOB_MULTIPLE_FILE;
    constructor(public payload: credentials) { }
};

export class AppUploadPostMultipleFileSuccess implements Action {
    type = actionTypes.UPLOAD_JOB_MULTIPLE_FILE_SUCCESS;
    constructor(public payload: credentials) { }
};

export type Actions
    = AppGetAllPostDetail
    | SearchPost
    | ShowPostDetail
    | AppPostDetailSuccess
    | AppPostError
    | AppGetPostDetail
    | AppGetPostDetailSuccess
    | AppUploadPostFile
    | AppUploadPostFileSuccess
    | AppApprovePost
    | AppRejectPost
    | AppApprovePostSuccess
    | AppChangePostApproval
    | AppUploadPostMultipleFile
    | AppUploadPostMultipleFileSuccess;


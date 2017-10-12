import { Action } from '@ngrx/store';

export const actionTypes = {

    ADD_THIS_CUSTOMER: 'ADD_THIS_CUSTOMER',
    ADD_THIS_CUSTOMER_SUCCESS: 'ADD_THIS_CUSTOMER_SUCCESS',
    NEW_CUSTOMER_DATA: 'NEW_CUSTOMER_DATA',

    APP_GETALL_WORKER: 'APP_GETALL_WORKER',
    APP_WORKER_DETAIL_SUCCESS: 'APP_WORKER_DETAIL_SUCCESS',
    APP_GETALL_WORKER_BY_ID: 'APP_GETALL_WORKER_BY_ID',
    APP_GETALL_WORKER_BY_ID_SUCCESS: 'APP_GETALL_WORKER_BY_ID_SUCCESS',
    APP_BLOCK_WORKER_BY_ID: 'APP_BLOCK_WORKER_BY_ID',
    APP_BLOCK_WORKER_BY_ID_SUCCESS: 'APP_BLOCK_WORKER_BY_ID_SUCCESS',
    SHOW_WORKER_DETAIL: 'SHOW_WORKER_DETAIL',
    APP_GET_WORKER_DETAIL_SUCCESS : 'APP_GET_WORKER_DETAIL_SUCCESS',
    APP_GET_WORKER_DETAIL: 'APP_GET_WORKER_DETAIL',
    DELETE_WORKER_RECORD: 'DELETE_WORKER_RECORD',
    BLOCK_THIS_WORKER: 'BLOCK_THIS_WORKER',
    ADD_THIS_WORKER: 'ADD_THIS_WORKER',
    ADD_THIS_WORKER_SUCCESS: 'ADD_THIS_WORKER_SUCCESS',
    APP_DELETE_WORKER_BY_ID: 'APP_DELETE_WORKER_BY_ID',
    APP_DELETE_WORKER_BY_ID_SUCCESS: 'APP_DELETE_WORKER_BY_ID_SUCCESS',
    DELETE_WORKER_RECORD_CONFIRM: 'DELETE_WORKER_RECORD_CONFIRM', 
    BLOCK_THIS_WORKER_CONFIRM: 'BLOCK_THIS_WORKER_CONFIRM',
    EDIT_THIS_WORKER_CONFIRM: 'EDIT_THIS_WORKER_CONFIRM',
    EDIT_THIS_WORKER: 'EDIT_THIS_WORKER',
    EDIT_WORKER_SUCCESS: 'EDIT_WORKER_SUCCESS',
    CREATE_WORKER: 'CREATE_WORKER',
    CREATE_WORKER_SUCCESS: 'CREATE_WORKER_SUCCESS',
    WORKER_ERROR: 'WORKER_ERROR',
    SEARCH_WORKER_DETAIL: 'SEARCH_WORKER_DETAIL',
    CHANGE_ALL_WORKER: 'CHANGE_ALL_WORKER',
    NEW_WORKER_DATA: 'NEW_WORKER_DATA',
    APPROVE_WORKER: 'APPROVE_WORKER',
    APPROVE_WORKER_SUCCESS: 'APPROVE_WORKER_SUCCESS',
    REJECT_WORKER: 'REJECT_WORKER',
    CHANGE_WORKER_DOCUMENT_APPROVAL: 'CHANGE_WORKER_DOCUMENT_APPROVAL',
    APP_GET_SERVICE_RADII: 'APP_GET_SERVICE_RADII',
    APP_GET_SERVICE_RADII_SUCCESS: 'APP_GET_SERVICE_RADII_SUCCESS',
    APP_GET_QUALIFICATIONS: 'APP_GET_QUALIFICATIONS',
    APP_GET_QUALIFICATIONS_SUCCESS: 'APP_GET_QUALIFICATIONS_SUCCESS',
    APP_GET_THE_EXPERTISE: 'APP_GET_THE_EXPERTISE',
    APP_GET_THE_EXPERTISE_SUCCESS: 'APP_GET_THE_EXPERTISE_SUCCESS',
    APP_GET_MACHINES: 'APP_GET_MACHINES',
    APP_GET_MACHINES_SUCCESS: 'APP_GET_MACHINES_SUCCESS',
    UPLOAD_WORKER_FILE: 'UPLOAD_WORKER_FILE',
    UPLOAD_WORKER_FILE_SUCCESS: 'UPLOAD_WORKER_FILE_SUCCESS',
    UPLOAD_WORKER_MULTIPLE_FILE: 'UPLOAD_WORKER_MULTIPLE_FILE',
    UPLOAD_WORKER_MULTIPLE_FILE_SUCCESS: 'UPLOAD_WORKER_MULTIPLE_FILE_SUCCESS',

    APP_GETALL_EMPLOYER: 'APP_GETALL_EMPLOYER',
    APP_EMPLOYER_DETAIL_SUCCESS: 'APP_EMPLOYER_DETAIL_SUCCESS',
    APP_GETALL_EMPLOYER_BY_ID: 'APP_GETALL_EMPLOYER_BY_ID',
    APP_GETALL_EMPLOYER_BY_ID_SUCCESS: 'APP_GETALL_EMPLOYER_BY_ID_SUCCESS',
    APP_BLOCK_EMPLOYER_BY_ID: 'APP_BLOCK_EMPLOYER_BY_ID',
    APP_BLOCK_EMPLOYER_BY_ID_SUCCESS: 'APP_BLOCK_EMPLOYER_BY_ID_SUCCESS',
    SHOW_EMPLOYER_DETAIL: 'SHOW_EMPLOYER_DETAIL',
    APP_GET_EMPLOYER_DETAIL_SUCCESS : 'APP_GET_EMPLOYER_DETAIL_SUCCESS',
    APP_GET_EMPLOYER_DETAIL: 'APP_GET_EMPLOYER_DETAIL',
    DELETE_EMPLOYER_RECORD: 'DELETE_EMPLOYER_RECORD',
    BLOCK_THIS_EMPLOYER: 'BLOCK_THIS_EMPLOYER',
    ADD_THIS_EMPLOYER: 'ADD_THIS_EMPLOYER',
    ADD_THIS_EMPLOYER_SUCCESS: 'ADD_THIS_EMPLOYER_SUCCESS',
    APP_DELETE_EMPLOYER_BY_ID: 'APP_DELETE_EMPLOYER_BY_ID',
    APP_DELETE_EMPLOYER_BY_ID_SUCCESS: 'APP_DELETE_EMPLOYER_BY_ID_SUCCESS',
    DELETE_EMPLOYER_RECORD_CONFIRM: 'DELETE_EMPLOYER_RECORD_CONFIRM',
    BLOCK_THIS_EMPLOYER_CONFIRM: 'BLOCK_THIS_EMPLOYER_CONFIRM',
    EDIT_THIS_EMPLOYER_CONFIRM: 'EDIT_THIS_EMPLOYER_CONFIRM',
    EDIT_THIS_EMPLOYER: 'EDIT_THIS_EMPLOYER',
    EDIT_EMPLOYER_SUCCESS: 'EDIT_EMPLOYER_SUCCESS',
    CREATE_EMPLOYER: 'CREATE_EMPLOYER',
    CREATE_EMPLOYER_SUCCESS: 'CREATE_EMPLOYER_SUCCESS',
    EMPLOYER_ERROR: 'EMPLOYER_ERROR',
    SEARCH_EMPLOYER_DETAIL: 'SEARCH_EMPLOYER_DETAIL',
    CHANGE_ALL_EMPLOYER: 'CHANGE_ALL_EMPLOYER',
    NEW_EMPLOYER_DATA: 'NEW_EMPLOYER_DATA',
    APPROVE_EMPLOYER: 'APPROVE_EMPLOYER',
    APPROVE_EMPLOYER_SUCCESS: 'APPROVE_EMPLOYER_SUCCESS',
    REJECT_EMPLOYER: 'REJECT_EMPLOYER',
    CHANGE_EMPLOYER_DOCUMENT_APPROVAL: 'CHANGE_EMPLOYER_DOCUMENT_APPROVAL',
    UPLOAD_EMPLOYER_FILE: 'UPLOAD_EMPLOYER_FILE',
    UPLOAD_EMPLOYER_FILE_SUCCESS: 'UPLOAD_EMPLOYER_FILE_SUCCESS',
    UPLOAD_EMPLOYER_MULTIPLE_FILE: 'UPLOAD_EMPLOYER_MULTIPLE_FILE',
    UPLOAD_EMPLOYER_MULTIPLE_FILE_SUCCESS: 'UPLOAD_EMPLOYER_MULTIPLE_FILE',

    GET_COUNTRY_CODE: 'GET_COUNTRY_CODE',
    GET_COUNTRY_CODE_SUCCESS: 'GET_COUNTRY_CODE_SUCCESS'

};

type credentials = {};

export class AddThisCustomer implements Action {
    type = actionTypes.ADD_THIS_CUSTOMER;
    constructor(public payload: credentials) { }
};

export class AddThisCustomerSuccess implements Action {
    type = actionTypes.ADD_THIS_CUSTOMER_SUCCESS;
    constructor() { }
}

export class NewCustomer implements Action {
    type = actionTypes.NEW_CUSTOMER_DATA;
    constructor(public payload: credentials) { }
}

export class AppGetAllWorkerDetail implements Action {
    type = actionTypes.APP_GETALL_WORKER;
    constructor(public payload: credentials) { }
}

export class SearchWorker implements Action {
    type = actionTypes.SEARCH_WORKER_DETAIL;
    constructor(public payload: credentials) { }
};

export class ShowWorkerDetail implements Action {
    type = actionTypes.SHOW_WORKER_DETAIL;
    constructor(public payload: credentials) { }
};

export class AppGetWorkerDetail implements Action {
    type = actionTypes.APP_GET_WORKER_DETAIL;
    constructor(public payload: credentials) { }
};

export class AppGetWorkerDetailSuccess implements Action {
    type = actionTypes.APP_GET_WORKER_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppWorkerDetailSuccess implements Action {
    type = actionTypes.APP_WORKER_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppWorkerError implements Action {
    type = actionTypes.WORKER_ERROR;
    constructor() { }
}

export class AppApproveWorker implements Action {
    type = actionTypes.APPROVE_WORKER;
    constructor(public payload: credentials) { }
};

export class AppRejectWorker implements Action {
    type = actionTypes.REJECT_WORKER;
    constructor(public payload: credentials) { }
};

export class AppApproveWorkerSuccess implements Action {
    type = actionTypes.APPROVE_WORKER_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppChangeWorkerApproval implements Action {
    type = actionTypes.CHANGE_WORKER_DOCUMENT_APPROVAL;
    constructor(public payload: credentials) { }
};

export class AppGetServiceRadii implements Action {
    type = actionTypes.APP_GET_SERVICE_RADII;
    constructor(public payload: credentials) { }
};

export class AppGetServiceRadiiSuccess implements Action {
    type = actionTypes.APP_GET_SERVICE_RADII_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppGetQualification implements Action {
    type = actionTypes.APP_GET_QUALIFICATIONS;
    constructor(public payload: credentials) { }
};

export class AppGetQualificationSuccess implements Action {
    type = actionTypes.APP_GET_QUALIFICATIONS_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppGetExpertise implements Action {
    type = actionTypes.APP_GET_THE_EXPERTISE;
    constructor(public payload: credentials) { }
};

export class AppGetExpertiseSuccess implements Action {
    type = actionTypes.APP_GET_THE_EXPERTISE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppGetMachines implements Action {
    type = actionTypes.APP_GET_MACHINES;
    constructor(public payload: credentials) { }
};

export class AppGetMachinesSuccess implements Action {
    type = actionTypes.APP_GET_MACHINES_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppUploadWorkerFile implements Action {
    type = actionTypes.UPLOAD_WORKER_FILE;
    constructor(public payload: credentials) { }
};

export class AppUploadWorkerFileSuccess implements Action {
    type = actionTypes.UPLOAD_WORKER_FILE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppUploadWorkerMultipleFile implements Action {
    type = actionTypes.UPLOAD_WORKER_MULTIPLE_FILE;
    constructor(public payload: credentials) { }
};

export class AppUploadWorkerMultipleFileSuccess implements Action {
    type = actionTypes.UPLOAD_WORKER_MULTIPLE_FILE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppGetAllEmployerDetail implements Action {
    type = actionTypes.APP_GETALL_EMPLOYER;
    constructor(public payload: credentials) { }
}

export class SearchEmployer implements Action {
    type = actionTypes.SEARCH_EMPLOYER_DETAIL;
    constructor(public payload: credentials) { }
};

export class ShowEmployerDetail implements Action {
    type = actionTypes.SHOW_EMPLOYER_DETAIL;
    constructor(public payload: credentials) { }
};

export class AppEmployerDetailSuccess implements Action {
    type = actionTypes.APP_EMPLOYER_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppEmployerError implements Action {
    type = actionTypes.EMPLOYER_ERROR;
    constructor() { }
}

export class AppGetEmployerDetail implements Action {
    type = actionTypes.APP_GET_EMPLOYER_DETAIL;
    constructor(public payload: credentials) { }
};

export class AppGetEmployerDetailSuccess implements Action {
    type = actionTypes.APP_GET_EMPLOYER_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppApproveEmployer implements Action {
    type = actionTypes.APPROVE_EMPLOYER;
    constructor(public payload: credentials) { }
};

export class AppRejectEmployer implements Action {
    type = actionTypes.REJECT_EMPLOYER;
    constructor(public payload: credentials) { }
};

export class AppApproveEmployerSuccess implements Action {
    type = actionTypes.APPROVE_EMPLOYER_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppChangeEmployerApproval implements Action {
    type = actionTypes.CHANGE_EMPLOYER_DOCUMENT_APPROVAL;
    constructor(public payload: credentials) { }
};

export class AppUploadEmployerFile implements Action {
    type = actionTypes.UPLOAD_EMPLOYER_FILE;
    constructor(public payload: credentials) { }
};

export class AppUploadEmployerFileSuccess implements Action {
    type = actionTypes.UPLOAD_EMPLOYER_FILE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppUploadEmployerMultipleFile implements Action {
    type = actionTypes.UPLOAD_EMPLOYER_MULTIPLE_FILE;
    constructor(public payload: credentials) { }
};

export class AppUploadEmployerMultipleFileSuccess implements Action {
    type = actionTypes.UPLOAD_EMPLOYER_MULTIPLE_FILE_SUCCESS;
    constructor(public payload: credentials) { }
};

export type Actions
    = AddThisCustomer
    | NewCustomer
    | AppGetAllWorkerDetail
    | SearchWorker
    | ShowWorkerDetail
    | AppWorkerDetailSuccess
    | AppWorkerError
    | AppUploadWorkerFile
    | AppUploadWorkerFileSuccess
    | AppApproveWorker
    | AppRejectWorker
    | AppApproveWorkerSuccess
    | AppChangeWorkerApproval
    | AppGetAllEmployerDetail
    | SearchEmployer
    | ShowEmployerDetail
    | AppGetWorkerDetail
    | AppGetServiceRadii
    | AppGetServiceRadiiSuccess
    | AppGetWorkerDetailSuccess
    | AppEmployerDetailSuccess
    | AppEmployerError
    | AppGetEmployerDetail
    | AppGetEmployerDetailSuccess
    | AppUploadEmployerFile
    | AppUploadEmployerFileSuccess
    | AppApproveEmployer
    | AppRejectEmployer
    | AppApproveEmployerSuccess
    | AppChangeEmployerApproval
    | AppGetQualification
    | AppGetQualificationSuccess
    | AppGetExpertise
    | AppGetExpertiseSuccess
    | AppGetMachines
    | AppGetMachinesSuccess
    | AppUploadWorkerMultipleFile
    | AppUploadWorkerMultipleFileSuccess
    | AppUploadEmployerMultipleFile
    | AppUploadEmployerMultipleFileSuccess;


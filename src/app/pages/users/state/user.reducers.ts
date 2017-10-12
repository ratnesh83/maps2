import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    customers: null,
    count: 0,
    currentPage: 0,
    limit: 4,
    activeCustomer: null,
    filter: null,
    role: 'customer',
    error: null
};

const initialWorkerState: any = {
    errorFound: null,
    workers: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activeWorker: null,
    filter: null,
    role: 'worker',
    error: null
};

const initialEmployerState: any = {
    errorFound: null,
    employers: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activeEmployer: null,
    filter: null,
    role: 'employer',
    error: null
};

export const customer: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'ADD_THIS_CUSTOMER':
            return Object.assign({}, state, { activeCustomer: action.payload });

        case 'ADD_THIS_CUSTOMER_SUCCESS':
            return Object.assign({}, state, { addCustomerSuccess: action.payload });

        case 'NEW_CUSTOMER_DATA':
            return Object.assign({}, state, { showCustomerData: action.payload });

        default:
            return state;
    }
};

export const worker: ActionReducer<any> = (state = initialWorkerState, action: Action) => {
    switch (action.type) {

        case 'ADD_THIS_WORKER':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'ADD_THIS_WORKER_SUCCESS':
            return Object.assign({}, state, { addWorkerSuccess: action.payload, error: null });

        case 'WORKER_ERROR':
            return Object.assign({}, state, { error: action.payload });

        case 'GET_COUNTRY_CODE_SUCCESS':
            return Object.assign({}, state, { countryCodes: action.payload });

        case 'BLOCK_THIS_WORKER':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'SHOW_WORKER_DETAIL':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'APP_GET_WORKER_DETAIL':
            return Object.assign({}, state, { error: null, fileUpload: null, uploadFileProcess: null, uploadFileSuccess: null });

        case 'DELETE_WORKER_RECORD_CONFIRM':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'DELETE_WORKER_RECORD':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'APP_GETALL_WORKER':
            return Object.assign({}, state, { createWorker: null, error: null });

        case 'APP_WORKER_DETAIL':
            return Object.assign({}, state, { error: null });

        case 'APP_WORKER_DETAIL_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'APP_GET_SERVICE_RADII':
            return Object.assign({}, state, { error: null });

        case 'APP_GET_SERVICE_RADII_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'APP_GET_QUALIFICATIONS':
            return Object.assign({}, state, { error: null });

        case 'APP_GET_QUALIFICATIONS_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'APP_GET_THE_EXPERTISE':
            return Object.assign({}, state, { error: null });

        case 'APP_GET_THE_EXPERTISE_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'APP_GET_MACHINES':
            return Object.assign({}, state, { error: null });

        case 'APP_GET_MACHINES_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'APP_GET_WORKER_DETAIL_SUCCESS':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'APP_GETALL_WORKER_BY_ID':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'APP_GETALL_WORKER_BY_ID_SUCCESS':
            return Object.assign({}, state, { bookingId: action.payload, error: null });

        case 'BLOCK_THIS_WORKER_CONFIRM':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'APP_BLOCK_WORKER_BY_ID':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'APP_BLOCK_WORKER_BY_ID_SUCCESS':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'EDIT_THIS_WORKER_CONFIRM':
            return Object.assign({}, state, { activeWorker: action.payload, error: null });

        case 'CREATE_WORKER':
            return Object.assign({}, state, { createWorker: null, error: null });

        case 'CREATE_WORKER_SUCCESS':
            return Object.assign({}, state, { createWorker: true, error: null });

        case 'EDIT_THIS_WORKER':
            return Object.assign({}, state, { editWorkerProcess: true, error: null });

        case 'EDIT_WORKER_SUCCESS':
            return Object.assign({}, state, { editWorkerSuccess: action.payload, error: null });

        case 'SEARCH_WORKER_DETAIL':
            return Object.assign({}, state, { SearchSuccess: action.payload, error: null });

        case 'CHANGE_ALL_WORKER':
            return Object.assign({}, state, { error: null });

        case 'NEW_WORKER_DATA':
            return Object.assign({}, state, { showWorkerData: action.payload, error: null });

        case 'APPROVE_WORKER':
            return Object.assign({}, state, { error: null });

        case 'REJECT_WORKER':
            return Object.assign({}, state, { error: null });

        case 'APPROVE_WORKER_SUCCESS':
            return Object.assign({}, state, { approveWorkerSuccess: action.payload, error: null });

        case 'CHANGE_WORKER_DOCUMENT_APPROVAL':
            return Object.assign({}, state, { error: null });

        case 'UPLOAD_WORKER_FILE':
            return Object.assign({}, state, { uploadFileProcess: true, uploadFileSuccess: null, fileUpload: null, error: null });

        case 'UPLOAD_WORKER_FILE_SUCCESS':
            return Object.assign({}, state, { error: null }, action.payload, { uploadFileProcess: null, uploadFileSuccess: true });

        case 'UPLOAD_WORKER_MULTIPLE_FILE':
            return Object.assign({}, state, { uploadMultipleFilesProcess: true, uploadMultipleFilesSuccess: null, fileUpload: null, error: null });

        case 'UPLOAD_WORKER_MULTIPLE_FILE_SUCCESS':
            return Object.assign({}, state, { error: null }, action.payload, { uploadMultipleFilesProcess: null, uploadMultipleFilesSuccess: true });

        default:
            return state;
    }
};

export const employer: ActionReducer<any> = (state = initialEmployerState, action: Action) => {
    switch (action.type) {

        case 'ADD_THIS_EMPLOYER':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'ADD_THIS_EMPLOYER_SUCCESS':
            return Object.assign({}, state, { addEmployerSuccess: action.payload, error: null });

        case 'EMPLOYER_ERROR':
            return Object.assign({}, state, { error: action.payload });

        case 'GET_COUNTRY_CODE_SUCCESS':
            return Object.assign({}, state, { countryCodes: action.payload });

        case 'BLOCK_THIS_EMPLOYER':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'SHOW_EMPLOYER_DETAIL':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'APP_GET_EMPLOYER_DETAIL':
            return Object.assign({}, state, { error: null, fileUpload: null, uploadFileProcess: null, uploadFileSuccess: null });

        case 'DELETE_EMPLOYER_RECORD_CONFIRM':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'DELETE_EMPLOYER_RECORD':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'APP_GETALL_EMPLOYER':
            return Object.assign({}, state, { createEmployer: null, error: null });

        case 'APP_EMPLOYER_DETAIL':
            return Object.assign({}, state, { error: null });

        case 'APP_EMPLOYER_DETAIL_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'APP_GET_EMPLOYER_DETAIL_SUCCESS':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'APP_GETALL_EMPLOYER_BY_ID':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'APP_GETALL_EMPLOYER_BY_ID_SUCCESS':
            return Object.assign({}, state, { bookingId: action.payload, error: null });

        case 'BLOCK_THIS_EMPLOYER_CONFIRM':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'APP_BLOCK_EMPLOYER_BY_ID':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'APP_BLOCK_EMPLOYER_BY_ID_SUCCESS':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'EDIT_THIS_EMPLOYER_CONFIRM':
            return Object.assign({}, state, { activeEmployer: action.payload, error: null });

        case 'EDIT_THIS_EMPLOYER':
            return Object.assign({}, state, { editEmployerProcess: true, error: null });

        case 'EDIT_EMPLOYER_SUCCESS':
            return Object.assign({}, state, { editEmployerSuccess: action.payload, error: null });

        case 'CREATE_EMPLOYER':
            return Object.assign({}, state, { createEmployer: null, error: null });

        case 'CREATE_EMPLOYER_SUCCESS':
            return Object.assign({}, state, { createEmployer: true, error: null });

        case 'SEARCH_EMPLOYER_DETAIL':
            return Object.assign({}, state, { SearchSuccess: action.payload, error: null });

        case 'CHANGE_ALL_EMPLOYER':
            return Object.assign({}, state, { error: null });

        case 'NEW_EMPLOYER_DATA':
            return Object.assign({}, state, { showEmployerData: action.payload, error: null });

        case 'APPROVE_EMPLOYER':
            return Object.assign({}, state, { error: null });

        case 'REJECT_EMPLOYER':
            return Object.assign({}, state, { error: null });

        case 'APPROVE_EMPLOYER_SUCCESS':
            return Object.assign({}, state, { approveEmployerSuccess: action.payload, error: null });

        case 'CHANGE_EMPLOYER_DOCUMENT_APPROVAL':
            return Object.assign({}, state, { error: null });

        case 'UPLOAD_EMPLOYER_FILE':
            return Object.assign({}, state, { uploadFileProcess: true, uploadFileSuccess: null, fileUpload: null, error: null });

        case 'UPLOAD_EMPLOYER_FILE_SUCCESS':
            return Object.assign({}, state, { error: null }, action.payload, { uploadFileProcess: null, uploadFileSuccess: true });

        case 'UPLOAD_EMPLOYER_MULTIPLE_FILE':
            return Object.assign({}, state, { uploadMultipleFilesProcess: true, uploadMultipleFilesSuccess: null, fileUpload: null, error: null });

        case 'UPLOAD_EMPLOYER_FILE_MULTIPLE_SUCCESS':
            return Object.assign({}, state, { error: null }, action.payload, { uploadMultipleFilesProcess: null, uploadMultipleFilesSuccess: true });

        default:
            return state;
    }
};

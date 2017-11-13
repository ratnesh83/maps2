import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    posts: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activePost: null,
    filter: null,
    role: 'all',
    error: null
};

export const post: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'ADD_THIS_JOB':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'ADD_THIS_JOB_SUCCESS':
            return Object.assign({}, state, { addPostSuccess: action.payload, error: null });

        case 'JOB_ERROR':
            return Object.assign({}, state, { error: action.payload });

        case 'GET_COUNTRY_CODE_SUCCESS':
            return Object.assign({}, state, { countryCodes: action.payload });

        case 'BLOCK_THIS_JOB':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'SHOW_JOB_DETAIL':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'APP_GET_JOB_DETAIL':
            return Object.assign({}, state, { error: null, fileUpload: null, uploadFileProcess: null, uploadFileSuccess: null });

        case 'DELETE_JOB_RECORD_CONFIRM':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'DELETE_JOB_RECORD':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'APP_GETALL_JOB':
            return Object.assign({}, state, { createPost: null, error: null });

        case 'APP_JOB_DETAIL':
            return Object.assign({}, state, { error: null });

        case 'APP_JOB_DETAIL_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'APP_GET_JOB_DETAIL_SUCCESS':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'APP_GETALL_JOB_BY_ID':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'APP_GETALL_JOB_BY_ID_SUCCESS':
            return Object.assign({}, state, { bookingId: action.payload, error: null });

        case 'BLOCK_THIS_JOB_CONFIRM':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'APP_BLOCK_JOB_BY_ID':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'APP_BLOCK_JOB_BY_ID_SUCCESS':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'EDIT_THIS_JOB_CONFIRM':
            return Object.assign({}, state, { activePost: action.payload, error: null });

        case 'EDIT_THIS_JOB':
            return Object.assign({}, state, { editPostProcess: true, error: null });

        case 'EDIT_JOB_SUCCESS':
            return Object.assign({}, state, { editPostSuccess: action.payload, error: null });

        case 'CREATE_JOB':
            return Object.assign({}, state, { createPost: null, error: null });

        case 'CREATE_JOB_SUCCESS':
            return Object.assign({}, state, { createPost: true, error: null });

        case 'SEARCH_JOB_DETAIL':
            return Object.assign({}, state, { SearchSuccess: action.payload, error: null });

        case 'CHANGE_ALL_JOB':
            return Object.assign({}, state, { error: null });

        case 'NEW_JOB_DATA':
            return Object.assign({}, state, { showPostData: action.payload, error: null });

        case 'APPROVE_JOB':
            return Object.assign({}, state, { error: null });

        case 'REJECT_JOB':
            return Object.assign({}, state, { error: null });

        case 'APPROVE_JOB_SUCCESS':
            return Object.assign({}, state, { approvePostSuccess: action.payload, error: null });

        case 'CHANGE_JOB_DOCUMENT_APPROVAL':
            return Object.assign({}, state, { error: null });

        case 'UPLOAD_JOB_FILE':
            return Object.assign({}, state, { uploadFileProcess: true, uploadFileSuccess: null, fileUpload: null, error: null });

        case 'UPLOAD_JOB_FILE_SUCCESS':
            return Object.assign({}, state, { error: null }, action.payload, { uploadFileProcess: null, uploadFileSuccess: true });

        case 'UPLOAD_JOB_MULTIPLE_FILE':
            return Object.assign({}, state, { uploadMultipleFilesProcess: true, uploadMultipleFilesSuccess: null, fileUpload: null, error: null });

        case 'UPLOAD_JOB_FILE_MULTIPLE_SUCCESS':
            return Object.assign({}, state, { error: null }, action.payload, { uploadMultipleFilesProcess: null, uploadMultipleFilesSuccess: true });

        default:
            return state;
    }
};

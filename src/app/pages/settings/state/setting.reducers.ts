import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    settings: null,
    count: 0,
    currentPage: 0,
    limit: 0,
    type: 'all'
};

export const setting: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_SERVICE_RADIUS':
            return Object.assign({}, state, initialState, {
                uploadFileSuccess: null,
                setServiceRadiiProcess: null,
                setQualificationProcess: null,
                setExpertiseProcess: null,
                addMachineProcess: null,
                deleteQualificationProcess: null,
                updateExpertiseProcess: null,
                updateEquipmentProcess: null
            });

        case 'APP_GET_QUALIFICATION':
            return Object.assign({}, state);

        case 'APP_GET_EXPERTISE':
            return Object.assign({}, state);

        case 'APP_GET_SERVICE_RADIUS_SUCCESS':
            return Object.assign({}, state, { settings: action.payload });

        case 'APP_GET_QUALIFICATION_SUCCESS':
            return Object.assign({}, state, action.payload);

        case 'APP_GET_EXPERTISE_SUCCESS':
            return Object.assign({}, state, action.payload);

        case 'APP_GET_EQUIPMENTS_SUCCESS':
            return Object.assign({}, state, action.payload);

        case 'APP_SET_SERVICE_RADIUS':
            return Object.assign({}, state, { setServiceRadiiProcess: true });

        case 'APP_SET_SERVICE_RADIUS_SUCCESS':
            return Object.assign({}, state, { setServiceRadiiSuccess: true });

        case 'APP_SET_QUALIFICATION':
            return Object.assign({}, state, { setQualificationProcess: true, setQualificationSuccess: null });

        case 'APP_SET_EXPERTISE':
            return Object.assign({}, state, { setExpertiseProcess: true, setExpertiseSuccess: null });

        case 'APP_ADD_MACHINE':
            return Object.assign({}, state, { addMachineProcess: true });

        case 'APP_ADD_MACHINE_SUCCESS':
            return Object.assign({}, state, { addMachineSuccess: true });

        case 'APP_DELETE_QUALIFICATION':
            return Object.assign({}, state, { deleteQualificationProcess: true, deleteQualificationSuccess: null });

        case 'APP_UPDATE_EXPERTISE':
            return Object.assign({}, state, { updateExpertiseProcess: true, updateExpertiseSuccess: null });

        case 'APP_UPDATE_EQUIPMENTS':
            return Object.assign({}, state, { updateEquipmentProcess: true });

        case 'APP_UPDATE_EQUIPMENTS_SUCCESS':
            return Object.assign({}, state, { updateEquipmentSuccess: true, updateRequest: action.payload });

        case 'APP_DELETE_QUALIFICATION_SUCCESS':
            return Object.assign({}, state, { deleteQualificationProcess: null, deleteQualificationSuccess: true, deleteIndex: action.payload.index });

        case 'APP_UPDATE_EXPERTISE_SUCCESS':
            return Object.assign({}, state, { updateExpertiseProcess: null, updateExpertiseSuccess: true, updateRequest: action.payload });

        case 'APP_SET_QUALIFICATION_SUCCESS':
            return Object.assign({}, state, { setQualificationProcess: null, setQualificationSuccess: true });

        case 'APP_SET_EXPERTISE_SUCCESS':
            return Object.assign({}, state, { setExpertiseProcess: null, setExpertiseSuccess: true });

        case 'UPLOAD_FILE':
            return Object.assign({}, state, { uploadFileProcess: true, uploadFileSuccess: null, fileUpload: null });

        case 'UPLOAD_FILE_SUCCESS':
            return Object.assign({}, state, action.payload, { uploadFileSuccess: true, uploadFileProcess: null });

        case 'SETTINGS_ERROR':
            return Object.assign({}, state, { error: action.payload });

        case 'GET_PROFILE_INFO':
            return Object.assign({}, state);

        case 'GET_PROFILE_INFO_SUCCESS':
            return Object.assign({}, action.payload);

        case 'GET_PROFILE_INFO_ID_SUCCESS':
            return Object.assign({}, action.payload);

        case 'GET_PROFILE_INFO_ID':
            return Object.assign({}, state);

        case 'UPDATE_PROFILE_INFO':
            return Object.assign({}, state);

        case 'APP_GET_SUB_CATEGORIES_SUCCESS':
            return Object.assign({}, state, { subCategories: action.payload });

        case 'SAVE_CAT':
            return Object.assign({}, state, { selectedCat: action.payload.selectedCategory, edit: action.payload.edit });
            
        case 'APP_GET_AVAILABILITY_SUCCESS':
            return Object.assign({}, state, action.payload);

        case 'FOLLOW_COMPANY':
            return Object.assign({}, state, '');

        case 'APP_GET_CATEGORIES_EDIT':
            delete state.getLaborHit;
            delete state.getLaborCategoryHit;
            return Object.assign({}, state);

        case 'APP_GET_CATEGORIES_EDIT_SUCCESS':
            return Object.assign({}, state, { categories: action.payload, getLaborCategoryHit: true });

        default:
            return state;
    }
};

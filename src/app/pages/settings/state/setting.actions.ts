import { Action } from '@ngrx/store';

export const actionTypes = {
    APP_GET_SERVICE_RADIUS: 'APP_GET_SERVICE_RADIUS',
    APP_GET_SERVICE_RADIUS_SUCCESS: 'APP_GET_SERVICE_RADIUS_SUCCESS',
    APP_SET_SERVICE_RADIUS: 'APP_SET_SERVICE_RADIUS',
    APP_SET_SERVICE_RADIUS_SUCCESS: 'APP_SET_SERVICE_RADIUS_SUCCESS',
    APP_GET_QUALIFICATION: 'APP_GET_QUALIFICATION',
    APP_GET_QUALIFICATION_SUCCESS: 'APP_GET_QUALIFICATION_SUCCESS',
    APP_SET_QUALIFICATION: 'APP_SET_QUALIFICATION',
    APP_SET_QUALIFICATION_SUCCESS: 'APP_SET_QUALIFICATION_SUCCESS',
    APP_DELETE_QUALIFICATION: 'APP_DELETE_QUALIFICATION',
    APP_DELETE_QUALIFICATION_SUCCESS: 'APP_DELETE_QUALIFICATION_SUCCESS',
    APP_GET_EXPERTISE: 'APP_GET_EXPERTISE',
    APP_GET_EXPERTISE_SUCCESS: 'APP_GET_EXPERTISE_SUCCESS',
    APP_SET_EXPERTISE: 'APP_SET_EXPERTISE',
    APP_SET_EXPERTISE_SUCCESS: 'APP_SET_EXPERTISE_SUCCESS',
    APP_UPDATE_EXPERTISE: 'APP_UPDATE_EXPERTISE',
    APP_UPDATE_EXPERTISE_SUCCESS: 'APP_UPDATE_EXPERTISE_SUCCESS',
    APP_GET_EQUIPMENTS: 'APP_GET_EQUIPMENTS',
    APP_GET_EQUIPMENTS_SUCCESS: 'APP_GET_EQUIPMENTS_SUCCESS',
    APP_UPDATE_EQUIPMENTS: 'APP_UPDATE_EQUIPMENTS',
    APP_UPDATE_EQUIPMENTS_SUCCESS: 'APP_UPDATE_EQUIPMENTS_SUCCESS',
    APP_ADD_MACHINE: 'APP_ADD_MACHINE',
    APP_ADD_MACHINE_SUCCESS: 'APP_ADD_MACHINE_SUCCESS',
    APP_UPDATE_MACHINE: 'APP_UPDATE_MACHINE',
    APP_UPDATE_MACHINE_SUCCESS: 'APP_UPDATE_MACHINE_SUCCESS',
    UPLOAD_FILE: 'UPLOAD_FILE',
    UPLOAD_FILE_SUCCESS: 'UPLOAD_FILE_SUCCESS',
    SETTINGS_ERROR: 'SETTINGS_ERROR',
    GET_PROFILE_INFO: 'GET_PROFILE_INFO',
    GET_PROFILE_INFO_SUCCESS: 'GET_PROFILE_INFO_SUCCESS',
    GET_PROFILE_INFO_ID: 'GET_PROFILE_INFO_ID',
    GET_PROFILE_INFO_ID_SUCCESS: 'GET_PROFILE_INFO_ID_SUCCESS',
    UPDATE_PROFILE_INFO: 'UPDATE_PROFILE_INFO'
};

type credentials = {};

export class AppGetServiceRadii implements Action {
    type = actionTypes.APP_GET_SERVICE_RADIUS;
    constructor(public payload: credentials) { }
};

export class AppGetServiceRadiiSuccess implements Action {
    type = actionTypes.APP_GET_SERVICE_RADIUS_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppSetServiceRadii implements Action {
    type = actionTypes.APP_SET_SERVICE_RADIUS;
    constructor(public payload: credentials) { }
};

export class AppSetServiceRadiiSuccess implements Action {
    type = actionTypes.APP_SET_SERVICE_RADIUS_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppGetQualification implements Action {
    type = actionTypes.APP_GET_QUALIFICATION;
    constructor(public payload: credentials) { }
};

export class AppGetQualificationSuccess implements Action {
    type = actionTypes.APP_GET_QUALIFICATION_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppSetQualification implements Action {
    type = actionTypes.APP_SET_QUALIFICATION;
    constructor(public payload: credentials) { }
};

export class AppSetQualificationSuccess implements Action {
    type = actionTypes.APP_SET_QUALIFICATION_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppDeleteQualification implements Action {
    type = actionTypes.APP_DELETE_QUALIFICATION;
    constructor(public payload: credentials) { }
};

export class AppDeleteQualificationSuccess implements Action {
    type = actionTypes.APP_DELETE_QUALIFICATION_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppGetExpertise implements Action {
    type = actionTypes.APP_GET_EXPERTISE;
    constructor(public payload: credentials) { }
};

export class AppGetExpertiseSuccess implements Action {
    type = actionTypes.APP_GET_EXPERTISE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppSetExpertise implements Action {
    type = actionTypes.APP_SET_EXPERTISE;
    constructor(public payload: credentials) { }
};

export class AppSetExpertiseSuccess implements Action {
    type = actionTypes.APP_SET_EXPERTISE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppUpdateExpertise implements Action {
    type = actionTypes.APP_UPDATE_EXPERTISE;
    constructor(public payload: credentials) { }
};

export class AppUpdateExpertiseSuccess implements Action {
    type = actionTypes.APP_UPDATE_EXPERTISE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppGetEquipments implements Action {
    type = actionTypes.APP_GET_EQUIPMENTS;
    constructor(public payload: credentials) { }
};

export class AppGetEquipmentsSuccess implements Action {
    type = actionTypes.APP_GET_EQUIPMENTS_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppUpdateEquipments implements Action {
    type = actionTypes.APP_UPDATE_EQUIPMENTS;
    constructor(public payload: credentials) { }
};

export class AppUpdateEquipmentsSuccess implements Action {
    type = actionTypes.APP_UPDATE_EQUIPMENTS_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppAddMachine implements Action {
    type = actionTypes.APP_ADD_MACHINE;
    constructor(public payload: credentials) { }
};

export class AppAddMachineSuccess implements Action {
    type = actionTypes.APP_ADD_MACHINE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppUploadFile implements Action {
    type = actionTypes.UPLOAD_FILE;
    constructor(public payload: credentials) { }
};

export class AppUploadFileSuccess implements Action {
    type = actionTypes.UPLOAD_FILE_SUCCESS;
    constructor(public payload: credentials) { }
};

export class AppSettingsError implements Action {
    type = actionTypes.SETTINGS_ERROR;
    constructor() { }
}

export class GetProfileInfo implements Action {
    type = actionTypes.GET_PROFILE_INFO;
    constructor(public payload: any) { }
}
export class GetProfileInfoSuccessAction implements Action {
    type = actionTypes.GET_PROFILE_INFO_SUCCESS;
    constructor(public payload: any) { }
}
export class GetProfileInfoId implements Action {
    type = actionTypes.GET_PROFILE_INFO_ID;
    constructor(public payload: any) { }
}
export class GetProfileInfoIdSuccessAction implements Action {
    type = actionTypes.GET_PROFILE_INFO_ID_SUCCESS;
    constructor(public payload: any) { }
}
export type Actions
    = AppGetServiceRadii
    | AppGetServiceRadiiSuccess
    | AppSetServiceRadii
    | AppSetServiceRadiiSuccess
    | AppGetQualification
    | AppGetQualificationSuccess
    | AppSetQualification
    | AppSetQualificationSuccess
    | AppDeleteQualification
    | AppDeleteQualificationSuccess
    | AppGetExpertise
    | AppGetExpertiseSuccess
    | AppSetExpertise
    | AppSetExpertiseSuccess
    | AppUpdateExpertise
    | AppUpdateExpertiseSuccess
    | AppGetEquipments
    | AppGetEquipmentsSuccess
    | AppUpdateEquipments
    | AppUpdateEquipmentsSuccess
    | AppSettingsError
    | AppAddMachine
    | AppAddMachineSuccess
    | AppUploadFile
    | AppUploadFileSuccess
    | GetProfileInfo
    | GetProfileInfoSuccessAction
    | GetProfileInfoId
    | GetProfileInfoIdSuccessAction;


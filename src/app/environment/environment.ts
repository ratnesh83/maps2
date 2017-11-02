export const environment = {
    production: false,
    APP: {
        API_URL: APIURL,
        LOGIN_API: '/api/v2/web/user/login',
        LOGOUT_API: '/api/v2/web/user/logout',
        FORGOT_API: '/api/v2/web/user/forgotPassword',
        FORGOT_OTP_API: '/api/v2/web/user/verifyOtpWeb',
        RESET_PASSWORD_API: '/api/v2/web/user/resetPasswordWeb',
      
        GET_ALL_BOOKING: '/admin/getAllAvailabeBooking',
        GET_ALL_OUTGOING_BOOKING: '/admin/getOngoingBooking',
        GET_ALL_PAST_BOOKING: '/admin/getPastBooking',
        GET_BOOKING_BY_ID: '/admin/getBookingDetails',
        CANCEL_BOOKING_BY_ID: '/admin/cancelBooking',
     
        GET_ALL_USER: '/admin/getAllUsers',
        GET_USER: '/admin/userDetails',
        GET_ALL_USER_BY_ID: '/admin/userDetails',
        BLOCK_USER_BY_ID: '/admin/blockOption',
        DELETE_USER_BY_ID: '/admin/deleteUser',
        REGISTER_SERVICE: '/admin/serviceProvider/register',
        EDIT_USER_BY_ID: '/admin/userDetails/',
        ADD_CUSTOMER: '/admin/customer/registerFromEmail',
        ADD_DRIVER: '/admin/driver/registerFromEmail',
        EDIT_USER_BY_ID_SUCCESS: '/admin/customer/updateProfile',
        EDIT_SERVICE_BY_ID: '/admin/userDetails/',
        EDIT_SERVICE_BY_ID_SUCCESS: '/admin/serviceProvider/updateProfile',
        REGISTER_CUSTOMER: '/admin/customer/registerFromEmail',
        REGISTER_DRIVER: '/admin/driver/registerFromEmail',
        EDIT_DRIVER_BY_ID_SUCCESS: '/admin/driver/updateProfile',
        CHANGE_PASSWORD: '/user/changePassword',
        GET_DASHBOARD_COUNT: '/admin/getDashboardCount',
  
        GET_ALL_NOTIFICATION: '/notification/admin/getAllNotification',
        CLEAR_ALL_NOTIFICATION: '/notification/admin/clearNotification',
        READ_NOTIFICATION: '/notification/admin/readNotification',
        SETTINGS_KEY_MESSAGE: '/multilingual/addResourceBundle',

        EDIT_WORKER_BY_ID_SUCCESS: '/admin/worker/updateProfile',
        CHANGE_WORKER_DOCUMENT_APPROVAL: '/admin/worker/changeApprovalStatus',
        GET_SERVICE_RADII: '/admin/getDefaultSettings',
        SET_SERVICE_RADII: '/admin/setDefaultSettings',
        GET_QUALIFICATION: '/universalVariables/getAllQualifications',
        SET_QUALIFICATION: '/universalVariables/addNewQualification',
        UPDATE_QUALIFICATION: '/universalVariables/updateQualification',  
        GET_EXPERTISE: '/universalVariables/getAllExpertise',
        GET_EQUIPMENTS: '/admin/machine',
        SET_EXPERTISE: '/universalVariables/addNewExpertise',
        ADD_MACHINE: '/admin/machine',
        UPDATE_MACHINE: '/universalVariables/updateMachine',
        UPDATE_EXPERTISE: '/universalVariables/updateExpertise',

        GET_ALL_SUBSCRIPTIONS: '/admin/getSubscription',
        GET_SUBSCRIPTION: '/admin/getSubscription',
        BLOCK_SUBSCRIPTION: '/admin/deleteSubscription',
        UPDATE_SUBSCRIPTION: '/admin/updateSubscription',
        ADD_SUBSCRIPTION: '/admin/subscription',

        EDIT_EMPLOYER_BY_ID_SUCCESS: '/admin/emp/updateProfile',
        ADD_EMPLOYER: '/admin/employer/registerFromEmail',
        ADD_WORKER: '/admin/worker/registerFromEmail',
        APPROVE_USER_BY_ID: '/admin/verifyUser',
        REJECT_USER_BY_ID: '/admin/rejectUserDocs',
        CHANGE_EMPLOYER_DOCUMENT_APPROVAL: '/admin/emp/changeApprovalStatus',

        GET_ALL_JOBS: '/admin/getAllJobs',

        UPLOAD_FILE: '/user/uploadFile',
        UPLOAD_MULTIPLE_FILES: '/user/uploadMultipleFiles'

    }
};

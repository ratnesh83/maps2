export const environment = {
    production: false,
    APP: {
        API_URL: APIURL,
        LOGIN_API: '/api/v2/web/user/login',
        LOGOUT_API: '/api/v2/web/user/logout',
        FORGOT_API: '/api/v2/web/user/forgotPassword',
        FORGOT_OTP_API: '/api/v2/web/user/verifyOtpWeb',
        RESET_PASSWORD_API: '/api/v2/web/user/resetPasswordWeb',
        REGISTER_API: '/api/v2/web/user/register/step1',
        REGISTER_ADDRESS_API: '/api/v2/web/user/register/step2',
        REGISTER_DOCUMENTS_API: '/api/v2/web/user/register/step3',
        SEND_VERIFICATION_TYPE_API: '/api/v2/web/user/register/step4',
        RESEND_OTP_API: '/api/v2/web/user/register/resendOtp',
        CHANGE_PHONE_NUMBER_API: '/api/v2/web/user/register/changePhoneNumber',
        CHANGE_EMAIL_API: '/api/v2/web/user/register/changeEmail',
        CONFIRM_SIGNUP_OTP_API: '/api/v2/web/user/registrationotp',
        GET_USER_DETAILS_API: '/api/v2/web/user/detailsById',
        GET_ALL_CATEGORIES: '/api/v1/category',
        GET_ALL_SUB_CATEGORIES: '/api/v1/subCategory',
        POST_JOB: '/api/v2/webJobs/postJobs',
        GET_ALL_POSTS: '/api/v2/webJobs/myPostsWeb',
        GET_ALL_REQUESTS: '/api/v2/webJobs/myRequestsWeb',
        GET_POST: '/api/v2/webJobs/jobById',
        GET_LABORS: '/api/v2/webJobs/getLaboursWeb',
        GET_ALL_JOBS_POSTS: '/api/v2/webJobs/jobSearch',
        GET_ALL_LABORS: '/api/v2/webJobs/laborSearch',
        GET_ALL_LABOR_LIST: '/api/v2/webJobs/labourListSearchWeb',
        GET_ALL_FEEDBACKS: '/api/v1/user/myRatings',
        ACCEPT_JOB_BY_LABOR: '/api/v2/jobs/acceptRejectJobWeb',

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
        UPLOAD_MULTIPLE_FILES: '/user/uploadMultipleFiles',

        GET_PROFILE_INFO: '/api/v2/web/user/detailsById',
        UPDATE_PROFILE_INFO: '/api/v1/user/editWebProfile',
        ADD_CARD: '/api/v1/card/addCard'

    },

    ERROR: {
        NAME_INVALID: 'Only A-Z/a-z allowed',
        PASSWORD_INVALID: 'Password is invalid (minimum eight characters, at least one uppercase letter, one lowercase letter and one number)'
    }
};

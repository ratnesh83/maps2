import { Action } from '@ngrx/store';

export const actionTypes = {

    GET_ALL_NOTIFICATION: 'GET_ALL_NOTIFICATION',
    GET_ALL_NOTIFICATION_SUCCESS: 'GET_ALL_NOTIFICATION_SUCCESS',
    GET_ALL_NOTIFICATIONS: 'GET_ALL_NOTIFICATIONS',
    GET_ALL_NOTIFICATIONS_SUCCESS: 'GET_ALL_NOTIFICATIONS_SUCCESS',
    READ_NOTIFICATION: 'READ_NOTIFICATION',
    READ_NOTIFICATION_SUCCESS: 'READ_NOTIFICATION_SUCCESS',
    PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
    PUSH_NOTIFICATION_SUCCESS: 'PUSH_NOTIFICATION_SUCCESS',
    SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
    SHOW_NOTIFICATION_SUCCESS: 'SHOW_NOTIFICATION_SUCCESS',
    ACCEPT_INVITATION: 'ACCEPT_INVITATION',
    ACCEPT_INVITATION_SUCCESS: 'ACCEPT_INVITATION_SUCCESS'
};

export class GetAllNotificationAction implements Action {
    type = actionTypes.GET_ALL_NOTIFICATION;
    constructor(public payload: any) { }
}

export class GetAllNotificationSuccessAction implements Action {
    type = actionTypes.GET_ALL_NOTIFICATION_SUCCESS;
    constructor(public payload: any) { }
}

export class GetAllNotificationsAction implements Action {
    type = actionTypes.GET_ALL_NOTIFICATIONS;
    constructor(public payload: any) { }
}

export class GetAllNotificationsSuccessAction implements Action {
    type = actionTypes.GET_ALL_NOTIFICATIONS_SUCCESS;
    constructor(public payload: any) { }
}

export class ReadNotificationAction implements Action {
    type = actionTypes.READ_NOTIFICATION;
    constructor(public payload: any) { }
}

export class ReadNotificationSuccessAction implements Action {
    type = actionTypes.READ_NOTIFICATION_SUCCESS;
    constructor(public payload: any) { }
}

export class PushNotificationAction implements Action {
    type = actionTypes.PUSH_NOTIFICATION;
    constructor(public payload: any) { }
}
export class PushNotificationSuccessAction implements Action {
    type = actionTypes.PUSH_NOTIFICATION_SUCCESS;
    constructor(public payload: any) { }
}

export class ShowNotificationAction implements Action {
    type = actionTypes.SHOW_NOTIFICATION;
    constructor(public payload: any) { }
}

export class ShowNotificationSuccessAction implements Action {
    type = actionTypes.SHOW_NOTIFICATION_SUCCESS;
    constructor(public payload: any) { }
}

export class AcceptInvitationSuccessAction implements Action {
    type = actionTypes.ACCEPT_INVITATION_SUCCESS;
    constructor(public payload: any) { }
}

export type Actions
    = GetAllNotificationAction
    | GetAllNotificationSuccessAction
    | ReadNotificationAction
    | ReadNotificationSuccessAction
    | PushNotificationAction
    | PushNotificationSuccessAction
    | ShowNotificationAction
    | ShowNotificationSuccessAction
    | AcceptInvitationSuccessAction;


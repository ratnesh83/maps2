import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GET_ALL_SUBSCRIPTIONS: 'APP_GET_ALL_SUBSCRIPTIONS',
    APP_GET_ALL_SUBSCRIPTIONS_SUCCESS: 'APP_GET_ALL_SUBSCRIPTIONS_SUCCESS',
    APP_GET_ALL_WORKER_SUBSCRIPTIONS: 'APP_GET_ALL_WORKER_SUBSCRIPTIONS',
    APP_GET_ALL_WORKER_SUBSCRIPTIONS_SUCCESS: 'APP_GET_ALL_WORKER_SUBSCRIPTIONS_SUCCESS',
    BLOCK_SUBSCRIPTION_CONFIRM: 'BLOCK_SUBSCRIPTION_CONFIRM',
    ADD_SUBSCRIPTION: 'ADD_SUBSCRIPTION',
    ADD_SUBSCRIPTION_SUCCESS: 'ADD_SUBSCRIPTION_SUCCESS',
    BLOCK_SUBSCRIPTION: 'BLOCK_SUBSCRIPTION',
    BLOCK_SUBSCRIPTION_SUCCESS: 'BLOCK_SUBSCRIPTION_SUCCESS',
    EDIT_SUBSCRIPTION: 'EDIT_SUBSCRIPTION',
    EDIT_SUBSCRIPTION_SUCCESS: 'EDIT_SUBSCRIPTION_SUCCESS',
    SUBSCRIPTION_ERROR: 'SUBSCRIPTION_ERROR',
    GET_PLAN: 'GET_PLAN',
    GET_PLAN_SUCCESS: 'GET_PLAN_SUCCESS'

};

type credentials = {};

export class AppGetAllSubscriptions implements Action {
    type = actionTypes.APP_GET_ALL_SUBSCRIPTIONS;
    constructor(public payload: credentials) { }
}

export class AppGetAllSubscriptionsSuccess implements Action {
    type = actionTypes.APP_GET_ALL_SUBSCRIPTIONS_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetAllWorkerSubscriptions implements Action {
    type = actionTypes.APP_GET_ALL_WORKER_SUBSCRIPTIONS;
    constructor(public payload: credentials) { }
}

export class AppGetAllWorkerSubscriptionsSuccess implements Action {
    type = actionTypes.APP_GET_ALL_WORKER_SUBSCRIPTIONS_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppBlockSubscriptionConfirm implements Action {
    type = actionTypes.BLOCK_SUBSCRIPTION_CONFIRM;
    constructor(public payload: credentials) { }
}

export class AppAddSubscription implements Action {
    type = actionTypes.ADD_SUBSCRIPTION;
    constructor(public payload: credentials) { }
}

export class AppAddSubscriptionSuccess implements Action {
    type = actionTypes.ADD_SUBSCRIPTION_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppBlockSubscription implements Action {
    type = actionTypes.BLOCK_SUBSCRIPTION;
    constructor(public payload: credentials) { }
}

export class AppBlockSubscriptionSuccess implements Action {
    type = actionTypes.BLOCK_SUBSCRIPTION_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppEditSubscription implements Action {
    type = actionTypes.EDIT_SUBSCRIPTION;
    constructor(public payload: credentials) { }
}

export class AppEditSubscriptionSuccess implements Action {
    type = actionTypes.EDIT_SUBSCRIPTION_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppSubscriptionError implements Action {
    type = actionTypes.SUBSCRIPTION_ERROR;
    constructor(public payload: credentials) { }
}
export class GetPlanAction implements Action {
    type = actionTypes.GET_PLAN;
    constructor(public payload: credentials) { }
}

export class GetPlanSuccessAction implements Action {
    type = actionTypes.GET_PLAN_SUCCESS;
    constructor(public payload: any) { }
}
export type Actions
    = AppGetAllSubscriptions
    | AppGetAllSubscriptionsSuccess
    | AppGetAllWorkerSubscriptions
    | AppGetAllWorkerSubscriptionsSuccess
    | AppBlockSubscriptionConfirm
    | AppAddSubscription
    | AppAddSubscriptionSuccess
    | AppBlockSubscription
    | AppBlockSubscriptionSuccess
    | AppEditSubscription
    | AppEditSubscriptionSuccess
    | AppSubscriptionError
    | GetPlanAction
    | GetPlanSuccessAction ;



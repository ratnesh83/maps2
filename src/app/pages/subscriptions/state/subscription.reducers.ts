import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {

    subscriptions: null,
    count: 0,
    currentPage: 0,
    limit: 0,
    activeSubscription: null,
    workerSubscriptions: null,
    workerSubscriptionsCount: 0,
    workerSubscriptionsCurrentPage: 0,
    workerSubscriptionsLimit: 0
};

export const subscription: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_ALL_SUBSCRIPTIONS':
            return Object.assign(
                {},
                state,
                {
                    addSubscription: null,
                    editSubscription: null,
                    getSubscription: null,
                    error: null
                });

        case 'APP_GET_ALL_SUBSCRIPTIONS_SUCCESS':
            return Object.assign({}, action.payload, { error: null, getSubscription: true });

        case 'APP_GET_ALL_WORKER_SUBSCRIPTIONS':
            return Object.assign(
                {},
                state,
                {
                    addSubscription: null,
                    editSubscription: null,
                    error: null
                });

        case 'APP_GET_ALL_WORKER_SUBSCRIPTIONS_SUCCESS':
            return Object.assign({}, state, action.payload, { error: null });

        case 'BLOCK_SUBSCRIPTION_CONFIRM':
            return Object.assign({}, state, { activeSubscription: action.payload, error: null });

        case 'ADD_SUBSCRIPTION':
            return Object.assign({}, state, { addSubscription: null, error: null });

        case 'ADD_SUBSCRIPTION_SUCCESS':
            return Object.assign({}, state, { addSubscription: true, error: null });

        case 'EDIT_SUBSCRIPTION':
            return Object.assign({}, state, { editSubscription: null, error: null });

        case 'EDIT_SUBSCRIPTION_SUCCESS':
            return Object.assign({}, state, { editSubscription: true, error: null });

        case 'BLOCK_SUBSCRIPTION':
            return Object.assign({}, state, { activeSubscription: action.payload, error: null });

        case 'BLOCK_SUBSCRIPTION_SUCCESS':
            return Object.assign({}, state, { activeSubscription: action.payload, error: null });



        case 'SUBSCRIPTION_ERROR':
            return Object.assign(
                {},
                state,
                {
                    addSubscription: null,
                    editSubscription: null,
                    error: action.payload
                });
        case 'GET_PLAN':
            return Object.assign({}, state);

        case 'GET_PLAN_SUCCESS':
            return Object.assign({}, action.payload);

        default:
            return state;
    }
};

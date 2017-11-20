import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    feedbacks: null,
    count: 0,
};

export const feedback: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'GET_FEEDBACKS':
            return Object.assign({}, state, { feedbacks: null });

        case 'GET_FEEDBACKS_SUCCESS':
            return Object.assign({}, state, action.payload);
    
        default:
            return state;
            
    }
};
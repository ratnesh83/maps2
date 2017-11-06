import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    homeCount: null,
};

export const home: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'GET_DASHBOARD_COUNT':
            return Object.assign({}, state);

        case 'GET_DASHBOARD_COUNT_SUCCESS':
            return Object.assign({}, state, { dashBoardCount: action.payload });



        default:
            return state;
    }
};

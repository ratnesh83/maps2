import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    payments: null,
    count: 0,
    currentPage: 0,
    limit: 0,
    activePayment: null,
    type: 'all',
    selectedValue: 'all'
};
  

export const payment: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'ADD_CARD':
        return Object.assign({},'');    

        default:
            return state;
    }
};
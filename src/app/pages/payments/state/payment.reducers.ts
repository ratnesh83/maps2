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
        
        case 'GET_CARDS':
        return Object.assign({}, state);

        case 'GET_CARDS_SUCCESS':
        return Object.assign({},action.payload);
        
        default:
        return state;
    }
};
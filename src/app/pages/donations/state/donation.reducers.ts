import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {

    keys: null,
    count: 0,
};
export const donation: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'SETTINGS_KEY_MESSAGE':
            return Object.assign({}, state, { messageKey: action.payload });

        case 'SETTINGS_KEY_MESSAGE_SUCCESS':
            return Object.assign({}, state, { messageKeySuccess: action.payload });
        default:
            return state;
    }
};
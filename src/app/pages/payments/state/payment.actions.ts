import { Action } from '@ngrx/store';

export const actionTypes = {

ADD_CARD: 'ADD_CARD',

};



export class AddCardAction implements Action {
    type = actionTypes.ADD_CARD;
    constructor(public payload: any) {
    }
 }


export type Actions
= AddCardAction;

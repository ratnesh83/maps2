import { Action } from '@ngrx/store';

export const actionTypes = {

ADD_CARD: 'ADD_CARD',
GET_CARDS: 'GET_CARDS',
GET_CARDS_SUCCESS: 'GET_CARDS_SUCCESS',
PAYMENT: 'PAYMENT',
CONFIRM_DELETE: 'CONFIRM_DELETE',
DELETE_CARD: 'DELETE_CARD',
SET_AS_DEFAULT: 'SET_AS_DEFAULT',

};

type credentials = {};


export class AddCardAction implements Action {
    type = actionTypes.ADD_CARD;
    constructor(public payload: any) {
    }
 }
 export class PaymentAction implements Action {
  type = actionTypes.PAYMENT;
  constructor(public payload: any) {
  }
}
 
 export class GetCardsAction implements Action {
    type = actionTypes.GET_CARDS;
    constructor(public payload: credentials) {
    }
 }
 export class GetCardsSuccessAction implements Action {
    type = actionTypes.GET_CARDS_SUCCESS;
    constructor(public payload: any) { }
  }
  export class ConfirmDeleteAction implements Action {
    type = actionTypes.CONFIRM_DELETE;
    constructor(public payload: any) { }
  }
  export class DeleteCardAction implements Action {
    type = actionTypes.DELETE_CARD;
    constructor(public payload: any) {
    }
 }export class SetAsDefaultCardAction implements Action {
  type = actionTypes.SET_AS_DEFAULT;
  constructor(public payload: any) {
  }
}

export type Actions
= AddCardAction
| GetCardsAction
| GetCardsSuccessAction
| PaymentAction
| ConfirmDeleteAction
| DeleteCardAction
| SetAsDefaultCardAction;

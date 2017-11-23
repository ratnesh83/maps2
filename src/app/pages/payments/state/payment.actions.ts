import { Action } from '@ngrx/store';

export const actionTypes = {

ADD_CARD: 'ADD_CARD',
GET_CARDS: 'GET_CARDS',
GET_CARDS_SUCCESS: 'GET_CARDS_SUCCESS',
PAYMENT: 'PAYMENT'

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

export type Actions
= AddCardAction
| GetCardsAction
| GetCardsSuccessAction
| PaymentAction;

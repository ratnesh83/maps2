import { Action } from '@ngrx/store';

export const actionTypes = {
    GET_FEEDBACKS: 'GET_FEEDBACKS',
    GET_FEEDBACKS_SUCCESS: 'GET_FEEDBACKS_SUCCESS',
    SEARCH_FEEDBACKS: 'SEARCH_FEEDBACKS',
    SEARCH_FEEDBACKS_SUCCESS: 'SEARCH_FEEDBACKS_SUCCESS',
    FEEDBACK_ERROR: 'FEEDBACK_ERROR'
};

type credentials = {};

export class GetFeedbacks implements Action {
    type = actionTypes.GET_FEEDBACKS;
    constructor(public payload: credentials) { }
};
export class GetFeedbacksSuccess implements Action {
    type = actionTypes.GET_FEEDBACKS_SUCCESS;
    constructor(public payload: credentials) { }
};
export type Actions
    = GetFeedbacks
    | GetFeedbacksSuccess;
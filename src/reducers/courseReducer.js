import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch(action.type) {
    case types.CREATE_COURSE_SUCCESS:
      /* we need to add an element in the state which consists an array of
       * courses. We do this by using spread operator which blasts the state
       * into their elements and then create a new copy of action.course and
       * adds to it*/
      return [...state, Object.assign({}, action.course)];
    case types.UPDATE_COURSE_SUCCESS:
      return [...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)];
    case types.LOAD_COURSES_SUCCESS:
        return action.courses;
    default:
      return state;
  }
}

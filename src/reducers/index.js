/* This is where we define our root reducer that combines all reducers */
import {combineReducers} from 'redux';
import courses from './courseReducer';
// since we exported courseReducer as default we can import it as courses
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';


//the name we gave here is how we will reference it in container components
//this.state.courses
const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;

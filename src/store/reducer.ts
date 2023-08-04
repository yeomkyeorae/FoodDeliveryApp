import {combineReducers} from 'redux';

import userSlice from '../slices/user';

// 전체 상태
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

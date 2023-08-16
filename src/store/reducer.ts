import {combineReducers} from 'redux';

import userSlice from '../slices/user';
import orderSlice from '../slices/order';

// 전체 상태
const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

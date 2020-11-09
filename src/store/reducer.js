// 将多个reducer合并起来
// import { combineReducers } from 'redux'

// 在这里使用immutable，需要使用redux-immutable这个包，直接从这个包里面来获取combineReducer
import { combineReducers } from 'redux-immutable';
import { reducer as salesRecordsReducer } from '@/pages/salesRecords/store'

// 将reducer其别名引入
import { reducer as goodsManageReducer} from '@/pages/goodsManage/store'

const CReduer = combineReducers({
    goodsManage: goodsManageReducer,
    salesRecords: salesRecordsReducer
})

export default CReduer
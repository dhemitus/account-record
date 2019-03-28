
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

const middlewares = [
  thunkMiddleware,
]

const configStore = (initialState) => {
	const enhancer = compose(
		applyMiddleware(...middlewares),
	)

	return createStore(reducer, initialState, enhancer)
}

export default configStore({})
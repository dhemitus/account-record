
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import accountsList from 'views/Account/reducer'
import currenciesList from 'views/Currencies/reducer'

export default combineReducers({
  form: formReducer,
  currenciesList,
  accountsList
})
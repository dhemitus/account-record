import createAction from 'redux/createAction'

const getAllCurrenciesRest = async () => {
  let type
  let action
  let error

  try {
    let res = await fetch('https://restcountries.eu/rest/v2/all')
    let result = await res.json()
    type = (result !== null) ? 'FETCH_CURRENCIES_SUCCESSED' : 'FETCH_CURRENCIES_FAILED'

    action = {
      type,
      result,
      error: null
    }

  } catch (e) {
    error = e
    let result = null
    type = 'FETCH_CURRENCIES_FAILED'

    action = {
      type,
      result,
      error
    }
  }
  return action
}

export const getAllCurrencies = () => {
  return createAction(getAllCurrenciesRest)
}

const setAllAccountStorage = async (data) => {
  let type
  let action
  let error
  try {
    await localStorage.setItem("accounts", JSON.stringify(data))
    let result = await localStorage.getItem("accounts")
    type = 'STORING_ACCOUNTS_SUCCESSED'
    action = {
      type,
      result: JSON.parse(result),
      error: null
    }

  } catch (e) {
    type = 'STORING_ACCOUNTS_FAILED'
    let result = null
    action = {
      type,
      result,
      error
    }
  }

  console.log(action)
  return action
}

export const setAllAccount = (data) => {
  return createAction(setAllAccountStorage, data)
}
const getAllAccountStorage = async () => {
  let type
  let action
  let error
  try {
    let result = await localStorage.getItem("accounts")
    type = 'RETRIEVE_ACCOUNTS_SUCCESSED'
    action = {
      type,
      result: JSON.parse(result),
      error: null
    }

  } catch (e) {
    type = 'RETRIEVE_ACCOUNTS_FAILED'
    let result = null
    action = {
      type,
      result,
      error
    }
  }
  return action
}

export const getAllAccount = () => {
  return createAction(getAllAccountStorage)
}
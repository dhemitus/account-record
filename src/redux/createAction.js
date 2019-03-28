
const createAction = (handler, data) => {
  return async (dispatch, getState) => {
    let success = (data !== null) ? handler(data) : handler()

    return success.then(result => {
      //			return dispatch(result[0])
      return dispatch(result)
    }).catch(e => {
      return dispatch(e)
    })
  }
}
export default createAction
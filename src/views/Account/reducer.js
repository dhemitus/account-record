const initialState = {
  data: {}
};

export default function reducer(state = initialState, action) {
  const {
    type,
    result
  } = action;

  switch (type) {
    case 'RETRIEVE_ACCOUNTS_SUCCESSED':
      return {
        ...state,
        result,
        type
      };
    case 'STORING_ACCOUNTS_SUCCESSED':
    return {
      ...state,
      result,
      type
    };
    case 'RETRIEVE_ACCOUNTS_FAILED':
    return {
      ...state,
      result,
      type
    };
    default:
      return state;
  }
}

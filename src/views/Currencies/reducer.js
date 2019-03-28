const initialState = {
  data: {}
};

export default function reducer(state = initialState, action) {
  const {
    type,
    result
  } = action;

  switch (type) {
    case 'FETCH_CURRENCIES_SUCCESSED':
      return {
        ...state,
        result,
        type
      };
    default:
      return state;
  }
}

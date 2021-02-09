import createPersistedReducer from "../persist";

export default createPersistedReducer("setting", localStorage);
export const initialState = {
  token: "",
  name: "",
};

export function reducer(state, action) {
  if (action == null) {
    return { ...initialState };
  } else {
    return { ...state, ...action };
  }
}

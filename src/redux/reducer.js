export { fire } from "../utils/firebase";

export default function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

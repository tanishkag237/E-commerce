export const authReducer = (state,action) =>{

    switch(action.type){
        case 'LOGIN_SUCCESS': return { 
            ...state,
            user: action.payload.user,
            role: action.payload.role,
            token: action.payload.token,
            isAuthenticated: true
        }
        case 'LOGOUT': return { 
            ...state,
            user: null,
            role: null,
            token: null,
            isAuthenticated: false
        }
         default:
      return state;
    }
}

export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};
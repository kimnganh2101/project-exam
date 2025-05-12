import { FETCH_USER_LOGIN_SUCCESS } from "../action/UserAction";

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        role: ''
    },
    isAuthenticated: false
};


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case FETCH_USER_LOGIN_SUCCESS:
            // console.log("state", action)
            
         return {
           
             ...state, account: {
                access_token: action?.payload?.DT?.access_token,
                refresh_token: action?.payload?.DT?.refresh_token,
                username: action?.payload?.DT?.username,
                role: action?.payload?.DT?.role,
               
             },
              isAuthenticated: true
        };

     default: return state;   
    }
};

export default userReducer;
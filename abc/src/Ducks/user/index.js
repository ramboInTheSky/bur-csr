import api from '../../api';
// Actions
const SET_LOADING = 'user/SET_LOADING';
const SET_PROFILE = 'user/SET_PROFILE';
const SET_REDIRECT_URL = 'user/SET_REDIRECT_URL';
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

export const initialState = {
  profile: {},
  loggedIn: false,
  loading: false,
  redirectUrl: undefined
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        loggedIn: true,
        profile: payload,
        loading: false
      };
    }
    case LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        loading: false,
        profile: null
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: payload
      };
    }
    case SET_REDIRECT_URL: {
      return {
        ...state,
        redirectUrl: payload
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        loggedIn: true,
        profile: payload,
        loading: false
      };
    }
    default:
      return state;
  }
}

export const login = (username, password) => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  return api
    .login(username, password)
    .then(response => {
      const { profile: responseProfile } = response;
      dispatch({ type: LOGIN, payload: responseProfile });
    })
    .catch(e => {
      dispatch({ type: SET_LOADING, payload: false });
      throw new Error(e);
    });
};

export const register = values => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: true
    });
    return api
      .register(values)
      .then(response => {
        dispatch({ type: SET_PROFILE, payload: response.profile });
      })
      .catch(e => {
        dispatch({
          type: SET_LOADING,
          payload: false
        });
        throw new Error(e);
      });
  };
};

export const setProfile = payload => ({
  type: SET_PROFILE,
  payload
});

export const setRedirectUrl = payload => {
  return {
    type: SET_REDIRECT_URL,
    payload
  };
};

export const logout = () => async dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
  await api.logout();
  dispatch({ type: LOGOUT });
};

//
export const getUserProfile = () => async dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
  api
    .getUserDetails()
    .then(profile => {
      dispatch(setProfile(profile));
    })
    .catch(e => {
      dispatch({ type: SET_LOADING, payload: false });
    });
  // const profile = await api.getUserDetails();
  // dispatch({ type: SET_PROFILE, payload: profile });
};

import axios from 'axios';
import { remove, set } from 'js-cookie';
const setAuthCookie = authCode => set('bur_auth_cookie', authCode);
const destroyAuthCookie = () => remove('bur_auth_cookie');
const mockResponse = {
  uid: 'e6331ec00bca4b88831932a9ba304dad',
  created: '2019-07-12T13:15:45.835Z',
  created_timestamp: 1562937345,
  emails: {},
  is_active: true,
  is_registered: true,
  is_verified: false,
  last_login: '2019-07-15T09:56:00.501Z',
  last_login_location: {
    coordinates: {}
  },
  last_login_timestamp: 1563184560,
  login_ids: {},
  last_updated: '2019-07-12T13:15:47.027Z',
  last_updated_timestamp: 1562937347027,
  login_provider: 'site',
  oldest_data_updated: '2019-07-12T13:15:45.835Z',
  oldest_data_updated_timestamp: 1562937345835,
  password: {
    hash_settings: {}
  },
  profile: {
    first_name: 'Boris',
    last_name: 'Johnson',
    title: 'Mr',
    email: 'andreyroth@gmail.com',
    location: 'United Kingdom'
  },
  rba_policy: {},
  registered: '2019-07-12T13:15:47.027Z',
  registered_timestamp: 1562937347,
  social_providers: 'site',
  session_info: {
    access_token:
      'st2.nuVqO2TpvgxGyVzOSkQLzMSVI0k.Ht0r69yq0dbkdR3w8gUXSQ.yudiH5GFd_T7UluN_sAlPZpR8SA'
  }
};

const axiosInstance = axios.create({
  baseURL: 'https://account-dev-feature-andre-1n9kma.brb-labs.com/v1',
  timeout: 20000
});

const api = {
  // TODO: Replace this with real API calls and implement reject
  login: (user, pswd) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('/login', {
          login_id: user,
          password: pswd,
          include: 'profile,data'
        })
        .then(response => {
          setAuthCookie(
            ((response.data || {}).session_info || {}).access_token
          );
          resolve(response.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  logout: () => {
    destroyAuthCookie();
  },
  updatePassword: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 999);
    });
  },
  register: values => {
    const requestPayload = {
      login_id: values.email,
      password: values.password,
      consent: {
        privacy_policy: values.privacyPolicyConsent,
        user_profiling_consent: values.userProfilingConsent,
        third_party_consent: values.thirdPartyConsent,
        lang: 'en'
      },
      profile: {
        location: 'United Kingdom',
        title: values.title || 'Mr',
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        email: values.email
      },
      subscriptions: {
        marketing: {
          email: values.emailSubscription,
          post: values.postSubscription,
          phone: values.phoneSubscription,
          messaging: values.messagingSubscription
        }
      },
      finalize_registration: false,
      data: {},
      lang: 'en',
      reg_source: 'string',
      include: 'string'
    };
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('/register', requestPayload)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getUserDetails: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 999);

      // axiosInstance
      //   .post(
      //     'https://account-dev-feature-andre-1n9kma.brb-labs.com/v1/register',
      //     requestPayload
      //   )
      //   .then(response => {
      //     resolve(response);
      //   })
      //   .catch(e => {
      //     reject(e);
      //   });
    });
  }
};

export default api;

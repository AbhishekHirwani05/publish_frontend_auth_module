module.exports = `/* eslint-disable complexity */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { options } from 'auth-config';
import { API_URL } from '../../shared/apiEndPointURL';

/* axios Instance */
export const axiosApiInstance = axios.create({
  baseURL: \`\${API_URL.baseUrl}\`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isRefreshing = false; // Flag to track if refresh request is in progress

axiosApiInstance.interceptors.response.use(
  async (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const authTokens = localStorage.getItem('refreshtoken');
    const checkBoxStatus = localStorage.getItem('checkBoxStatus');

    if (error && error.response && error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      if (checkBoxStatus === 'true') {
        axios({
          method: 'get',
          url: \`\${API_URL.generateAuth}\`,
          headers: {
            config: \`refreshToken=\${authTokens}\`,
            withCredentials: true,
          },
        })
          .then((response: AxiosResponse) => {
            if (response && response.status === 200) {
              const resJson = response.data;
              if (options.stratergy === 'JWT Strategy') {
                if (resJson && resJson.token && resJson.refreshToken) {
                  localStorage.setItem('auth_token', resJson.token as string);
                  localStorage.setItem('refreshtoken', resJson.refreshToken as string);
                  originalRequest.headers.Authorization = \`Bearer \${resJson.token}\`;
                  return axiosApiInstance(originalRequest);
                }
              } else if (options.stratergy === 'Auth0') {
                if (resJson && resJson.access_token && resJson.refresh_token && resJson.id_token) {
                  localStorage.setItem('auth_token', resJson.access_token as string);
                  localStorage.setItem('refreshtoken', resJson.refresh_token as string);
                  localStorage.setItem('id_token', resJson.id_token as string);
                  originalRequest.headers.Authorization = \`Bearer \${resJson.id_token}\`;
                  return axiosApiInstance(originalRequest);
                }
              } else if (options.stratergy === 'Google') {
                if (resJson && resJson.id_token) {
                  localStorage.setItem('id_token', response.data.id_token as string);
                  originalRequest.headers.config = authTokens;
                  return axiosApiInstance(originalRequest);
                }
              }
            }
            return response;
          })
          .catch(async (_error: AxiosError) => {
            // window.location.href = '/sign-in';
          });
      } else {
        // window.location.href = '/sign-in';
      }

      // If a refresh request is already in progress, wait for it to complete and then retry the original request
      return new Promise((resolve, reject) => {
        const retryOriginalRequest = () => {
          originalRequest.retry = true;
          resolve(axiosApiInstance(originalRequest));
        };

        const retryInterval = setInterval(() => {
          if (!isRefreshing) {
            clearInterval(retryInterval);
            retryOriginalRequest();
          }
        }, 100); // Check every 100ms if the refresh request is completed
      });
    }

    return Promise.reject(error);
  },
);
`;

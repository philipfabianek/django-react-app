import axios from 'axios';
import Cookies from 'js-cookie';

export const getRequestHeaders = () => {
  const headers: { [key: string]: string } = {};

  // Add CSRF token header
  const CSRFToken = Cookies.get('csrftoken') || '';
  headers['X-CSRFToken'] = CSRFToken;

  return headers;
};

export const request = (
  url: string,
  { data = {}, method = 'get', headers = {} } = {}
) => {
  return axios({
    headers: {
      ...getRequestHeaders(),
      ...headers,
    },
    url,
    data,
    method,
  });
};

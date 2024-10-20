import {API_KEY, BASE_URL, PATH} from '../constants/Constants';

export const getGlobalNewsUsingQuery = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${PATH}?endpoint=everything&sortBy=popularity&q=${query}&apiKey=${API_KEY}`,
      {method: 'POST'},
    );
    if (!response.ok) {
      return {
        data: {},
        status: response.status,
      };
    }
    const json = await response.json();
    return {
      data: json,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
  }
};

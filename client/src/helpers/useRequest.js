import { useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 * @description Custom hook for handling api requests
 *
 * @returns {Array} List of utils for handling api calls
 */
const useRequest = () => {
  const [state, setState] = useState({ loading: false, response: [] });
  /**
   * @description Enables you to fetch sounds data from the server
   *
   * @param {Object} prop.page Page number to fetch data
   * @returns {Array} List of sounds
   */
  const fetchData = async ({ page }) => {
    setState({ ...state, loading: true });
    const link = `${baseUrl}?page=${page}&limit=6`;
    const {
      data: { data },
    } = await axios.get(link);

    const response = state.response.concat(data.data);
    setState({ response, loading: false });

    return {
      response,
      loading: state.loading,
      hasMore: data.hasMore,
    };
  };
  return [state, fetchData];
};

export default useRequest;

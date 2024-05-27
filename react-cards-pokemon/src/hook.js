import axios from "axios";
import { useState } from "react";
import { v1 as uuid } from "uuid";

const useToggleState = (initialState = true) => {
  const [state, setState] = useState(true);
  const toggleState = () => {
    setState((state) => !state);
  };
  return [state, toggleState];
};

const useAxios = (url, format) => {
  const [dataArray, setDataArray] = useState([]);
  const updateDataArray = async (endpoint) => {
    if (typeof endpoint === "string") url = url.concat(endpoint);

    const response = await axios.get(url);

    const data = format(response.data);

    setDataArray((dataArray) => [...dataArray, { ...data, id: uuid() }]);
  };

  const clearDataArray = () => setDataArray([]);

  return [dataArray, updateDataArray, clearDataArray];
};

export { useAxios, useToggleState };

import React, { useState, useEffect } from 'react';
// import  from

export const useFetch = (url) => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const [val, setVal] = useState(404);
  const getData = () => {
    fetch(url)
      .then((resp) => {
        setVal(resp.status);
        if (val >= 200 && val <= 299) {
          return resp.json();
        } else {
          throw new Error('Error');
        }
      })
      .then((jsonData) => {
        // console.log(jsonData);
        setData(jsonData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return { load, data, val };
};

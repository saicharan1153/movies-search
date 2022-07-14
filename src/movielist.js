import React from 'react';
import { useState, useEffect } from 'react';
import { MovieDisp } from './movie';
import './movielist.css';
import { Link, useParams } from 'react-router-dom';
// import Searchbar from './searchbar';
const Movielist = ({ query, dtext }) => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState({});
  const [isErr, setIsErr] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const { keyword, pgno } = useParams();
  const getData = async () => {
    fetch(query)
      .then((resp) => resp.json())
      .then((jsonData) => {
        setData(jsonData);
        console.log(jsonData);
        setLoad(false);
      })
      .catch((error) => {
        setIsErr(true);
        setLoad(false);

        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, [query]);

  if (load) {
    return <h1>Loading...</h1>;
  }
  if (isErr) {
    return <h1>Error...</h1>;
  }
  const disph1 = !data.results.length && dtext;
  console.log(data.results.length, disph1);
  return (
    <div>
      <div>
        {disph1 ? (
          <div>
            <h1 style={{ textAlign: 'center', color: '#ffffff' }}>
              No results Found
            </h1>
            <div className="btnparent">
              <Link to="/" className="btn">
                Back to Movies
              </Link>
            </div>
          </div>
        ) : (
          <h1 style={{ textAlign: 'center', color: '#ffffff' }}>{dtext}</h1>
        )}
      </div>
      <div className="items" style={{}}>
        {data.results.map((movie) => {
          return <MovieDisp key={movie.id} {...movie}></MovieDisp>;
        })}
      </div>
      <div>
        <Link to="/"></Link>
        <Link to="/"></Link>
      </div>
    </div>
  );
};

export default Movielist;

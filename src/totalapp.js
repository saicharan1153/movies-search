import React, { useState, useEffect, useRef } from 'react';
// import Movielist from './movielist';
import { Link, useParams } from 'react-router-dom';
import './totalapp.css';
import './movielist.css';
import { Searchicon } from './searchicon';
import { MovieDisp } from './movie';

const Movielist = ({ data, dtext }) => {
  const disph1 = !data.results.length && dtext;
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
    </div>
  );
};

const Totalapp = () => {
  const { keyword } = useParams();
  const [tkeyword, setTKeyword] = useState('');
  const [pgno, setPgno] = useState(1);

  const [load, setLoad] = useState(true);
  const [data, setData] = useState({});
  const [isErr, setIsErr] = useState(false);
  const popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=73b3420886d894b8e54038c57dc122ef&language=en&page=${pgno}`;
  const search_url = `https://api.themoviedb.org/3/search/movie?api_key=73b3420886d894b8e54038c57dc122ef&query=${keyword}&page=${pgno}&include_adult=false`;
  const person_url = `https://api.themoviedb.org/3/search/person?api_key=73b3420886d894b8e54038c57dc122ef&query=${keyword}&page=${pgno}&include_adult=false`;
  const [errMsg, setErrMsg] = useState('');
  const url = keyword ? search_url : popular_url;

  const getData = async () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoad(false);
      })
      .catch((error) => {
        setIsErr(true);
        setLoad(false);
      });
  };

  useEffect(() => {
    getData();
    console.log(load, 'load');
  }, [search_url, popular_url]);
  const searchContainer = useRef(null);

  function handlesubmit() {
    setPgno(1);
  }

  if (load) {
    return (
      <h1 style={{ textAlign: 'center', color: '#ffffff' }}>Loading...</h1>
    );
  }
  if (isErr) {
    return (
      <>
        <h1 style={{ textAlign: 'center', color: '#ffffff' }}>Error...</h1>
      </>
    );
  }

  return (
    <div>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '20px',
        }}
      >
        <input
          type="search"
          value={tkeyword}
          className="searchbox"
          placeholder="Search Movies..."
          style={{
            height: '45px',
            width: '300px',
            display: 'block',
            border: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
            outline: 'none',
          }}
          onChange={(e) => {
            setTKeyword(e.target.value);
          }}
        />
        <Link to={`/${tkeyword}`}>
          <button
            type="sumbit"
            onClick={() => {
              setPgno(1);
            }}
          >
            <Searchicon />
          </button>
        </Link>
      </form>
      {keyword ? (
        <Movielist data={data} dtext={`Search results for '${keyword}'`} />
      ) : (
        <Movielist data={data} dtext="Popular Movies" />
      )}
      <h3
        style={{ color: '#ffffff', marginTop: '40px', textAlign: 'center' }}
      >{`Page: ${pgno}`}</h3>
      <div className="pages">
        {pgno - 1 && (
          <button
            className="btn"
            style={{ margin: '40px' }}
            onClick={() => {
              setLoad(true);
              setPgno((pgno) => pgno - 1);
            }}
          >
            Prev Page
          </button>
        )}

        {data.total_pages - pgno && (
          <button
            className="btn"
            style={{ margin: '40px' }}
            onClick={() => {
              setLoad(true);
              setPgno((pgno) => pgno + 1);
            }}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Totalapp;

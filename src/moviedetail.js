import React from 'react';
import { useFetch } from './fetchdata';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import errimg from './images/errimg.png';
import './index.css';
import './moviedetail.css';
const Moviedetail = () => {
  const { id } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=73b3420886d894b8e54038c57dc122ef&language=en-US`;

  const [load, setLoad] = useState(true);
  const [data, setData] = useState({});
  const [isErr, setIsErr] = useState(false);
  const navigate = useNavigate();
  const getData = async () => {
    let resp;
    try {
      resp = await fetch(url);
    } catch {
      console.log('catch');
      setIsErr(true);
      setLoad(false);
      throw new Error('network error');
    }

    if (resp.status >= 200 && resp.status <= 299) {
      const response = await resp.json();
      setData(response);
      setLoad(false);
    } else {
      setIsErr(true);
      setLoad(false);
      throw new Error('Error', resp.status);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (load) {
    return <h1>Loading...</h1>;
  }
  if (isErr) {
    return <h1 style={{ color: '#ffffff' }}>Error </h1>;
  }

  return (
    <div>
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>
      {/* {console.log('this', navigate(-1))} */}
      <div className="complete">
        <img
          className="imgdisp"
          src={'https://image.tmdb.org/t/p/original/' + data.poster_path}
          alt={data.title}
          style={{
            height: '550px',
            width: '367px',
            margin: '40px',
          }}
          // onError={(e) => {
          //   e.target.src = { errimg };
          //   e.target.style = {
          //     height: '100%',
          //     width: '100%',
          //   };
          // }}
        />
        <div style={{ display: 'block', margin: '40px' }}>
          <h1 style={{ color: '#ffffff' }}>{data.title}</h1>
          <p style={{ color: '#ffffff' }}>{data.overview}</p>
          <Link to="/" className="btn">
            Back to movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Moviedetail;

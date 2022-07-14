import React, { useState } from 'react';
import { useFetch } from './fetchdata';
import './movie.css';
import { Link, useParams } from 'react-router-dom';

// function Movie() {
//   const url =
//     'https://api.themoviedb.org/3/movie/550?api_key=73b3420886d894b8e54038c57dc122ef&language=en-US';
//   const { data } = useFetch(url);
//   const imgbeginurl = 'https://image.tmdb.org/t/p/original/';
//   const [todisp, setTodisp] = useState(false);
//   const displaytxt = () => {
//     setTodisp(true);
//   };
//   const hidetxt = () => {
//     setTodisp(false);
//   };
//   const { keyword } = useParams();
//   return (
//     <Link to={`/${keyword}/${data.id}`}>
//       <div
//         className="movie"
//         style={{
//           backgroundImage: 'url(' + imgbeginurl + data.poster_path + ')',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           width: '250px',
//           height: '350px',
//           display: 'flex',
//           alignItems: 'flex-end',
//         }}
//         onMouseEnter={displaytxt}
//         onMouseLeave={hidetxt}
//       >
//         {todisp && <Disp title={data.title} date={data.release_date} />}
//       </div>
//     </Link>
//   );
// }

export const MovieDisp = (movie) => {
  const url = 'https://image.tmdb.org/t/p/original/' + movie.poster_path;
  const [dispinfo, setDispinfo] = useState(false);
  const showDisp = () => {
    setDispinfo(true);
  };
  const hideDisp = () => {
    setDispinfo(false);
  };

  let { keyword } = useParams();
  if (!keyword) {
    keyword = 'PoPuLArMoVies-Default';
  }
  return (
    <div
      style={{
        padding: '10px',
        margin: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '10%',
      }}
    >
      <Link to={`/${keyword}/${movie.id}`} style={{ textDecoration: 'none' }}>
        <div
          className="movie"
          style={{
            margin: '15px',
            backgroundImage: `url(${
              movie.poster_path
                ? url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ7aD9wrF2kJXjHZwRtI21bP6WTYCdac4bXbYK6djG8tssFp5AbRSzJQA4IJVCC8FBK7I&usqp=CAU'
            })`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '250px',
            height: '350px',
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onMouseEnter={showDisp}
          onMouseLeave={hideDisp}
        >
          {dispinfo && <Disp title={movie.title} date={movie.release_date} />}
        </div>
      </Link>
    </div>
  );
};

const Disp = ({ title, date }) => {
  let yer = 0;
  if (date) yer = date.substring(0, 4);
  return (
    <div
      className="disp"
      style={{
        color: '#ffffff',
        width: '100%',
        backgroundColor: '#0000007d',
      }}
    >
      <div style={{ display: 'block' }}>
        <p
          style={{
            fontSize: '20px',
            margin: '0.3rem 1rem',
            fontWeight: 'bold',
            // marginLeft: '0.2rem',
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: '15px', margin: '0.3rem 1rem' }}>{yer}</p>
      </div>
    </div>
  );
};

// export default Movie;

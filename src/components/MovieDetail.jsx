import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const MovieDetail = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const fetchMovieDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {language: "ko-KR"},
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        console.log(res);
        setMovie(res.data);
      } catch (err) {
        console.error("상세정보 불러오기 오류:", err);
      }
    };
    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div className="p-6">로딩 중...</div>;

  return (
    <div className="flex justify-center m-10 border rounded-lg shadow-xl/30">
      <div className="flex justify-between max-h-[600px]">
        <img
          className="flex-1 object-contain"
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        />
        <div className="flex flex-col flex-1 p-3">
          <div className="flex text-4xl h-full font-bold justify-between p-2">
            <p>{movie.title}</p>
            <p className="font-light">⭐{movie.vote_average}</p>
          </div>
          <div className="flex gap-3 font-semibold p-2">
            {movie.genres.map((g) => (
              <p key={g.id}>{g.name}</p>
            ))}
          </div>
          <p className="flex h-full item-end text-justify border rounded-lg p-4">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

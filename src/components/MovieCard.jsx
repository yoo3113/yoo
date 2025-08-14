import {useNavigate} from "react-router-dom";

const MovieCard = ({movie}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      key={movie.id}
      className="bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform duration-300"
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        className="w-full object-cover"
      />
      <h2 className="text-sm font-semibold text-gray-800">{movie.title}</h2>
      <p className="text-xs text-gray-600 text-right ">
        ⭐ 평점: {movie.vote_average}
      </p>
    </div>
  );
};

export default MovieCard;

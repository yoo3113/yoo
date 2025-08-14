import MovieCard from "./components/MovieCard";
import {Routes, Route} from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SearchMovie from "./components/SearchMovie";

function App() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const fetchPopularMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              language: "ko-KR",
            },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        setMovieList(res.data.results);
      } catch (err) {
        console.error("API 호출 오류:", err);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <>
      <NavBar />
      
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-6 bg-gray-100 min-h-screen justify-between">
              <div className="grid grid-cols-5  gap-6">
                {movieList.map((movie) => (
                  // . 은 그 안에 들어가는걸 의미함 ListData안에 있는 results 값을 map으로 돌리겠다.
                  <MovieCard key={movie.id} movie={movie} />
                  // MovieCard 컴포넌트 key값을 기준(기준은 id)으로 분류하고 movie 데이터를 사용할껀데
                  // {}있는 movie 는 위에 맵에서 가져온 데이타를 기준으로  분류를 하겠다.
                ))}
              </div>
            </div>
          }
        />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/searchMovie" element={<SearchMovie/>}/>
        
      </Routes>
    </>
   
  );
}

export default App;

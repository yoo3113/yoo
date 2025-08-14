import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleClick2 = () => {
    navigate("/signup");
  };
  const handleClickHome = () => {
    navigate("/");
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
    setSearchResults([]); // 검색 목록 닫기 빈배열로 만들어준다
    setSearchTerm(""); // 검색창을 초기화
  };

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchResults.length > 0) {
      handleMovieClick(searchResults[0].id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const fetchResults = async () => {
      if (!debouncedSearchTerm) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              query: debouncedSearchTerm,
              language: "ko-KR",
            },
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        setSearchResults(response.data.results);
      } catch (error) {
        console.log("검색 실패", error);
      }
    };
    fetchResults();
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-col bg-blue-200 text-black">
      <div className="flex justify-between items-center">
        <div
          onClick={handleClickHome}
          className="flex text-2xl font-bold cursor-pointer"
        >
          🎬 씨쥐뷔
        </div>
        <div className="relative inline-block">
          <div className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="영화 제목 검색"
              className="flex px-1 py-1 rounded-lg border-1 h-10 bg-white text-black w-120"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-200 text-black px-3 py-1 border-1 rounded cursor-pointer m-4"
            >
              검색
            </button>
          </div>
          {/* //검색결과 드롭다운 */}
          {searchResults.length > 0 && (
            <ul className="bg-white text-black p-4 absolute left-0 border rounded shadow-lg max-h-50 overflow-y-auto z-10 cursor-pointer">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="py-2 px-1 border-b border-gray-300"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  {movie.title} ({movie.release_date?.slice(0, 4)})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-3 m-4 w-20">
          <button
            onClick={handleClick}
            className="bg-gray-500 text-white cursor-pointer rounded-lg"
          >
            로그인
          </button>
          <button
            onClick={handleClick2}
            className="bg-gray-500 text-white cursor-pointer rounded-lg"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

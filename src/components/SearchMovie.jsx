import {useEffect, useState} from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";

function SearchMovie() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    if (!debouncedInput) return;

    const fetchData = async () => {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          query: debouncedInput,
          language: "ko-KR",
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setResults(res.data.results);
    };
    fetchData();
  }, [debouncedInput]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="영화 검색..."
        className="border p-2"
      />
      <ul>
        {results.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMovie;

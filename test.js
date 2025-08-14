import axios from "axios";

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: {
    language: "ko-KR",
  },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU2MTAxOTMzMzRkNmM1N2E1ZTE3ODQ0YTg3ODM0MiIsIm5iZiI6MTcxNjQyNzQ3Ni42ODIsInN1YiI6IjY2NGU5YWQ0ZThkMjJmNTAzY2JiMjQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l3IKQjZSPyodoFDolASLlNROIThw3d0LutLmNN34bog",
  },
};

axios
  .request(options)
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));

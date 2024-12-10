import axios from 'axios';

const API_KEY = '4213240ff76d8dc9e5ab537e25b5bb6a';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Llamadas a la API
export const fetchMovies = async (page = 1) => {
  const response = await api.get('/movie/popular', { params: { page } });
  return response.data;
};

export const fetchMovieDetail = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits',
    },
  });
  return response.data;
};

export const fetchGenres = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

export const fetchTopRatedMovies = async (page = 1) => {
  const response = await api.get('/movie/top_rated', { params: { page } });
  return response.data;
};

export const fetchUpcomingMovies = async (page = 1) => {
  const response = await api.get('/movie/upcoming', { params: { page } });
  return response.data;
};

export const fetchNowPlayingMovies = async (page = 1) => {
  const response = await api.get('/movie/now_playing', { params: { page } });
  return response.data;
};

export const fetchSeriesDetail = async (seriesId) => {
  const response = await api.get(`/tv/${seriesId}`, {
    params: {
      append_to_response: 'credits', 
    },
  });
  return response.data;
};

export const fetchSeries = async (page = 1) => {
  const response = await api.get('/tv/popular', { params: { page } });
  console.log('Datos de series:', response.data.results);
  return response.data.results;
};


export const fetchSeriesByGenre = async (genreId) => {
  try {
    const response = await api.get('/discover/tv', {
      params: {
        with_genres: genreId,
      },
    });
    console.log('Series por género:', response.data.results); 
    return response.data.results;
  } catch (error) {
    console.error('Error al obtener series por género:', error);
    return []; 
  }
};


export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data.results;
};

const API_KEY = 'f808799b8f714cc496cdf7bae948e46c'

function filtersString(filters) {
  let query = ''
  Object.keys(filters).forEach((filterKey) => {
    query += `&${filterKey}=${filters[filterKey]}`
  })
  return query
}

function genres(type) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`
    ).then((response) => {
      return response.json()
    }).then((json) => {
      resolve(json)
    }).catch((error) => {
      reject(error)
    })
  })
}

function discover(type, filters = {}) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}${filtersString(filters)}`
    ).then((response) => {
      return response.json()
    }).then((json) => {
      resolve(json)
    }).catch((error) => {
      reject(error)
    })
  })
}

function search(type, query, filters = {}) {
  // TODO: Implement filters
  return new Promise((resolve, reject) => {
    filters.query = query
    fetch(
      `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&${filtersString(filters)}`
    ).then((response) => {
      return response.json()
    }).then((json) => {
      resolve(json)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  movie: {
    search: (query, filters = {}) => search('movie', query, filters),
    genres: () => genres('movie'),
    discover: (filters) => discover('movie', filters)
  },
  tv: {
    search: (query, filters = {}) => search('tv', query, filters),
    genres: () => genres('tv'),
    discover: (filters) => discover('tv', filters)
  }
}

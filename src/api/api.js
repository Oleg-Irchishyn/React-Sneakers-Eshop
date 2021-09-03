import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `/`
});

export const sneakersAPI = {
  getSneakers: (portionStart = 0, portionLimit = 6) => {
    return instance.get(`sneakers?_start=${portionStart}&_limit=${portionLimit}`,)
      .then(response => {
        return response.data;
      });
  }
}

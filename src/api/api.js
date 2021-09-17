import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `/`
});

export const sneakersAPI = {
  getSneakers: (portionStart, portionLimit) => {
    return instance.get(`sneakers?_start=${portionStart}&_limit=${portionLimit}`,)
      .then(response => {
        return response.data;
      });
  },
  getSneakersTotalCount: () => {
    return instance.get(`totalItemsCount`)
      .then(response => {
        return response.data;
      });
  },
  changeSneakersFavouriteStatus: (id, newVal) => {
    return instance
      .patch(`sneakers/` + id, { favourite: newVal })
      .then((response) => response.data);
  },
  addItemToCart: (
    id,
    imageUrl,
    title,
    price,
  ) => {
    return instance
      .post(`cart`, { id, imageUrl, title, price })
      .then((response) => {
        return response.data;
      });
  },
}

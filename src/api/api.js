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
  getFavouriteItems: () => {
    return instance.get(`favourites`,)
      .then(response => {
        return response.data;
      });
  },
  setFavouriteItems: (id,
    imageUrl,
    title,
    price) => {
    return instance
      .post(`favourites`, {
        id,
        imageUrl,
        title,
        price
      })
      .then((response) => response.data);
  },
  setOrderItems: (
    items
  ) => {
    return instance
      .post(`totalOrderItems`, {
        items
      })
      .then((response) => {
        return response.data;
      });
  },
  setOrderTotalPrice: (
    totalPrice
  ) => {
    return instance
      .post(`totalOrderPrice`, {
        totalPrice
      })
      .then((response) => {
        return response.data;
      });
  },
  setOrderTotalCount: (
    totalCount
  ) => {
    return instance
      .post(`totalOrderCount`, {
        totalCount
      })
      .then((response) => {
        return response.data;
      });
  }
}

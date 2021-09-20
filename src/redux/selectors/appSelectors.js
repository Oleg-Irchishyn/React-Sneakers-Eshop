

export const getSneakersItemsList = (state) => {
  return state.app.sneakers;
}

export const getTotalSneakersCount = (state) => {
  return state.app.totalSneakersCount;
}

export const getInitialization = (state) => {
  return state.app.initialized;
}

export const getIsLoading = (state) => {
  return state.app.isLoading;
}

export const getSearchQuery = (state) => {
  return state.app.searchQuery;
}


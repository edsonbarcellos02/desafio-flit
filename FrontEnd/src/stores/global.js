import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    loader: false,
    error: false,
    errorMessage:null,
  }),
  actions: {
    setLoader(value) {
      this.loader = value;
    },
    setError(value) {
      this.error = value;
    },
    setErrorMessage(value) {
      this.errorMessage = value;
    },
  }
});
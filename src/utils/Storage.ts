export const Storage = {
  get: (key: string) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: (key: string, value: Object) =>
    sessionStorage.setItem(key, JSON.stringify(value)),
  delete: (key: string) => sessionStorage.removeItem(key),
};

export const getValue = (key) => {
  return localStorage.getItem(key);
};

export const setValue = (key, value) => {
  localStorage.setItem(key, value);
};

export const delValue = (key) => {
  localStorage.removeItem(key);
};

export const showPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise resolved");
      resolve(`Resolved after 2000ms`);
    }, 2000);
  });
};

export const readLocalUser = () => {
  try {
    const read = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE);
    return JSON.parse(read);
  } catch(err) {
    return false;
  }  
};

export const writeLocalUser = (user) => {
  try {
    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE, JSON.stringify(user));
    return true;
  } catch(err) {
    return false;
  }  
};

export const deleteLocalUser = (user) => {
  try {
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE);
    return true;
  } catch(err) {
    return false;
  }  
};

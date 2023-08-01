const useSessionStorage = () => {

      const getInfo = (key) => {
        return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : {};
      };
    
      const saveInfo = (key, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
      };
    
      const deleteInfo = (key) => {
        sessionStorage.removeItem(key);
      };
    
      return {getInfo, saveInfo, deleteInfo};
}

export default useSessionStorage;
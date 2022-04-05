const saveSeries = (obj) => {
    const jsonObj = JSON.stringify(obj);    
    localStorage.setItem('favSeries', jsonObj);
};
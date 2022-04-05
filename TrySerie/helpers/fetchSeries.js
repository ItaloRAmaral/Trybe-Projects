const fetchSeries = async () => {
  const url = 'https://api.tvmaze.com/shows';
  try {

    const response = await fetch (url);
    const data = await response.json();
    // console.log(data.show);
    return data;

  } catch (error) {
    return error;
  }
};

const fetchSeriesName = async (serieName) => {
  const url = `https://api.tvmaze.com/search/shows?q=${serieName}`;
  try {

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;

  } catch (error) {
    return error;
  }
};

// console.log(fetchSeriesName('arrow'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchSeries, fetchSeriesName,
  };
}
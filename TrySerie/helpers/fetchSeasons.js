const fetchSeasons = async (id) => {
    const url = `https://api.tvmaze.com/shows/${id}/seasons`;
    try {

        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        return data;

    } catch (error) {
        return error;
    }
};

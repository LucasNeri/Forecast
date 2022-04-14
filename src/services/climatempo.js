const axios = require('axios');

const getIdByName = async (localidade, uf) => {
    try {                               
        const config = {
            method: 'get',
            url: `http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${localidade}&state=${uf}&token=${process.env.CLIMATEMPO_TOKEN}`,
        };
        const response = await axios(config);
        const { id } = response.data[0];   
        return { id };
    } catch (error) {
        console.log(error);
    }
};

const setCity = async (id) => {
    try {
        const data = JSON.stringify({
            'localeId[]': id, 
        });

        const config = {
            method: 'put',
            url: `http://apiadvisor.climatempo.com.br/api-manager/user-token/${process.env.CLIMATEMPO_TOKEN}/locales`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getForecast = async (id, data) => {
    try {
        const config = {
            method: 'get',
            url: `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${id}/days/15?token=${process.env.CLIMATEMPO_TOKEN}`,
            headers: { }
        };
        const forecasts = await axios(config);

        //Clonando climas
        const response = {
            ...forecasts,
        }
    
        //Filtrando apenas o clima da data solicitada
        response.data.data = forecasts.data.data.filter(forecast => {
            return forecast.date === data
        })

        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    getForecast,
    getIdByName,
    setCity,
};
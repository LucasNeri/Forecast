const axios = require('axios');

//Buscar o CEP 
const getCep = async (cep) => {
    try {                               
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { localidade, uf } = response.data;   
        return { localidade, uf };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getCep,
};
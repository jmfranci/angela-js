const importStatements = `
const mongoose = require('mongoose');
const Joi = require('joi');
`;

const exportStatements = `
    
`

getMongooseSchema = (modelName, properties) => {
    return `
    const ${name}Schema = new mongoose.Schema({
        
    });
    
    const ${name} = mongoose.model(\'${name}\', genreSchema);
    `;
}

getValidateFunction = (modelName, properties) => {
    return `
    function validate${modelName.toUpperCase()}(${modelName}) {
        const schema = {
            ${getMongooseProperties(properties)}
        };
    `;
}

getMongooseProperties = (properties) => `
    properties.map(p => p.name + "asd" + p.type + p.isReq)
`;

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
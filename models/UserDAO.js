const DB = require('../models/Database');

module.exports = {
    getById(id){
        return DB.accessor.query(
        'SELECT * FROM users WHERE id = ${id}',
        { id : id}
    )
        .then((result) => {
        return result;
        })
        .catch((error) => {
            throw error;
        })
},

getAll() {
    return DB.accessor.query('SELECT * FROM users')
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw error;
        })
    },

postUser(name, email, alliance){
    return DB.accessor.query('INSERT INTO users(name, email, alliance_id) VALUES (${name}, ${email}, ${alliance}) RETURNING *',
    {   
        name,
        email,
        alliance
    })
    .then((result) => {
        return result;
    })
    .catch((error) => {
        throw error;
    })
},

deleteUser(id) {
    return DB.accessor.query('DELETE FROM users WHERE id = ${id}',
    {
        id : id
    })
    .then((result) =>{
        return result;
    })
    .catch((error) => {
        throw error;
    })
},

putUser(id,name, email, alliance_id){
    return DB.accessor.query('UPDATE users SET name = ${name}, email = ${email}, alliance_id = ${alliance_id} WHERE id = ${id} RETURNING *',
    {
        id : id,
        name : name,
        email : email,
        alliance_id : alliance_id
    })
    .then((result) => {
        return result;
    })
    .catch((error) => {
        throw error;
    })
},

getOneUserCharacters(id){
    return DB.accessor.query('SELECT * FROM characters WHERE user_id = ${id}',
        { id : id}
        )
        .then((result) =>{
            return result;
        })
        .catch((error) => {
        throw error;
    })
}
}
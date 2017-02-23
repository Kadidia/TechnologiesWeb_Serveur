const DB = require('../models/Database');

module.exports = {
    getAll(){
        return DB.accessor.query('SELECT * FROM alliances')
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw error;
        })
    },

    getById(id){
        return DB.accessor.query(
        'SELECT * FROM alliances WHERE id = ${id}',
        { id : id}
    )
        .then((result) => {
        return result;
        })
        .catch((error) => {
            throw error;
        })
    },

    postAlliance(name){
    return DB.accessor.query('INSERT INTO alliances(name) VALUES (${name}) RETURNING *',
    {   
        name
    })
        .then((result) => {
        return result;
        })
        .catch((error) => {
            throw error;
        })
    },

    deleteAlliance(id) {
    return DB.accessor.query('DELETE FROM alliances WHERE id = ${id}',
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

    putAlliance(id,name){
        return DB.accessor.query('UPDATE alliances SET name = ${name} WHERE id = ${id} RETURNING *',
    {
        id : id,
        name : name
    })
    .then((result) => {
        return result;
    })
    .catch((error) => {
        throw error;
    })
},

    getOneAllianceUsers(id){
        return DB.accessor.query('SELECT * FROM users WHERE alliance_id = ${id}',
        { id : id}
        )
        .then((result) =>{
            return result;
        })
        .catch((error) => {
        throw error;
    })
},

getOneAllianceCharacters(id){
    return DB.accessor.query('select c.* from alliances a join users u on a.id = u.alliance_id join characters c on u.id = c.user_id where u.alliance_id = ${id}',
        { id : id}
        )
        .then((result) =>{
            return result;
        })
        .catch((error) => {
        throw error;
    })
},

getOneAllianceCharactersandClass(id, classe){
    return DB.accessor.query('select c.* from alliances a join users u on a.id = u.alliance_id join characters c on u.id = c.user_id where u.alliance_id = ${id} and class = ${classe}',
        {   id,
            classe
        }
        )
        .then((result) =>{
            return result;
        })
        .catch((error) => {
        throw error;
    })
}

}
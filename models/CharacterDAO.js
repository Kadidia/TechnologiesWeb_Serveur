const DB = require('../models/Database');

module.exports = {
    getAll(){
        return DB.accessor.query('SELECT * FROM characters')
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw error;
        })
    },

    getById(id){
        return DB.accessor.query(
        'SELECT * FROM characters WHERE id = ${id}',
        { id : id}
    )
        .then((result) => {
        return result;
        })
        .catch((error) => {
            throw error;
        })
    },

    postCharacter(name, user_id, classe, x, y){
        var position = "(" + x + "," + y + ")";
        return DB.accessor.query('INSERT INTO characters (name, user_id, class, position) VALUES (${name}, ${user_id}, ${classe}, ${position}) RETURNING *',
    {   
        name,
        user_id,
        classe,
        position
    })
    .then((result) => {
        return result;
    })
    .catch((error) => {
        throw error;
    })
},

deleteCharacter(id) {
    return DB.accessor.query('DELETE FROM characters WHERE id = ${id}',
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

putCharacter(id, name, user_id, classe, x, y){
    var position = "(" + x + "," + y + ")";

    return DB.accessor.query('UPDATE characters SET name = ${name}, user_id = ${user_id}, class = ${classe}, position = ${position} WHERE id = ${id} RETURNING *',
    {
        id : id,
        name : name,
        user_id : user_id,
        classe : classe,
        position : position
    })
    .then((result) => {
        return result;
    })
    .catch((error) => {
        throw error;
    })
},

getOneClassCharacters(classe){
        return DB.accessor.query('SELECT * FROM characters WHERE class = ${classe}',
        { classe : classe}
        )
        .then((result) =>{
            return result;
        })
        .catch((error) => {
        throw error;
    })
},

convertRadius(value){
    return (Math.PI * value)/180;
},

distance(p1_lat, p1_long, p2_lat, p2_long){
    R = 6378000;
    var p1_lat_r = convertRadius(p1_lat);
    var p1_long_r = convertRadius(p1_long);
    var p2_lat_r = convertRadius(p2_lat);
    var p2_long_r = convertRadius(p2_long);

    d = R*(Math.PI/2 - Math.asin(Math.sin(p2_long_r) * Math.sign(p1_lat_r) + Math.cos(p2_long_r - p1_long_r) * Math.cos(p2_lat_r) * Math.cos(p1_lat_r)));
    return d;
},
getAroundAllies(id){
    //var i = (req.params.id);
    return DB.accessor.query('SELECT c.* FROM characters c join users u on c.user_id = u.id join alliances a on u.alliance_id = a.id and a.id = ${id}', 
    {
        id : id
    })
    .then((result) => {
        return result;
    })
    .catch((error) => {
        throw error;
    })
},

ma_function(raduis, id){
    var resutl = getAroundAllies(id);
   for(item in result) {
        console.log(item);
   }
}


}
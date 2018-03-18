module.exports.handleProfile = (req, res, db) => {

    const {id} = req.params;

    /*@desc Fetch the user profile from the database*/  
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(404).json('user not found');
        }
    }).catch(err => res.status(400).json('error getting the user profile'));
}
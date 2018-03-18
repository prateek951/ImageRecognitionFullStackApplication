module.exports.handleSignIn = (db,bcrypt) => (req, res) => {

    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission!! please try again..');
    }
    db.select('email','hash').from('login')
    .where('email','=',email)
    .then(data => {
        const isMatch = bcrypt.compareSync(password,data[0].hash);
        if(isMatch){
            return db.select('*').from('users')
            .where('email','=',email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('unale to get the user'));
        }
        else{
            res.status(400).json('Wrong Credentials');
        }
    }).catch(err => res.status(400).json('Wrong Credentials'));

}
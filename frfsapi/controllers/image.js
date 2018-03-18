const Clarifai = require('clarifai');

/*@desc API Key for the Clarifai Face Detection Model*/
const app = new Clarifai.App({
    apiKey: "b36bbd677f724f3088c1fe38242d85ac"
  });

module.exports = {
    handleApiCall: (req, res) => {
        app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to work with clarifai for some reason'));
    },
    handleImage: (req, res,db) => {
        const {id} = req.body;
        db('users').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('unable to get the entries'));
    }
}
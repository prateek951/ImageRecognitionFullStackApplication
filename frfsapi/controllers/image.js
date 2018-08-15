const Clarifai = require("clarifai");

/* the Clarifai Face Detection Model*/
const app = new Clarifai.App({
  apiKey: "fda1616d27d84e59ac9abc9262816fe4"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err =>
      res
        .status(400)
        .json(
          "unable to work with clarifai api.Please contact the admin or try again later" +
            err
        )
    );
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err =>
      res
        .status(400)
        .json(
          "unable to work with the clarifai api.Please contact the admin or try again later" +
            err
        )
    );
};

module.exports = {
  handleApiCall,
  handleImage
};

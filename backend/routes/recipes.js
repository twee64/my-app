const router = require('express').Router();
const multer = require('multer');
// const upload = multer({dest: 'uploads'});
let Recipe = require('../models/recipe.model');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, '../public/uploads/images/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.filename);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

router.route('/').get((req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// 
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const ingredients = Array(req.body.ingredients);
  const instruction = req.body.instruction;
  // const image =  req.file.filename;

  const newRecipe = new Recipe({
    username,
    title,
    ingredients,
    instruction,
    // image
  });

  newRecipe.save()
  .then(() => res.json('Recipe added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/update/:id').post((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.username = req.body.username;
      recipe.title = req.body.title;
      // recipe.image = req.file.filename;
      recipe.ingredients = Array(req.body.ingredients);
      recipe.instruction = req.body.instruction;


      recipe.save()
        .then(() => res.json('Recipe updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
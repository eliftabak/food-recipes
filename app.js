
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.";
const aboutContent = "Make the food you love for the people you love and discover special ingredients for luscious recipes. We want to bring the best recipes to your kitchen! Stay tuned and stay with us. 🥘🥨";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.render('home', {
    homeContent: homeStartingContent,
    posts: posts
  });
});
app.get("/about", function(req, res) {
  res.render('about', {
    aboutContent: aboutContent
  });
});
app.get('/contact', function(req, res) {
  res.render('contact', {
    contactContent: contactContent
  });
});
app.get('/compose', function(req, res) {
  res.render('compose');
});
app.post('/compose', function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = req.params.postName.toLowerCase();
  posts.forEach(function (post) {
  const storedTitle = post.title.toLowerCase();
    if(storedTitle === requestedTitle) {
      res.render('post', {postTitle: post.title, postContent: post.content});
    };
  });
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});

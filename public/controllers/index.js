console.log("loaded script index");



class ArticleController {
  constructor() {
    this.articles = [];
    this.restController = new RestController();
    


    this.articlesContainer;
    this.articleContainer;

    this.articleEditor;
    this.openArticleEditorBtn;
    this.articleEditorTitle;
    this.articleEditorText;
    this.articleEditorPublicCheck;
    this.articleEditorFeaturedCheck;
    this.addArticleBtn;
    this.tag;

    this.editMode = false;
    this.editedArticleId = null;
    this.editedArticle = null;
  }

  init() {
    $(document).ready(
      function () {
        this.articlesRow = $("#articlesRow");
        this.articleContainer = $("#articleContainer");
        this.articleEditor = $("#editArticle");
        this.getArticles();
        //this.getNumArticles();
        this.getComments();
        
      }.bind(this)
    );
  }


  createArticleUI(article) {
    var articleContainer = $("#articleContainer").clone();
    articleContainer.css("display", "block");
    articleContainer.attr("id", "");
    articleContainer.addClass("class", "articleContainer");

    var articleAuthor = articleContainer.find("#card-author")
    var articleTitle = articleContainer.find(".card-title");
    var articleBody = articleContainer.find(".card-text");
    var articleDate = articleContainer.find("#card-date");
    var articleTag = articleContainer.find("#card-tag");

    //var articlesCommentContainer = articleContainer.find(".comments-container")


    articleTitle.html(article.title);
    articleBody.html(article.body);
    articleAuthor.html(article.author);
    articleDate.html(article.Created_date);
    articleTag.html("tags: " + article.tag); //prendere come array



    //articlesCommentContainer.html(article.comments);

    $("#articlesRow").append(articleContainer);
  }

  
//   getNumArticles(){
//     this.restController.get(
//         "https://team5blogbackend.herokuapp.com/articles/",
//         function (data, status, xhr){
//           var publicArticles = 0;
//           var featuredArticles = 0; 
//           //draft articles
//           for (var id in data){
//               var article = data[id];
//               if(article.ispublic == true){
//                   if(article.featuredArticles == false){
//                       publicArticles++;
//                   }
//                   else{publicArticles++; featuredArticles++}
//               }
//           }
//           console.log(articlesCounter);
//           return articlesCounter;
//         }.bind(this) 
//     )
// }


  

  getArticles() {
    this.restController.get(
      //"https://team5blogbackend.herokuapp.com/articles/",
      "http://localhost:3000/articles/",
      function (data, status, xhr) {
        for (var id in data) {
            
          var article = data[id];
          article.id = id;
          console.log(article);
          //var articlesNumber = getNumArticles();
          //console.log(articlesNumber);
          if (article.public == true) {
            this.createArticleUI(article);
          }
        }
      }.bind(this)
    );
  }

  deleteArticle() {
    this.restController.delete(
      //`https://team5blogbackend.herokuapp.com/articles/:articleId`,
      "http://localhost:3000/articles/",
       function () {
    console.log("deleted article")
    }.bind(this))
  } 

  



  createCommentUI(comment){
    var commentContainer = $("#commentContainer").clone();
    commentContainer.css("display", "block");
    commentContainer.attr("id", "");
    commentContainer.addClass("class", "commentContainer");

    var belongsToArticle = commentContainer.find("#belongsToArticle");
    var username = commentContainer.find("#username")
    var commentText = commentContainer.find("#commentText");

    belongsToArticle.html(comment.title);
    username.html(comment.username);
    commentText.html(comment.body);

    $("#commentsRow").append(commentContainer);

  }


  getComments(){
      this.restController.get(
          //"https://team5blogbackend.herokuapp.com/comments/",
          "http://localhost:3000/comments/5f899c12bc8d202b4043ebb5" ,
          function (data, status, xhr) {
                for (var id in data){
                    var comment = data[id];
                    //comment.id = id;
                    console.log(comment)
                    this.createCommentUI(comment);
                }
            }.bind(this)
      )
  }


}

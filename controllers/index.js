console.log("loaded script index");

class ArticleController {
  constructor() {
    this.articles = [];
    this.restController = new RestController();
    //UI
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
        this.getNumArticles();
        this.getComments();
        
      }.bind(this)
    );
  }


  createArticleUI(article) {
    var articleContainer = $("#articleContainer").clone();
    articleContainer.css("display", "block");
    articleContainer.attr("id", "");
    articleContainer.addClass("class", "articleContainer");

    var articleTitle = articleContainer.find(".card-header");
    var articleBody = articleContainer.find(".card-text");

    articleTitle.html(article.title);
    articleBody.html(article.body);

    $("#articlesRow").append(articleContainer);
  }

  
  getNumArticles(){
    this.restController.get(
        "http://localhost:3000/articles",
        function (data, status, xhr){
          var publicArticles = 0;
          var featuredArticles = 0; 
          //draft articles
          for (var id in data){
              var article = data[id];
              if(article.ispublic == true){
                  if(article.featuredArticles == false){
                      publicArticles++;
                  }
                  else{publicArticles++; featuredArticles++}
              }
          }
          console.log(articlesCounter);
          return articlesCounter;
        } 
    )
}
  

  getArticles() {
    this.restController.get(
      "http://localhost:3000/articles",
      function (data, status, xhr) {
        for (var id in data) {
            //volevo mettere un conta articoli così da mostrarne il numero in dashboard
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
          "http://localhost:3000/comments/5f8d91566386621e7aa7cc4d",
          //"http://localhost:3000/articles/comments/",
          function (data, status, xhr) {
                for (var id in data){
                    var comment = data[id];
                    comment.id = id;
                    console.log(comment)
                    this.createCommentUI(comment);
                }
            }.bind(this)
      )
  }


}

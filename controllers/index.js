console.log("loaded script index")

class ArticleController {

    constructor(){
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

    init(){
        $(document).ready(function(){


            this.articlesRow = $("#articlesRow"); 
            this.articleContainer = $("#articleContainer");
            this.articleEditor = $("#editArticle");
            this.getArticles()
        }.bind(this));


        
    }

    
    


    createArticleUI(article){
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



    getArticles(){
        this.restController.get("http://localhost:3000/articles", function(data, status, xhr){
            for (var id in data){
                var article = data[id];
                article.id = id;
                console.log(article);
                if(article.public == true){
                    this.createArticleUI(article);
                }
            }
        }.bind(this));
    }

    



}
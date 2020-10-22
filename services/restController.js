console.log("loaded RestController")

class RestController{

    constructor(){}


        get(url, onSuccess, onError){
            $.get({
                url: url,
                datatype: "json",
                success: onSuccess
            })
        }


        post(url, data, onSuccess, onError){
            $.post({
                type: "POST", 
                url: url,
                data: JSON.stringify(data), 
                datatype: "json",
                success: onSuccess
            })
        }
    }

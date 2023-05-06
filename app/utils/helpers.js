

// urlFix -> Use Example
// let url = helpers.urlFix('/task/{module}?taskId={taskId}#{hash}', {
//     module: 'foo', 
//     taskId: 2, 
//     hash: 'bar'
// });

function textReplace(string, obj) {
    var s = string;
    for(var prop in obj) {
        s = s.replace(new RegExp('{'+ prop +'}','g'), obj[prop]);
    }
    return s;
}
exports.textReplace = textReplace;


exports.checkcancel = (ussdinput) => {
    if(ussdinput === "0"){
        let response = {
          "next": {},
          "text": "You cancelled the operation.",
          "type": "prompt",
          "title": "Canceled",
          "options": []
        };
        return response;
    }else{
        return false;
    }
}



exports.pre_query = (action, allresponses) => {

    if ('placeholders' in action && action[1] === undefined && JSON.stringify(allresponses) !== '{}'){
        if ('pre_query' in action.placeholders && action.placeholders[1] === undefined){
            for (const key in action.placeholders.pre_query) {
                if (action.placeholders.pre_query.hasOwnProperty(key)) {
                    if(action.placeholders.pre_query[key].queryid === 'input'){
                        action.placeholders.pre_query[key] = action.placeholders.pre_query[key].column
                    }else{
                        action.placeholders.pre_query[key] = allresponses[action.placeholders.pre_query[key].queryid][action.placeholders.pre_query[key].column];
                    }
                    
                }
            }
            let url = textReplace(action.config.url, action.placeholders.pre_query);
            action.config.url = url;
        }
    }
    return action;

}

exports.post_query = (action, res, allresponses) => {
    let lastresponse;
    
    if ('responsekey' in action && action[1] === undefined && JSON.stringify(allresponses) !== '{}'){
        lastresponse = res.data.data[0][action.responsekey];
        if ('placeholders' in action && action[1] === undefined){
            if ('post_query' in action.placeholders && action.placeholders[1] === undefined){
                for (const key in action.placeholders.post_query) {
                    if (action.placeholders.post_query.hasOwnProperty(key)) {

                        if(action.placeholders.post_query[key].queryid === 'input'){
                            console.log("gothure");
                            console.log(action.placeholders.post_query[key].column);
                            action.placeholders.post_query[key] = action.placeholders.post_query[key].column
                        }else{
                            action.placeholders.post_query[key] = allresponses[action.placeholders.post_query[key].queryid][action.placeholders.post_query[key].column];
                        }

                        
                    }
                }
                let genText = textReplace(lastresponse.text, action.placeholders.post_query);
                lastresponse.text = genText;
            }
        }
    }else{
        lastresponse = res.data.data[0];
    }

    return lastresponse;

}

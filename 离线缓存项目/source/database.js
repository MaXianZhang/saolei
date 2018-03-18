//底层模型  封装操作数据库的函数
App.database = (function () {
    var smallDatabase;
    //对数据库表的各种操作
    function runQuery(query, data, successCallback) {
        var i, l, remaining;
        if(!(data[0] instanceof Array)) {
            data = [data];
        }
        remaining = data.length;
        function innerSuccessCallback(tx, rs) {
            var i, l, output = [];
            remaining = remaining - 1;
            if(!remaining) {
                for(i = 0, l = rs.rows.length; i < l; i++) {
                    output.push(rs.rows.item(i));
                }
                if(successCallback) {
                    successCallback(output);
                }
            }
        }
        function errorCallback(){
            console.log("An error has occurred.")
        }
        smallDatabase.transaction(function (tx) {
            for(i = 0, l = data.length; i < l; i++) {
                tx.executeSql(query, data[i], innerSuccessCallback, errorCallback);
            }

        });

    };
    //初始化本地数据库
    function open(successCallback) {
        smallDatabase = openDatabase("APP","1.0","Not the FT Web App",(5 * 1024 * 1024));
        runQuery("CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY ASC, date TIMESTAMP, author TEXT, headline TEXT, body TEXT)", [], successCallback);

    };
    return {
        open: open,
        runQuery: runQuery
    };
}());
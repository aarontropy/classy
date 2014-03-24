'use strict';

var db_name = "classy",
    db_host = "localhost";

module.exports = {
    db: {
        name: db_name,
        host: db_host,
        base: 'mongodb://' + db_host + '/' + db_name
    },
    app: {
        name: 'Classy'
    }
};
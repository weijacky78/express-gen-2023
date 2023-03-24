const db = require('../config/db');

module.exports = {

    'getPage': async function (key) { // key ==>care
        let conn = await db.getConnection();
        key = key.toLowerCase();

        //query to retrieve data for the page with `key` ==> "care"
        const result = await conn.query("select page_id, title, content, `key` from page where `key` = ?", [key]);

        let status = conn.end();//release the connection back to the pool
        // console.log(result.length);

        let ret; // define ret at this scope level
        if (result.length < 1) {
            //define result structure - no results
            ret = {
                'row': null,
                'status': false,
            }
        } else {
            // define result structure: row has first (only) row of results in object notation
            ret = {
                'row': result[0],
                'status': true
            };
        }
        return ret; // return result structure
    },
    'getMenuItems': async function () {
        let conn = await db.getConnection();
        const result = await conn.query("select page_id, title, content, `key` from page where menu_order is not null order by menu_order");
        conn.end();
        return result;
    }

};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBasePerson = void 0;
const _database_1 = require("./_database");
exports.queryBasePerson = {
    getStatusProperty(row) {
        return {
            status_label: "DEFAULT",
        };
    },
    getAll(data) {
        let _self = this;
        return new Promise((resolve, reject) => {
            let queryCount = `SELECT COUNT(1) AS 'totalCount' FROM base_person `;
            let query = `SELECT base_person.* FROM base_person `;
            let whereClause = ` WHERE 1 `;
            if (data.firstname.trim().length > 0) {
                let qAll = _database_1.db.escape("%" + data.firstname.toLowerCase().trim() + "%");
                whereClause += ` AND base_person.firstname LIKE ${qAll} `;
            }
            if (data.lastname.trim().length > 0) {
                let qAll = _database_1.db.escape("%" + data.lastname.toLowerCase().trim() + "%");
                whereClause += ` AND base_person.lastname LIKE ${qAll} `;
            }
            // if (data.status) {
            //   whereClause += ` AND base_person.status = '${data.status}' `;
            // }
            // if (data.name) {
            //   let qAll = db.escape("%" + data.name.trim() + "%");
            //   whereClause += ` AND base_person.name LIKE ${qAll} `;
            // }
            //<< count query >>
            _database_1.db.query(queryCount + whereClause, (err0, result) => {
                if (data.direction) {
                    whereClause += ` ORDER BY ${data.active} ${data.direction}`;
                }
                if (data.pageSize) {
                    whereClause += ` LIMIT ${data.pageOffset}, ${data.pageSize}`;
                }
                _database_1.db.query(query + whereClause, (err, results) => {
                    if (err) {
                        console.log("Reject error:", err);
                        return reject(err);
                    }
                    results.map(function (row, index) {
                        row["statusProperty"] = _self.getStatusProperty(row);
                    });
                    return resolve({
                        list: results,
                        totalCount: result && result[0] ? result[0].totalCount : 0,
                    });
                });
            });
        });
    },
    get(id) {
        let _self = this;
        return new Promise((resolve, reject) => {
            _database_1.db.query(`SELECT base_person.* FROM base_person WHERE base_person.id=?`, [id], (err, results) => {
                if (err) {
                    console.log("Reject error:", err);
                    return reject(err);
                }
                results.map(function (row, index) {
                    row["statusProperty"] = _self.getStatusProperty(row);
                });
                return resolve(results[0]);
            });
        });
    },
    insert(data) {
        return new Promise((resolve, reject) => {
            _database_1.db.query(`INSERT INTO base_person 
        (
          firstname, 
          lastname 
        ) VALUES (
          ?,?
        )`, [data.firstname, data.lastname], (err, results) => {
                if (err) {
                    console.log("Reject error:", err);
                    return reject(err);
                }
                return resolve(results);
            });
        });
    },
    update(data) {
        return new Promise((resolve, reject) => {
            _database_1.db.query(`UPDATE base_person 
        SET
          firstname=?, 
          lastname=?
        WHERE
          id=?
        `, [
                data.firstname,
                data.lastname,
                data.id
            ], (err, results) => {
                if (err) {
                    console.log("Reject error:", err);
                    return reject(err);
                }
                return resolve(results);
            });
        });
    },
    delete(id) {
        // TODO
        return new Promise((resolve, reject) => {
            _database_1.db.query(`DELETE FROM base_person 
         WHERE id=?
        `, [
                id
            ], (err, results) => {
                if (err) {
                    console.log("Reject error:", err);
                    return reject(err);
                }
                return resolve(results);
            });
        });
    },
};

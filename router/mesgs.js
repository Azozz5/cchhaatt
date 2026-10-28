class Getmsgtletter {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS msgtletter (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      v VARCHAR(255),
      msg VARCHAR(255),
      topic VARCHAR(255),
      topic2 VARCHAR(255))`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO msgtletter (v,msg,topic,topic2) VALUES (?,?,?,?)", [data.v,data.msg,data.topic,data.topic2]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM msgtletter WHERE id = ?`, [id]);
    }


    getById(id) {
        return this.dao.get(`SELECT * FROM msgtletter WHERE id = ?`, [id]);
    }
	
    deleteall() {
        return this.dao.run(`DELETE FROM msgtletter`)
    }


    getAll() {
        return this.dao.all(`SELECT * FROM msgtletter`);
    }
	
}

module.exports = Getmsgtletter;

class GetSmile {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS smile (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      text1 VARCHAR(255),
      text2 VARCHAR(255))`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO smile (text1,text2) VALUES (?,?)", [data.text1, data.text2]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM smile WHERE id = ?`, [id]);
    }
    updateSmile(data) {
        if (data) {
            return this.dao.run(`UPDATE smile SET text1 = ? WHERE id = ?`, 
			[data.text1,data.id]
			);
        }
    }	

    getById(id) {
        return this.dao.get(`SELECT * FROM smile WHERE id = ?`, [id]);
    }
	

    getAll() {
        return this.dao.all(`SELECT * FROM smile`);
    }
}

module.exports = GetSmile;
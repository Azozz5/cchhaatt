class GetSetting {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
	  site TEXT,
	  dro3 TEXT,
      photoup TEXT,
	  back TEXT,
      sico TEXT)`;
        return this.dao.run(sql);
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO settings (site,dro3,photoup,back,sico) VALUES (?,?,?,?,?)',
            [data.site,data.dro3,data.photoup,data.back,data.sico]);
		};
    }
	
	updateDro3(data) {
        if (data) {
            return this.dao.run(`UPDATE settings SET dro3 = ? WHERE id = ?`, [data.dro3,data.id]);
        }
    }
    updatePhotoup(data) {
        if (data) {
            return this.dao.run(`UPDATE settings SET photoup = ? WHERE id = ?`, [data.photoup,data.id]);
        }
    }
	updateSico(data) {
        if (data) {
            return this.dao.run(`UPDATE settings SET sico = ? WHERE id = ?`, [data.sico,data.id]);
        }
    }
	
	updateSite(data) {
        if (data) {
            return this.dao.run(`UPDATE settings SET site = ? WHERE id = ?`, [data.site,data.id]);
        }
    }
	
	updateEmo(data) {
        if (data) {
            return this.dao.run(`UPDATE settings SET back = ? WHERE id = ?`, [data.back,data.id]);
        }
    }
	
	
	   getById(id) {
        return this.dao.get(
                `SELECT * FROM settings WHERE id = ?`,
            [id])
    }
	
    getAll() {
        return this.dao.all(`SELECT * FROM settings`);
    }
	
	
    delete(id) {
        return this.dao.run(`DELETE FROM settings WHERE id = ?`, [id]);
    }
	
	dtl() {
        return this.dao.run(`DELETE FROM settings`)
    }
	
}

module.exports = GetSetting;

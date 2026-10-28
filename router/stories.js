class GetStories {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
      lid VARCHAR(255),
      pic VARCHAR(255),
      topic VARCHAR(255) NOT NULL,
      video VARCHAR(255),
      data VARCHAR(255),
      type VARCHAR(255),
      time VARCHAR(255),
      showstory VARCHAR(4000) DEFAULT '[]',
      seodata datetime DEFAULT CURRENT_TIMESTAMP)`;
        return this.dao.run(sql);
    }
	

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO stories (lid,pic,topic,video,type,time,data) VALUES (?,?,?,?,?,?,?)", [data.lid,data.pic,data.topic,data.video,data.type,data.time,data.data]);
        }
    }
    delete(id) {
        return this.dao.run(`DELETE FROM stories WHERE id = ?`, [id]);
    }
    updateshow(data) {
        if (data) {
            return this.dao.run(`UPDATE stories SET showstory = ? WHERE id = ?`, [data.showstory,data.id]);
        }
    }
    getbyid(id) {
        return this.dao.get(`SELECT id,lid,pic,data,topic,video,type,time,showstory FROM stories WHERE id = ?`, [id]);
    }
    deleteall() {
        return this.dao.run(`DELETE FROM stories`)
    }
    
	deletehou(){
        return this.dao.run(`DELETE FROM stories WHERE seodata < now() - interval 1 DAY`)
    }
	
    getAll() {
        return this.dao.all(`SELECT id,lid,pic,data,topic,video,type,time,showstory FROM stories`);
    }
  
}

module.exports = GetStories;
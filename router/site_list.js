class GetSite {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS site (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
	  banner VARCHAR(255),
	  host VARCHAR(255),
	  ids INTEGER,
      roomgust VARCHAR(255),
      roomuser VARCHAR(255),
      roomusernew VARCHAR(255),
      logo VARCHAR(255),
      room VARCHAR(255),      
      pic VARCHAR(255))`;
        return this.dao.run(sql);
    }

    create(data) {
        return this.dao.run(
            'INSERT INTO site (banner,host,ids,logo,pic,room,roomgust,roomuser,roomusernew) VALUES (?,?,?,?,?,?,?,?,?)',
            ['banner.png',data.host,data.ids,'logo.png','pic.png','room.png','D8D8A9A9C0','D8D8A9A9C0','D8D8A9A9C0']);
    }

updateBannerLogo(data) {
        if (data) {
			if(data.state == 'banner'){
            return this.dao.run(`UPDATE site SET banner = ? WHERE id = ?`, [data.img,data.id]);
		}else if(data.state == 'logo'){
            return this.dao.run(`UPDATE site SET logo = ? WHERE id = ?`, [data.img,data.id]);
        }else if(data.state == 'pic'){
            return this.dao.run(`UPDATE site SET pic = ? WHERE id = ?`, [data.img,data.id]);
        }else if(data.state == 'room'){
            return this.dao.run(`UPDATE site SET room = ? WHERE id = ?`, [data.img,data.id]);
        };
        
    };
};	
updateRoom(data){
    if(data){
        return this.dao.run(
            'UPDATE site SET roomuser = ?, roomgust = ?, roomusernew = ?  WHERE id = ?',
            [data.roomuser,data.roomgust,data.roomusernew,data.id]);
		};
}
    delete(id) {
        return this.dao.run(
                `DELETE FROM site WHERE ids = ?`,
            [id]
        )
    }
	
	getById(id) {
        return this.dao.get(
                `SELECT * FROM site WHERE ids = ?`,
            [id])
    };
	
    getAll() {
        return this.dao.all(`SELECT * FROM site`);
    }
}

module.exports = GetSite;

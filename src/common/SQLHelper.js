import {openDatabase} from 'react-native-sqlite-storage';
class SqlHelper {
    constructor(){
        this.db = openDatabase({
            name:"data.db",
            location:"default",
            createFromLocation:"~/www/data.db"
        },()=>{console.log("Open DB Success")},(error)=>{console.log(error)})
    }
    db ;
    async addHistoryManga(manga_id,name,image){
        this.db.transaction((tx)=>{
            tx.executeSql("SELECT * FROM history where manga_id=?",[manga_id],(txt,result)=>{
                if(result.rows.length>0){
                    txt.executeSql("UPDATE history SET date_time= ? where manga_id = ?",[Date.now(),manga_id])
                }
                else {
                    txt.executeSql(`INSERT INTO history (manga_id, name,image,date_time) VALUES (?,?,?,?)`,[manga_id,name,image,Date.now()])
                }
            },(error)=>console.log(error))
        });
    }
    GetListHistory(page=1,numberItem=12){
        return new Promise((reslove,reject)=>{
            this.db.transaction((tx)=>{
                tx.executeSql("SELECT * FROM history ORDER  BY date_time DESC LIMIT ? OFFSET ?",[numberItem,(page-1)*numberItem],(txs,result)=>{
                    reslove(result.rows.raw());
                },(error)=>{reject(error)})
            })
        })
    }
    addFollowManga(manga_id,name,image){
        this.db.transaction((tx)=>{
            tx.executeSql("SELECT * FROM manga_follow where manga_id=?",[manga_id],(txt,result)=>{
                if(result.rows.length>0){
                    txt.executeSql("UPDATE manga_follow SET date_time= ? where manga_id = ?",[Date.now(),manga_id])
                }
                else {
                    txt.executeSql(`INSERT INTO manga_follow (manga_id, name,image,date_time) VALUES (?,?,?,?)`,[manga_id,name,image,Date.now()])
                }
            },(error)=>console.log(error))
        });
    }
    unFollowManga(manga_id){
        return new Promise((reslove,reject)=>{
            this.db.transaction((tx)=>{
                tx.executeSql("DELETE FROM manga_follow WHERE manga_id= ?",[manga_id],(txs,result)=>{
                    reslove(result.rows.raw());
                },(error)=>{reject(error)})
            })
        })
    }
    GetListFollower(){
        return new Promise((reslove,reject)=>{
            this.db.transaction((tx)=>{
                tx.executeSql("SELECT * FROM manga_follow ORDER  BY date_time DESC ",[],(txs,result)=>{
                    reslove(result.rows.raw());
                },(error)=>{reject(error)})
            })
        })
    }
    getFollowManga(manga_id){
        return new Promise((reslove,reject)=>{
            this.db.transaction((tx)=>{
                tx.executeSql("SELECT * FROM manga_follow where manga_id =? ",[manga_id],(txs,result)=>{
                    reslove(result.rows.raw());
                },(error)=>{reject(error)})
            })
        })
    }
}
export default new SqlHelper();
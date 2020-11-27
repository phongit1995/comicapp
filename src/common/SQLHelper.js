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
}
export default new SqlHelper();
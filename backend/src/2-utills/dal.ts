import mysql from "mysql"
import appconfig from "./appconfig"

const connection = mysql.createPool({
    
    host:appconfig.host,
    user:appconfig.user,
    password:appconfig.password,
    database:appconfig.database

})

function execute(sql:string,values?:any[]):Promise<any>{
    return new Promise<any>((resolve, reject) => {
        connection.query(sql,values,(err,result)=>{
if (err){
    reject(err)
    return
}
resolve( result)
        })
    })
}

export default {
    execute
}
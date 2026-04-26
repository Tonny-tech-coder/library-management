import sqlite from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url)
const dbPath = path.join(path.dirname(filename),'library.db')



 export const db = new sqlite.Database(dbPath,(err) => {
    if(err){
        console.log('connecting error',err );
    }else{
        console.log('connected susseccfuly' );
            db.run(`CREATE TABLE IF NOT EXISTS books (
               
                name TEXT NOT NULL,
                author TEXT  NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL )`)
        
    }
});
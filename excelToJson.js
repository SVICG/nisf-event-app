import dotenv from 'dotenv'
import simpleExcelToJson from 'simple-excel-to-json';
import { writeFile } from 'node:fs';
dotenv.config()
import * as fs from 'fs'

const start = () => {
   var doc = simpleExcelToJson.parseXls2Json('./event-data.xlsx', { isNested: true });
    // console.log(doc[0]);

    
    var jsonContent = JSON.stringify(doc)

    // console.log(jsonContent)

    fs.writeFile('events.json', jsonContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    console.log('Success')
    // process.exit(0)

}
start()

//Um mit Dateien zu arbeiten, brauchst Du das Modul fs.
const fs = require("fs"); 

//
//The functions
//

function readFile(pathToFile) {
   
    //eine Text-Datei von einem Path in einen String einzulesen 
   // const pathToFile = "TextFile.txt";
    const text = fs.readFileSync(pathToFile='TextFile.txt', "utf8");
    return text;
}


/*console.log("process.argv:", process.argv);
const fileName = process.argv[2];
console.log("File: " + fileName);
const limit = process.argv[3];
console.log("Limit: " + limit);*/


console.log(readFile());

//node Pipeline.js TextFile.txt 25

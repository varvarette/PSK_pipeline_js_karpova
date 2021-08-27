//type in terminal :
//npm install shelljs
//npm install yargs

//Imports
//Um mit Dateien zu arbeiten, brauchst Du das Modul fs.
const fs = require("fs"); 

//
//The functions
//

function readFile(path_to_file) {
   
    //eine Text-Datei von einem Path in einen String einzulesen 
   //  const pathToFile = "input-small.txt";
    const text = fs.readFileSync(path_to_file, "utf8");
    return text;
}

function filterCharsAndNormalize(text) {
    /*ersetzt im String text jede Sequenz von (Leerzeichen, Tabulator, Zeilenumbruch, ...)
    mit einem einzigen Leerzeichen, dann
    eine Kopie des Strings in Kleinbuchstaben erzeugen*/

    const repText = text.replace(/\W+/g, ' ');
    const lowcaseText = repText.toLowerCase();
    return lowcaseText;
}

function scan(lowcaseText) {

    /*
    Takes a string and scans for words, returning
    an array of words.
    */

    const array = lowcaseText.split(' ');
    return array;

}

///!!!! now working with an array instead of a list

function removeStopWords(wordList) {

    /*
    Takes an array of words and returns a copy with all stop 
    words removed 
    */

    const stopWords = fs.readFileSync("./stop_words.txt", "utf8");
    var arrayStopwords = stopWords.split(','); 

    // add single-letter words
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const arrayLetters = letters.split("");
    arrayStopwords = arrayStopwords.concat(arrayLetters); 
    
     // Removing stop words from initial words array
     var arrayCleaned = [];

     for (let w of wordList) {
         var isStopWord = false; 
         for (let stop_w of arrayStopwords) {
             if (w == stop_w) {
                 isStopWord = true;
                 break;
             }
         }
         if (isStopWord == false) {
             arrayCleaned.push(w);
         }
     }
     
     return arrayCleaned;

}

function frequencies(wordList){

    /*
    Takes an array of words and returns a dictionary associating
    words with frequencies of occurrence
    */
    var wordFreqs = {};

    for (let w of wordList) {
        if (w in wordFreqs) {
            wordFreqs[w] += 1;
        }
        else {
            wordFreqs[w] = 1
        }
    }
    return wordFreqs;
}

function sort(wordFreq){

   /* Takes a dictionary of words and their frequencies
    and returns an array of pairs where the entries are
    sorted by frequency 
    */
    var array = []; 
    for (w of Object.keys(wordFreq)) {
        array.push([w,wordFreq[w]]);
    } 

    array.sort().sort((a, b) => b[1]-a[1]);
    
    return array; 
    
}
   
function printAll(wordFreqs){

    /*
    Takes an array of pairs where the entries are sorted by frequency and print them recursively.
    */
    if(wordFreqs.length >0){
        console.log(wordFreqs[0][0], ' - ', wordFreqs[0][1]);
        
        //The shift () method removes the first element from an array and returns that removed element. This method changes the length of the array.
        wordFreqs.shift();

        printAll(wordFreqs);
    }
}
    
//
//The main function
//
printAll(sort(frequencies(removeStopWords(scan(filterCharsAndNormalize(readFile(process.argv[2])))))).slice(0,25));





/*console.log("process.argv:", process.argv);
const fileName = process.argv[2];
console.log("File: " + fileName);
const limit = process.argv[3];
console.log("Limit: " + limit);*/




//node Pipeline.js TextFile.txt 25

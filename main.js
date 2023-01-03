let inputArr=process.argv.slice(2); // process.argv is an array which stores node in 0 index and name of file in 1st index so the user input starts from 2nd index so we slice it with 2
//console.log(inputArr);
let fs=require("fs");
let path= require("path");

// node main.js tree "directoryPath"- array takes command in 0 index and path in 1st index if it exists
//node main.js organize "directoryPath"
// node main.js help

let command=inputArr[0];
let types={
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
 
switch (command) {
    case "tree" :
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case"help":
        helpFn();
        break;
    default:
        console.log("🙏please input right command");
        break;
}

function treeFn(dirPath){
    console.log("tree command implemented for",dirPath);
}

function organizeFn(dirPath){
   // console.log("organize command implemented for",dirPath);
   //1. as a input -> directory path is given 
   let destPath;
   if(dirPath==undefined){
      console.log("kindly enter the path");
      return;
  }
  else {
let doesExist = fs.existsSync(dirPath);
if(doesExist){
    //2.create ->a directory-> with name organized files
    let destPath=path.join(dirPath,"organize_files");
    if(fs.existsSync(destPath)==false){
        fs.mkdirSync(destPath);
    }
}else{
    console.log("kindly enter the correct path");
    return;
}
  }
  organizeHelper(dirPath,destPath);
}

function organizeHelper(src,dest){
    //3. check all files(identify categorties of all the files present in directory) -> 
    let childNames=fs.readdirSync(src);
//    console.log(childNames);
for(let i=0;i<childNames.length;i++){
    let childAddress=path.join(src,childNames[i]);
  let isFile=  fs.lstatSync(childAddress).isFile();
if(isFile){
   // console.log(childName[i]);
   let category=getCategory(childNames[i]);
  // console.log(childNames[i]);
  console.log(childNames[i],"belongs to -->",category);

  sendFiles(childAddress, dest, category);

} 
}
}

function sendFiles(srcFilePath,dest,category){
    //
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
     let fileName=path.basename(srcFilePath);
     let destFilePath=path.join(categoryPath,fileName);
     fs.copyFileSync(srcFilePath,destFilePath);
     console.log(fileName ," copied to ", category);
    }

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    // console.log(ext);
    for(let type in types){
        let cTypeArray =types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "others"; 
}

function helpFn(){
    console.log(`
    List of all the commands
       node main.js tree "directoryPath"
       node main.js organize "directoryPath"
       node main.js help
    `);
}

const fs = require('fs');
const zlib = require('zlib');
const commandLineArgs = require('command-line-args')
const zlibjs = require("zlibjs");
const base64js = require("base64-js")
const appRoot = require('app-root-path').path;



const main = ()=>{
    const optionDefinitions = [
        { name: 'input', alias: 'i', type: String, defaultOption: true },
        { name: 'output', alias: "o", type: String, defaultValue: "-"}
      ]

    try {
        let options = commandLineArgs(optionDefinitions)
        if (options.input === undefined) {
            throw(new Error("Input file not specified"));
        }
        let jsSource = base64js.fromByteArray(zlib.deflateRawSync(fs.readFileSync(options.input)));
        let inflateCode = base64js.fromByteArray(fs.readFileSync(appRoot + "/node_modules/zlibjs/bin/rawinflate.min.js"));
        let base64Code = base64js.fromByteArray(fs.readFileSync(appRoot + "/node_modules/base64-js/base64js.min.js"));
    } catch (err){
        console.error(err.message);
        process.exit(1);
    }
   
} 

main();

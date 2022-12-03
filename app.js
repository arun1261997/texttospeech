var express =   require("express");  
var multer  =   require('multer');  
const { basename } = require("path");
var app =   express(); 
var audioconcat = require('audioconcat');
var a 

var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './uploads');  
  },  
  filename: function (req, file, callback) {  
    callback(null, file.originalname);  
    a= file.originalname
  }  
});  
var upload = multer({ storage : storage}).single('myfile');  
app.use(express.static('public')); 
app.get('/',function(req,res){  
      res.sendFile(__dirname + "/index.html");  
});  
  
app.post('/uploadFile',function(req,res){  
    upload(req,res,function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        

        // console.log("./uploads/"+a);

(function() {
  // <code>
  "use strict";
  
  // pull in the required packages.
  var sdk = require("microsoft-cognitiveservices-speech-sdk");
  var readline = require("readline");
  var pdfUtil = require('pdf-to-text');
var pdf_path = "./uploads/"+a;
 
//option to extract text from page 0 to 10
var option = {from: 0, to: 10};

// pdfUtil.pdfToText(pdf_path, option, function(err, data) {
//   if (err) throw(err);
//   console.log(data); //print text    
// });
 
//Omit option to extract all text from the pdf file
pdfUtil.pdfToText(pdf_path, async function(err, data) {
  var subscriptionKey = "6734af3f166e41e2b26de74f2246a636";
  var serviceRegion =  req.body.region; // e.g., "westus"
 
var audio =[]
  if (err) throw(err);
  const chunkSize = 3000;
  for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      await speech(chunk,i);
      
  }
  res.send(audio); 
  async function speech(chunk,i){

    var filename = 'public/'+i+"YourAudioFile.mp3";
  
    // we are done with the setup
  
    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
     // The language of the voice that speaks.
     speechConfig.speechSynthesisVoiceName = req.body.voice; 
    // create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  
    // var rl = readline.createInterface({
    //   input: input,
    //   output: process.stdout
    // });
  
  
      // start the synthesizer and wait for a result.
      synthesizer.speakTextAsync(chunk,
          function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
          res.end(filename);  
        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
              "\nDid you update the subscription info?");
        }
        synthesizer.close();
        synthesizer = undefined;
      },
          function (err) {
        console.trace("err - " + err);
        synthesizer.close();
        synthesizer = undefined;
      });
      audio.push(filename);
      console.log("Now synthesizing to: " + filename); //print all text  
    // do whatever
  }
 
});

  // replace with your own subscription key,
  // service region (e.g., "westus"), and
  // the name of the file you save the synthesized audio.
 

  // </code>
  
}())



      
    });  
});  
  
app.listen(3000,function(){  
    console.log("Server is running on port 3000");  
}); 

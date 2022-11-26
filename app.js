var express =   require("express");  
var multer  =   require('multer');  
var app =   express(); 
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
  
app.post('/uploadjavatpoint',function(req,res){  
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
pdfUtil.pdfToText(pdf_path, function(err, data) {
  if (err) throw(err);
  console.log(data)
  var subscriptionKey = "61d582f9b2ab43698586d320ee8f637f";
  var serviceRegion = "swedencentral"; // e.g., "westus"
  var filename = "public/YourAudioFile.mp3";

  // we are done with the setup

  // now create the audio-config pointing to our stream and
  // the speech config specifying the language.
  var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
  var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
   // The language of the voice that speaks.
   speechConfig.speechSynthesisVoiceName = "hi-IN-MadhurNeural"; 
  // create the speech synthesizer.
  var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  // var rl = readline.createInterface({
  //   input: input,
  //   output: process.stdout
  // });


    // start the synthesizer and wait for a result.
    synthesizer.speakTextAsync(data,
        function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("synthesis finished.");
        res.end("File is uploaded successfully!");  
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
    console.log("Now synthesizing to: " + filename); //print all text    
});

  // replace with your own subscription key,
  // service region (e.g., "westus"), and
  // the name of the file you save the synthesized audio.
 

  // </code>
  
}())



      
    });  
});  
  
app.listen(2000,function(){  
    console.log("Server is running on port 3000");  
}); 

// (function() {

//   "use strict";
  
//   var sdk = require("microsoft-cognitiveservices-speech-sdk");
//     var readline = require("readline");
//     var pdfUtil = require('pdf-to-text');
//   var subscriptionKey = "61d582f9b2ab43698586d320ee8f637f";
//   var serviceRegion = "swedencentral"; // e.g., "westus"
//   var filename = "public/YourAudioFile.mp3";

//   // we are done with the setup

//   // now create the audio-config pointing to our stream and
//   // the speech config specifying the language.
//   var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
//   var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
//    // The language of the voice that speaks.
//    speechConfig.speechSynthesisVoiceName = "hi-IN-MadhurNeural"; 

//   // Create the speech synthesizer.
//   var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.question("Enter some text that you want to speak >\n> ", function (text) {
//     rl.close();
//     // Start the synthesizer and wait for a result.
//     synthesizer.speakTextAsync(text,
//         function (result) {
//       if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
//         console.log("synthesis finished.");
//       } else {
//         console.error("Speech synthesis canceled, " + result.errorDetails +
//             "\nDid you set the speech resource key and region values?");
//       }
//       synthesizer.close();
//       synthesizer = null;
//     },
//         function (err) {
//       console.trace("err - " + err);
//       synthesizer.close();
//       synthesizer = null;
//     });
//     console.log("Now synthesizing to: " + filename);
//   });
// }());
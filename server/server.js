import  express from 'express';
const app = express();
import multer  from "multer";
import  path  from "path";
import cors from "cors";
import { spawn } from 'child_process';
const pythonScript = './model.py';

var name=""

app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload/");
    },
    filename: function (req, file, cb) {
      name=`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
  });
const upload = multer({ storage });

app.post("/upload", upload.single('img'), (req, res) => {
    console.log("working")
    var dis=""
    const childProcess = spawn('python', [pythonScript, name]);
    childProcess.stdout.on('data', (data) => {
      dis=data.toString();
      console.log(data.toString());
      // res.send({"disease":dis})
    });
    
    childProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    childProcess.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      res.send({"disease":dis})
    });
})

app.post("/get", (req, res) => {
   res.send({"man":"hi there"})
})

// function errHandler(err, req, res, next) {
//     if (err instanceof multer.MulterError) {
//         res.json({
//             success: 0,
//             message: err.message
//         })
//     }
// }
// app.use(errHandler);
app.listen(4000, () => {
    console.log("server up and running");
})
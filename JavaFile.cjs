var spawn = require('child_process').spawn;

var path = require('path');

// compile the given java source file and execute it.
function compile(srcfile) {
    // if srcfile = 'main.java'
    var filename = path.parse(srcfile).name; // main
    var extension = path.parse(srcfile).ext;  // .java
    if (extension === ".java") {
        var args_compile = [];
        args_compile[0] = srcfile;
        var args_run = [];
      args_run[0] = "-classpath"
      args_run[1] = "/app/JAVA"
        args_run[2] = filename;
        this.execute('javac', args_compile, 'java', args_run);
    } else {
        console.log(srcfile + " is not a java file.");
    }
}
 
// compile source file and execute it.
function execute(cmd_compile, args_compile, cmd_run, args_run) {
    //var compile = spawn('gcc', ['codec.c', '-o','codec.out']);
    //var compile = spawn('javac', ['JAVA/UserStuff.java']);
    var compile = spawn(cmd_compile, args_compile);
    compile.stdout.on('data', function (data) {
        console.log('stdoutcompile: ' + data);
    });
    compile.stderr.on('data', function (data) {
        console.log('stderrcompile: ' + String(data));
    });
    compile.on('close', function (data) {
      console.log('stdoutcompile: ' + String(data));
    });
};

function runfile (args, callback) {
  //var compile = spawn('gcc', ['codec.c', '-o','codec.out']);
  //var compile = spawn('javac', ['JAVA/UserStuff.java']);
  let argsstring = "";
  for (let i = 0; i < args.length; i++){
    if (args[i].includes(" ")){
      callback( ["CONTAINS_SPACE"]);
      return;
    }
    if (i=3) args[i] = "TEMPFORTWO";
    argsstring = argsstring + args[i] + " ";
  }
  console.log("java -jar .data/java.jar "+argsstring);
  var item = spawn("java", ["-jar",".data/java.jar",argsstring]);
  // Array to store output lines
  const outputLines = [];
  // Listen for data events to capture output
  item.stdout.on('data', (data) => {
       // Split the output into lines and push to the array
       const lines = data.toString().trim().split('\n');
      outputLines.push(...lines);
  });  // Listen for errors
  item.stderr.on('data', (data) => {
      //console.error(`Error: ${data.toString()}`);
  });
   // Listen for the exit event to know when the Java process has finished
  item.on('close', (code) => {
    //console.log(`Java process exited with code ${code}`);
    callback( outputLines);
  });
};


module.exports = { compile,execute,runfile };
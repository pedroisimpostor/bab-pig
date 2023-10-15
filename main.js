
song = "";
objects = [];
status = "";

function preload()
{
  //Utilize 'loadSound' para carregar a música 'alert.mp3'
	song = loadSound("???.mp3");
}

function setup() {
  canvas=createCanvas
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  //Utilize o código que altera o HTML utilizando javascript
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
  console.log("Modelo Carregado!")
  status = true;
}

function gotResult(error, results) {
  //mostre o erro no console, se acontecer um erro
  if (error) {
    console.log(error)
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status: Objetos Detectados";
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          if(objects[i].label == "person")
          {
            //Se for uma pessoa, mostre na tela o texto 'Bebê encontrado'
            document.getElementById("numberOfObjects").innerHTML = "???";
            console.log("stop");
            song.stop();
          }
          else
          {
            //Se for um bebê, mostre na tela o texto 'Bebê não encontrado'
            document.getElementById("numberOfObjects").innerHTML = "???";
            console.log("play"); 
            //Utilize o código 'song.play' para a música começar.
            song.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("numberOfObjects").innerHTML = "Bebê não encontrado";
          console.log("play"); 
          song.play();
        }
      }
}

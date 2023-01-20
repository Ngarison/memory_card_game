

 function createImgs(){
let images = ["images/cercle.jpg","images/Cercle_noir.jpg","images/croix.jpg","images/cercle.jpg","images/Cercle_noir.jpg","images/croix.jpg","images/carré.jpg","images/carré.jpg"];
let i=0;
let k=0;
let randomIndice=[];
let occurrence=0;


let indice = Math.floor(Math.random() * 8);
randomIndice.push(indice);
console.log("première valeur:"+indice);
     
//fill a table 
while(randomIndice.length<8){

     indice = Math.floor(Math.random() * 8);
     let exist=randomIndice.indexOf(indice);
     if(exist<0){
        randomIndice.push(indice);
     }
}

console.log("tableau:")
console.log(randomIndice);


    let html = '<div class="container-cards" id="container-cards">';
    images.map(image=>{
        console.log(i);
        html+=`<div class="card" id="${k}" onclick="openCard(this);"><img id="img${k}" src="${images[randomIndice[i]]}" alt=""></div>`;
        k++;
        i++;
    });
    html+=`</div>`;

    document.getElementById("container").innerHTML=html;
 }

 createImgs();


  //Start of the click action
   let guess1="";
   let guess1CardId="";
   let guess1Img="";
   let p=0;


   let guess2="";
   let guess2CardId="";
   let guess2Img="";
   let guesses=[];
   let clique=0;
   let matches = false;
   let scoreArr =[];
   let score=0;
   let timer=10;
   let winnerCards=[];

  

function openCard(selectedItem){ 

    clickSong();

    let id_card = selectedItem.id;
    console.log("opencard:"+id_card);

    console.log("enfant:"+document.getElementById(id_card).childNodes[0].id);
    let id_img=document.getElementById(id_card).childNodes[0].id;

    // document.getElementById(id_card).classList.toggle("opencard");
    // document.getElementById(id_img).classList.toggle("displayImg");

    // setTimeout(() => {
    //     document.getElementById(guess2CardId).classList.toggle("opencard");
    //     document.getElementById(guess2Img).classList.toggle("displayImg");
    //   }, "1000")

    document.getElementById(id_img).style.display="block";
    document.getElementById(id_card).style.backgroundImage = "none";
   

      if(clique<3){
        clique++;
        console.log("nombre de clique:"+clique)
        if(clique===1){
            //Player 1:
            guess1CardId=id_card;
            guess1Img=id_img;
            guess1=document.getElementById(guess1Img).src;
            console.log("Player 1:"+guess1)
            guesses.push(document.getElementById(id_img));
            if(timer>0){
              timer--;
              console.log("Timer:"+timer);
            }

            // document.getElementById(guess1CardId).classList.toggle("opencard");
            // document.getElementById(guess1Img).classList.toggle("displayImg");
            // setTimeout(() => {
            //     document.getElementById(guess1CardId).classList.toggle("opencard");
            //     document.getElementById(guess1Img).classList.toggle("displayImg");
            //   }, "1000")

        }else{
            //Player 2:
            guess2CardId=id_card;
            guess2Img=id_img;
            guess2=document.getElementById(guess2Img).src;
            console.log("Player 2:"+guess2)
            guesses.push(document.getElementById(id_img));
            if(timer>0){
              timer--;
              console.log("Timer:"+timer);
            }
            
            // document.getElementById(guess2CardId).classList.toggle("opencard");
            // document.getElementById(guess2Img).classList.toggle("displayImg");
            // setTimeout(() => {
            //     document.getElementById(guess2CardId).classList.toggle("opencard");
            //     document.getElementById(guess2Img).classList.toggle("displayImg");
            //   }, "1000")
        }
       
        if(guess1!=="" && guess2!=="" ){
            if(guess1===guess2 && guess1Img!==guess2Img ){
                matches=true;
                score++;
                //timer--;
                correctSong();
                document.getElementById(guess1CardId).style.backgroundImage='none';
                document.getElementById(guess1Img).style.display="block";

                document.getElementById(guess2CardId).style.backgroundImage='none';
                document.getElementById(guess2Img).style.display="block"; 
                clique=0;
                guess1="";
                guess2="";
            }else{
                console.log("Je suis dans le else");
                console.log("cardid:"+guess1CardId+", imgId:"+guess1Img);
                console.log("cardid:"+guess2CardId+", imgId:"+guess2Img);
                errortSong();
                //timer--;
                setTimeout(() => {
                // alert("Nous ne matchons pas! Sorry");
                    console.log("Les deux cards doivent se fermer!")
                    document.getElementById(guess1Img).style.display="none";
                    document.getElementById(guess1CardId).style.backgroundImage = "url('images/img-colombe.png')";
                    document.getElementById(guess2Img).style.display="none";
                    document.getElementById(guess2CardId).style.backgroundImage = "url('images/img-colombe.png')";
                }, "300")

                clique=0;
                guess1="";
                guess2="";
            }
        
        }
    
     }else{
        clique=0;
        guess1="";
        guess2="";
     }
     document.getElementById("score").innerHTML=score;
     document.getElementById("timer").innerHTML=timer;
    /*  setInterval(function() {
      document.getElementById("timer").innerHTML=timer;
      if(timer>0){
        timer--;
        console.log("Timer:"+timer);
      }

    }, 3000); */

        console.log("score: "+score);

        if(score==4){
          winnerOn();
          winnerPlayAudio();
        }else if(timer==0 && score<4){
          loserOn();
          loserPlayAudio();
        }

        
}



//Test overlay

function winnerOn(){
    document.getElementById("overlay1").style.display = "block";
  }
  
   function loserOn(){
    document.getElementById("overlay2").style.display = "block";
  } 


  function off() {
    document.getElementById("overlay1").style.display = "none";
    document.getElementById("overlay2").style.display = "none";
    document.getElementById("score").innerHTML=0;
    reload() 
  }


  var x = document.getElementById("myAudio"); 
  function winnerPlayAudio() { 
    x.play(); 
  } 

  var k = document.getElementById("myAudio1"); 
  function loserPlayAudio() { 
    k.play(); 
  } 


  var y = document.getElementById("myAudio2"); 
  function clickSong(){
    y.play(); 
  }

  var z = document.getElementById("myAudio3"); 
  function correctSong(){
    z.play(); 
  }

  var h = document.getElementById("myAudio4"); 
  function errortSong(){
    h.play(); 
  }



  function reload() {
    location.replace("index.html");
  }
const main = document.getElementById("main");
const button = document.getElementById("button");
const buttondiv = document.getElementById("buttondiv");
let messageCount = 0;
let wait;
let cancelWait = 0;
let lovebutton;
let freebutton;
let wealthbutton;
const interval = 40;


async function incrementDisplay(input, intervalIn){
  button.style.cssText = "opacity: 0.5"
  let endText = input;
  input = '';
  for (i = 0; i < endText.length; i++){
    input += endText[i];
    
    // to not read element notation
    cancelWait = endText[i] == '<' && endText[i + 1] != '/' ? 15 : endText[i] == '<' && endText[i + 1] == '/' ? 6 : cancelWait; 
    cancelWait = cancelWait != 0 ? cancelWait - 1 : 0;
    if (cancelWait == 0){
      const wait = await incrementWait(intervalIn);
    }
    main.innerHTML = input;

    // end of displaytext, allows buttons to be clicked
    if (i == endText.length - 1){
      if (messageCount == 4){
        button.style.cssText = "opacity: 0"
        button.removeEventListener('click',displayNext);
      } else {
      button.style.cssText = "opacity: 1"
      button.addEventListener("click", displayNext);     
      messageCount++;
      }
      
    }
  }
  return input;
}

function incrementWait(intervalIn){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, intervalIn);
  });
}

function displayNext() {
  incrementDisplay(message[messageCount], interval);
  button.removeEventListener('click',displayNext);
}



let message = ["You escaped the <em id='genie'>genie's lamp</em>!            The tomb surrounding the lamp \
fade into your vision as you reappear in a <em id='genie'>blue smoke.</em>"] 

message.push('The <em id="genie">genie</em> hovers before you,        enraged.          \
<em id="genie">"HOW DID YOU ESCAPE!?"</em>  ');

message.push("The lamp begins to engulf the <em id='genie'>genie</em> in the familiar <em id='genie'>blue aura</em>,           \
and the <em id='genie'>genie</em> is forcefully pulled back into its original resting place." );

message.push('You leave the tomb empty-handed,                \
distrustful of any artifact that may have seemed promising.')

message.push("THE END")


incrementDisplay(message[messageCount], interval);



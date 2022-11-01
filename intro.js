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
      if (messageCount == 3){ // start of branches
        wealthbutton = document.createElement("button");
        wealthbutton.innerHTML = "Wealth";
        buttondiv.appendChild(wealthbutton);
        wealthbutton.addEventListener("click", wealthBranch);

        lovebutton = document.createElement("button");
        lovebutton.innerHTML = "Love"
        buttondiv.appendChild(lovebutton);
        lovebutton.addEventListener("click", loveBranch);

        freebutton = document.createElement("button");
        freebutton.innerHTML = "Freedom"
        buttondiv.appendChild(freebutton);
        freebutton.addEventListener("click", freeBranch);

        button.style.cssText = "opacity: 0";

      } else if (messageCount == 5){
        button.style.cssText = 'opacity: 1';
        button.innerHTML = 'Release the Genie';
        button.addEventListener('click', endingBranch);
      } else if (messageCount == 9){
        button.style.cssText = 'opacity: 1';
        button.innerHTML = 'Escape!';
        button.addEventListener('click', redirectGame);
      } else {
        button.style.cssText = "opacity: 1"
        button.addEventListener("click", displayNext);
      }
      messageCount++;
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

function resetButton(){
  lovebutton.remove();
  freebutton.remove();
  wealthbutton.remove();
}

function loveBranch(){
  message.push('<em id="adven">"I have enough money for all things material...        \
  so I would undoubtably wish for the one thing I lack —         \
  a partner that gives me the love that I very much desire."</em>');
  message.push('<em id="genie">"Very well...          \
  I shall grant you all the love you will ever need...        \
  I just require one favor — one payment — for such a generous wish...       \
  I must be released!"</em>');
  resetButton();
  incrementDisplay(message[messageCount], interval);
}

function wealthBranch(){
  message.push('<em id="adven">"I wish for endless wealth, \
  more than enough to last me for a lifetime."</em>');
  message.push('<em id="genie">"Very well...           \
  I shall grant you unending riches...         \
  it will indeed last for the entirety of your lifetime.       \
  I just require one favor — one payment — for such a generous wish...       \
  I must be released!"</em>');
  resetButton();
  incrementDisplay(message[messageCount], interval);
}

function freeBranch(){
  console.log('free');
  message.push('<em id="adven">"I do not wish for anything material      \
  nor anything of the sort,        as I am content with my life.       \
  I wish for you,         my generous Genie,         \
  to be free of the shackles that bind you to this lamp, in this tomb!"</em>');
  message.push('<em id="genie">"Oh,      thank you,       kind traveler!    \
  I have been imprisoned in this tomb for over 500 years...     \
  I greatly appreciate this act of kindness..."    ')
  resetButton();
  incrementDisplay(message[messageCount], interval);
}

function endingBranch(){
  button.innerHTML = '>';
  button.removeEventListener('click',endingBranch);
  message.push('You remove the top of the glowing lamp,          \
  revealing a <em id="genie">blinding blue light</em>,    \
  radiating from the artifact. The <em id="genie">genie</em> appears!           Spiraling out from within the lamp, \
  it grows to be the size of the tomb itself,        towering over you.');
  message.push('However, its face...        is not one of gratitude...        \
  but one of mischief.      The genie taunts:        \
  <em id="genie">"You fool!        It is no wonder that humans are so easily manipulated...        \
  I can even feel your stupidity from up here!"</em>');
  message.push('<em id="genie">"You see...        \
  the one who releases me must take my place in the lamp.      \
  I doubt you are skillful enough to even ATTEMPT escaping."</em>');
  message.push("The <em id='genie'>blue aura</em> surrounds you,       and you feel its magic pulling you into the lamp.       \
  As you shrink, you hear the bellowing laugh of the <em id='genie'>genie</em>.        \
  Everything fades to black.                                    \
  But you're not done yet... ")
  incrementDisplay(message[messageCount], interval);
}

function redirectGame(){
  window.location.replace("platformer.html")
}


let message = ["You are an <em id='adven'>adventurer</em>.            \
A thrill seeking, tomb raiding, traveler."];

message.push("While on an escapade through the <em id='adven'>tombs of Egypt</em>, you come across a sacred relic:         \
an otherwise unnoticeable dusty oil lamp,         \
apart from the glowing <em id='genie'>blue aura</em> \
seeping out from under the lid.");

message.push('You have discovered a <em id="genie">GENIE</em>.      \
Echoing from the chambers of the tomb, the genie emerges from the lamp and says in a booming voice:        \
<em id="genie">"I can grant you one wish...         and one wish only.        I am at your service."</em>')

message.push("Wealth...                  Love...                 the <em id='genie'>Genie</em>'s freedom?               \
You ponder this inconceivable opportunity,              and, after some thought,           you finally knew exactly what to wish for. ")


incrementDisplay(message[messageCount], interval);



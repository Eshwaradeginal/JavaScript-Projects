const textarea=document.querySelector('#text');
let voicelist=document.querySelector('#voice');
let speechbtn=document.querySelector('.submit');

let sysnt=speechSynthesis;
let isSpeaking=true;

function voicespeech(){
    for(let voice of sysnt.getVoices()){
        let option=document.createElement('option')
        option.text=voice.name;
        voicelist.add(option);
        
    }
}

sysnt.addEventListener('voiceschanged',voicespeech)

function texttospeech(text){
    let Utterance=new SpeechSynthesisUtterance(text)
    for(let voice of sysnt.getVoices()){
        if(voice.name === voicelist.value){
            Utterance.voice=voice;
        }
    }
    speechSynthesis.speak(Utterance); 
    
}
speechbtn.addEventListener('click',(e) =>{
    e.preventDefault();
    if(textarea.value !==''){
        if(!sysnt.isSpeaking){
            texttospeech(textarea.value);
        }
        if(textarea.value.length>80){
            if(isSpeaking){
                sysnt.resume();
                isSpeaking=false;
                speechbtn.innerHTML='pause speech';
            }else{
                sysnt.pause();
                isSpeaking=true;
                speechbtn.innerHTML='Resume speech';
            }
            setInterval(()=>{
                if(!Sysnt.speaking && !isSpeaking){
                    isSpeaking=true;
                    speechbtn.innerHTML='Convert To Speech';
                }
            })
        }else{
            speechbtn.innerHTML ='Convert To Speech';
        }

    }
})
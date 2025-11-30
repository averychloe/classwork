// const pathLetters = document.getElementById("path-letters")
// const pathNumbers = document.getElementById("path-numbers")
// const pathEmojis = document.getElementById("path-emojis")

// pathLetters.style.position = "absolute";
// pathLetters.style.top = `${100+200*Math.random()}px`
// pathLetters.style.left = `${window.innerWidth*Math.random()}px`

// pathNumbers.style.position = "absolute";
// pathNumbers.style.top = `${150+200*Math.random()}px`
// pathNumbers.style.left = `${window.innerWidth*Math.random()}px`

// pathEmojis.style.position = "absolute";
// pathEmojis.style.top = `${200+200*Math.random()}px`
// pathEmojis.style.left = `${window.innerWidth*Math.random()}px`

const elementsToMessUp = document.getElementsByClassName("randomly-mess-up")
for(const element of elementsToMessUp){
    let matrix = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
    for(let i = 0; i < 16; i++){
        matrix[i] += (Math.random()-0.5)*0.00001
    }
    element.style.transform =  `matrix3d(${matrix.join(",")}) rotate(${(Math.random()-0.5)*0.2}deg)`
}

// add typos
const uppercaseCharacters = "QWERTYUIOPASDFGHJKLZXCVBNM"
const lowercaseCharacters = "qwertyuiopasdfghjklzxcvbnm"
const misc = "1234567890-=_+:;?><,."
const ps = document.getElementsByTagName("p");
const as = document.getElementsByTagName("a");
const threshold = 0.0007

const typoify = (element)=>{
    let text = element.innerText.split('');
    for(let i=0; i<text.length-1; i++){
        if(Math.random()<threshold){
            text[i]=text[i+1]
            text[i+1]=element.innerText[i]
        }
        if(Math.random()<threshold){
            if(text[i]==text[i].toUpperCase()){
                text[i]=uppercaseCharacters[Math.floor(Math.random()*uppercaseCharacters.length)]
            }
            if(text[i]==text[i].toLowerCase()){
                text[i]=lowercaseCharacters[Math.floor(Math.random()*lowercaseCharacters.length)]
            }
        }
        if(Math.random()<threshold/4){
            text[i]=misc[Math.floor(Math.random()*misc.length)]
        }
        if(Math.random()<threshold){
            if(text[i]==text[i].toUpperCase()){
                text[i]=text[i].toLowerCase()
            }
            if(text[i]==text[i].toLowerCase()){
                text[i]=text[i].toUpperCase()
            }
        }
    }
    element.innerText = text.join('');
}

for(const element of ps){
    typoify(element)
}

for(const element of as){
    typoify(element)
}
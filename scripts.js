const goodbyeworld = document.getElementById("goodbyeworld");
const text = document.getElementById("text");
console.log(goodbyeworld)
let timer = 0;
let intensity = 0;
let initialtimer = 0;
let nextId = 0;

function random(){
    return (1+Math.random())/2;
}

let seeds = [];

for(let i = 0; i < 7; i++){
    seeds.push(random())
}

text.addEventListener("mousedown", (e)=>{intensity=50; initialtimer=timer;
    for(let i = 0; i < 5+10*Math.random(); i++){
        new DamageInstance(e.clientX, e.clientY, 1);
    }
});



setInterval(() => {
    goodbyeworld.style.transform = `translateY(${100*Math.sin(seeds[1]*timer)}px) translateX(${100*Math.cos(seeds[2]*timer)}px) rotate(${100*Math.cos(seeds[3]*timer)}deg)`
    goodbyeworld.style.fontSize = `${70+30*Math.cos(seeds[0]*timer)}px`
    goodbyeworld.style.color = `hsl(${180+180*Math.sin(seeds[4]*timer)}, ${75+25*Math.sin(seeds[5]*timer)}%, ${75+25*Math.sin(seeds[6]*timer)}%)`
    timer += 0.01;

    text.style.transform = `translateX(${intensity*(Math.random()-1/2)}px) translateY(${intensity*(Math.random()-1/2)}px) scale(${1+(intensity/40)*Math.sin(10*(timer-initialtimer))})`
    if(intensity >= 0){
    intensity -= 0.3;
    }

    for(let i = 0; i < damageInstances.length; i++){
        update(damageInstances[i])
    }
}, 10)

let damageInstances = []

class DamageInstance {
    constructor(x, y, type){
        this.id = nextId++;
        this.xPos = x;
        this.yPos = y;
        this.xVel = 700*(Math.random() - 1/2);
        this.yVel = 700*(Math.random() - 1);
        this.scale = 0.2+Math.random();
        let instance = document.createElement("div")
        if(type==1){
            instance.classList.add("damage");
        }
        if(type==2){
            instance.classList.add("secondarydamage");
        }
        instance.style.transform = `scale(${this.scale})`
        instance.style.position = "absolute";
        instance.id = this.id.toString();
        document.body.appendChild(instance);
        this.DOMElement = document.getElementById(this.id.toString());
        damageInstances.push(this)

        setTimeout(()=>{document.getElementById(this.id.toString()).remove(); const index = damageInstances.indexOf(this);
        if (index > -1) {
            damageInstances.splice(index, 1);
        }}, 5000);
        setTimeout(()=>{
                    document.getElementById(this.id.toString()).addEventListener("mousedown", (e)=>{
                        if(this.yVel>100){
                                for(let i = 0; i < 5+20*Math.random(); i++){
                                    new DamageInstance(e.clientX, e.clientY, 2);
                                }
                        }
                            });
                            
        }, 500)

    }
}

const update = (instance)=>{
    instance.xPos += instance.xVel/100
    instance.yPos += instance.yVel/100
    instance.yVel += 10
    const distortion = Math.tanh(Math.sqrt(instance.yVel*instance.yVel+instance.xVel*instance.xVel)/1800);
    instance.DOMElement.style.top = `${instance.yPos}px`
    instance.DOMElement.style.left = `${instance.xPos}px`
    const angle = Math.atan(instance.yVel/instance.xVel)/Math.PI*180;
    instance.DOMElement.style.transform = `rotate(${angle}deg) scaleX(${instance.scale*(1+distortion)}) scaleY(${instance.scale*(1-distortion)}) `
}

const createDamageInstance = () => {
    
}

console.log("i love coding")
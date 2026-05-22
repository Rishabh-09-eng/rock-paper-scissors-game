let isPlaying = false
let options = document.querySelectorAll(".option")
let player_img = document.querySelector("#playerHand img")
let bot_img = document.querySelector("#botHand img")
let userScore = document.querySelector(".you span");
let botScore = document.querySelector(".computer span");
let resetBtn = document.querySelector(".reset-btn");
let cyclesound = new Audio("asset/tick.mp3")
let revealsound = new Audio("asset/ding.mp3")


let userPoints = 0;
let botPoints = 0;

const choices = ["rock", "paper", "scissor"]

options.forEach((button) => {
    button.addEventListener("click", ()=>{
        if(isPlaying) return
        
        isPlaying = true

        options.forEach((btn)  =>{
            btn.disabled = true;
        })

        let choice = button.innerText.toLowerCase();
        
        bot_img.src = `asset/question_mark.svg`

        let bot_Choice

        let cycle = setInterval(() => {
            let randomIndex = Math.floor(Math.random()*3)
            bot_Choice = choices[randomIndex]
            bot_img.src = `asset/${bot_Choice}.svg`
            cyclesound.currentTime = 0
            cyclesound.play()
        }, 120);
        
        setTimeout(() => {
            clearInterval(cycle)
            player_img.src = `asset/${choice}.svg`
            let new_randomIndex = Math.floor(Math.random()*3)
            bot_Choice = choices[new_randomIndex]
            bot_img.src = `asset/${bot_Choice}.svg`

            isPlaying = false 
            options.forEach((btn) => {
                btn.disabled = false;
            });

            if(choice==bot_Choice){
                document.querySelector(".result-msg").innerText = "DRAW 🤝";
            }
            else if(choice=="rock" && bot_Choice=="scissor" || choice=="paper" && bot_Choice=="rock" || choice=="scissor" && bot_Choice=="paper"){
                document.querySelector(".result-msg").innerText = "YOU WIN 🎉";
                userPoints++
                userScore.innerText = userPoints
            }
            else{
                document.querySelector(".result-msg").innerText = "COMPUTER WINS 💀";
                botPoints++
                botScore.innerText = botPoints
            }
            revealsound.play()

        }, 2000);
        
        
    })
})


resetBtn.addEventListener("click", () => {
    userPoints=0
    botPoints=0

    userScore.innerText = userPoints
    botScore.innerText = botPoints
    player_img.src = `asset/question_mark.svg`
    bot_img.src = `asset/question_mark.svg`
    document.querySelector(".result-msg").innerText = "Choose your move!";
})






function LetterAnimation() {
    const self = this;
    const TEMPLATE = `<div class="letter-animation__back"></div>
                        <div class="letter">
                            <div class="letter-back"></div>
                            <div class="letter-msg"></div>
                            <div class="letter-front"></div>
                            <div class="letter-bottom"></div>
                            <div class="letter-top"></div>
                            <div class="letter-count">1+</div>
                        </div>
                        <div class="fire">
                            <div class="fire-1"></div>
                            <div class="fire-2"></div>
                            <div class="fire-3"></div>
                        </div>`;

    this.animation = document.createElement("div");
    this.animation.classList.add("letter-animation");
    this.animation.innerHTML = TEMPLATE;

    this.render = function(){
        let check = document.querySelector(".letter-animation");
        if(!check) document.body.append(self.animation);
    }

    this.startAnimation = function(){
        self.animation.classList.add("letter-animation--show");
        self.animation.addEventListener("click", function(){
            self.continueAnimation();
        }, {once: true});
    }

    this.continueAnimation = function(){
        self.animation.classList.add("letter-animation--continue");
        self.animation.classList.remove("letter-animation--show");
        setTimeout(()=>{
            self.animation.classList.remove("letter-animation--continue");
            letterAnimation.remove();
            }, 3000
        )
    }

    this.remove = function (){
        this.animation.remove();
    }
}

const letterAnimation = new LetterAnimation();

emitter.subscribe("msgrecive", ()=>{
    letterAnimation.render();
    letterAnimation.startAnimation();
})


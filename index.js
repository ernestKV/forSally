
Loadr = new (function Loadr(id){
    // # Defines
    const max_size = 25;
    const max_particles = 2500;
    const min_vel = 40;
    const max_generation_per_frame = 10;

    // #Variables
// sometimes i wrote code horrible enouhg to make eyes bleed
    let canvas = document.getElementById(id);
    let ctx = canvas.getContext('2d');
    let height = canvas.height;
    let center_y = height/2;
    let width = canvas.width;
    let center_x = width / 2;
    let animate = true;
    let particles = [];
    let last = Date.now(),now = 0;
    let died = 0,len = 0,dt;

    function isInsideHeart(x,y){
        x = ((x - center_x) / (center_x)) * 3;
        y = ((y - center_y) / (center_y)) * -3;
        // Simplest Equation of lurve
        let x2 = x * x;
        let y2 = y * y;
        // Simplest Equation of lurve

        return (Math.pow((x2 + y2 - 1), 3) - (x2 * (y2 * y)) < 0);

    }

    function random(size,freq){
        let val = 0;
        let iter = freq;

        do{
            size /= iter;
            iter += freq;
            val += size * Math.random();
        }while( size >= 1);

        return val;
    }

    function Particle(){
        let x = center_x;
        let y = center_y;
        let size = ~~random(max_size,2.4);
        let x_vel = ((max_size + min_vel) - size)/2 - (Math.random() * ((max_size + min_vel) - size));
        let y_vel = ((max_size + min_vel) - size)/2 - (Math.random() * ((max_size + min_vel) - size));
        let nx = x;
        let ny = y;
        let r,g,b,a = 0.05 * size;

        this.draw = function(){
            r = ~~( 255 * ( x / width));
            g = ~~( 255 * (1 - ( y / height)));
            b = ~~( 255 - r );
            ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
            ctx.beginPath();
            ctx.arc(x,y,size,0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
        }

        this.move = function(dt){

            nx += x_vel * dt;
            ny += y_vel * dt;
            if( !isInsideHeart(nx,ny)){
                if( !isInsideHeart(nx,y)){
                    x_vel *= -1;
                    return;
                }

                if( !isInsideHeart(x,ny)){
                    y_vel *= -1;
                    return;
                }
                // Lets do the crazy furbidden
                x_vel = -1 * y_vel;
                y_vel = -1 * x_vel;
                return;
            }

            x = nx;
            y = ny;
        }

    }

    function movementTick(){
        let len = particles.length;
        let dead = max_particles - len;
        for( let i = 0; i < dead && i < max_generation_per_frame; i++ ){
            particles.push(new Particle());
        }

        // Update the date
        now = Date.now();
        dt = last - now;
        dt /= 1000;
        last = now;
        particles.forEach(function(p){
            p.move(dt);
        });
    }

    function tick(){

        ctx.clearRect(0,0,width,height);
        particles.forEach(function(p){
            p.draw();
        });

        requestAnimationFrame(tick);
    }

    this.start = function(){

    }

    this.done = function(){

    }

    setInterval(movementTick,10);
    tick();

})("loader");




let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
];

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function() {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
}

function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context.clearRect(0, 0, W, window.innerHeight);

    for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
    }

    let particle = {};
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
    }

    return results;
}

window.addEventListener(
    "resize",
    function() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    false
);

// Push new confetti objects to `particles[]`
for (let i = 0; i < maxConfettis; i++) {
    particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();


let loader=document.querySelector('#loader').addEventListener('click',()=>{
    window.location='page.html'
})

const popup = document.querySelector('.card');
window.onload = function() {
    setTimeout(function() {

        popup.classList.add('active')
    }, 4500); // 10 секунд (10000 миллисекунд)
};
let close=document.querySelector('.img')
close.addEventListener('click', ()=>{
    popup.classList.remove('active');
})

// Flappy Bird — simple JS Canvas implementation
}
}
}


function rectIntersect(ax,ay,aw,ah, bx,by,bw,bh) {
return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}


function draw() {
// sky
ctx.clearRect(0,0,W,H);


// ground
ctx.fillStyle = '#6ec06b';
ctx.fillRect(0,H-80,W,80);


// pipes
ctx.fillStyle = '#2e8b57';
for (let p of pipes) {
const pipeW = 52;
// top pipe
ctx.fillRect(p.x, 0, pipeW, p.topHeight);
// bottom pipe
ctx.fillRect(p.x, p.bottomY, pipeW, H - p.bottomY - 80);
// optional hitboxes
if (showHitboxes.checked) {
ctx.strokeStyle = 'red';
ctx.strokeRect(p.x, 0, pipeW, p.topHeight);
ctx.strokeRect(p.x, p.bottomY, pipeW, H - p.bottomY - 80);
}
}


bird.draw();


if (gameState === 'menu') {
ctx.fillStyle = 'rgba(255,255,255,0.9)';
ctx.fillRect(W/2 - 140, H/2 - 60, 280, 120);
ctx.fillStyle = '#000';
ctx.textAlign = 'center'; ctx.font = '20px sans-serif';
ctx.fillText('Click / Space to start', W/2, H/2 - 8);
ctx.font = '14px sans-serif';
ctx.fillText('Try to fly between the pipes', W/2, H/2 + 22);
}


if (gameState === 'over') {
ctx.fillStyle = 'rgba(0,0,0,0.6)';
ctx.fillRect(W/2 - 140, H/2 - 60, 280, 120);
ctx.fillStyle = '#fff';
ctx.textAlign = 'center'; ctx.font = '20px sans-serif';
ctx.fillText('Game Over', W/2, H/2 - 8);
ctx.font = '14px sans-serif';
ctx.fillText('Press Start/Space to try again', W/2, H/2 + 22);
}
}


function loop() {
update();
draw();
requestAnimationFrame(loop);
}


// input
window.addEventListener('keydown', e => {
if (e.code === 'Space') {
e.preventDefault();
if (gameState === 'menu') startGame();
if (gameState === 'playing') bird.flap();
if (gameState === 'over') startGame();
}
});
window.addEventListener('mousedown', () => {
if (gameState === 'menu') startGame();
else if (gameState === 'playing') bird.flap();
else if (gameState === 'over') startGame();
});


startBtn.addEventListener('click', () => startGame());


// start loop
reset();
loop();

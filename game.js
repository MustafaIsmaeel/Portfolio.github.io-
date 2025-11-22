This file implements the full playable Flappy Bird with assets fallback to simple shapes.
// background
ctx.clearRect(0,0,W,H);
// sky
const skyGradient = ctx.createLinearGradient(0,0,0,H); skyGradient.addColorStop(0,'#9be6ff'); skyGradient.addColorStop(1,'#70c5ce'); ctx.fillStyle = skyGradient; ctx.fillRect(0,0,W,H);


// ground
ctx.fillStyle = '#5aa76a'; ctx.fillRect(0,H-90,W,90);


// pipes
for(const p of pipes){ // pipe body
// stem
ctx.fillStyle = '#2e8b57'; ctx.fillRect(p.x,0,p.w,p.top); ctx.fillRect(p.x,p.bottom,p.w,H-p.bottom-90);
// cap
ctx.fillStyle = '#256247'; ctx.fillRect(p.x-4,p.top-16,p.w+8,16); ctx.fillRect(p.x-4,p.bottom,p.w+8,16);
if(showHitboxes){ ctx.strokeStyle='red'; ctx.strokeRect(p.x,0,p.w,p.top); ctx.strokeRect(p.x,p.bottom,p.w,H-p.bottom-90); }
}


// bird (simple rounded rect)
ctx.save(); ctx.translate(bird.x + bird.w/2, bird.y + bird.h/2); ctx.rotate(Math.max(-0.8, Math.min(0.9, bird.vy/10))); ctx.fillStyle = '#ffdd57'; roundedRect(ctx, -bird.w/2, -bird.h/2, bird.w, bird.h, 6); ctx.fill(); ctx.fillStyle='#222'; ctx.beginPath(); ctx.arc(6, -6, 3, 0, Math.PI*2); ctx.fill(); ctx.restore();
if(showHitboxes){ ctx.strokeStyle='red'; ctx.strokeRect(bird.x,bird.y,bird.w,bird.h); }


// HUD: score
ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(12,12,120,44); ctx.fillStyle='#fff'; ctx.font='20px Inter, Arial'; ctx.fillText('Score: '+score, 22, 40);
ctx.fillStyle='#fff'; ctx.font='12px Inter, Arial'; ctx.fillText('Best: '+highscore, 140, 30);
}


function roundedRect(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }


function loop(){ update(); draw(); if(running) requestAnimationFrame(loop); }


function startGame(){ running=true; frame=0; score=0; pipes=[]; bird.y=H/2; bird.vy=0; scoreEl.textContent=0; playBeep(660,0.06); loop(); }
function endGame(){ if(!running) return; running=false; playBeep(120,0.12); // save highscore
if(score>highscore){ highscore=score; try{ localStorage.setItem('flappy_high', String(highscore)); }catch(e){} }
// show small modal (alert fallback)
setTimeout(()=>{ alert('Game Over — score: '+score+' — best: '+highscore); }, 80);
}


// input
window.addEventListener('keydown', e=>{ if(e.code==='Space'){ if(!running) startGame(); bird.vy = bird.flap; if(audioCtx) audioCtx.resume(); playBeep(1200,0.03); } });
window.addEventListener('mousedown', ()=>{ if(!running) startGame(); bird.vy = bird.flap; playBeep(1200,0.03); });
window.addEventListener('touchstart', (e)=>{ e.preventDefault(); if(!running) startGame(); bird.vy = bird.flap; playBeep(1200,0.03); }, {passive:false});


// ui
startBtn.addEventListener('click', ()=>{ startGame(); });


// responsive canvas scaling
function fitCanvas(){ const rect = canvas.getBoundingClientRect(); const scale = Math.min((window.innerWidth*0.9)/W, 1); canvas.style.width = Math.floor(W*scale)+'px'; }
window.addEventListener('resize', fitCanvas); fitCanvas();


// debug toggle via key D
window.addEventListener('keydown', e=>{ if(e.key.toLowerCase()==='d'){ showHitboxes = !showHitboxes; } });


})();

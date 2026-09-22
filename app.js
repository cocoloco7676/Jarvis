const clock = document.querySelector('#clock');
const speakButton = document.querySelector('#speakButton');
const audioState = document.querySelector('#audioState');
const mouthBars = [...document.querySelectorAll('.mouth span')];
const waveform = document.querySelector('#waveform');
for(let i=0;i<12;i++){const bar=document.createElement('i');bar.style.animationDelay=`${i*.07}s`;waveform.appendChild(bar)}
setInterval(()=>clock.textContent=new Date().toLocaleTimeString('de-DE',{hour12:false}),1000);
clock.textContent=new Date().toLocaleTimeString('de-DE',{hour12:false});

let speaking=false, raf;
function animateMouth(){
  if(!speaking)return;
  mouthBars.forEach((bar,i)=>bar.style.height=`${2+Math.random()*13*(i===2?1.25:1)}px`);
  raf=requestAnimationFrame(()=>setTimeout(animateMouth,45));
}
function stopSpeaking(){speaking=false;cancelAnimationFrame(raf);mouthBars.forEach(bar=>bar.style.height='2px');audioState.textContent='AUDIO CHANNEL STANDBY';speakButton.innerHTML='<span class="play">▶</span> JARVIS AKTIVIEREN';}
speakButton.addEventListener('click',()=>{
  if(speaking){speechSynthesis.cancel();stopSpeaking();return}
  const text='Guten Abend, Commander. Alle Systeme arbeiten innerhalb der nominalen Parameter.';
  speaking=true;audioState.textContent='AUDIO CHANNEL ACTIVE';speakButton.innerHTML='<span class="play">■</span> AUDIO STOPPEN';animateMouth();
  if('speechSynthesis' in window){const utterance=new SpeechSynthesisUtterance(text);utterance.lang='de-DE';utterance.rate=.92;utterance.onend=stopSpeaking;speechSynthesis.speak(utterance)}else setTimeout(stopSpeaking,4000);
});
window.addEventListener('hashchange',updateView);
function updateView(){const brain=location.hash==='#brain';document.querySelector('.dashboard-view').classList.toggle('hidden',brain);document.querySelector('.brain-view').classList.toggle('hidden',!brain);document.querySelectorAll('.nav-link').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===(brain?'#brain':'#dashboard')))}
updateView();

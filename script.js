// eDEX‑UI style boot typing + enter-to-continue
const leftLines = [
  'signalx@ttySX0:~$ whoami',
  'operative',
  'signalx@ttySX0:~$ sudo systemctl start interface',
  '[ok] service "interface" started',
  'signalx@ttySX0:~$ tail -f /var/log/signalx.log',
  'listening...'
];
const rightLines = [
  'net.if: en0 up  ✔',
  'net.if: tun0 secure ✔',
  'dns: 1.1.1.1, 9.9.9.9',
  'geo: 0xC0FFEE :: unknown',
  'auth: ACCESS GRANTED',
  'press ENTER to continue'
];

function typeInto(el, lines, speed=30, lineDelay=250){
  let i=0;
  function nextLine(){
    if(i>=lines.length) return;
    let s=lines[i], j=0;
    const iv=setInterval(()=>{
      el.textContent += s[j] || '';
      j++;
      if(j> s.length){
        clearInterval(iv);
        el.textContent += '\n';
        i++; setTimeout(nextLine, lineDelay);
      }
    }, speed);
  }
  nextLine();
}

function setActive(hash){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tablink').forEach(a=>a.classList.remove('active'));
  const id = (hash || '#main').replace('#','');
  document.getElementById(id)?.classList.add('active');
  document.querySelectorAll('.tablink').forEach(a=>{ if(a.getAttribute('href') === '#'+id) a.classList.add('active') });
}

window.addEventListener('load', ()=>{
  typeInto(document.getElementById('term-left'), leftLines, 18, 220);
  typeInto(document.getElementById('term-right'), rightLines, 22, 260);
  // enter to continue
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      document.getElementById('boot').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      setActive(location.hash);
    }
  });
});

window.addEventListener('hashchange', ()=> setActive(location.hash));
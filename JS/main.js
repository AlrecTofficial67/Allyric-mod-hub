function _esc(str){
  const d=document.createElement('div');
  d.appendChild(document.createTextNode(String(str)));
  return d.innerHTML;
}

(function(){
  const pc=document.getElementById('ptcl');
  if(!pc)return;
  for(let i=0;i<16;i++){
    const p=document.createElement('div');p.className='p';
    p.style.left=Math.random()*100+'%';
    p.style.animationDuration=(9+Math.random()*13)+'s';
    p.style.animationDelay=(-Math.random()*22)+'s';
    if(Math.random()>.65)p.style.background='#9d4edd';
    if(Math.random()>.82)p.style.background='#ff5e29';
    pc.appendChild(p);
  }
})();

let _chStarted=false;
function closeDisc(){
  document.getElementById('discModal').style.display='none';
  if(!_chStarted){_chStarted=true;startChTimer();}
}

let _chTime=150,_chItv=null;
function showChPopup(){
  document.getElementById('chPopup').classList.add('show');
  _chTime=150;updateChCd();
}
function closeChPopup(){
  document.getElementById('chPopup').classList.remove('show');
  _chTime=150;
}
function updateChCd(){const el=document.getElementById('chCd');if(el)el.textContent=_chTime;}
function startChTimer(){
  _chItv=setInterval(()=>{
    _chTime--;updateChCd();
    if(_chTime<=0){showChPopup();_chTime=150;}
  },1000);
}

function doSearch(val){
  const q=_esc(val.trim().toLowerCase());
  const clearBtn=document.getElementById('searchClear');
  const countEl=document.getElementById('searchCount');
  clearBtn.classList.toggle('vis',val.trim().length>0);

  if(!q){
    countEl.style.display='none';
    document.getElementById('sec-search').classList.remove('on');
    const onTab=document.querySelector('.tab.on');
    if(onTab){
      const cat=onTab.getAttribute('onclick').match(/'(\w+)'/);
      if(cat)document.getElementById('sec-'+cat[1]).classList.add('on');
    } else {
      document.getElementById('sec-all').classList.add('on');
    }
    return;
  }

  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  const searchSec=document.getElementById('sec-search');
  searchSec.classList.add('on');
  searchSec.querySelectorAll('.card').forEach(c=>c.remove());
  document.getElementById('emptySearch').style.display='none';

  const allCards=document.querySelectorAll('#sec-all .card');
  let n=0;
  allCards.forEach(card=>{
    const searchData=(card.dataset.search||'')+' '+(card.dataset.cat||'')+' '+((card.querySelector('.card-name')||{}).textContent||'');
    if(searchData.toLowerCase().includes(val.trim().toLowerCase())){
      const cl=card.cloneNode(true);
      cl.style.animationDelay=(n*.06)+'s';
      searchSec.appendChild(cl);n++;
    }
  });

  if(n===0){
    document.getElementById('emptySearch').style.display='block';
    countEl.style.display='none';
  } else {
    countEl.textContent='Ditemukan '+n+' mod';
    countEl.style.display='block';
  }
}

function clearSearch(){
  const inp=document.getElementById('searchInput');
  inp.value='';
  doSearch('');
  inp.focus();
}

function goTab(cat,btn){
  document.getElementById('searchInput').value='';
  document.getElementById('searchClear').classList.remove('vis');
  document.getElementById('searchCount').style.display='none';
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));

  if(cat==='all'||cat==='tools'||cat==='buy'){
    document.getElementById('sec-'+cat).classList.add('on');
    return;
  }

  const tgt=document.getElementById('sec-'+cat);
  tgt.classList.add('on');
  tgt.querySelectorAll('.card').forEach(c=>c.remove());

  let n=0;
  document.querySelectorAll('#sec-all .card').forEach(card=>{
    if((card.dataset.cat||'').includes(cat)){
      const cl=card.cloneNode(true);
      cl.style.animationDelay=(n*.06)+'s';
      tgt.appendChild(cl);n++;
    }
  });

  if(!n){
    const m=document.createElement('p');
    m.style.cssText='color:var(--dim);font-size:13px;padding:16px 0';
    m.textContent='Belum ada mod di kategori ini.';
    tgt.appendChild(m);
  }
}

window.addEventListener('DOMContentLoaded',()=>{
});

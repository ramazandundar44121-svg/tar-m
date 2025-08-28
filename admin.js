
(function(){
  const userKey='admin_user', passKey='admin_pass', newsKey='announcements';
  // Defaults
  if(!localStorage.getItem(userKey)) localStorage.setItem(userKey,'admin');
  if(!localStorage.getItem(passKey)) localStorage.setItem(passKey,'123456');

  const loginCard=document.querySelector('#loginCard');
  const panel=document.querySelector('#panel');
  const loginBtn=document.querySelector('#loginBtn');
  const logoutBtn=document.querySelector('#logoutBtn');

  function isAuth(){ return sessionStorage.getItem('auth')==='1'; }
  function show(){ loginCard.style.display=isAuth()?'none':'block'; panel.style.display=isAuth()?'block':'none'; refreshTable(); }

  loginBtn.addEventListener('click',()=>{
    const u=document.querySelector('#admUser').value.trim();
    const p=document.querySelector('#admPass').value;
    if(u===localStorage.getItem(userKey) && p===localStorage.getItem(passKey)){
      sessionStorage.setItem('auth','1'); show();
    } else { alert('Hatalı bilgiler'); }
  });
  logoutBtn.addEventListener('click',()=>{ sessionStorage.removeItem('auth'); show(); });

  // News CRUD
  const addBtn=document.querySelector('#addNews');
  addBtn.addEventListener('click',()=>{
    const t=document.querySelector('#nTitle').value.trim();
    const e=document.querySelector('#nExcerpt').value.trim();
    const l=document.querySelector('#nLink').value.trim();
    if(!t){alert('Başlık gerekli');return;}
    const list=JSON.parse(localStorage.getItem(newsKey)||'[]');
    list.unshift({title:t,excerpt:e,link:l,date:new Date().toISOString()});
    localStorage.setItem(newsKey,JSON.stringify(list));
    document.querySelector('#nTitle').value=''; document.querySelector('#nExcerpt').value=''; document.querySelector('#nLink').value='';
    refreshTable();
    alert('Duyuru eklendi');
  });

  function refreshTable(){
    const table=document.querySelector('#newsTable'); if(!table) return;
    const list=JSON.parse(localStorage.getItem(newsKey)||'[]');
    table.innerHTML = list.map((n,i)=>`<div class="row"><div><b>${n.title}</b><div class="muted small">${new Date(n.date).toLocaleString()}</div></div><div><button data-i="${i}" class="btn -ghost del">Sil</button></div></div>`).join('') || '<p class="muted">Kayıt yok</p>';
    table.querySelectorAll('.del').forEach(btn=>btn.addEventListener('click',()=>{const idx=+btn.getAttribute('data-i'); list.splice(idx,1); localStorage.setItem(newsKey,JSON.stringify(list)); refreshTable();}));
  }

  show();
})();

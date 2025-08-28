
(function(){
  const $ = (s,root=document)=>root.querySelector(s);
  const nav=$('#nav'), burger=$('#burger'), toggle=$('#themeToggle'), root=document.documentElement;
  if(burger){burger.addEventListener('click',()=>{const open=getComputedStyle(nav).display==='flex';nav.style.display=open?'none':'flex';burger.setAttribute('aria-expanded',String(!open));});}
  const saved=localStorage.getItem('theme')||'light'; root.setAttribute('data-theme',saved);
  toggle&&toggle.addEventListener('click',()=>{const c=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',c);localStorage.setItem('theme',c);});

  // Render announcements on homepage
  function renderNews(){
    const list=JSON.parse(localStorage.getItem('announcements')||'[]');
    const container=$('#newsList');
    if(!container) return;
    container.innerHTML = list.map((n,i)=>`<article class="news-item"><h4>${n.title}</h4><p>${n.excerpt||''}</p>${n.link?`<a class="btn -ghost" href="${n.link}">Devamı</a>`:''}</article>`).join('') || '<p class="muted">Henüz duyuru yok.</p>';
  }
  renderNews();

  // Simple client-side "search"
  const params=new URLSearchParams(location.search); const q=params.get('q'); const result=document.querySelector('#searchResult');
  if(q && result){ result.innerHTML = `<p><b>"${q}"</b> için bulundu:</p><ul><li><a href="/programlar.html">Programlar</a></li><li><a href="/teknolojiler.html">Yeni Teknolojiler</a></li><li><a href="/kuresel.html">Küresel Bakanlıklar</a></li></ul>`; }
})();

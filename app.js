const PASSWORD="4031";
const stateKey="matvey.demo.documents.v3";
const defaults={firstName:"Матвей",lastName:"ДЕМО",birth:"10.08.2009",passport:"0000 000000",oms:"0000 0000 0000 0000",snils:"000-000-000 00",inn:"000000000000",foreign:"000000000"};
let docs=JSON.parse(localStorage.getItem(stateKey)||"null")||defaults;
let entered="",locked=false, taps=0,tapTimer;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem(stateKey,JSON.stringify(docs))}
function screen(id){$$('.login-screen,.app-screen,.docs-screen,.detail-screen,.admin-screen').forEach(x=>x.classList.add('hidden'));$(id).classList.remove('hidden')}
function renderDots(){$$('#dots span').forEach((d,i)=>d.classList.toggle('filled',i<entered.length))}
function msg(t,c=''){const e=$('#message');e.textContent=t;e.className='message '+(t?'show ':'')+c}
function reset(){entered='';renderDots();

// Начальная загрузка: имитирует запуск приложения и затем открывает экран ввода кода.
window.addEventListener('load',()=>{
  const splash=$('#splash');
  setTimeout(()=>{
    splash.classList.add('splash-hide');
    setTimeout(()=>splash.remove(),650);
  },1800);
});}
function unlock(){locked=true;msg('Код принят','success');setTimeout(()=>{screen('#home');reset();msg('');locked=false},350)}
function digit(d){if(locked||entered.length>=4)return;entered+=d;renderDots();

// Начальная загрузка: имитирует запуск приложения и затем открывает экран ввода кода.
window.addEventListener('load',()=>{
  const splash=$('#splash');
  setTimeout(()=>{
    splash.classList.add('splash-hide');
    setTimeout(()=>splash.remove(),650);
  },1800);
});if(entered.length===4)setTimeout(()=>entered===PASSWORD?unlock():(msg('Неверный код','error'),setTimeout(()=>{reset();msg('')},650)),90)}
$$('[data-key]').forEach(b=>b.onclick=()=>digit(b.dataset.key));$('#exitBtn').onclick=()=>reset();
function loading(){
  $('#loading').classList.remove('hidden');
  $('#loading').classList.remove('loading-pop');
  requestAnimationFrame(()=>$('#loading').classList.add('loading-pop'));
}
$('#closeLoading').onclick=()=>$('#loading').classList.add('hidden');
$$('[data-loading]').forEach(b=>b.addEventListener('click',loading));
$('#documentsTab').onclick=()=>{renderDocs();screen('#docs')};
$('#personalDocs').onclick=()=>{renderDocs();screen('#docs')};
$$('[data-back]').forEach(b=>b.onclick=()=>screen('#home'));
function displayDoc(type){
 const common=`<div class="demo-label">ДЕМО</div>`;
 if(type==='passport') return common+`<div class="passport-card"><div class="passport-head">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div><div class="passport-body"><div class="portrait">◎</div><div class="fields"><strong>${docs.passport}</strong><p>Кем выдан<br>ДЕМО-СЕРВИС</p><div class="cols"><p>Дата выдачи<br>29.11.2023</p><p>Код подразделения<br>000-000</p></div><p>ФИО<br>${docs.lastName} ${docs.firstName}</p><div class="cols"><p>Пол<br>М</p><p>Дата рождения<br>${docs.birth}</p></div><p>Место рождения<br>Г. МОСКВА</p><a>детали документа</a></div></div></div>`;
 if(type==='snils') return common+`<div class="snils-card"><div class="snils-head">СТРАХОВОЕ СВИДЕТЕЛЬСТВО<br><small>ОБЯЗАТЕЛЬНОГО ПЕНСИОННОГО СТРАХОВАНИЯ</small></div><div class="snils-body"><strong>${docs.snils}</strong><p>ФИО<br>${docs.lastName} ${docs.firstName}</p><p>Дата и место рождения<br>${docs.birth} Г. МОСКВА</p><p>Пол<br>МУЖСКОЙ</p><a>детали документа</a></div></div>`;
 return common+`<div class="simple-card ${type}"><h2>${type==='oms'?'ПОЛИС ОМС':type==='inn'?'ИНН':'ЗАГРАНПАСПОРТ'}</h2><strong>${docs[type]}</strong><p>ФИО: ${docs.lastName} ${docs.firstName}</p><p>Дата рождения: ${docs.birth}</p><a>детали документа</a></div>`;
}
function openDoc(type){$('#detailTitle').textContent=type==='passport'?'Паспорт РФ':type==='snils'?'СНИЛС':'Полис ОМС';$('#detailCard').innerHTML=displayDoc(type);screen('#docDetail')}
function renderDocs(){const arr=[['passport','Паспорт РФ','red'],['oms','Полис ОМС','blue'],['snils','СНИЛС','green'],['inn','ИНН','orange'],['foreign','Загранпаспорт','darkred']];$('#docList').innerHTML=arr.map(([k,n,c])=>`<button class="doc-card ${c}" data-open="${k}"><div><h2>${n}</h2><strong>${docs[k]}</strong></div><span>${k==='passport'?'◈':k==='snils'?'⬟':k==='oms'?'＋':k==='inn'?'◐':'▣'}</span></button>`).join('');$$('[data-open]').forEach(b=>b.addEventListener('click',loading))}
// Seven consecutive taps on the documents title opens the demo editor.
$('.docs-header h1').addEventListener('click',()=>{taps++;clearTimeout(tapTimer);tapTimer=setTimeout(()=>taps=0,900);if(taps>=7){taps=0;openAdmin()}});
function openAdmin(){const f=$('#adminForm');Object.entries(docs).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v});screen('#admin')}
$('#adminForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);docs=Object.fromEntries([...f.entries()]);save();renderDocs();alert('Демо-данные сохранены');screen('#docs')};
// Close/back from detail/admin/docs returns to home; loading stays open until explicitly closed.
$$('[data-back]').forEach(b=>b.onclick=()=>screen('#home'));
// Make doc header/back work independently.
$('.docs-header .back').onclick=()=>screen('#home');$('.detail-header .back').onclick=()=>screen('#docs');$('.admin-header .back').onclick=()=>screen('#docs');

// Simple Face ID-like demo button; real WebAuthn is retained conceptually by using the same unlock flow.
$('#faceIdBtn').onclick=()=>unlock();
// Demo behavior: every button except the two requested document navigation buttons
// and the loading overlay close button stays on the infinite loading screen.
$$('.app-screen button, .docs-screen button, .detail-screen button, .admin-screen button')
  .filter(b=>!['documentsTab','personalDocs','closeLoading'].includes(b.id))
  .forEach(b=>b.addEventListener('click',loading));
renderDots();

// Начальная загрузка: имитирует запуск приложения и затем открывает экран ввода кода.
window.addEventListener('load',()=>{
  const splash=$('#splash');
  setTimeout(()=>{
    splash.classList.add('splash-hide');
    setTimeout(()=>splash.remove(),650);
  },1800);
});

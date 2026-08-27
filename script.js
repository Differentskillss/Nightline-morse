// ============ NIGHTLINE - ПОЛНЫЙ SCRIPT.JS ============
// ============ FIREBASE REALTIME DATABASE ============

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyDsmOYDN6Fk0P0Cc9KLjliTAQ7__isn7Nk",
  authDomain: "nightline-morse.firebaseapp.com",
  databaseURL: "https://nightline-morse-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nightline-morse",
  storageBucket: "nightline-morse.firebasestorage.app",
  messagingSenderId: "433746041459",
  appId: "1:433746041459:web:f09167933f6c01367ee806",
  measurementId: "G-2HF077PN2P"
};

// Инициализация Firebase
let firebaseApp, database;
try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  console.log("🔥 Firebase подключен!");
} catch(e) {
  console.error("❌ Ошибка Firebase:", e);
}

// ============ КОНСТАНТЫ ============
const MORSE_CODE={А:'.-',Б:'-...',В:'.--',Г:'--.',Д:'-..',Е:'.',Ж:'...-',З:'--..',И:'..',Й:'.---',К:'-.-',Л:'.-..',М:'--',Н:'-.',О:'---',П:'.--.',Р:'.-.',С:'...',Т:'-',У:'..-',Ф:'..-.',Х:'....',Ц:'-.-.',Ч:'---.',Ш:'----',Щ:'--.-',Ъ:'--.--',Ы:'-.--',Ь:'-..-',Э:'..-..',Ю:'..--',Я:'.-.-',A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',',':'--..--','.':'.-.-.-','?':'..--..','!':'-.-.--',':':'---...',';':'-.-.-.','-':'-....-','/':'-..-.','@':'.--.-.','(':'-.--.',')':'-.--.-',' ':' '};
const TITLES=[{level:5,name:'НАЧИНАЮЩИЙ',nameEn:'BEGINNER',color:'#58a6ff',desc:'За достижение 5 уровня',descEn:'For reaching level 5'},{level:10,name:'УЧЕНИК',nameEn:'STUDENT',color:'#3fb950',desc:'За достижение 10 уровня',descEn:'For reaching level 10'},{level:20,name:'ЗНАТОК',nameEn:'EXPERT',color:'#d29922',desc:'За достижение 20 уровня',descEn:'For reaching level 20'},{level:35,name:'ОПЫТНЫЙ',nameEn:'EXPERIENCED',color:'#bc8cff',desc:'За достижение 35 уровня',descEn:'For reaching level 35'},{level:50,name:'МАСТЕР',nameEn:'MASTER',color:'#f85149',desc:'За достижение 50 уровня',descEn:'For reaching level 50'},{level:67,name:'ЭКСПЕРТ',nameEn:'SPECIALIST',color:'#ff7b72',desc:'За достижение 67 уровня',descEn:'For reaching level 67'},{level:100,name:'ВИРТУОЗ',nameEn:'VIRTUOSO',color:'#a5d6ff',desc:'За достижение 100 уровня',descEn:'For reaching level 100'},{level:333,name:'ЛЕГЕНДА',nameEn:'LEGEND',color:'#ffd700',desc:'За достижение 333 уровня',descEn:'For reaching level 333'},{level:500,name:'МИФ',nameEn:'MYTH',color:'#ff69b4',desc:'За достижение 500 уровня',descEn:'For reaching level 500'},{level:1000,name:'БОГ МОРЗЕ',nameEn:'MORSE GOD',color:'#00ffff',desc:'За достижение 1000 уровня',descEn:'For reaching level 1000'},{level:2000,name:'ТИТАН',nameEn:'TITAN',color:'#ff4500',desc:'За достижение 2000 уровня',descEn:'For reaching level 2000'},{level:3000,name:'ВЛАСТЕЛИН',nameEn:'OVERLORD',color:'#9400d3',desc:'За достижение 3000 уровня',descEn:'For reaching level 3000'},{level:4000,name:'ПОВЕЛИТЕЛЬ',nameEn:'RULER',color:'#ff1493',desc:'За достижение 4000 уровня',descEn:'For reaching level 4000'},{level:5000,name:'ИМПЕРАТОР',nameEn:'EMPEROR',color:'#ffd700',desc:'За достижение 5000 уровня',descEn:'For reaching level 5000'},{level:6000,name:'ФЕНИКС',nameEn:'PHOENIX',color:'#ff6347',desc:'За достижение 6000 уровня',descEn:'For reaching level 6000'},{level:7000,name:'ДРАКОН',nameEn:'DRAGON',color:'#00ff7f',desc:'За достижение 7000 уровня',descEn:'For reaching level 7000'},{level:8000,name:'ТВОРЕЦ',nameEn:'CREATOR',color:'#7fffd4',desc:'За достижение 8000 уровня',descEn:'For reaching level 8000'},{level:9000,name:'ХРАНИТЕЛЬ',nameEn:'KEEPER',color:'#ff8c00',desc:'За достижение 9000 уровня',descEn:'For reaching level 9000'},{level:10000,name:'НОЧНОЙ ГОЛОС',nameEn:'NIGHT VOICE',color:'#fff',desc:'За достижение 10000 уровня',descEn:'For reaching level 10000'}];
const CATCHER_TITLES=[{count:1,name:'ЛОВЕЦ ЧАСТИЦ I',nameEn:'PARTICLE CATCHER I',color:'#ffd700',desc:'За 1 пойманную частицу',descEn:'For catching 1 particle'},{count:10,name:'ЛОВЕЦ ЧАСТИЦ II',nameEn:'PARTICLE CATCHER II',color:'#ff9f43',desc:'За 10 пойманных частиц',descEn:'For catching 10 particles'},{count:50,name:'ЛОВЕЦ ЧАСТИЦ III',nameEn:'PARTICLE CATCHER III',color:'#ff6b6b',desc:'За 50 пойманных частиц',descEn:'For catching 50 particles'},{count:100,name:'ЛОВЕЦ ЧАСТИЦ IV',nameEn:'PARTICLE CATCHER IV',color:'#a29bfe',desc:'За 100 пойманных частиц',descEn:'For catching 100 particles'},{count:1000,name:'ЛОВЕЦ ЧАСТИЦ V',nameEn:'PARTICLE CATCHER V',color:'#00ffff',desc:'За 1000 пойманных частиц',descEn:'For catching 1000 particles'}];
const ALL_TITLES=[...TITLES,...CATCHER_TITLES];
const DIFFICULTIES={easy:{name:'ЛЁГКАЯ',nameEn:'EASY',color:'#58a6ff',exp:100},normal:{name:'ОБЫЧНАЯ',nameEn:'NORMAL',color:'#3fb950',exp:200},hard:{name:'СЛОЖНАЯ',nameEn:'HARD',color:'#d29922',exp:300},extreme:{name:'ЭКСТРЕМАЛЬНАЯ',nameEn:'EXTREME',color:'#bc8cff',exp:400},impossible:{name:'НЕВОЗМОЖНАЯ',nameEn:'IMPOSSIBLE',color:'#f85149',exp:1200}};
const I18N={ru:{home:'Главная',learn:'Обучение',practice:'Практика',leaderboard:'Топы',profile:'Профиль',heroTitle:'ИЗУЧЕНИЕ',heroAccent:'АЗБУКИ МОРЗЕ',heroSubtitle:'Тренируйся передавать сигналы',learning:'ОБУЧЕНИЕ',lesson:'ПРОСЛУШАТЬ',practiceTitle:'ПРАКТИКА',radio:'РАДИОПЕРЕДАЧА',newWord:'НОВОЕ СЛОВО',pressHold:'НАЖМИ И ДЕРЖИ',transmit:'ПЕРЕДАЧА',topLevel:'ТОП ПО УРОВНЮ',topTime:'ТОП ПО ВРЕМЕНИ',byLevel:'ПО УРОВНЮ',byTime:'ПО ВРЕМЕНИ',profileTitle:'ПРОФИЛЬ',cosmetics:'КОСМЕТИКА',password:'ПАРОЛЬ',settings:'НАСТРОЙКИ',logout:'ВЫЙТИ',deleteAcc:'УДАЛИТЬ АККАУНТ',deleteAccConfirm:'УДАЛИТЬ АККАУНТ?',accuracy:'ТОЧНОСТЬ',time:'ВРЕМЯ',exp:'EXP',level:'УРОВЕНЬ',wordCorrect:'✓ СЛОВО ПЕРЕДАНО ВЕРНО!',wordError:'✗ ОШИБКА! Нужно:',logoutConfirm:'ВЫЙТИ?',yes:'ДА',no:'НЕТ',changePass:'СМЕНА ПАРОЛЯ',newPass:'Новый пароль',passHint:'Вы точно хотите сменить пароль?',showPass:'ПОКАЗАТЬ ПАРОЛЬ',changePassBtn:'СМЕНИТЬ ПАРОЛЬ',close:'ЗАКРЫТЬ',modifiers:'МОДИФИКАТОРЫ',shuffle:'В ПЕРЕМЕШКУ',shuffleDesc:'рандомные знаки',titles:'ТИТУЛЫ',cosmeticsTitle:'КОСМЕТИКА',signs:'ЗНАКИ',login:'ВОЙТИ',register:'СОЗДАТЬ',username:'Имя',passwordField:'Пароль',createAcc:'СОЗДАТЬ',fillFields:'Заполните все поля!',userExists:'Пользователь уже существует!',userNotFound:'Пользователь не найден!',wrongPass:'Неверный пароль!',nextTitle:'Следующий',allTitles:'Все титулы получены!',footer:'СДЕЛАНО В ОБРАЗОВАТЕЛЬНЫХ ЦЕЛЯХ',sound:'ЗВУК',morseFreq:'ЧАСТОТА МОРЗЕ',morseVol:'ГРОМКОСТЬ МОРЗЕ',clickVol:'ГРОМКОСТЬ КНОПОК',clickFreq:'ЧАСТОТА КНОПОК',clickDur:'ДЛИТЕЛЬНОСТЬ ЗВУКА ПРИ НАЖАТИИ',musicVol:'ГРОМКОСТЬ МУЗЫКИ (скоро)',reset:'СБРОС',particleCaught:'+1 частица',xpPerMin:'+1xp',loading:'Загрузка...',noPlayers:'Пока нет игроков. Стань первым!',back:'← НАЗАД',lockMsg:'Достигните 50 уровня чтобы разблокировать таблицу лидеров',langBtn:'Язык: РУ',modLockMsg:'Достигните 30 уровня для модификаторов'},en:{home:'Home',learn:'Learn',practice:'Practice',leaderboard:'Top',profile:'Profile',heroTitle:'LEARN',heroAccent:'MORSE CODE',heroSubtitle:'Train to transmit signals',learning:'LEARNING',lesson:'LISTEN',practiceTitle:'PRACTICE',radio:'RADIO TX',newWord:'NEW WORD',pressHold:'PRESS HOLD',transmit:'TRANSMIT',topLevel:'TOP LEVEL',topTime:'TOP TIME',byLevel:'BY LEVEL',byTime:'BY TIME',profileTitle:'PROFILE',cosmetics:'COSMETICS',password:'PASSWORD',settings:'SETTINGS',logout:'LOGOUT',deleteAcc:'DELETE ACCOUNT',deleteAccConfirm:'DELETE ACCOUNT?',accuracy:'ACCURACY',time:'TIME',exp:'EXP',level:'LEVEL',wordCorrect:'✓ SENT!',wordError:'✗ Need:',logoutConfirm:'LOGOUT?',yes:'YES',no:'NO',changePass:'CHANGE PASS',newPass:'New password',passHint:'Sure?',showPass:'SHOW PASS',changePassBtn:'CHANGE PASS',close:'CLOSE',modifiers:'MODIFIERS',shuffle:'SHUFFLE',shuffleDesc:'random chars',titles:'TITLES',cosmeticsTitle:'COSMETICS',signs:'SYMBOLS',login:'LOGIN',register:'REGISTER',username:'Username',passwordField:'Password',createAcc:'CREATE',fillFields:'Fill fields!',userExists:'User exists!',userNotFound:'Not found!',wrongPass:'Wrong pass!',nextTitle:'Next',allTitles:'All unlocked!',footer:'MADE FOR EDUCATIONAL PURPOSES',sound:'SOUND',morseFreq:'MORSE FREQ',morseVol:'MORSE VOL',clickVol:'CLICK VOL',clickFreq:'CLICK FREQ',clickDur:'CLICK SOUND DURATION',musicVol:'MUSIC VOL (soon)',reset:'RESET',particleCaught:'+1 particle',xpPerMin:'+1xp',loading:'Loading...',noPlayers:'No players yet. Be the first!',back:'← BACK',lockMsg:'Reach level 50 to unlock the leaderboard',langBtn:'Language: ENG',modLockMsg:'Reach level 30 for modifiers'}};
const WORDS={ru:{easy:['КОД','РАК','ДОМ','СОН','МИР','ЛУК','МЕЛ','ШАР','ЖУК','ЛЕС'],normal:['РАДИО','НОЧЬ','ВОЛНА','ЭФИР','МОРЗЕ','СВЯЗЬ','СИГНАЛ','ПОЧТА','КОМПАС','КАРТА'],hard:['ПРИВЕТ','СПАСИБО','АНТЕННА','ЧАСТОТА','ПЕРЕДАЧА','ПРИЁМНИК','СООБЩЕНИЕ','ТЕЛЕГРАФ','СПУТНИК','РАКЕТА'],extreme:['РАДИОСТАНЦИЯ','ПЕРЕДАТЧИК','ТЕЛЕГРАФИЯ','КОММУНИКАЦИЯ','ИНФОРМАЦИЯ'],impossible:['РАДИОПЕРЕХВАТ','КРИПТОГРАФИЯ','ДЕШИФРОВАНИЕ','ШИФРОВАНИЕ']},en:{easy:['CAT','DOG','SUN','SKY','RUN','FLY','MAP','KEY','BOX','TOP'],normal:['HELLO','WORLD','RADIO','NIGHT','WAVE','SIGNAL','MORSE','CLOUD','STORM','OCEAN'],hard:['TRANSMIT','RECEIVER','ANTENNA','FREQUENCY','MESSAGE','SATELLITE','ROCKET','PLANET','GALAXY','HORIZON'],extreme:['COMMUNICATION','TRANSMISSION','MODULATION','FREQUENCY','AMPLITUDE'],impossible:['CRYPTOGRAPHY','RADIOINTERCEPT','DECRYPTION','ENCRYPTION']}};
const RU='АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split(''),EN='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),NUM='0123456789'.split(''),PUNCT=[',','.','?','!',':',';','-','/','@','(',')'];
const SECRET_KEY='NightlineSecretKey2024';
const MAXL=10000;

// ============ ПЕРЕМЕННЫЕ ============
let audioCtx=null,curAlpha='ru',curLesson=0,exp=0,attempts=0,correct=0,pressed=false,pressT=0,morseIn='',targetWord='',txIdx=0,diff='easy',user=null,title=null,viewing=null,sessStart=Date.now(),autoTitle=false,lbTab='level',cache=null,oscs=[],shuffle=false,lang=localStorage.getItem('morse-lang')||'ru',sessInt=null,saveT=null,musicEl=null,particlesCaught=0,particleTimeout=null,particleEl=null,titleAnimTimeout=null,expAnimTimeout=null,clickVol=parseInt(localStorage.getItem('click-vol')||400),clickFreq=parseInt(localStorage.getItem('click-freq')||900),clickDur=parseInt(localStorage.getItem('click-dur')||70),morseVol=parseInt(localStorage.getItem('morse-vol')||500),morseFreq=parseInt(localStorage.getItem('morse-freq')||700),musicVol=parseInt(localStorage.getItem('music-vol')||300),lastXpMinute=0;

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
const $=id=>document.getElementById(id);
const t=k=>I18N[lang]?.[k]||k;
const lvlFromExp=e=>e<=0?1:Math.min(Math.floor(Math.sqrt(e/1.25))+1,MAXL);
const expForLvl=l=>l<=1?0:Math.pow(Math.min(l,MAXL)-1,2)*1.25;
const lvlColor=l=>`hsl(${(l-1)%360},${70+(l%30)}%,${55+(l%20)}%)`;
const fmtTime=ms=>{const m=Math.floor(ms/6e4);return m<60?`${m}м`:`${Math.floor(m/60)}ч`;};
const fmtDate=iso=>{const d=new Date(iso);return`${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;};

// ============ ШИФРОВАНИЕ ============
function encryptPassword(password){let encrypted='';for(let i=0;i<password.length;i++){const charCode=password.charCodeAt(i)^SECRET_KEY.charCodeAt(i%SECRET_KEY.length);encrypted+=String.fromCharCode(charCode)}return btoa(encrypted)}
function decryptPassword(encrypted){try{const decoded=atob(encrypted);let decrypted='';for(let i=0;i<decoded.length;i++){const charCode=decoded.charCodeAt(i)^SECRET_KEY.charCodeAt(i%SECRET_KEY.length);decrypted+=String.fromCharCode(charCode)}return decrypted}catch(e){return''}}

// ============ FIREBASE ФУНКЦИИ (ЗАМЕНА JSONBIN) ============
async function savePlayerToCloud(username, data) {
    if(!database) { console.warn("⚠️ Firebase не подключен"); return; }
    try {
        await database.ref('players/' + username).update({
            username: username,
            exp: data.exp || 0,
            title: data.title || null,
            sessionTime: data.sessionTime || 0,
            particlesCaught: data.particlesCaught || 0,
            updatedAt: Date.now()
        });
    } catch(e) { console.error("❌ Ошибка сохранения:", e); }
}

async function removePlayerFromCloud(username) {
    if(!database) return;
    try { await database.ref('players/' + username).remove(); }
    catch(e) { console.error("❌ Ошибка удаления:", e); }
}

async function loadAllPlayers() {
    if(!database) {
        console.warn("⚠️ Firebase не подключен, загрузка из localStorage");
        return loadFromLocalStorage();
    }
    try {
        const snapshot = await database.ref('players').once('value');
        const data = snapshot.val();
        if(!data) return [];
        return Object.values(data);
    } catch(e) {
        console.error("❌ Ошибка загрузки:", e);
        return loadFromLocalStorage();
    }
}

function loadFromLocalStorage() {
    const players = [];
    for(let i=0;i<localStorage.length;i++) {
        const key = localStorage.key(i);
        if(key && key.startsWith('user-')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                players.push({
                    username: data.username,
                    exp: data.exp || 0,
                    title: data.title || null,
                    sessionTime: data.sessionTime || 0,
                    particlesCaught: data.particlesCaught || 0,
                    updatedAt: Date.now()
                });
            } catch(e) {}
        }
    }
    return players;
}

// ============ ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ (БЕЗ ИЗМЕНЕНИЙ) ============
window.showPage=function(p){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));const tg=$(`page-${p}`);if(tg)tg.classList.add('active');window.scrollTo(0,0);if(p==='profile'){ownProf()}if(p==='leaderboard'){if(lvlFromExp(exp)<50){$('leaderboard-locked').style.display='block';$('leaderboard-content').style.display='none';}else{$('leaderboard-locked').style.display='none';$('leaderboard-content').style.display='block';lbTab='level';document.querySelectorAll('.leaderboard-tab').forEach(b=>b.classList.remove('active'));const f=document.querySelector('.leaderboard-tab');if(f)f.classList.add('active');updLB()}}updBottomNav(p);if(p==='home')startParticleGame();else stopParticleGame()};
window.switchAuthTab=function(tb,btn){document.querySelectorAll('.auth-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('login-form').style.display=tb==='login'?'block':'none';$('register-form').style.display=tb==='register'?'block':'none';$('auth-error').textContent=''};
window.toggleLanguage=function(){lang=lang==='ru'?'en':'ru';localStorage.setItem('morse-lang',lang);applyLang();updProfile();updUI();if($('page-practice').classList.contains('active'))resetTx()};
window.login=function(){const u=$('login-username').value.trim(),p=$('login-password').value,d=localStorage.getItem(`user-${u}`);if(!d){$('auth-error').textContent=t('userNotFound');return}const us=JSON.parse(d);const decryptedPassword=decryptPassword(us.password);if(decryptedPassword!==p){$('auth-error').textContent=t('wrongPass');return}localStorage.setItem('morse-user',JSON.stringify(us));user=us;exp=us.exp||0;attempts=us.attempts||0;correct=us.correct||0;title=us.title||null;autoTitle=us.autoTitle||false;particlesCaught=us.particlesCaught||0;$('auth-modal').style.display='none';updProfile();updUI();sessTimer();checkAutoTitle();savePlayerToCloud(u,us)};
window.register=function(){const u=$('register-username').value.trim(),p=$('register-password').value;if(!u||!p){$('auth-error').textContent=t('fillFields');return}if(localStorage.getItem(`user-${u}`)){$('auth-error').textContent=t('userExists');return}const encryptedPassword=encryptPassword(p);const d={username:u,password:encryptedPassword,exp:0,attempts:0,correct:0,createdAt:new Date().toISOString(),sessionTime:0,title:null,autoTitle:false,particlesCaught:0};localStorage.setItem(`user-${u}`,JSON.stringify(d));localStorage.setItem('morse-user',JSON.stringify(d));user=d;exp=0;attempts=0;correct=0;title=null;autoTitle=false;particlesCaught=0;$('auth-modal').style.display='none';cache=null;updProfile();updUI();sessTimer();savePlayerToCloud(u,d)};
window.openLogoutModal=function(){$('logout-modal').style.display='flex'};
window.openDeleteAccModal=function(){closeModal('settings-modal');$('delete-acc-modal').style.display='flex'};
window.confirmDeleteAcc=function(){if(!user)return;const username=user.username;localStorage.removeItem(`user-${username}`);localStorage.removeItem('morse-user');removePlayerFromCloud(username);clearInterval(sessInt);user=null;viewing=null;exp=0;closeConfirmModal('delete-acc-modal');$('auth-modal').style.display='flex';showPage('home')};
window.openSettingsModal=function(){if(!user||viewing)return;$('settings-modal').style.display='flex'};
window.openSoundSettings=function(){if(!user||viewing)return;closeModal('settings-modal');$('sound-modal').style.display='flex';updSoundSliders()};
window.openPasswordOptionsModal=function(){if(!user||viewing)return;closeModal('settings-modal');$('password-options-modal').style.display='flex'};
window.openPasswordModal=function(){$('password-options-modal').style.display='none';$('password-modal').style.display='flex';$('new-password-input').value='';$('new-password-input').placeholder=t('newPass')};
window.openShowPasswordModal=function(){$('password-options-modal').style.display='none';$('show-password-modal').style.display='flex';if(user){const decryptedPassword=decryptPassword(user.password);$('password-display').textContent=decryptedPassword||'—'}else{$('password-display').textContent='—'}};
window.closeConfirmModal=function(id){$(id).style.display='none'};
window.closeSettingsModal=function(){$('settings-modal').style.display='none'};
window.closeSoundModal=function(){$('sound-modal').style.display='none'};
window.confirmLogout=function(){if(user){user.sessionTime=Date.now()-sessStart;localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));savePlayerToCloud(user.username,user)}clearInterval(sessInt);localStorage.removeItem('morse-user');user=null;viewing=null;exp=0;closeConfirmModal('logout-modal');$('auth-modal').style.display='flex';showPage('home')};
window.confirmChangePassword=function(){const p=$('new-password-input').value;if(!p||p.length<4){alert('Минимум 4 символа!');return}if(!user||viewing)return;user.password=encryptPassword(p);localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));closeConfirmModal('password-modal');updProfile()};
window.openTitlesModal=function(){if(viewing)return;closeModal('cosmetics-modal');const m=$('titles-modal'),l=$('titles-list'),n=$('next-title');m.style.display='flex';l.innerHTML='';ALL_TITLES.filter(x=>{if(x.count!==undefined)return particlesCaught>=x.count;return lvlFromExp(exp)>=x.level}).forEach(tt=>{const d=document.createElement('div');d.className='title-item';d.style.color=tt.color;d.style.borderColor=tt.color;d.innerHTML=`<div style="font-weight:700">${lang==='ru'?tt.name:tt.nameEn}</div><div style="font-size:.35rem;color:var(--dim);margin-top:.3rem">${lang==='ru'?tt.desc:tt.descEn}</div>`;d.onclick=()=>selTitle(tt.name);if(title===tt.name||title===tt.nameEn){d.style.background=tt.color+'20';d.style.boxShadow=`0 0 15px ${tt.color}4D`}l.appendChild(d)});const nt=ALL_TITLES.find(x=>{if(x.count!==undefined)return particlesCaught<x.count;return lvlFromExp(exp)<x.level});if(n){if(nt){n.innerHTML=`<div style="border:1px solid ${nt.color};border-radius:8px;padding:.8rem;box-shadow:0 0 15px ${nt.color}4D"><div style="font-weight:700;color:${nt.color}">${t('nextTitle')}: ${lang==='ru'?nt.name:nt.nameEn}</div><div style="font-size:.35rem;color:var(--dim);margin-top:.3rem">${lang==='ru'?nt.desc:nt.descEn}</div></div>`}else{n.textContent=t('allTitles');n.style.color='#fff'}}};
window.openCosmeticsModal=function(){if(viewing)return;$('cosmetics-modal').style.display='flex'};
window.closeCosmeticsModal=function(){$('cosmetics-modal').style.display='none'};
window.closeTitlesModal=function(){$('titles-modal').style.display='none'};
window.openModifiersModal=function(){if(lvlFromExp(exp)<30){$('modifier-locked-modal').style.display='flex';$('modifier-lock-msg').textContent=t('modLockMsg');return}$('modifiers-modal').style.display='flex'};
window.closeModifiersModal=function(){$('modifiers-modal').style.display='none'};
window.toggleShuffleModifier=function(){if(lvlFromExp(exp)<30)return;shuffle=!shuffle;const i=$('mod-shuffle'),d=$('mod-shuffle-desc');if(shuffle){i.style.borderColor='#3fb950';i.style.color='#3fb950';i.style.background='rgba(63,185,80,.15)';d.style.display='block'}else{i.style.borderColor='';i.style.color='';i.style.background='';d.style.display='none'}resetTx()};
window.cycleDifficulty=function(){const d=Object.keys(DIFFICULTIES),i=d.indexOf(diff);diff=d[(i+1)%d.length];updDiffBtn();diffColor();resetTx()};
window.switchAlphabet=function(tp,btn){curAlpha=tp;curLesson=0;document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));if(btn)btn.classList.add('active');updLesson()};
window.nextLesson=function(){const a=curArr();if(curLesson<a.length-1){curLesson++;updLesson()}};
window.prevLesson=function(){if(curLesson>0){curLesson--;updLesson()}};
window.playCurrentLesson=function(){playChar(curArr()[curLesson])};
window.startTransmitGame=function(){if(shuffle&&lvlFromExp(exp)<30){shuffle=false;const i=$('mod-shuffle'),d=$('mod-shuffle-desc');i.style.borderColor='';i.style.color='';i.style.background='';d.style.display='none'}targetWord=shuffle?shuffWord():(WORDS[lang]&&WORDS[lang][diff]?WORDS[lang][diff]:WORDS.ru[diff])[Math.floor(Math.random()*(WORDS[lang]&&WORDS[lang][diff]?WORDS[lang][diff]:WORDS.ru[diff]).length)];txIdx=0;morseIn='';$('target-word').textContent=targetWord;$('target-morse').textContent=targetWord.split('').map(c=>MORSE_CODE[c.toUpperCase()]||MORSE_CODE[c]||'?').join(' ');const f=$('transmit-feedback');f.textContent='';f.className='transmit-feedback';updTxProg();updKeyDisp()};
window.switchLeaderboardTab=function(tab,btn){lbTab=tab;document.querySelectorAll('.leaderboard-tab').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');updLB()};
window.changeMorseFreq=function(v){morseFreq=parseInt(v);localStorage.setItem('morse-freq',morseFreq);$('morse-freq-val').textContent=morseFreq+'гц'};
window.changeMorseVol=function(v){morseVol=parseInt(v);localStorage.setItem('morse-vol',morseVol);$('morse-vol-val').textContent=morseVol};
window.changeClickVol=function(v){clickVol=parseInt(v);localStorage.setItem('click-vol',clickVol);$('click-vol-val').textContent=clickVol};
window.changeClickFreq=function(v){clickFreq=parseInt(v);localStorage.setItem('click-freq',clickFreq);$('click-freq-val').textContent=clickFreq+'гц'};
window.changeClickDur=function(v){clickDur=parseInt(v);localStorage.setItem('click-dur',clickDur);$('click-dur-val').textContent=clickDur+'мс'};
window.changeMusicVol=function(v){musicVol=parseInt(v);localStorage.setItem('music-vol',musicVol);$('music-vol-val').textContent=musicVol;if(musicEl)musicEl.volume=musicVol/1200;if(musicVol===0)stopMusic();else if(musicEl&&musicEl.paused)startMusic()};
window.resetSoundSettings=function(){morseFreq=700;morseVol=500;clickVol=400;clickFreq=900;clickDur=70;musicVol=300;localStorage.setItem('morse-freq',morseFreq);localStorage.setItem('morse-vol',morseVol);localStorage.setItem('click-vol',clickVol);localStorage.setItem('click-freq',clickFreq);localStorage.setItem('click-dur',clickDur);localStorage.setItem('music-vol',musicVol);updSoundSliders()};
window.catchParticle=function(){if(!particleEl)return;particlesCaught++;if(user){user.particlesCaught=particlesCaught;localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));savePlayerToCloud(user.username,user)}const ct=CATCHER_TITLES.find(x=>x.count===particlesCaught);if(ct){title=ct.name;if(user){user.title=ct.name;localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));savePlayerToCloud(user.username,user)}titleAnim(ct)}addExp(25);particleEl.remove();particleEl=null;showParticleCaught();updUI();save();startParticleGame()};

// ============ ОСТАЛЬНЫЕ ФУНКЦИИ (БЕЗ ИЗМЕНЕНИЙ) ============
function showParticleCaught(){const c=$('exp-animation');if(!c)return;c.textContent=t('particleCaught');c.style.top='70%';c.style.left='50%';c.classList.remove('show');void c.offsetWidth;c.classList.add('show');setTimeout(()=>c.classList.remove('show'),2000)}
function startMusic(){if(!musicEl){musicEl=new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_2c8d0f1b5e.mp3?filename=lofi-study-112191.mp3');musicEl.loop=true}musicEl.volume=musicVol/1200;if(musicVol>0)musicEl.play().catch(()=>{})}
function stopMusic(){if(musicEl)musicEl.pause()}
function updSoundSliders(){$('morse-freq').value=morseFreq;$('morse-freq-val').textContent=morseFreq+'гц';$('morse-vol').value=morseVol;$('morse-vol-val').textContent=morseVol;$('click-vol').value=clickVol;$('click-vol-val').textContent=clickVol;$('click-freq').value=clickFreq;$('click-freq-val').textContent=clickFreq+'гц';$('click-dur').value=clickDur;$('click-dur-val').textContent=clickDur+'мс';$('music-vol').value=musicVol;$('music-vol-val').textContent=musicVol}
function applyLang(){document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(t(k)){if(el.tagName==='INPUT')el.placeholder=t(k);else el.textContent=t(k)}});document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const k=el.dataset.i18nPlaceholder;if(t(k))el.placeholder=t(k)});updDiffBtn();document.querySelectorAll('.lang-toggle').forEach(b=>b.textContent=lang==='ru'?'Language: ENG':'Язык: РУ');const ft=$('footer-text');if(ft)ft.textContent=t('footer');const lm=$('lock-msg');if(lm)lm.textContent=t('lockMsg');const mlm=$('modifier-lock-msg');if(mlm)mlm.textContent=t('modLockMsg')}
function playClickSound(){if(clickVol===0)return;initAudio();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.type='sine';o.frequency.setValueAtTime(clickFreq,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(clickFreq*.6,audioCtx.currentTime+clickDur/1000);g.gain.setValueAtTime(clickVol/1200*.25,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+clickDur/1000);o.start();o.stop(audioCtx.currentTime+clickDur/1000)}
function btnSounds(){document.querySelectorAll('button,a').forEach(el=>el.addEventListener('click',playClickSound))}
function particles(){const h=document.querySelector('.hero');if(!h)return;const c=document.createElement('div');c.className='particles-container';h.appendChild(c);const f=document.createDocumentFragment();for(let i=0;i<12;i++){const p=document.createElement('div');p.className='particle';p.style.left=Math.random()*100+'%';p.style.width=p.style.height=(1+Math.random()*2)+'px';p.style.animationDuration=(8+Math.random()*12)+'s';p.style.animationDelay='-'+(Math.random()*10)+'s';p.style.opacity='0';f.appendChild(p)}c.appendChild(f)}
function startParticleGame(){const h=document.querySelector('.hero');if(!h)return;stopParticleGame();particleTimeout=setTimeout(()=>{if(!$('page-home').classList.contains('active'))return;const c=DIFFICULTIES[diff].color;const p=document.createElement('div');p.className='catch-particle';p.style.background=`radial-gradient(circle,${c}44,${c}22)`;p.style.boxShadow=`0 0 8px ${c}33`;const heroContent=h.querySelector('.hero-content');const footer=$('footer-text');let minY=100;let maxY=window.innerHeight-150;if(heroContent){const rect=heroContent.getBoundingClientRect();minY=rect.bottom+20}if(footer){const rect=footer.getBoundingClientRect();maxY=rect.top-30}p.style.left=Math.random()*80+10+'%';p.style.top=Math.random()*(maxY-minY)+minY+'px';p.style.position='fixed';p.onclick=()=>catchParticle();document.body.appendChild(p);particleEl=p;setTimeout(()=>{if(p.parentNode)p.remove();particleEl=null;startParticleGame()},4e3)},5e3)}
function stopParticleGame(){if(particleTimeout)clearTimeout(particleTimeout);if(particleEl){particleEl.remove();particleEl=null}}
function initAudio(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)()}
function stopOscs(){oscs.forEach(o=>{try{o.stop()}catch(e){}});oscs=[]}
function auth(){const s=localStorage.getItem('morse-user');if(s){try{user=JSON.parse(s);exp=user.exp||0;attempts=user.attempts||0;correct=user.correct||0;title=user.title||null;autoTitle=user.autoTitle||false;particlesCaught=user.particlesCaught||0;$('auth-modal').style.display='none';updProfile();updUI();sessTimer();checkAutoTitle()}catch(e){$('auth-modal').style.display='flex'}}else $('auth-modal').style.display='flex';if(musicVol>0)startMusic()}
function sessTimer(){sessStart=Date.now()-(user?.sessionTime||0);lastXpMinute=Math.floor((user?.sessionTime||0)/6e4);clearInterval(sessInt);sessInt=setInterval(()=>{if(user&&!viewing){user.sessionTime=Date.now()-sessStart;localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));const currentMinute=Math.floor(user.sessionTime/6e4);if(currentMinute>lastXpMinute){lastXpMinute=currentMinute;addExp(1);showXpPerMin()}if(currentMinute%5===0){savePlayerToCloud(user.username,user)}}updSessTime()},1e3)}
function showXpPerMin(){const c=$('exp-animation');if(!c)return;c.textContent=t('xpPerMin');c.style.top='60%';c.style.left='50%';c.classList.remove('show');void c.offsetWidth;c.classList.add('show');setTimeout(()=>c.classList.remove('show'),2000)}
function updProfile(){if(!user)return;$('profile-username').textContent=user.username;$('profile-created').textContent=user.createdAt?fmtDate(user.createdAt):'—';document.querySelector('.profile-actions').style.display=viewing?'none':'flex';updSessTime();updTitle();updLvl()}
function updTitle(){const e=$('profile-title');if(!e)return;if(title){const tt=ALL_TITLES.find(x=>x.name===title||x.nameEn===title);if(tt){e.textContent=lang==='ru'?tt.name:tt.nameEn;e.style.color=tt.color;e.style.display='inline'}}else{e.textContent='';e.style.display='none'}}
function updLvl(){const e=$('profile-level');if(!e)return;const l=lvlFromExp(exp);e.textContent=`${t('level')} ${l}`;e.style.color=lvlColor(l)}
function updSessTime(){const e=$('profile-session-time');if(e){if(user)e.textContent=fmtTime(user.sessionTime||0)}}
function checkAutoTitle(){if(!user||viewing||autoTitle)return;if(lvlFromExp(exp)>=5){const tt=TITLES.find(x=>x.level===5);if(tt){title=tt.name;user.title=tt.name;user.autoTitle=true;autoTitle=true;localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));savePlayerToCloud(user.username,user);updTitle();updUI();titleAnim(tt)}}}
function titleAnim(tt){if(titleAnimTimeout)clearTimeout(titleAnimTimeout);const c=$('title-animation');if(!c)return;c.innerHTML='';const nm=document.createElement('div');nm.className='title-anim-name';nm.textContent=lang==='ru'?tt.name:tt.nameEn;nm.style.color=tt.color;nm.style.textShadow=`0 0 30px ${tt.color}`;c.appendChild(nm);c.style.top='20%';c.style.left='50%';c.style.transform='translate(-50%,-50%) scale(.8)';c.style.opacity='0';c.classList.remove('show');void c.offsetWidth;c.classList.add('show');c.style.transition='opacity .5s ease,transform .5s cubic-bezier(.25,.1,.25,1)';c.style.opacity='1';c.style.transform='translate(-50%,-50%) scale(1)';titleAnimTimeout=setTimeout(()=>{c.style.opacity='0';c.style.transform='translate(-50%,-50%) scale(1.1)';setTimeout(()=>c.classList.remove('show'),500)},3000)}
function selTitle(nm){title=nm;if(user&&!viewing){user.title=nm;localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));savePlayerToCloud(user.username,user)}closeTitlesModal();updTitle();updUI()}
function preload(){if(cache)return;const u=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('user-')){try{u.push(JSON.parse(localStorage.getItem(k)))}catch(e){}}}cache=u}
async function updLB(){const list=$('leaderboard-list');if(!list)return;list.innerHTML=`<div style="text-align:center;color:var(--dim);padding:2rem">${t('loading')}</div>`;const players=await loadAllPlayers();const filtered=players.filter(p=>lvlFromExp(p.exp||0)>=50);if(filtered.length===0){list.innerHTML=`<div style="text-align:center;color:var(--dim);padding:2rem">${t('noPlayers')}</div>`;return}filtered.sort((a,b)=>lbTab==='level'?(b.exp||0)-(a.exp||0):(b.sessionTime||0)-(a.sessionTime||0));list.innerHTML='';const f=document.createDocumentFragment();filtered.slice(0,100).forEach((u,i)=>{const d=document.createElement('div');d.className='leaderboard-item';if(user&&u.username===user.username){d.classList.add('current-user')}const av=document.createElement('span');av.className='leaderboard-avatar';av.textContent='👤';const r=document.createElement('span');r.className='leaderboard-rank';r.textContent=`#${i+1}`;const n=document.createElement('span');n.className='leaderboard-name';n.textContent=u.username;const tt=document.createElement('span');tt.className='leaderboard-title';if(u.title){const to=ALL_TITLES.find(x=>x.name===u.title||x.nameEn===u.title);if(to){tt.textContent=lang==='ru'?to.name:to.nameEn;tt.style.color=to.color}}const l=lvlFromExp(u.exp||0);const ls=document.createElement('span');ls.className='leaderboard-level';ls.style.color=lvlColor(l);ls.textContent=`${t('level')} ${l}`;d.append(av,r,n,tt,ls);if(lbTab==='time'){const ts=document.createElement('span');ts.className='leaderboard-time';ts.textContent=fmtTime(u.sessionTime||0);d.appendChild(ts)}f.appendChild(d)});list.appendChild(f)}
function ownProf(){viewing=null;if(!user)return;document.querySelector('.profile-actions').style.display='flex';updProfile();updUI()}
function resetTx(){targetWord='';txIdx=0;morseIn='';$('target-word').textContent='—';$('target-morse').textContent='';const f=$('transmit-feedback');f.textContent='';f.className='transmit-feedback';$('key-display').textContent=t('pressHold');$('progress-letters').innerHTML=''}
function updDiffBtn(){const b=$('difficulty-btn'),d=DIFFICULTIES[diff];b.textContent=lang==='ru'?d.name:d.nameEn;b.style.borderColor=d.color;b.style.color=d.color;b.style.background=d.color+'20'}
function diffColor(){const c=DIFFICULTIES[diff].color;document.documentElement.style.setProperty('--pc',c);document.documentElement.style.setProperty('--pd',c+'4D');document.documentElement.style.setProperty('--pb',c+'1F');document.documentElement.style.setProperty('--g',`0 0 20px ${c}66`);document.documentElement.style.setProperty('--gs',`0 0 40px ${c}99`)}
function shuffWord(){const all=[...RU,...EN,...NUM,...PUNCT];const d=DIFFICULTIES[diff];const bl=lang==='ru'?(d.name==='ЛЁГКАЯ'?2:d.name==='ОБЫЧНАЯ'?3:d.name==='СЛОЖНАЯ'?5:d.name==='ЭКСТРЕМАЛЬНАЯ'?7:11):(d.nameEn==='EASY'?2:d.nameEn==='NORMAL'?3:d.nameEn==='HARD'?5:d.nameEn==='EXTREME'?7:11);let r='';for(let i=0;i<bl;i++)r+=all[Math.floor(Math.random()*all.length)];return r}
function scheduleTone(tm,dur,f){initAudio();if(morseVol===0)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain(),flt=audioCtx.createBiquadFilter();o.connect(flt);flt.connect(g);g.connect(audioCtx.destination);o.type='sine';o.frequency.value=f||morseFreq;flt.type='lowpass';flt.frequency.value=1200;g.gain.setValueAtTime(0,tm);g.gain.linearRampToValueAtTime(morseVol/1200*.25,tm+.01);g.gain.setValueAtTime(morseVol/1200*.25,tm+dur-.02);g.gain.exponentialRampToValueAtTime(.001,tm+dur);o.start(tm);o.stop(tm+dur);oscs.push(o)}
function playChar(c){stopOscs();initAudio();const u=c.toUpperCase();const m=MORSE_CODE[u]||MORSE_CODE[c];if(!m)return;const n=audioCtx.currentTime;let tm=n;for(let i=0;i<m.length;i++){if(m[i]==='.'){scheduleTone(tm,.1,morseFreq);tm+=.18}else if(m[i]==='-'){scheduleTone(tm,.28,morseFreq);tm+=.36}if(i<m.length-1)tm+=.08}}
function curArr(){switch(curAlpha){case'ru':return RU;case'en':return EN;case'numbers':return NUM;case'punct':return PUNCT;default:return RU}}
function updLesson(){const a=curArr();if(!a||a.length===0)return;const c=a[curLesson];if(!c)return;$('current-letter').textContent=c;$('current-morse').textContent=MORSE_CODE[c]||'';$('lesson-counter').textContent=`${curLesson+1}/${a.length}`;const v=$('lesson-visual');v.innerHTML='';const m=MORSE_CODE[c]||'';for(const s of m){const d=document.createElement('div');d.className=s==='.'?'morse-dot':'morse-dash';v.appendChild(d)}}
function updTxProg(){const c=$('progress-letters'),col=DIFFICULTIES[diff].color;c.innerHTML='';for(let i=0;i<targetWord.length;i++){const s=document.createElement('div');s.className='letter-slot';if(i<txIdx){s.classList.add('filled');s.textContent=targetWord[i];s.style.borderColor=col;s.style.color=col;s.style.background=col+'20'}else if(i===txIdx){s.classList.add('current');s.style.borderColor=col}c.appendChild(s)}}
function keyListener(){const k=$('morse-key');if(!k)return;k.addEventListener('touchstart',e=>{e.preventDefault();pressStart()},{passive:false});k.addEventListener('touchend',e=>{e.preventDefault();pressEnd()},{passive:false});k.addEventListener('mousedown',pressStart);k.addEventListener('mouseup',pressEnd)}
function pressStart(){pressed=true;pressT=Date.now();const kb=$('morse-key');kb.classList.add('active');kb.style.transform='scale(.9)';kb.style.boxShadow='0 0 80px var(--pc)';initAudio();if(morseVol===0)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.frequency.value=morseFreq;o.type='sine';g.gain.setValueAtTime(morseVol/1200*.25,audioCtx.currentTime);o.start();window.curOsc=o}
function pressEnd(){if(!pressed)return;pressed=false;const kb=$('morse-key');kb.classList.remove('active');kb.style.transform='scale(1)';kb.style.boxShadow='var(--g)';if(window.curOsc){window.curOsc.stop();window.curOsc=null}const s=Date.now()-pressT<150?'.':'-';morseIn+=s;updKeyDisp();clearTimeout(window.decT);window.decT=setTimeout(decodeMorse,1e3)}
function updKeyDisp(){$('key-display').textContent=morseIn||t('pressHold')}
function decodeMorse(){const mc=morseIn;const fl=Object.keys(MORSE_CODE).find(k=>MORSE_CODE[k]===mc);if(fl&&targetWord){attempts++;const tc=targetWord[txIdx];const tm=MORSE_CODE[tc]||MORSE_CODE[tc.toUpperCase()];if(mc===tm){correct++;txIdx++;updTxProg();if(txIdx===targetWord.length){const f=$('transmit-feedback');f.textContent=t('wordCorrect');f.className='transmit-feedback success';$('target-word').textContent='—';$('target-morse').textContent='';const be=shuffle?Math.round(DIFFICULTIES[diff].exp*1.35):DIFFICULTIES[diff].exp;addExp(be);setTimeout(()=>{f.textContent='';f.className='transmit-feedback';resetTx()},2e3)}}else{const f=$('transmit-feedback');f.textContent=`${t('wordError')} ${tc}`;f.className='transmit-feedback error'}updUI();save()}morseIn='';updKeyDisp()}
function addExp(a){const ol=lvlFromExp(exp);exp+=a;expAnim(a);const nl=lvlFromExp(exp);if(nl>ol){lvlAnim(nl);checkAutoTitle()}updUI();save()}
function expAnim(a){if(expAnimTimeout)clearTimeout(expAnimTimeout);const c=$('exp-animation');c.textContent=`+${a} EXP`;c.style.top=(30+Math.random()*20)+'%';c.style.left=(30+Math.random()*40)+'%';c.classList.remove('show');void c.offsetWidth;c.classList.add('show');expAnimTimeout=setTimeout(()=>c.classList.remove('show'),3000)}
function lvlAnim(l){const c=$('rank-animation'),col=lvlColor(l);c.textContent=`${t('level')} ${l}`;c.style.color=col;c.style.textShadow=`0 0 30px ${col}`;c.style.top='50%';c.style.left='50%';c.classList.remove('show');void c.offsetWidth;c.classList.add('show');setTimeout(()=>c.classList.remove('show'),3500)}
function updUI(){if(viewing)return;const l=lvlFromExp(exp),nl=l+1;const efn=expForLvl(nl)-expForLvl(l);const c=lvlColor(l);const pf=$('progress-fill');const pil=exp-expForLvl(l);const pct=efn>0?Math.min((pil/efn)*100,100):100;pf.style.width=pct+'%';pf.style.background=c;$('exp-current').textContent=exp;$('exp-needed').textContent=exp+efn;$('accuracy').textContent=attempts>0?Math.min(100,Math.round((correct/attempts)*100))+'%':'0%';updSessTime();updTitle();updLvl()}
function save(){clearTimeout(saveT);saveT=setTimeout(()=>{if(!user||viewing)return;user.exp=exp;user.attempts=attempts;user.correct=correct;user.sessionTime=Date.now()-sessStart;user.particlesCaught=particlesCaught;localStorage.setItem(`user-${user.username}`,JSON.stringify(user));localStorage.setItem('morse-user',JSON.stringify(user));savePlayerToCloud(user.username,user);cache=null},500)}
function updBottomNav(p){const nav=$('bottom-nav');if(!nav)return;nav.querySelectorAll('a').forEach(a=>a.classList.remove('active'));const active=nav.querySelector(`a[data-page="${p}"]`);if(active)active.classList.add('active')}
function closeModal(id){const el=$(id);if(el)el.style.display='none'}

// ============ ЗАПУСК ============
document.addEventListener('DOMContentLoaded',()=>{
    applyLang();
    auth();
    particles();
    keyListener();
    btnSounds();
    switchAlphabet('ru',document.querySelector('.tab-btn'));
    setTimeout(()=>updLesson(),100);
    updDiffBtn();
    diffColor();
    preload();
    if($('page-home').classList.contains('active'))startParticleGame()
});
document.addEventListener('click',e=>{const n=$('mobile-nav');if(n&&n.classList.contains('active')&&!e.target.closest('.nav')&&!e.target.closest('.menu-toggle'))n.classList.remove('active')});

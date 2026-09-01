// ============ FIREBASE ============
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

let firebaseApp, database, firebaseConnected = false;

try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    database.ref('.info/connected').on('value', (snap) => {
        firebaseConnected = snap.val() === true;
        if (firebaseConnected) console.log('✅ Firebase подключен');
        else console.warn('⚠️ Нет подключения к Firebase');
    });
} catch (e) {
    console.error('❌ Ошибка Firebase:', e);
}

// ============ КОНСТАНТЫ ============
const MORSE_CODE = {
    'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..', 'Е': '.',
    'Ж': '...-', 'З': '--..', 'И': '..', 'Й': '.---', 'К': '-.-', 'Л': '.-..',
    'М': '--', 'Н': '-.', 'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...',
    'Т': '-', 'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
    'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-',
    'Э': '..-..', 'Ю': '..--', 'Я': '.-.-',
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    ',': '--..--', '.': '.-.-.-', '?': '..--..', '!': '-.-.--', ':': '---...',
    ';': '-.-.-.', '-': '-....-', '/': '-..-.', '@': '.--.-.', '(': '-.--.',
    ')': '-.--.-', ' ': ' '
};

const TITLES = [
    { level: 5, name: 'НАЧИНАЮЩИЙ', nameEn: 'BEGINNER', color: '#58a6ff', desc: 'За достижение 5 уровня', descEn: 'For reaching level 5' },
    { level: 10, name: 'УЧЕНИК', nameEn: 'STUDENT', color: '#3fb950', desc: 'За достижение 10 уровня', descEn: 'For reaching level 10' },
    { level: 20, name: 'ЗНАТОК', nameEn: 'EXPERT', color: '#d29922', desc: 'За достижение 20 уровня', descEn: 'For reaching level 20' },
    { level: 35, name: 'ОПЫТНЫЙ', nameEn: 'EXPERIENCED', color: '#bc8cff', desc: 'За достижение 35 уровня', descEn: 'For reaching level 35' },
    { level: 50, name: 'МАСТЕР', nameEn: 'MASTER', color: '#f85149', desc: 'За достижение 50 уровня', descEn: 'For reaching level 50' },
    { level: 67, name: 'ЭКСПЕРТ', nameEn: 'SPECIALIST', color: '#ff7b72', desc: 'За достижение 67 уровня', descEn: 'For reaching level 67' },
    { level: 100, name: 'ВИРТУОЗ', nameEn: 'VIRTUOSO', color: '#a5d6ff', desc: 'За достижение 100 уровня', descEn: 'For reaching level 100' },
    { level: 333, name: 'ЛЕГЕНДА', nameEn: 'LEGEND', color: '#ffd700', desc: 'За достижение 333 уровня', descEn: 'For reaching level 333' },
    { level: 500, name: 'МИФ', nameEn: 'MYTH', color: '#ff69b4', desc: 'За достижение 500 уровня', descEn: 'For reaching level 500' },
    { level: 1000, name: 'БОГ МОРЗЕ', nameEn: 'MORSE GOD', color: '#00ffff', desc: 'За достижение 1000 уровня', descEn: 'For reaching level 1000' },
    { level: 2000, name: 'ТИТАН', nameEn: 'TITAN', color: '#ff4500', desc: 'За достижение 2000 уровня', descEn: 'For reaching level 2000' },
    { level: 3000, name: 'ВЛАСТЕЛИН', nameEn: 'OVERLORD', color: '#9400d3', desc: 'За достижение 3000 уровня', descEn: 'For reaching level 3000' },
    { level: 4000, name: 'ПОВЕЛИТЕЛЬ', nameEn: 'RULER', color: '#ff1493', desc: 'За достижение 4000 уровня', descEn: 'For reaching level 4000' },
    { level: 5000, name: 'ИМПЕРАТОР', nameEn: 'EMPEROR', color: '#ffd700', desc: 'За достижение 5000 уровня', descEn: 'For reaching level 5000' },
    { level: 6000, name: 'ФЕНИКС', nameEn: 'PHOENIX', color: '#ff6347', desc: 'За достижение 6000 уровня', descEn: 'For reaching level 6000' },
    { level: 7000, name: 'ДРАКОН', nameEn: 'DRAGON', color: '#00ff7f', desc: 'За достижение 7000 уровня', descEn: 'For reaching level 7000' },
    { level: 8000, name: 'ТВОРЕЦ', nameEn: 'CREATOR', color: '#7fffd4', desc: 'За достижение 8000 уровня', descEn: 'For reaching level 8000' },
    { level: 9000, name: 'ХРАНИТЕЛЬ', nameEn: 'KEEPER', color: '#ff8c00', desc: 'За достижение 9000 уровня', descEn: 'For reaching level 9000' },
    { level: 10000, name: 'НОЧНОЙ ГОЛОС', nameEn: 'NIGHT VOICE', color: '#fff', desc: 'За достижение 10000 уровня', descEn: 'For reaching level 10000' }
];

const CATCHER_TITLES = [
    { count: 1, name: 'ЛОВЕЦ ЧАСТИЦ I', nameEn: 'PARTICLE CATCHER I', color: '#ffd700', desc: 'За 1 пойманную частицу', descEn: 'For catching 1 particle' },
    { count: 10, name: 'ЛОВЕЦ ЧАСТИЦ II', nameEn: 'PARTICLE CATCHER II', color: '#ff9f43', desc: 'За 10 пойманных частиц', descEn: 'For catching 10 particles' },
    { count: 50, name: 'ЛОВЕЦ ЧАСТИЦ III', nameEn: 'PARTICLE CATCHER III', color: '#ff6b6b', desc: 'За 50 пойманных частиц', descEn: 'For catching 50 particles' },
    { count: 100, name: 'ЛОВЕЦ ЧАСТИЦ IV', nameEn: 'PARTICLE CATCHER IV', color: '#a29bfe', desc: 'За 100 пойманных частиц', descEn: 'For catching 100 particles' },
    { count: 1000, name: 'ЛОВЕЦ ЧАСТИЦ V', nameEn: 'PARTICLE CATCHER V', color: '#00ffff', desc: 'За 1000 пойманных частиц', descEn: 'For catching 1000 particles' },
    { count: 20000, name: 'ЛОВЕЦ ЧАСТИЦ VI', nameEn: 'PARTICLE CATCHER VI', color: '#ff1493', desc: 'За 20000 пойманных частиц', descEn: 'For catching 20000 particles' }
];

const ALL_TITLES = [...TITLES, ...CATCHER_TITLES];

const DIFFICULTIES = {
    easy: { name: 'ЛЁГКАЯ', nameEn: 'EASY', exp: 100 },
    normal: { name: 'ОБЫЧНАЯ', nameEn: 'NORMAL', exp: 200 },
    hard: { name: 'СЛОЖНАЯ', nameEn: 'HARD', exp: 300 },
    extreme: { name: 'ЭКСТРЕМАЛЬНАЯ', nameEn: 'EXTREME', exp: 400 },
    impossible: { name: 'НЕВОЗМОЖНАЯ', nameEn: 'IMPOSSIBLE', exp: 1200 }
};

const I18N = {
    ru: {
        home: 'Главная', learn: 'Обучение', practice: 'Практика', leaderboard: 'Топы', profile: 'Профиль',
        heroTitle: 'ИЗУЧЕНИЕ', heroAccent: 'АЗБУКИ МОРЗЕ', heroSubtitle: 'Тренируйся передавать сигналы',
        learning: 'ОБУЧЕНИЕ', lesson: 'ПРОСЛУШАТЬ', practiceTitle: 'ПРАКТИКА', radio: 'РАДИОПЕРЕДАЧА',
        newWord: 'НОВОЕ СЛОВО', pressHold: 'НАЖМИ И ДЕРЖИ', transmit: 'ПЕРЕДАЧА',
        topLevel: 'ТОП ПО УРОВНЮ', byLevel: 'ПО УРОВНЮ', byTime: 'ПО ВРЕМЕНИ',
        profileTitle: 'ПРОФИЛЬ', cosmetics: 'КОСМЕТИКА', password: 'ПАРОЛЬ', settings: 'НАСТРОЙКИ',
        logout: 'ВЫЙТИ', deleteAcc: 'УДАЛИТЬ АККАУНТ', deleteAccConfirm: 'УДАЛИТЬ АККАУНТ?',
        accuracy: 'ТОЧНОСТЬ', time: 'ВРЕМЯ', exp: 'EXP', level: 'LVL',
        wordCorrect: '✓ СЛОВО ПЕРЕДАНО ВЕРНО!', wordError: '✗ ОШИБКА! Нужно:',
        logoutConfirm: 'ВЫЙТИ?', yes: 'ДА', no: 'НЕТ',
        changePass: 'СМЕНА ПАРОЛЯ', newPass: 'Новый пароль', passHint: 'Вы точно хотите сменить пароль?',
        showPass: 'ПОКАЗАТЬ ПАРОЛЬ', changePassBtn: 'СМЕНИТЬ ПАРОЛЬ', close: 'ЗАКРЫТЬ',
        modifiers: 'МОДИФИКАТОРЫ', shuffle: 'В ПЕРЕМЕШКУ', shuffleDesc: 'рандомные знаки',
        titles: 'ТИТУЛЫ', cosmeticsTitle: 'КОСМЕТИКА', signs: 'ЗНАКИ',
        login: 'ВОЙТИ', register: 'СОЗДАТЬ', username: 'Имя', passwordField: 'Пароль', createAcc: 'СОЗДАТЬ',
        fillFields: 'Заполните все поля!', userExists: 'Пользователь уже существует!',
        userNotFound: 'Пользователь не найден!', wrongPass: 'Неверный пароль!',
        nextTitle: 'Следующий', allTitles: 'Все титулы получены!',
        footer: 'СДЕЛАНО В ОБРАЗОВАТЕЛЬНЫХ ЦЕЛЯХ',
        sound: 'ЗВУК', morseFreq: 'ЧАСТОТА МОРЗЕ', morseVol: 'ГРОМКОСТЬ МОРЗЕ',
        clickVol: 'ГРОМКОСТЬ КНОПОК', clickFreq: 'ЧАСТОТА КНОПОК',
        clickDur: 'ДЛИТЕЛЬНОСТЬ ЗВУКА', musicVol: 'ГРОМКОСТЬ МУЗЫКИ',
        reset: 'СБРОС', particleCaught: '+1 частица',
        loading: 'Загрузка...', noPlayers: 'Пока нет игроков. Стань первым!',
        lockMsg: 'Достигните 20 уровня чтобы разблокировать таблицу лидеров',
        langBtn: 'Язык: РУ', modLockMsg: 'Достигните 30 уровня для модификаторов',
        particlesCaught: 'ЧАСТИЦ ПОЙМАНО'
    },
    en: {
        home: 'Home', learn: 'Learn', practice: 'Practice', leaderboard: 'Top', profile: 'Profile',
        heroTitle: 'LEARN', heroAccent: 'MORSE CODE', heroSubtitle: 'Train to transmit signals',
        learning: 'LEARNING', lesson: 'LISTEN', practiceTitle: 'PRACTICE', radio: 'RADIO TX',
        newWord: 'NEW WORD', pressHold: 'PRESS HOLD', transmit: 'TRANSMIT',
        topLevel: 'TOP LEVEL', byLevel: 'BY LEVEL', byTime: 'BY TIME',
        profileTitle: 'PROFILE', cosmetics: 'COSMETICS', password: 'PASSWORD', settings: 'SETTINGS',
        logout: 'LOGOUT', deleteAcc: 'DELETE ACCOUNT', deleteAccConfirm: 'DELETE ACCOUNT?',
        accuracy: 'ACCURACY', time: 'TIME', exp: 'EXP', level: 'LVL',
        wordCorrect: '✓ SENT!', wordError: '✗ Need:',
        logoutConfirm: 'LOGOUT?', yes: 'YES', no: 'NO',
        changePass: 'CHANGE PASS', newPass: 'New password', passHint: 'Sure?',
        showPass: 'SHOW PASS', changePassBtn: 'CHANGE PASS', close: 'CLOSE',
        modifiers: 'MODIFIERS', shuffle: 'SHUFFLE', shuffleDesc: 'random chars',
        titles: 'TITLES', cosmeticsTitle: 'COSMETICS', signs: 'SYMBOLS',
        login: 'LOGIN', register: 'REGISTER', username: 'Username', passwordField: 'Password', createAcc: 'CREATE',
        fillFields: 'Fill fields!', userExists: 'User exists!', userNotFound: 'Not found!', wrongPass: 'Wrong pass!',
        nextTitle: 'Next', allTitles: 'All unlocked!',
        footer: 'MADE FOR EDUCATIONAL PURPOSES',
        sound: 'SOUND', morseFreq: 'MORSE FREQ', morseVol: 'MORSE VOL',
        clickVol: 'CLICK VOL', clickFreq: 'CLICK FREQ', clickDur: 'CLICK DURATION',
        musicVol: 'MUSIC VOL', reset: 'RESET', particleCaught: '+1 particle',
        loading: 'Loading...', noPlayers: 'No players yet. Be the first!',
        lockMsg: 'Reach level 20 to unlock the leaderboard',
        langBtn: 'Language: ENG', modLockMsg: 'Reach level 30 for modifiers',
        particlesCaught: 'PARTICLES CAUGHT'
    }
};

const WORDS = {
    ru: {
        easy: ['КОД', 'РАК', 'ДОМ', 'СОН', 'МИР', 'ЛУК', 'МЕЛ', 'ШАР', 'ЖУК', 'ЛЕС'],
        normal: ['РАДИО', 'НОЧЬ', 'ВОЛНА', 'ЭФИР', 'МОРЗЕ', 'СВЯЗЬ', 'СИГНАЛ', 'ПОЧТА', 'КОМПАС', 'КАРТА'],
        hard: ['ПРИВЕТ', 'СПАСИБО', 'АНТЕННА', 'ЧАСТОТА', 'ПЕРЕДАЧА', 'ПРИЁМНИК', 'СООБЩЕНИЕ', 'ТЕЛЕГРАФ', 'СПУТНИК', 'РАКЕТА'],
        extreme: ['РАДИОСТАНЦИЯ', 'ПЕРЕДАТЧИК', 'ТЕЛЕГРАФИЯ', 'КОММУНИКАЦИЯ', 'ИНФОРМАЦИЯ'],
        impossible: ['РАДИОПЕРЕХВАТ', 'КРИПТОГРАФИЯ', 'ДЕШИФРОВАНИЕ', 'ШИФРОВАНИЕ']
    },
    en: {
        easy: ['CAT', 'DOG', 'SUN', 'SKY', 'RUN', 'FLY', 'MAP', 'KEY', 'BOX', 'TOP'],
        normal: ['HELLO', 'WORLD', 'RADIO', 'NIGHT', 'WAVE', 'SIGNAL', 'MORSE', 'CLOUD', 'STORM', 'OCEAN'],
        hard: ['TRANSMIT', 'RECEIVER', 'ANTENNA', 'FREQUENCY', 'MESSAGE', 'SATELLITE', 'ROCKET', 'PLANET', 'GALAXY', 'HORIZON'],
        extreme: ['COMMUNICATION', 'TRANSMISSION', 'MODULATION', 'FREQUENCY', 'AMPLITUDE'],
        impossible: ['CRYPTOGRAPHY', 'RADIOINTERCEPT', 'DECRYPTION', 'ENCRYPTION']
    }
};

const RU = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
const EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NUM = '0123456789'.split('');
const PUNCT = [',', '.', '?', '!', ':', ';', '-', '/', '@', '(', ')'];
const SECRET_KEY = 'NightlineSecretKey2024';
const MAXL = 10000;
const SAVE_INTERVAL = 5000;

// ============ ПЕРЕМЕННЫЕ ============
let audioCtx = null;
let curAlpha = 'ru';
let curLesson = 0;
let exp = 0;
let attempts = 0;
let correct = 0;
let pressed = false;
let pressT = 0;
let morseIn = '';
let targetWord = '';
let txIdx = 0;
let diff = 'easy';
let user = null;
let title = null;
let viewing = null;
let sessStart = Date.now();
let autoTitle = false;
let lbTab = 'level';
let cache = null;
let oscs = [];
let shuffle = false;
let lang = localStorage.getItem('morse-lang') || 'ru';
let sessInt = null;
let saveT = null;
let musicEl = null;
let particlesCaught = 0;
let particleInterval = null;
let particleElements = [];
let clickVol = parseInt(localStorage.getItem('click-vol') || 400);
let clickFreq = parseInt(localStorage.getItem('click-freq') || 900);
let clickDur = parseInt(localStorage.getItem('click-dur') || 70);
let morseVol = parseInt(localStorage.getItem('morse-vol') || 500);
let morseFreq = parseInt(localStorage.getItem('morse-freq') || 700);
let musicVol = parseInt(localStorage.getItem('music-vol') || 300);
let saveIntervalId = null;

// ===== БУФЕРЫ ДЛЯ АНИМАЦИЙ =====
let particleValue = 0;
let particleTimer = null;
let expValue = 0;
let expTimer = null;
let levelValue = null;
let levelTimer = null;
let titleValue = null;
let titleTimer = null;

// ============ ВСПОМОГАТЕЛЬНЫЕ ============
const $ = id => document.getElementById(id);
const t = k => I18N[lang]?.[k] || k;
const lvlFromExp = e => e <= 0 ? 1 : Math.min(Math.floor(Math.sqrt(e / 1.25)) + 1, MAXL);
const expForLvl = l => l <= 1 ? 0 : Math.pow(Math.min(l, MAXL) - 1, 2) * 1.25;
const lvlColor = l => `hsl(${(l - 1) % 360}, 70%, 60%)`;
const fmtTime = ms => {
    const m = Math.floor(ms / 60000);
    if (m < 60) return `${m}м`;
    const h = Math.floor(m / 60);
    return `${h}ч ${m % 60}м`;
};
const fmtDate = iso => {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};
const isMorseChar = c => c in MORSE_CODE || c.toUpperCase() in MORSE_CODE;

// ============ ШИФРОВАНИЕ ============
function encryptPassword(password) {
    let encrypted = '';
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
        encrypted += String.fromCharCode(charCode);
    }
    return btoa(encrypted);
}

function decryptPassword(encrypted) {
    try {
        const decoded = atob(encrypted);
        let decrypted = '';
        for (let i = 0; i < decoded.length; i++) {
            const charCode = decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
            decrypted += String.fromCharCode(charCode);
        }
        return decrypted;
    } catch (e) {
        return '';
    }
}

// ============ FIREBASE ============
async function savePlayerToCloud(username, data) {
    if (!database || !firebaseConnected) return;
    try {
        await database.ref('players/' + username).update({
            username, exp: data.exp || 0, title: data.title || null,
            sessionTime: data.sessionTime || 0, particlesCaught: data.particlesCaught || 0,
            updatedAt: Date.now()
        });
    } catch (e) { console.error('❌ Ошибка сохранения:', e); }
}

async function removePlayerFromCloud(username) {
    if (!database || !firebaseConnected) return;
    try { await database.ref('players/' + username).remove(); }
    catch (e) { console.error('❌ Ошибка удаления:', e); }
}

async function loadAllPlayers() {
    if (!database || !firebaseConnected) return loadFromLocalStorage();
    try {
        const snapshot = await database.ref('players').once('value');
        const data = snapshot.val();
        return data ? Object.values(data) : [];
    } catch (e) {
        console.error('❌ Ошибка загрузки:', e);
        return loadFromLocalStorage();
    }
}

function loadFromLocalStorage() {
    const players = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('user-')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                players.push({
                    username: data.username, exp: data.exp || 0,
                    title: data.title || null, sessionTime: data.sessionTime || 0,
                    particlesCaught: data.particlesCaught || 0
                });
            } catch (e) {}
        }
    }
    return players;
}

// ============ МОДАЛЬНЫЕ ОКНА ============
function closeModal(id) {
    const el = $(id);
    if (el) el.style.display = 'none';
    const overlay = $('modal-overlay');
    if (overlay) overlay.style.display = 'none';
}

function openModal(id) {
    const el = $(id);
    if (el) {
        el.style.display = 'flex';
        const overlay = $('modal-overlay');
        if (overlay) overlay.style.display = 'block';
    }
}

// ============ АВТОРИЗАЦИЯ ============
window.switchAuthTab = function(tab, btn) {
    document.querySelectorAll('.auth-tab').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    $('login-form').style.display = tab === 'login' ? 'block' : 'none';
    $('register-form').style.display = tab === 'register' ? 'block' : 'none';
    $('auth-error').textContent = '';
};

window.login = function() {
    const u = $('login-username').value.trim();
    const p = $('login-password').value;
    const d = localStorage.getItem(`user-${u}`);
    if (!d) { $('auth-error').textContent = t('userNotFound'); return; }
    try {
        const us = JSON.parse(d);
        if (decryptPassword(us.password) !== p) {
            $('auth-error').textContent = t('wrongPass');
            return;
        }
        localStorage.setItem('morse-user', JSON.stringify(us));
        user = us;
        exp = us.exp || 0;
        attempts = us.attempts || 0;
        correct = us.correct || 0;
        title = us.title || null;
        autoTitle = us.autoTitle || false;
        particlesCaught = us.particlesCaught || 0;
        $('auth-modal').style.display = 'none';
        updateProfile();
        updateUI();
        startSessionTimer();
        checkAutoTitle();
        savePlayerToCloud(u, us);
    } catch (e) {
        $('auth-error').textContent = 'Ошибка авторизации';
    }
};

window.register = function() {
    const u = $('register-username').value.trim();
    const p = $('register-password').value;
    if (!u || !p) { $('auth-error').textContent = t('fillFields'); return; }
    if (localStorage.getItem(`user-${u}`)) {
        $('auth-error').textContent = t('userExists');
        return;
    }
    const data = {
        username: u, password: encryptPassword(p), exp: 0, attempts: 0, correct: 0,
        createdAt: new Date().toISOString(), sessionTime: 0, title: null, autoTitle: false,
        particlesCaught: 0
    };
    localStorage.setItem(`user-${u}`, JSON.stringify(data));
    localStorage.setItem('morse-user', JSON.stringify(data));
    user = data;
    exp = 0;
    attempts = 0;
    correct = 0;
    title = null;
    autoTitle = false;
    particlesCaught = 0;
    $('auth-modal').style.display = 'none';
    cache = null;
    updateProfile();
    updateUI();
    startSessionTimer();
    savePlayerToCloud(u, data);
};

function auth() {
    const saved = localStorage.getItem('morse-user');
    if (saved) {
        try {
            user = JSON.parse(saved);
            exp = user.exp || 0;
            attempts = user.attempts || 0;
            correct = user.correct || 0;
            title = user.title || null;
            autoTitle = user.autoTitle || false;
            particlesCaught = user.particlesCaught || 0;
            $('auth-modal').style.display = 'none';
            updateProfile();
            updateUI();
            startSessionTimer();
            checkAutoTitle();
        } catch (e) {
            $('auth-modal').style.display = 'flex';
        }
    } else {
        $('auth-modal').style.display = 'flex';
    }
    if (musicVol > 0) startMusic();
}

// ============ ВЫХОД ============
window.openLogoutModal = function() { openModal('logout-modal'); };
window.openDeleteAccModal = function() { closeModal('settings-modal'); openModal('delete-acc-modal'); };

window.confirmDeleteAcc = function() {
    if (!user) return;
    const username = user.username;
    localStorage.removeItem(`user-${username}`);
    localStorage.removeItem('morse-user');
    removePlayerFromCloud(username);
    clearInterval(sessInt);
    clearInterval(saveIntervalId);
    user = null;
    viewing = null;
    exp = 0;
    closeModal('delete-acc-modal');
    $('auth-modal').style.display = 'flex';
    showPage('home');
};

window.confirmLogout = function() {
    if (user) {
        user.sessionTime = Date.now() - sessStart;
        localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
        localStorage.setItem('morse-user', JSON.stringify(user));
        savePlayerToCloud(user.username, user);
    }
    clearInterval(sessInt);
    clearInterval(saveIntervalId);
    localStorage.removeItem('morse-user');
    user = null;
    viewing = null;
    exp = 0;
    closeModal('logout-modal');
    $('auth-modal').style.display = 'flex';
    showPage('home');
};

// ============ ПАРОЛЬ ============
window.openPasswordOptionsModal = function() {
    if (!user || viewing) return;
    closeModal('settings-modal');
    openModal('password-options-modal');
};
window.openPasswordModal = function() {
    closeModal('password-options-modal');
    openModal('password-modal');
    $('new-password-input').value = '';
    $('new-password-input').placeholder = t('newPass');
};
window.openShowPasswordModal = function() {
    closeModal('password-options-modal');
    openModal('show-password-modal');
    $('password-display').textContent = user ? decryptPassword(user.password) || '—' : '—';
};
window.confirmChangePassword = function() {
    const p = $('new-password-input').value;
    if (!p || p.length < 4) { alert('Минимум 4 символа!'); return; }
    if (!user || viewing) return;
    user.password = encryptPassword(p);
    localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
    localStorage.setItem('morse-user', JSON.stringify(user));
    closeModal('password-modal');
    updateProfile();
};

// ============ НАСТРОЙКИ ============
window.openSettingsModal = function() {
    if (!user || viewing) return;
    openModal('settings-modal');
};
window.openSoundSettings = function() {
    if (!user || viewing) return;
    closeModal('settings-modal');
    openModal('sound-modal');
    updateSoundSliders();
};
window.closeSoundModal = function() { closeModal('sound-modal'); };

// ============ ЗВУК ============
function initAudio() {
    if (!audioCtx) audioCtx = new(window.AudioContext || window.webkitAudioContext)();
}

function playClickSound() {
    if (clickVol === 0) return;
    initAudio();
    try {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(clickFreq, audioCtx.currentTime);
        o.frequency.exponentialRampToValueAtTime(clickFreq * 0.6, audioCtx.currentTime + clickDur / 1000);
        g.gain.setValueAtTime(clickVol / 1200 * 0.25, audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + clickDur / 1000);
        o.start();
        o.stop(audioCtx.currentTime + clickDur / 1000);
    } catch (e) {}
}

function scheduleTone(tm, dur, f) {
    initAudio();
    if (morseVol === 0) return;
    try {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.value = f || morseFreq;
        g.gain.setValueAtTime(0, tm);
        g.gain.linearRampToValueAtTime(morseVol / 1200 * 0.25, tm + 0.01);
        g.gain.setValueAtTime(morseVol / 1200 * 0.25, tm + dur - 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, tm + dur);
        o.start(tm);
        o.stop(tm + dur);
        oscs.push(o);
    } catch (e) {}
}

function stopOscs() {
    oscs.forEach(o => { try { o.stop(); } catch (e) {} });
    oscs = [];
}

function startMusic() {
    if (!musicEl) {
        musicEl = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_2c8d0f1b5e.mp3?filename=lofi-study-112191.mp3');
        musicEl.loop = true;
    }
    musicEl.volume = musicVol / 1200;
    if (musicVol > 0) musicEl.play().catch(() => {});
}
function stopMusic() {
    if (musicEl) musicEl.pause();
}

window.changeMorseFreq = function(v) {
    morseFreq = parseInt(v);
    localStorage.setItem('morse-freq', morseFreq);
    $('morse-freq-val').textContent = morseFreq + 'гц';
};
window.changeMorseVol = function(v) {
    morseVol = parseInt(v);
    localStorage.setItem('morse-vol', morseVol);
    $('morse-vol-val').textContent = morseVol;
};
window.changeClickVol = function(v) {
    clickVol = parseInt(v);
    localStorage.setItem('click-vol', clickVol);
    $('click-vol-val').textContent = clickVol;
};
window.changeClickFreq = function(v) {
    clickFreq = parseInt(v);
    localStorage.setItem('click-freq', clickFreq);
    $('click-freq-val').textContent = clickFreq + 'гц';
};
window.changeClickDur = function(v) {
    clickDur = parseInt(v);
    localStorage.setItem('click-dur', clickDur);
    $('click-dur-val').textContent = clickDur + 'мс';
};
window.changeMusicVol = function(v) {
    musicVol = parseInt(v);
    localStorage.setItem('music-vol', musicVol);
    $('music-vol-val').textContent = musicVol;
    if (musicEl) musicEl.volume = musicVol / 1200;
    if (musicVol === 0) stopMusic();
    else if (musicEl && musicEl.paused) startMusic();
};
window.resetSoundSettings = function() {
    morseFreq = 700; morseVol = 500; clickVol = 400; clickFreq = 900; clickDur = 70; musicVol = 300;
    localStorage.setItem('morse-freq', morseFreq);
    localStorage.setItem('morse-vol', morseVol);
    localStorage.setItem('click-vol', clickVol);
    localStorage.setItem('click-freq', clickFreq);
    localStorage.setItem('click-dur', clickDur);
    localStorage.setItem('music-vol', musicVol);
    updateSoundSliders();
};

function updateSoundSliders() {
    $('morse-freq').value = morseFreq;
    $('morse-freq-val').textContent = morseFreq + 'гц';
    $('morse-vol').value = morseVol;
    $('morse-vol-val').textContent = morseVol;
    $('click-vol').value = clickVol;
    $('click-vol-val').textContent = clickVol;
    $('click-freq').value = clickFreq;
    $('click-freq-val').textContent = clickFreq + 'гц';
    $('click-dur').value = clickDur;
    $('click-dur-val').textContent = clickDur + 'мс';
    $('music-vol').value = musicVol;
    $('music-vol-val').textContent = musicVol;
}

// ============ КЛЮЧ МОРЗЕ ============
function keyListener() {
    const k = $('morse-key');
    if (!k) return;
    k.addEventListener('touchstart', e => { e.preventDefault(); pressStart(); }, { passive: false });
    k.addEventListener('touchend', e => { e.preventDefault(); pressEnd(); }, { passive: false });
    k.addEventListener('touchcancel', e => { e.preventDefault(); pressEnd(); }, { passive: false });
    k.addEventListener('mousedown', pressStart);
    k.addEventListener('mouseup', pressEnd);
    k.addEventListener('mouseleave', pressEnd);
}

function pressStart() {
    pressed = true;
    pressT = Date.now();
    const kb = $('morse-key');
    kb.classList.add('active');
    initAudio();
    if (morseVol === 0) return;
    try {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.frequency.value = morseFreq;
        o.type = 'sine';
        g.gain.setValueAtTime(morseVol / 1200 * 0.25, audioCtx.currentTime);
        o.start();
        window.curOsc = o;
    } catch (e) {}
}

function pressEnd() {
    if (!pressed) return;
    pressed = false;
    const kb = $('morse-key');
    kb.classList.remove('active');
    if (window.curOsc) {
        try { window.curOsc.stop(); } catch (e) {}
        window.curOsc = null;
    }
    const duration = Date.now() - pressT;
    const symbol = duration < 150 ? '.' : '-';
    morseIn += symbol;
    updateKeyDisplay();
    clearTimeout(window.decT);
    window.decT = setTimeout(decodeMorse, 1000);
}

function updateKeyDisplay() {
    $('key-display').textContent = morseIn || t('pressHold');
}

function decodeMorse() {
    const mc = morseIn;
    const targetChar = targetWord[txIdx];
    if (!targetChar) { morseIn = ''; updateKeyDisplay(); return; }
    const tm = MORSE_CODE[targetChar] || MORSE_CODE[targetChar.toUpperCase()];
    if (!tm) { morseIn = ''; updateKeyDisplay(); return; }
    attempts++;
    if (mc === tm) {
        correct++;
        txIdx++;
        updateTxProgress();
        if (txIdx === targetWord.length) {
            const f = $('transmit-feedback');
            f.textContent = t('wordCorrect');
            f.className = 'transmit-feedback success';
            $('target-word').textContent = '—';
            $('target-morse').textContent = '';
            const bonus = shuffle ? Math.round(DIFFICULTIES[diff].exp * 1.35) : DIFFICULTIES[diff].exp;
            addExp(bonus);
            setTimeout(() => {
                f.textContent = '';
                f.className = 'transmit-feedback';
                resetTx();
            }, 2000);
        }
    } else {
        const f = $('transmit-feedback');
        f.textContent = `${t('wordError')} ${targetChar}`;
        f.className = 'transmit-feedback error';
    }
    updateUI();
    save();
    morseIn = '';
    updateKeyDisplay();
}

// ============ ПРАКТИКА ============
window.startTransmitGame = function() {
    if (shuffle && lvlFromExp(exp) < 30) {
        shuffle = false;
        const i = $('mod-shuffle');
        const d = $('mod-shuffle-desc');
        i.style.borderColor = '';
        i.style.color = '';
        i.style.background = '';
        d.style.display = 'none';
    }
    const wordList = WORDS[lang] && WORDS[lang][diff] ? WORDS[lang][diff] : WORDS.ru[diff];
    targetWord = shuffle ? shuffleWord() : wordList[Math.floor(Math.random() * wordList.length)];
    txIdx = 0;
    morseIn = '';
    $('target-word').textContent = targetWord;
    $('target-morse').textContent = targetWord.split('').map(c => 
        MORSE_CODE[c.toUpperCase()] || MORSE_CODE[c] || '?'
    ).join(' ');
    const f = $('transmit-feedback');
    f.textContent = '';
    f.className = 'transmit-feedback';
    updateTxProgress();
    updateKeyDisplay();
};

function shuffleWord() {
    const all = [...RU, ...EN, ...NUM, ...PUNCT];
    const len = diff === 'easy' ? 2 : diff === 'normal' ? 3 : diff === 'hard' ? 5 : diff === 'extreme' ? 7 : 11;
    let result = '';
    for (let i = 0; i < len; i++) {
        let char = all[Math.floor(Math.random() * all.length)];
        while (!isMorseChar(char)) char = all[Math.floor(Math.random() * all.length)];
        result += char;
    }
    return result;
}

function updateTxProgress() {
    const c = $('progress-letters');
    c.innerHTML = '';
    for (let i = 0; i < targetWord.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        if (i < txIdx) {
            slot.classList.add('filled');
            slot.textContent = targetWord[i];
            slot.style.borderColor = 'var(--pc)';
            slot.style.color = 'var(--pc)';
            slot.style.background = 'var(--pb)';
        } else if (i === txIdx) {
            slot.classList.add('current');
            slot.style.borderColor = 'var(--pc)';
        }
        c.appendChild(slot);
    }
}

function resetTx() {
    targetWord = '';
    txIdx = 0;
    morseIn = '';
    $('target-word').textContent = '—';
    $('target-morse').textContent = '';
    const f = $('transmit-feedback');
    f.textContent = '';
    f.className = 'transmit-feedback';
    $('key-display').textContent = t('pressHold');
    $('progress-letters').innerHTML = '';
}

// ============ ОБУЧЕНИЕ ============
window.switchAlphabet = function(tp, btn) {
    curAlpha = tp;
    curLesson = 0;
    document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
    if (btn) btn.classList.add('active');
    updateLesson();
};
window.nextLesson = function() {
    const a = curArray();
    if (curLesson < a.length - 1) { curLesson++; updateLesson(); }
};
window.prevLesson = function() {
    if (curLesson > 0) { curLesson--; updateLesson(); }
};
window.playCurrentLesson = function() { playChar(curArray()[curLesson]); };

function curArray() {
    switch (curAlpha) {
        case 'ru': return RU;
        case 'en': return EN;
        case 'numbers': return NUM;
        case 'punct': return PUNCT;
        default: return RU;
    }
}

function updateLesson() {
    const a = curArray();
    if (!a || a.length === 0) return;
    const c = a[curLesson];
    if (!c) return;
    $('current-letter').textContent = c;
    $('current-morse').textContent = MORSE_CODE[c] || '';
    $('lesson-counter').textContent = `${curLesson + 1}/${a.length}`;
    const v = $('lesson-visual');
    v.innerHTML = '';
    const m = MORSE_CODE[c] || '';
    for (const s of m) {
        const d = document.createElement('div');
        d.className = s === '.' ? 'morse-dot' : 'morse-dash';
        v.appendChild(d);
    }
}

function playChar(c) {
    stopOscs();
    initAudio();
    const m = MORSE_CODE[c.toUpperCase()] || MORSE_CODE[c];
    if (!m) return;
    const n = audioCtx.currentTime;
    let tm = n;
    for (let i = 0; i < m.length; i++) {
        if (m[i] === '.') { scheduleTone(tm, 0.1, morseFreq); tm += 0.18; }
        else if (m[i] === '-') { scheduleTone(tm, 0.28, morseFreq); tm += 0.36; }
        if (i < m.length - 1) tm += 0.08;
    }
}

// ============ СЛОЖНОСТЬ ============
window.cycleDifficulty = function() {
    const d = Object.keys(DIFFICULTIES);
    const i = d.indexOf(diff);
    diff = d[(i + 1) % d.length];
    updateDiffBtn();
    resetTx();
};

function updateDiffBtn() {
    const b = $('difficulty-btn');
    const d = DIFFICULTIES[diff];
    b.textContent = lang === 'ru' ? d.name : d.nameEn;
    b.style.borderColor = 'var(--pc)';
    b.style.color = 'var(--pc)';
    b.style.background = 'var(--pb)';
}

// ============ МОДИФИКАТОРЫ ============
window.openModifiersModal = function() {
    if (lvlFromExp(exp) < 30) { openModal('modifier-locked-modal'); return; }
    openModal('modifiers-modal');
};
window.toggleShuffleModifier = function() {
    if (lvlFromExp(exp) < 30) return;
    shuffle = !shuffle;
    const i = $('mod-shuffle');
    const d = $('mod-shuffle-desc');
    if (shuffle) {
        i.style.borderColor = '#3fb950';
        i.style.color = '#3fb950';
        i.style.background = 'rgba(63,185,80,0.15)';
        d.style.display = 'block';
    } else {
        i.style.borderColor = '';
        i.style.color = '';
        i.style.background = '';
        d.style.display = 'none';
    }
    resetTx();
};

// ============ ТИТУЛЫ ============
window.openTitlesModal = function() {
    if (viewing) return;
    closeModal('cosmetics-modal');
    openModal('titles-modal');
    renderTitles();
};
window.openCosmeticsModal = function() {
    if (viewing) return;
    openModal('cosmetics-modal');
};

function renderTitles() {
    const list = $('titles-list');
    const next = $('next-title');
    list.innerHTML = '';
    const available = ALL_TITLES.filter(x => {
        if (x.count !== undefined) return particlesCaught >= x.count;
        return lvlFromExp(exp) >= x.level;
    });
    available.forEach(tt => {
        const d = document.createElement('div');
        d.className = 'title-item';
        d.style.color = tt.color;
        d.style.borderColor = tt.color;
        d.innerHTML = `
            <div style="font-weight:700">${lang === 'ru' ? tt.name : tt.nameEn}</div>
            <div style="font-size:.35rem;color:var(--dim);margin-top:.3rem">${lang === 'ru' ? tt.desc : tt.descEn}</div>
        `;
        d.onclick = () => selectTitle(tt.name);
        if (title === tt.name || title === tt.nameEn) {
            d.style.background = tt.color + '20';
            d.style.boxShadow = `0 0 15px ${tt.color}4D`;
        }
        list.appendChild(d);
    });
    const nextTitle = ALL_TITLES.find(x => {
        if (x.count !== undefined) return particlesCaught < x.count;
        return lvlFromExp(exp) < x.level;
    });
    if (nextTitle) {
        next.innerHTML = `
            <div style="border:1px solid ${nextTitle.color};border-radius:8px;padding:.8rem;box-shadow:0 0 15px ${nextTitle.color}4D">
                <div style="font-weight:700;color:${nextTitle.color}">${t('nextTitle')}: ${lang === 'ru' ? nextTitle.name : nextTitle.nameEn}</div>
                <div style="font-size:.35rem;color:var(--dim);margin-top:.3rem">${lang === 'ru' ? nextTitle.desc : nextTitle.descEn}</div>
            </div>
        `;
    } else {
        next.textContent = t('allTitles');
        next.style.color = '#fff';
    }
}

function selectTitle(nm) {
    title = nm;
    if (user && !viewing) {
        user.title = nm;
        localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
        localStorage.setItem('morse-user', JSON.stringify(user));
        savePlayerToCloud(user.username, user);
    }
    closeModal('titles-modal');
    updateTitle();
    updateUI();
}

function checkAutoTitle() {
    if (!user || viewing || autoTitle) return;
    const level = lvlFromExp(exp);
    if (level >= 5) {
        const tt = TITLES.find(x => x.level === 5);
        if (tt) {
            title = tt.name;
            user.title = tt.name;
            user.autoTitle = true;
            autoTitle = true;
            localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
            localStorage.setItem('morse-user', JSON.stringify(user));
            savePlayerToCloud(user.username, user);
            updateTitle();
            updateUI();
            scheduleTitle(tt);
        }
    }
}

// ============ АНИМАЦИИ С СУММИРОВАНИЕМ ============
function showAnimation(element, value, timerRef, callback) {
    if (timerRef) clearTimeout(timerRef);
    element.textContent = value;
    element.classList.remove('show', 'hide');
    void element.offsetWidth;
    element.classList.add('show');
    const newTimer = setTimeout(() => {
        element.classList.remove('show');
        element.classList.add('hide');
        if (callback) callback();
    }, 2500);
    return newTimer;
}

function scheduleParticle(count) {
    particleValue += count;
    const el = $('particle-animation');
    if (particleTimer) clearTimeout(particleTimer);
    particleTimer = setTimeout(() => {
        particleTimer = showAnimation(el, `+${particleValue} частиц${particleValue > 1 ? 'ы' : 'а'}`, particleTimer, () => {
            particleValue = 0;
            particleTimer = null;
        });
    }, 200);
}

function scheduleExp(amount) {
    expValue += amount;
    const el = $('exp-animation');
    if (expTimer) clearTimeout(expTimer);
    expTimer = setTimeout(() => {
        expTimer = showAnimation(el, `+${expValue} EXP`, expTimer, () => {
            expValue = 0;
            expTimer = null;
        });
    }, 200);
}

function scheduleLevel(level) {
    levelValue = level;
    const el = $('rank-animation');
    const col = lvlColor(level);
    el.style.color = col;
    el.style.textShadow = `0 0 30px ${col}`;
    if (levelTimer) clearTimeout(levelTimer);
    levelTimer = setTimeout(() => {
        levelTimer = showAnimation(el, `LVL${levelValue}`, levelTimer, () => {
            levelValue = null;
            levelTimer = null;
        });
    }, 200);
}

function scheduleTitle(tt) {
    titleValue = tt;
    const el = $('title-animation');
    el.innerHTML = `<div class="title-anim-name" style="color:${tt.color};text-shadow:0 0 30px ${tt.color}">${lang === 'ru' ? tt.name : tt.nameEn}</div>`;
    if (titleTimer) clearTimeout(titleTimer);
    titleTimer = setTimeout(() => {
        titleTimer = showAnimation(el, '', titleTimer, () => {
            titleValue = null;
            titleTimer = null;
        });
    }, 200);
}

// ============ ОБНОВЛЕНИЕ СТАТИСТИКИ ЧАСТИЦ ============
function updateParticlesCaught() {
    const e = $('profile-particles-caught');
    if (!e) return;
    e.textContent = particlesCaught || 0;
}

// ============ ЛОВЛЯ ЧАСТИЦЫ (10 EXP, возобновление из-под футера) ============
function catchParticle(event, el) {
    if (el.classList.contains('caught')) return;
    el.classList.add('caught');
    el.style.animation = 'none';
    
    playClickSound();
    
    particlesCaught++;
    updateParticlesCaught();
    
    if (user) {
        user.particlesCaught = particlesCaught;
        localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
        localStorage.setItem('morse-user', JSON.stringify(user));
        savePlayerToCloud(user.username, user);
    }
    const ct = CATCHER_TITLES.find(x => x.count === particlesCaught);
    if (ct) {
        title = ct.name;
        if (user) {
            user.title = ct.name;
            localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
            localStorage.setItem('morse-user', JSON.stringify(user));
            savePlayerToCloud(user.username, user);
        }
        scheduleTitle(ct);
    }
    scheduleParticle(1);
    addExp(10);
    
    const cx = event.clientX;
    const cy = event.clientY;
    const color = getComputedStyle(el).background || '#58a6ff';
    
    const count = 10;
    const pixels = [];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'pixel';
        const size = 2 + Math.random() * 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.background = color;
        p.style.boxShadow = '0 0 4px ' + color;
        document.body.appendChild(p);
        pixels.push(p);
        const angle = Math.random() * 2 * Math.PI;
        const dist = 30 + Math.random() * 60;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 20;
        requestAnimationFrame(() => {
            p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
            p.style.opacity = '0';
            p.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        });
    }
    
    setTimeout(() => {
        pixels.forEach(p => p.remove());
        el.remove();
        const idx = particleElements.indexOf(el);
        if (idx > -1) particleElements.splice(idx, 1);
        const container = $('particles-container');
        if (container && $('page-home').classList.contains('active')) {
            createParticle(container);
        }
    }, 700);
    
    updateUI();
    save();
}

// ============ ЧАСТИЦЫ (огромный разброс времени) ============
function initParticles() {
    const container = $('particles-container');
    if (!container) return;
    particleElements.forEach(p => p.remove());
    particleElements = [];
    
    requestAnimationFrame(() => {
        for (let i = 0; i < 13; i++) {
            createParticle(container);
        }
    });
    
    clearInterval(particleInterval);
    particleInterval = setInterval(() => {
        if (!$('page-home').classList.contains('active')) return;
        const active = particleElements.filter(p => p.parentNode).length;
        if (active < 13) {
            createParticle(container);
        }
    }, 4000);
}

function createParticle(container) {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const footerRect = footer.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const footerBottom = footerRect.bottom - containerRect.top;
    
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 1 + Math.random() * 1.5;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = footerBottom + 'px';
    
    const opacityOffset = Math.random() * 0.4;
    p.style.setProperty('--opacity-offset', opacityOffset);
    
    const dir = Math.random() > 0.5 ? 1 : -1;
    p.style.setProperty('--dir', dir);
    
    p.style.boxShadow = `0 0 ${size * 3}px var(--pc), 0 0 ${size * 6}px rgba(88,166,255,0.3)`;
    
    p.addEventListener('click', (e) => catchParticle(e, p), { passive: true });
    container.appendChild(p);
    particleElements.push(p);
    
    // Огромный разброс времени появления (100ms - 5000ms)
    const spawnDelay = 100 + Math.random() * 4900;
    // Огромный разброс времени полёта (300ms - 3000ms)
    const flyDelay = 300 + Math.random() * 2700;
    
    setTimeout(() => {
        p.classList.add('spawn');
        setTimeout(() => {
            if (!p.classList.contains('caught')) {
                p.classList.add('flying');
            }
        }, flyDelay);
    }, spawnDelay);
    
    p.addEventListener('animationend', () => {
        if (!p.classList.contains('caught') && p.classList.contains('flying')) {
            p.remove();
            const idx = particleElements.indexOf(p);
            if (idx > -1) particleElements.splice(idx, 1);
            if ($('page-home').classList.contains('active')) {
                createParticle(container);
            }
        }
    }, { passive: true });
}

function stopParticles() {
    clearInterval(particleInterval);
    particleElements.forEach(p => p.remove());
    particleElements = [];
}

// ============ ЯЗЫК ============
window.toggleLanguage = function() {
    lang = lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('morse-lang', lang);
    applyLanguage();
    updateProfile();
    updateUI();
    if ($('page-practice').classList.contains('active')) resetTx();
};

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.dataset.i18n;
        if (t(k)) {
            if (el.tagName === 'INPUT') el.placeholder = t(k);
            else el.textContent = t(k);
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const k = el.dataset.i18nPlaceholder;
        if (t(k)) el.placeholder = t(k);
    });
    updateDiffBtn();
    document.querySelectorAll('.lang-toggle').forEach(b => {
        b.textContent = lang === 'ru' ? 'Language: ENG' : 'Язык: РУ';
    });
    const ft = $('footer-text');
    if (ft) ft.textContent = t('footer');
    const lm = $('lock-msg');
    if (lm) lm.textContent = t('lockMsg');
    const mlm = $('modifier-lock-msg');
    if (mlm) mlm.textContent = t('modLockMsg');
}

// ============ НАВИГАЦИЯ ============
window.showPage = function(page) {
    document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
    const target = $(`page-${page}`);
    if (target) target.classList.add('active');
    window.scrollTo(0, 0);
    if (page === 'profile') ownProfile();
    if (page === 'leaderboard') {
        if (lvlFromExp(exp) < 20) {
            $('leaderboard-locked').style.display = 'block';
            $('leaderboard-content').style.display = 'none';
        } else {
            $('leaderboard-locked').style.display = 'none';
            $('leaderboard-content').style.display = 'block';
            lbTab = 'level';
            document.querySelectorAll('.leaderboard-tab').forEach(b => b.classList.remove('active'));
            const firstTab = document.querySelector('.leaderboard-tab');
            if (firstTab) firstTab.classList.add('active');
            updateLeaderboard();
        }
    }
    updateBottomNav(page);
    if (page === 'home') {
        initParticles();
    } else {
        stopParticles();
    }
};

function updateBottomNav(page) {
    const nav = $('bottom-nav');
    if (!nav) return;
    nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    const active = nav.querySelector(`a[data-page="${page}"]`);
    if (active) active.classList.add('active');
}

// ============ СОХРАНЕНИЕ ============
function save() {
    clearTimeout(saveT);
    saveT = setTimeout(() => {
        if (!user || viewing) return;
        user.exp = exp;
        user.attempts = attempts;
        user.correct = correct;
        user.sessionTime = Date.now() - sessStart;
        user.particlesCaught = particlesCaught;
        localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
        localStorage.setItem('morse-user', JSON.stringify(user));
        savePlayerToCloud(user.username, user);
        cache = null;
    }, 500);
}

function startSessionTimer() {
    sessStart = Date.now() - (user?.sessionTime || 0);
    clearInterval(sessInt);
    clearInterval(saveIntervalId);
    sessInt = setInterval(() => {
        if (user && !viewing) {
            const currentTime = Date.now() - sessStart;
            user.sessionTime = currentTime;
            localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
            localStorage.setItem('morse-user', JSON.stringify(user));
        }
        updateSessionTime();
    }, 1000);
    saveIntervalId = setInterval(() => {
        if (user && !viewing) {
            user.sessionTime = Date.now() - sessStart;
            localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
            localStorage.setItem('morse-user', JSON.stringify(user));
            savePlayerToCloud(user.username, user);
        }
    }, SAVE_INTERVAL);
}

// ============ ПРОФИЛЬ ============
function updateProfile() {
    if (!user) return;
    $('profile-username').textContent = user.username;
    $('profile-created').textContent = user.createdAt ? fmtDate(user.createdAt) : '—';
    document.querySelector('.profile-actions').style.display = viewing ? 'none' : 'flex';
    updateSessionTime();
    updateTitle();
    updateLevel();
    updateParticlesCaught();
}

function updateTitle() {
    const e = $('profile-title');
    if (!e) return;
    if (title) {
        const tt = ALL_TITLES.find(x => x.name === title || x.nameEn === title);
        if (tt) {
            e.textContent = lang === 'ru' ? tt.name : tt.nameEn;
            e.style.color = tt.color;
            e.style.display = 'inline';
        }
    } else {
        e.textContent = '';
        e.style.display = 'none';
    }
}

function updateLevel() {
    const e = $('profile-level');
    if (!e) return;
    const l = lvlFromExp(exp);
    e.textContent = `LVL${l}`;
    e.style.color = lvlColor(l);
}

function updateSessionTime() {
    const e = $('profile-session-time');
    if (e && user) e.textContent = fmtTime(user.sessionTime || 0);
}

function updateUI() {
    if (viewing) return;
    const l = lvlFromExp(exp);
    const nl = l + 1;
    const expForLvlCur = expForLvl(l);
    const expForLvlNext = expForLvl(nl);
    const efn = expForLvlNext - expForLvlCur;
    const pf = $('progress-fill');
    const pil = exp - expForLvlCur;
    const pct = efn > 0 ? Math.min((pil / efn) * 100, 100) : 100;
    pf.style.width = pct + '%';
    const levelColor = lvlColor(l);
    pf.style.background = levelColor;
    $('exp-current').textContent = exp;
    $('exp-needed').textContent = Math.round(expForLvlNext);
    $('accuracy').textContent = attempts > 0 ? Math.min(100, Math.round((correct / attempts) * 100)) + '%' : '0%';
    updateSessionTime();
    updateTitle();
    updateLevel();
    updateParticlesCaught();
}

function ownProfile() {
    viewing = null;
    if (!user) return;
    document.querySelector('.profile-actions').style.display = 'flex';
    updateProfile();
    updateUI();
}

// ============ ОПЫТ ============
function addExp(amount) {
    const oldLevel = lvlFromExp(exp);
    exp += amount;
    scheduleExp(amount);
    const newLevel = lvlFromExp(exp);
    if (newLevel > oldLevel) {
        scheduleLevel(newLevel);
        checkAutoTitle();
    }
    updateUI();
    save();
}

// ============ ТАБЛИЦА ЛИДЕРОВ ============
window.switchLeaderboardTab = function(tab, btn) {
    lbTab = tab;
    document.querySelectorAll('.leaderboard-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    updateLeaderboard();
};

async function updateLeaderboard() {
    const list = $('leaderboard-list');
    if (!list) return;
    list.innerHTML = `<div style="text-align:center;color:var(--dim);padding:2rem">${t('loading')}</div>`;
    const players = await loadAllPlayers();
    const filtered = players.filter(p => lvlFromExp(p.exp || 0) >= 20);
    if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align:center;color:var(--dim);padding:2rem">${t('noPlayers')}</div>`;
        return;
    }
    filtered.sort((a, b) => lbTab === 'level' ? (b.exp || 0) - (a.exp || 0) : (b.sessionTime || 0) - (a.sessionTime || 0));
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();
    filtered.slice(0, 100).forEach((u, i) => {
        const d = document.createElement('div');
        d.className = 'leaderboard-item';
        if (user && u.username === user.username) d.classList.add('current-user');
        const av = document.createElement('span');
        av.className = 'leaderboard-avatar';
        av.textContent = '👤';
        const rank = document.createElement('span');
        rank.className = 'leaderboard-rank';
        rank.textContent = `#${i + 1}`;
        const name = document.createElement('span');
        name.className = 'leaderboard-name';
        name.textContent = u.username;
        const titleSpan = document.createElement('span');
        titleSpan.className = 'leaderboard-title';
        if (u.title) {
            const to = ALL_TITLES.find(x => x.name === u.title || x.nameEn === u.title);
            if (to) {
                titleSpan.textContent = lang === 'ru' ? to.name : to.nameEn;
                titleSpan.style.color = to.color;
            }
        }
        const level = lvlFromExp(u.exp || 0);
        const levelSpan = document.createElement('span');
        levelSpan.className = 'leaderboard-level';
        levelSpan.style.color = lvlColor(level);
        levelSpan.textContent = `LVL${level}`;
        d.append(av, rank, name, titleSpan, levelSpan);
        if (lbTab === 'time') {
            const timeSpan = document.createElement('span');
            timeSpan.className = 'leaderboard-time';
            timeSpan.textContent = fmtTime(u.sessionTime || 0);
            d.appendChild(timeSpan);
        }
        fragment.appendChild(d);
    });
    list.appendChild(fragment);
}

// ============ ЗАПУСК ============
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage();
    auth();
    keyListener();
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('click', playClickSound);
    });
    switchAlphabet('ru', document.querySelector('.tab-btn'));
    setTimeout(() => updateLesson(), 100);
    updateDiffBtn();
    document.addEventListener('click', e => {
        const nav = $('mobile-nav');
        if (nav && nav.classList.contains('active') && 
            !e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
        }
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && user) {
            user.sessionTime = Date.now() - sessStart;
            localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
            localStorage.setItem('morse-user', JSON.stringify(user));
            savePlayerToCloud(user.username, user);
        }
    });
    window.addEventListener('beforeunload', () => {
        if (user) {
            user.sessionTime = Date.now() - sessStart;
            localStorage.setItem(`user-${user.username}`, JSON.stringify(user));
            localStorage.setItem('morse-user', JSON.stringify(user));
        }
    });
    if ($('page-home').classList.contains('active')) initParticles();
    
    ['morse-freq', 'morse-vol', 'click-vol', 'click-freq', 'click-dur', 'music-vol'].forEach(id => {
        const el = $(id);
        if (el) {
            el.addEventListener('input', function() {
                const handler = window[`change${id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`];
                if (handler) handler(this.value);
            });
        }
    });
});

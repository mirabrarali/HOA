const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('[data-view]');
function showView(id) {
  views.forEach(view => view.classList.toggle('active', view.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('.topbar').style.color = id === 'home' ? '#f2ede4' : '#17110d';
}
navItems.forEach(item => item.addEventListener('click', event => { event.preventDefault(); showView(item.dataset.view); history.replaceState(null, '', `#${item.dataset.view}`); }));
showView(location.hash.slice(1) || 'home');

const menuData = {
  european: { kicker: 'THE DINING ROOM · BLOCK A', title: 'European & Middle Eastern', dishes: [['Saffron lobster risotto', '₹ 2,450'], ['Silken hummus, warm pita & za’atar', '₹ 890'], ['Truffle tagliolini, aged parmesan', '₹ 1,850'], ['Rose & pistachio mille-feuille', '₹ 720']] },
  hyderabadi: { kicker: 'THE KITCHEN ARENA · BLOCK B', title: 'Hyderabadi Heritage', dishes: [['24-hour kacchi biryani', '₹ 1,650'], ['Nizami shahi marag', '₹ 980'], ['Dum pukht haleem', '₹ 1,200'], ['Double ka meetha, saffron cream', '₹ 680']] },
  cafe: { kicker: 'THE SALON · BLOCK B', title: 'Americano & Coffee', dishes: [['House americano', '₹ 320'], ['Cardamom cloud cappuccino', '₹ 450'], ['Single-origin pour over', '₹ 520'], ['Sea salt chocolate cookie', '₹ 280'], ['Pistachio rose sablé', '₹ 320']] }
};
const modal = document.querySelector('.menu-modal');
const openModal = key => { const data = menuData[key]; document.querySelector('.modal-kicker').textContent = data.kicker; document.querySelector('.modal-title').textContent = data.title; document.querySelector('.dish-list').innerHTML = data.dishes.map(([name, price]) => `<div class="dish"><span>${name}</span><small>${price}</small></div>`).join(''); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); };
document.querySelectorAll('[data-menu]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.menu)));
document.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', event => { if (event.target === modal) modal.classList.remove('open'); });

const tracks = [['My Funny Valentine', 'Chet Baker · Chet Baker Sings'], ['At Last', 'Etta James · At Last!'], ['Moondance', 'Van Morrison · Moondance'], ['What a Wonderful World', 'Louis Armstrong · What a Wonderful World']];
let trackIndex = 0; let playing = false; let progress = 25;
const updateTrack = () => { document.querySelector('#track-name').textContent = tracks[trackIndex][0]; document.querySelector('#track-artist').textContent = tracks[trackIndex][1]; document.querySelector('#progress-bar').style.width = `${progress}%`; };
const togglePlay = () => { playing = !playing; document.querySelector('.vinyl').classList.toggle('playing', playing); document.querySelector('#play-track').textContent = playing ? 'Ⅱ' : '▶'; };
document.querySelector('#play-track').addEventListener('click', togglePlay);
document.querySelector('#next-track').addEventListener('click', () => { trackIndex = (trackIndex + 1) % tracks.length; progress = 12; updateTrack(); });
document.querySelector('#prev-track').addEventListener('click', () => { trackIndex = (trackIndex + tracks.length - 1) % tracks.length; progress = 12; updateTrack(); });
setInterval(() => { if (playing) { progress = progress >= 100 ? 0 : progress + 1; updateTrack(); } }, 800);

const gate = document.querySelector('#finance-gate'); const ledger = document.querySelector('#ledger');
document.querySelector('#passcode-form').addEventListener('submit', event => { event.preventDefault(); if (document.querySelector('#passcode').value === '0221') { gate.classList.add('hidden'); ledger.classList.remove('hidden'); } else { document.querySelector('#passcode-error').textContent = 'That code does not open this ledger.'; } });
document.querySelector('#lock-ledger').addEventListener('click', () => { ledger.classList.add('hidden'); gate.classList.remove('hidden'); document.querySelector('#passcode').value = ''; });

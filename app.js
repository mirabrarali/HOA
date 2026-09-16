const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('[data-view]');
const menuToggle = document.querySelector('.menu-toggle');
function showView(id) {
  views.forEach(view => view.classList.toggle('active', view.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('.topbar').style.color = id === 'home' ? '#f2ede4' : '#17110d';
}
navItems.forEach(item => item.addEventListener('click', event => { event.preventDefault(); showView(item.dataset.view); history.replaceState(null, '', `#${item.dataset.view}`); }));
showView(location.hash.slice(1) || 'home');
menuToggle.addEventListener('click', () => document.querySelector('.nav').classList.toggle('open'));

const menuData = {
  european: { kicker: 'THE DINING ROOM · BLOCK A', title: 'European & Middle Eastern', dishes: ['Saffron lobster risotto', 'Silken hummus, warm pita & za’atar', 'Truffle tagliolini, aged parmesan', 'Rose & pistachio mille-feuille', 'Burrata, heirloom tomato & basil oil', 'Charcoal grilled sea bass, preserved lemon', 'Beef tenderloin, green peppercorn jus', 'Lebanese mezze royale', 'Pistachio baklava, orange blossom cream'] },
  hyderabadi: { kicker: 'THE KITCHEN ARENA · BLOCK B', title: 'Hyderabadi Heritage', dishes: ['24-hour kacchi biryani', 'Nizami shahi marag', 'Dum pukht haleem', 'Double ka meetha, saffron cream', 'Pathar ka gosht', 'Mirchi ka salan', 'Bheja fry, mint and coriander', 'Khatti dal, ghee tempering', 'Qubani ka meetha', 'Osmania biscuit tea service'] },
  cafe: { kicker: 'THE SALON · BLOCK B', title: 'Americano & Coffee', dishes: ['House americano', 'Cardamom cloud cappuccino', 'Single-origin pour over', 'Velvet flat white', 'Rose pistachio latte', 'Iced saffron coffee', 'Sea salt chocolate cookie', 'Pistachio rose sable', 'Orange blossom madeleine', 'Almond croissant', 'Dark chocolate opera cake'] }
};
const modal = document.querySelector('.menu-modal');
const openModal = key => { const data = menuData[key]; document.querySelector('.modal-kicker').textContent = data.kicker; document.querySelector('.modal-title').textContent = data.title; document.querySelector('.dish-list').innerHTML = data.dishes.map(name => `<div class="dish"><span>${name}</span></div>`).join(''); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); };
document.querySelectorAll('[data-menu]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.menu)));
document.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', event => { if (event.target === modal) modal.classList.remove('open'); });

const tracks = [['My Funny Valentine', 'Chet Baker · Chet Baker Sings'], ['At Last', 'Etta James · At Last!'], ['Moondance', 'Van Morrison · Moondance'], ['What a Wonderful World', 'Louis Armstrong · What a Wonderful World']];
const audio = document.querySelector('#hoa-audio');
let trackIndex = 0; let playing = false; let progress = 25;
const updateTrack = () => { document.querySelector('#track-name').textContent = tracks[trackIndex][0]; document.querySelector('#track-artist').textContent = tracks[trackIndex][1]; document.querySelector('#progress-bar').style.width = `${progress}%`; };
const togglePlay = async () => { if (audio.paused) { try { await audio.play(); playing = true; } catch (error) { document.querySelector('.music-note').textContent = 'Tap play again to start the station.'; return; } } else { audio.pause(); playing = false; } document.querySelector('.vinyl').classList.toggle('playing', playing); document.querySelector('#play-track').textContent = playing ? 'Ⅱ' : '▶'; document.querySelector('.music-note').textContent = playing ? 'Now playing throughout the house.' : 'Tap play to continue the station.'; };
document.querySelector('#play-track').addEventListener('click', togglePlay);
const changeTrack = direction => { trackIndex = (trackIndex + direction + tracks.length) % tracks.length; audio.currentTime = 0; progress = 0; updateTrack(); if (playing) audio.play().catch(() => {}); };
document.querySelector('#next-track').addEventListener('click', () => changeTrack(1));
document.querySelector('#prev-track').addEventListener('click', () => changeTrack(-1));
audio.addEventListener('timeupdate', () => { progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : progress; updateTrack(); });
audio.addEventListener('ended', () => changeTrack(1));

const gate = document.querySelector('#finance-gate'); const ledger = document.querySelector('#ledger');
const renderLedger = () => { const today = new Date(); const dateLabel = today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); const daySeed = today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate(); const records = [['Salon floral installation', 'B'], ['Seasonal produce & pantry', 'A'], ['Kitchen Arena staffing', 'B'], ['Guest suite amenities', 'C'], ['House orchestra retainer', 'A'], ['Tea salon service', 'B']].map(([allocation, block], index) => { const amount = 84000 + ((daySeed * (index + 7) * 17) % 460000); return { allocation, block, amount: Math.round(amount / 10) * 10 }; }); const total = records.reduce((sum, record) => sum + record.amount, 0); document.querySelector('#ledger-date').textContent = dateLabel.toUpperCase(); document.querySelector('#ledger-total').textContent = `₹ ${total.toLocaleString('en-IN')}`; document.querySelector('#ledger-rows').innerHTML = records.map(record => `<div class="ledger-row"><span>Today</span><span>${record.allocation}</span><span>${record.block}</span><b>₹ ${record.amount.toLocaleString('en-IN')}</b></div>`).join(''); };
document.querySelector('#passcode-form').addEventListener('submit', event => { event.preventDefault(); if (document.querySelector('#passcode').value === '0221') { renderLedger(); gate.classList.add('hidden'); ledger.classList.remove('hidden'); } else { document.querySelector('#passcode-error').textContent = 'That code does not open this ledger.'; } });
document.querySelector('#lock-ledger').addEventListener('click', () => { ledger.classList.add('hidden'); gate.classList.remove('hidden'); document.querySelector('#passcode').value = ''; });

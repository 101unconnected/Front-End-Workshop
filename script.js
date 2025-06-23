const toggle = document.getElementById('toggle-darkmode');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const cards = document.querySelectorAll('.card');

function filterCards() {
  const query = searchInput.value.toLowerCase();
  const selectedLevel = filterSelect.value;

  cards.forEach(card => {
    const name = card.getAttribute('data-name');
    const level = card.getAttribute('data-level');

    const matchName = name.includes(query);
    const matchLevel = selectedLevel === 'all' || level === selectedLevel;

    if (matchName && matchLevel) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterCards);
filterSelect.addEventListener('change', filterCards);

cards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h2')?.innerText;
    const image = card.querySelector('img')?.src;
    const detail = card.getAttribute('data-detail');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    modal.innerHTML = `
      <h2>${title}</h2>
      <img src="${image}" alt="${title}" style="width:100%; border-radius:8px; margin-bottom:15px;">
      <p>${detail}</p>
      <button class="close-btn">Tutup</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector('.close-btn').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.remove();
    });
  });
});

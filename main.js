fetch('node.php?name=batman') // ejemplo: buscar Batman
  .then(res => res.json())
  .then(data => {
    console.log(data); // aquí tienes todos los datos del héroe
    const contenedor = document.querySelector('.grid');
    contenedor.innerHTML = '';

    const heroes = data.results || [data]; // si search devuelve varios, si no solo uno

    heroes.forEach(hero => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${hero.image.url}" alt="${hero.name}">
        <h3>${hero.name}</h3>
        <p>Power: ${hero.powerstats.power}</p>
        <p>Speed: ${hero.powerstats.speed}</p>
      `;
      contenedor.appendChild(card);
    });
  })
  .catch(err => console.error(err));

// === Battle action button logic: animation + toast feedback ===
function showActionToast(text) {
  const toast = document.getElementById('actionToast');
  if (!toast) return;
  toast.textContent = text;
  toast.hidden = false;
  // trigger show class
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toast._hideTimeout = setTimeout(() => toast.hidden = true, 180);
  }, 1200);
}

function bindActionButtons() {
  const mapping = [
    { id: 'btnAttack', label: 'Atacas con fuerza 🚩' },
    { id: 'btnDefend', label: 'Te proteges con un escudo 🛡️' },
    { id: 'btnSkill',  label: 'Usas una habilidad especial ✨' }
  ];

  mapping.forEach(entry => {
    const el = document.getElementById(entry.id);
    if (!el) return;
    el.addEventListener('click', () => {
      // small visual pulse
      el.classList.add('pulse');
      el.setAttribute('aria-pressed', 'true');
      showActionToast(entry.label);
      // remove pulse shortly after
      setTimeout(() => {
        el.classList.remove('pulse');
        el.setAttribute('aria-pressed', 'false');
      }, 700);
    });
    // allow Enter/Space to activate
    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        el.click();
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindActionButtons);
} else {
  bindActionButtons();
}


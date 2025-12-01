// Helper: show search results (clears existing cards)
function renderHeroes(data) {
  const contenedor = document.querySelector('.grid') || document.getElementById('resultsGrid');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  const heroes = data.results || [data]; // si la búsqueda devuelve varios resultados o solo uno

  heroes.forEach(hero => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${hero.image?.url || ''}" alt="${hero.name || 'Sin nombre'}">
      <h3>${hero.name || 'Desconocido'}</h3>
      <p>Power: ${hero.powerstats?.power ?? 'N/A'}</p>
      <p>Speed: ${hero.powerstats?.speed ?? 'N/A'}</p>
    `;
    contenedor.appendChild(card);
  });
}

// Perform a search request and give user feedback via toast messages
function performSearch(query) {
  if (!query || !query.trim()) {
    showActionToast('Introduce un nombre o ID válido para buscar.');
    return;
  }

  showActionToast(`Buscando "${query}"...`);

  fetch(`node.php?name=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (!data) {
        showActionToast('No se han encontrado resultados.');
        return;
      }

      // Si la API devuelve una respuesta con error
      if (data.error) {
        showActionToast(`Error: ${data.error}`);
        return;
      }

      // Muestra resultados en pantalla y notifica al usuario
      renderHeroes(data);
      const nameOrCount = data.results ? `${data.results.length} resultado(s)` : (data.name || '1 resultado');
      showActionToast(`Resultados: ${nameOrCount}`);
    })
    .catch(err => {
      console.error(err);
      showActionToast('Ocurrió un error al buscar. Revisa la consola.');
    });
}

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

// === Search UI binding ===
function bindSearchUI() {
  const input = document.getElementById('heroInput');
  const btn = document.getElementById('searchBtn');
  if (!btn || !input) return;

  // Click to search
  btn.addEventListener('click', () => {
    performSearch(input.value);
  });

  // Allow Enter to trigger search
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      btn.click();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bindActionButtons();
    bindSearchUI();
  });
} else {
  bindActionButtons();
  bindSearchUI();
}


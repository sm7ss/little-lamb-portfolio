const navItems = document.querySelectorAll('.nav-item');
const mainCanvas = document.getElementById('main-canvas');

const sections = {
  inicio: {
    boxClass: 'box-inicio',
    title: 'Inicio 🐑',
    desc: 'Caja de prueba para la vista principal. Aquí irá tu bienvenida y resumen.'
  },
  proyectos: {
    boxClass: 'box-proyectos',
    title: 'Proyectos 📊',
    desc: 'Caja de prueba para tus pipelines y proyectos de datos.'
  },
  stack: {
    boxClass: 'box-stack',
    title: 'Stack 🛠️',
    desc: 'Caja de prueba para herramientas, lenguajes y arquitectura.'
  },
  personal: {
    boxClass: 'box-personal',
    title: 'Personal 🎀',
    desc: 'Caja de prueba para tu sección más cozy / ilustrada.'
  },
  contacto: {
    boxClass: 'box-contacto',
    title: 'Contacto ✉️',
    desc: 'Caja de prueba para enlaces, redes y contacto.'
  }
};

function renderSection(sectionKey) {
  const data = sections[sectionKey] || sections.inicio;
  mainCanvas.innerHTML = `
    <div class="section-box ${data.boxClass}">
      <h1 class="section-title">${data.title}</h1>
      <p class="section-desc">${data.desc}</p>
    </div>
  `;
}

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((btn) => btn.classList.remove('active'));
    item.classList.add('active');

    const sectionKey = item.dataset.section;
    renderSection(sectionKey);
  });
});

async function loadSectionHTML(sectionKey) {
  const response = await fetch(`sections/${sectionKey}.html`);
  if (!response.ok) {
    throw new Error(`No se pudo cargar sections/${sectionKey}.html`);
  }
  return await response.text();
}

async function renderSection(sectionKey) {
  try {
    mainCanvas.innerHTML = await loadSectionHTML(sectionKey);
  } catch (err) {
    mainCanvas.innerHTML = `<p>Error cargando ${sectionKey}.</p>`;
  }
}

// Renderiza la sección inicial al cargar
renderSection('inicio');

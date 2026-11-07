const searchInput = document.querySelector('#service-search');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const serviceCards = [...document.querySelectorAll('.service-card')];
const resultCount = document.querySelector('#result-count');
const noResults = document.querySelector('#no-results');
let activeFilter = 'all';

function updateServices() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let visible = 0;

  serviceCards.forEach((card) => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const haystack = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
    const searchMatch = !query || haystack.includes(query);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (resultCount) resultCount.textContent = `${String(visible).padStart(2, '0')} ${visible === 1 ? 'RESOURCE' : 'RESOURCES'}`;
  if (noResults) noResults.hidden = visible !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    updateServices();
  });
});
searchInput?.addEventListener('input', updateServices);

// Press / to focus the service search, except while the user is typing elsewhere.
document.addEventListener('keydown', (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
  if (event.key === '/' && !isTyping) {
    event.preventDefault();
    searchInput?.focus();
  }
  if (event.key === 'Escape' && target === searchInput) {
    searchInput.value = '';
    updateServices();
    searchInput.blur();
  }
});

const routes = {
  account: {
    title: 'Try the official support desk.',
    description: "PUP Santa Rosa's campus information page identifies PUP SINTA for student concerns. Its campus help notice also directs students with WebMail access issues to SINTA.",
    link: 'https://pupsinta.freshservice.com/support/home',
    label: 'Open PUP SINTA'
  },
  grades: {
    title: 'Open the Student Information System.',
    description: 'The PUP student portal is the published destination for viewing your class list and grades. Use the official SIS sign-in page.',
    link: 'https://sisstudents.pup.edu.ph/',
    label: 'Open Student Portal'
  },
  document: {
    title: 'Start with the Santa Rosa ARO page.',
    description: 'The campus page labels this process as the Campus Online Document Request System and provides links for requests and status checks. Confirm current requirements before submitting.',
    link: 'https://pupsrc102.school.blog/aro-210/',
    label: 'View campus document process'
  },
  question: {
    title: 'Send the concern through PUP SINTA.',
    description: 'PUP describes SINTA as a student-support channel for questions and reports involving processes such as admission, enrollment, and library services.',
    link: 'https://pupsinta.freshservice.com/support/home',
    label: 'Visit PUP SINTA'
  }
};

const routeButtons = [...document.querySelectorAll('.route-option')];
const routeTitle = document.querySelector('#route-title');
const routeDescription = document.querySelector('#route-description');
const routeLink = document.querySelector('#route-link');

routeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const route = routes[button.dataset.route];
    if (!route) return;
    routeButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    routeTitle.textContent = route.title;
    routeDescription.textContent = route.description;
    routeLink.href = route.link;
    routeLink.innerHTML = `${route.label} <span aria-hidden="true">↗</span>`;
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  mainNav?.classList.toggle('is-open', !expanded);
});
mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  });
});

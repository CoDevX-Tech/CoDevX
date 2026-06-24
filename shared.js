/* shared.js — nav + footer injection + active link + dark/light mode */

const LOGO_SVG = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="17" r="10" stroke="white" stroke-width="4.5" fill="none"
    stroke-dasharray="45" stroke-dashoffset="-9"/>
  <line x1="23" y1="11" x2="30" y2="26" stroke="url(#g1)" stroke-width="4" stroke-linecap="round"/>
  <line x1="30" y1="11" x2="23" y2="23" stroke="url(#g1)" stroke-width="4" stroke-linecap="round"/>
  <line x1="14" y1="17.5" x2="20" y2="20.5" stroke="url(#g1)" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="14" y1="17.5" x2="20" y2="13.5" stroke="url(#g1)" stroke-width="2.5" stroke-linecap="round"/>
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
</svg>`;

const pages = [
  {id:'home',   label:'Home',       href:'index.html'},
  {id:'about',  label:'About',      href:'about.html'},
  {id:'work',   label:'Projects',   href:'work.html'},
  {id:'services',label:'Services',  href:'services.html'},
  {id:'team',   label:'Team',       href:'team.html'},
];

function getCurrentPage(){
  const f = location.pathname.split('/').pop().replace('.html','') || 'index';
  return f === 'index' ? 'home' : f;
}

function injectNav(){
  const cur = getCurrentPage();
  const links = pages.map(p =>
    `<a href="${p.href}" class="${cur===p.id?'active':''}">${p.label}</a>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}">${p.label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav>
      <div class="nav-left">
        <a href="index.html" class="logo">
          ${LOGO_SVG}
          <span class="logo-text">CoDevX</span>
        </a>
      </div>
      <div class="nav-center">
        ${links}
      </div>
      <div class="nav-right">
        <div class="theme-toggle-wrap">
          <span class="ti" id="theme-icon">🌙</span>
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme"></button>
        </div>
        <a href="contact.html" class="nav-cta ${cur==='contact'?'active':''}">Contact Us</a>
        <button class="hamburger" onclick="document.getElementById('mob').classList.toggle('open')" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="mobile-menu" id="mob">
      ${mobileLinks}
      <a href="contact.html">Contact Us</a>
    </div>
  `);

  // Theme toggle logic
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const saved = localStorage.getItem('cdx-theme');
  if(saved === 'light') {
    document.body.classList.add('light-mode');
    icon.textContent = '☀️';
  }
  toggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    icon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('cdx-theme', isLight ? 'light' : 'dark');
  });
}

function injectFooter(){
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo"><span class="logo-text">CoDevX</span></a>
          <p>Egypt-based software Tech building digital products for startups and businesses. Lean team, serious output.</p>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">About</a>
          <a href="team.html">Team</a>
          <a href="work.html">Projects</a>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <a href="services.html">Web Development</a>
          <a href="services.html">Mobile Apps</a>
          <a href="services.html">UI/UX Design</a>
          <a href="services.html">Backend & APIs</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <a href="#">LinkedIn</a>
          <a href="#">Facebook</a>
          <a href="contact.html">Contact Us</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 CoDevX. All rights reserved.</p>
        <span class="footer-tagline">Build · Connect · Ship</span>
      </div>
    </footer>
    <div class="toast" id="toast">
      <span>✅</span>
      <span>Message sent! We'll reply within 24 hours.</span>
    </div>
  `);
}

function initFadeIns(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('visible'), i*80);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
}

function showToast(msg){
  const t = document.getElementById('toast');
  if(msg) t.querySelector('span:last-child').textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
}

document.addEventListener('DOMContentLoaded',()=>{
  injectNav();
  injectFooter();
  initFadeIns();
});

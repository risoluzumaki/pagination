import './style.css'

/*
  Vanilla client pagination UI and logic
  - Fetches from server: http://localhost:3000/api/v1/contacts?page=&limit=
  - Shows contact list, Previous / Next controls, page number and limit selector
  - Notes: If you run the frontend from a different origin (vite at 5173), enable CORS on server.
*/

const API_BASE = 'http://localhost:3000/api/v1/contacts';

const renderApp = () => {
  document.querySelector('#app').innerHTML = `
    <div class="container">
      <header>
        <h1>Contacts — Pagination Demo</h1>
        <p class="hint">Fetching from <code>${API_BASE}</code></p>
      </header>

      <section class="controls">
        <label>Per page:
          <select id="limitSelect">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
          </select>
        </label>
        <div class="pager">
          <button id="prevBtn" disabled>&larr; Previous</button>
          <span id="pageInfo">Page <strong id="pageNumber">1</strong></span>
          <button id="nextBtn">Next &rarr;</button>
        </div>
      </section>

      <section id="listSection">
        <div id="loading" class="loading">Loading…</div>
        <ul id="contactsList" class="contacts"></ul>
        <div id="empty" class="empty hidden">No contacts found</div>
      </section>

      <footer class="note">Use the controls above to change pages and page size.</footer>
    </div>
  `
}

renderApp();

// state
let state = {
  page: 1,
  limit: 10,
  loading: false,
  lastResponseCount: 0,
}

// elements
const limitSelect = () => document.querySelector('#limitSelect')
const prevBtn = () => document.querySelector('#prevBtn')
const nextBtn = () => document.querySelector('#nextBtn')
const pageNumber = () => document.querySelector('#pageNumber')
const contactsList = () => document.querySelector('#contactsList')
const loadingEl = () => document.querySelector('#loading')
const emptyEl = () => document.querySelector('#empty')

async function fetchContacts(page, limit){
  state.loading = true
  updateLoading()

  try {
    const url = `${API_BASE}?page=${page}&limit=${limit}`
    const r = await fetch(url)
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const items = await r.json()
    state.lastResponseCount = Array.isArray(items) ? items.length : 0
    return items
  } catch (err){
    console.error('Fetch contacts failed', err)
    // show error in list
    contactsList().innerHTML = `<li class="error">Error loading contacts: ${err.message}</li>`
    state.lastResponseCount = 0
    return []
  } finally {
    state.loading = false
    updateLoading()
  }
}

function renderContacts(items){
  contactsList().innerHTML = ''
  if (!items || items.length === 0) {
    emptyEl().classList.remove('hidden')
    return
  }
  emptyEl().classList.add('hidden')

  for (const c of items){
    const li = document.createElement('li')
    li.className = 'contact'
    li.innerHTML = `
      <div class="c-left">
        <div class="name">${escapeHtml(c.name || '-')}</div>
        <div class="meta">ID: ${escapeHtml(String(c.id || '-'))}</div>
      </div>
      <div class="c-right">
        <div class="email">${escapeHtml(c.email || '-')}</div>
        <div class="phone">${escapeHtml(c.phone || '-')}</div>
      </div>
    `
    contactsList().appendChild(li)
  }
}

function escapeHtml(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
}

function updateLoading(){
  loadingEl().style.display = state.loading ? 'block' : 'none'
}

function updatePager(){
  pageNumber().textContent = state.page
  prevBtn().disabled = state.page <= 1 || state.loading
  // Disable next if last response count is less than limit (no more items)
  nextBtn().disabled = state.loading || state.lastResponseCount < state.limit
}

async function loadAndRender(){
  updatePager()
  const items = await fetchContacts(state.page, state.limit)
  renderContacts(items)
  updatePager()
}

// attach events
document.addEventListener('click', (e) => {
  if (e.target === prevBtn()){
    if (state.page > 1){
      state.page -= 1
      loadAndRender()
    }
  }
  if (e.target === nextBtn()){
    // only advance if last response count equals limit (likely more pages)
    if (state.lastResponseCount >= state.limit){
      state.page += 1
      loadAndRender()
    }
  }
})

limitSelect().addEventListener('change', (e) => {
  state.limit = parseInt(e.target.value)
  state.page = 1
  loadAndRender()
})

// initial load
loadAndRender()


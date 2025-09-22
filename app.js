/* ------------------------ app.js ------------------------ */
function checkoutWhats(){
const ids = Object.keys(state.cart)
if(ids.length===0) return alert('El carrito está vacío')
sendWhatsappMessage(ids)
}


// Inicialización UI
function initUI(){
document.addEventListener('click', onDocClick)
document.getElementById('openCart').addEventListener('click', ()=>{
document.getElementById('cartPanel').classList.toggle('hidden')
renderCart()
})
document.getElementById('checkoutBtn').addEventListener('click', checkoutWhats)
document.getElementById('closeModal').addEventListener('click', ()=>document.getElementById('modal').classList.add('hidden'))
document.getElementById('search').addEventListener('input', (e)=>{
const q = e.target.value.toLowerCase()
const filtered = state.products.filter(p=> p.name.toLowerCase().includes(q) || (p.features||[]).join(' ').toLowerCase().includes(q) )
renderProducts(filtered)
})
document.getElementById('categoryFilter').addEventListener('change',(e)=>{
const v = e.target.value
const filtered = v==='all' ? state.products : state.products.filter(p=>p.category===v)
renderProducts(filtered)
})
// WhatsApp quick button
document.getElementById('whatsappQuick').addEventListener('click', (e)=>{
e.preventDefault(); const phone='5215540000000'; window.open(`https://wa.me/${phone}`,'_blank')
})
}


// Rellena select de categorías
function populateCategories(list){
const sel = document.getElementById('categoryFilter')
const cats = [...new Set(list.map(p=>p.category))]
cats.forEach(c=>{
const opt = document.createElement('option'); opt.value=c; opt.textContent=c; sel.appendChild(opt)
})
}


// Carga inicial
loadCart()
initUI()
loadProducts()
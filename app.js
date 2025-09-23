/* ---------------------- app.js ---------------------- */
// --- WHATSAPP: generar mensaje y abrir chat ---
function checkoutWhatsApp(){
const lines = []
let total = 0
Object.values(state.cart).forEach(ci => {
lines.push(`${ci.qty} x ${ci.product.name} - $${fmt(ci.product.price)} = $${fmt(ci.product.price*ci.qty)}`)
total += ci.product.price * ci.qty
})
if(lines.length===0){ alert('El carrito está vacío'); return }
const msg = `Hola, deseo realizar el siguiente pedido:%0A%0A${encodeURIComponent(lines.join('%0A'))}%0A%0ATotal: $${fmt(total)}`
const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
window.open(url,'_blank')
}


// --- eventos UI delegados ---
document.addEventListener('click', e=>{
const el = e.target
const action = el.dataset.action
const id = el.dataset.id
if(!action) return
if(action==='add') addToCart(id,1)
if(action==='remove') removeFromCart(id)
if(action==='inc') setQty(id, (state.cart[id]?.qty||0)+1)
if(action==='dec') setQty(id, (state.cart[id]?.qty||1)-1)
})


// abrir/ocultar carrito
document.getElementById('openCart').addEventListener('click', ()=>{
const panel = document.getElementById('cartPanel')
panel.classList.toggle('hidden')
const hidden = panel.classList.contains('hidden')
panel.setAttribute('aria-hidden', hidden)
renderCart()
})


// botones del panel
document.getElementById('clearCart').addEventListener('click', ()=>{ if(confirm('¿Limpiar carrito?')) clearCart() })
document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp)
document.getElementById('whatsappQuick').addEventListener('click', ()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}`,'_blank'))


// búsqueda y filtrado
document.getElementById('search').addEventListener('input', e=>{
const q = e.target.value.toLowerCase()
const filtered = state.products.filter(p=> p.name.toLowerCase().includes(q) || (p.features||[]).join(' ').toLowerCase().includes(q))
renderProducts(filtered)
})


function populateCategories(){
const sel = document.getElementById('categoryFilter')
const cats = [...new Set(state.products.map(p=>p.category))]
cats.forEach(c=>{ const opt = document.createElement('option'); opt.value=c; opt.textContent=c; sel.appendChild(opt) })
sel.addEventListener('change', ()=>{
const v = sel.value
renderProducts(v==='all' ? state.products : state.products.filter(p=>p.category===v))
})
}


// inicialización
loadCart()
loadProducts()
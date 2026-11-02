const API = '/api/tareas';
const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

document.getElementById('usuario').textContent = localStorage.getItem('nombre');
document.getElementById('salir').onclick = () => {
  localStorage.clear();
  window.location.href = 'login.html';
};

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
};

async function cargar() {
  const res = await fetch(API);
  const tareas = await res.json();
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  tareas.forEach(t => {
    const li = document.createElement('li');
    li.className = t.completada ? 'hecha' : '';
    li.innerHTML = `
      <div><strong>${t.titulo}</strong><br><small>${t.descripcion || ''}</small></div>
      <div>
        <button data-a="toggle" data-id="${t._id}">${t.completada ? 'Reabrir' : 'Completar'}</button>
        <button data-a="editar" data-id="${t._id}">Editar</button>
        <button data-a="borrar" data-id="${t._id}" class="peligro">Eliminar</button>
      </div>`;
    lista.appendChild(li);
  });
  window._tareas = tareas;
}

document.getElementById('tareaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion').value;
  await fetch(API, { method: 'POST', headers, body: JSON.stringify({ titulo, descripcion }) });
  e.target.reset();
  cargar();
});

document.getElementById('lista').addEventListener('click', async (e) => {
  const { a, id } = e.target.dataset;
  if (!a) return;
  const t = window._tareas.find(x => x._id === id);
  if (a === 'borrar' && confirm('¿Eliminar tarea?'))
    await fetch(`${API}/${id}`, { method: 'DELETE', headers });
  if (a === 'toggle')
    await fetch(`${API}/${id}`, { method: 'PUT', headers, body: JSON.stringify({ completada: !t.completada }) });
  if (a === 'editar') {
    const titulo = prompt('Nuevo título:', t.titulo);
    if (titulo) await fetch(`${API}/${id}`, { method: 'PUT', headers, body: JSON.stringify({ titulo }) });
  }
  cargar();
});

cargar();
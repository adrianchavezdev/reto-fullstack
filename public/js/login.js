const API = '/api/auth';
const form = document.getElementById('loginForm');
const msg = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) { msg.textContent = data.mensaje; return; }
  localStorage.setItem('token', data.token);
  localStorage.setItem('nombre', data.nombre);
  window.location.href = 'index.html';
});

document.getElementById('registro').addEventListener('click', async (e) => {
  e.preventDefault();
  const nombre = prompt('Nombre:');
  const email = prompt('Correo:');
  const password = prompt('Contraseña (mínimo 6 caracteres):');
  if (!nombre || !email || !password) return;
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  });
  const data = await res.json();
  alert(data.mensaje);
});
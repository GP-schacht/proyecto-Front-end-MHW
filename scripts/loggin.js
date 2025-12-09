
  const form = document.getElementById('form');
  const registroExtra = document.getElementById('registroExtra');
  const btnRegistrar = document.getElementById('btnRegistrar');
  const btnLogin = document.getElementById('btnLogin');
  const toggleRegistro = document.getElementById('toggleRegistro');
  const toggleLogin = document.getElementById('toggleLogin');
  const msg = document.getElementById('msg');

  let modo = 'login'; // 'login' o 'registro'

  toggleRegistro.addEventListener('click', () => setModo('registro'));
  toggleLogin.addEventListener('click', () => setModo('login'));

  function setModo(nuevo) {
    modo = nuevo;
    const esRegistro = modo === 'registro';
    registroExtra.hidden = !esRegistro;
    btnRegistrar.hidden = !esRegistro;
    btnLogin.hidden = esRegistro;
    toggleRegistro.setAttribute('aria-pressed', esRegistro ? 'true' : 'false');
    toggleLogin.setAttribute('aria-pressed', esRegistro ? 'false' : 'true');
    msg.textContent = esRegistro
      ? 'Completa tus datos para crear una cuenta.'
      : 'Ingresa tu usuario y contraseña.';
  }

  // Validación de formato correo igual al CHECK de tu SQL
  function esCorreoValido(email) {
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return re.test(email);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';

    const data = Object.fromEntries(new FormData(form));
    const action = e.submitter?.dataset?.action || (modo === 'registro' ? 'registrar' : 'inicio');

    // Validaciones de cliente (rápidas)
    if (!data.usuario || !data.password) {
      msg.textContent = 'Usuario y contraseña son obligatorios.';
      return;
    }
    if (data.password.length < 8) {
      msg.textContent = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    if (action === 'registrar') {
      const faltantes = ['correo', 'nombre', 'apellido'].filter((k) => !data[k]);
      if (faltantes.length) {
        msg.textContent = `Faltan campos: ${faltantes.join(', ')}`;
        return;
      }
      if (!esCorreoValido(data.correo)) {
        msg.textContent = 'El formato del correo no es válido.';
        return;
      }
    }

    // Construye endpoint según acción
    const endpoint =
      action === 'registrar' ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include', // si usas cookies/sesión
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        msg.textContent = payload?.message || 'Ocurrió un error.';
        return;
      }

      if (action === 'registrar') {
        msg.textContent = 'Registro exitoso. Ya puedes iniciar sesión.';
        setModo('login');
      } else {
        msg.textContent = 'Sesión iniciada.';
        // Aquí muestra botón "Cerrar Sesión" o redirige
        document.getElementById('cerrar').style.display = 'inline-block';
      }
    } catch (err) {
      console.error(err);
      msg.textContent = 'Error de red. Intenta de nuevo.';
    }
  });


 const overlay = document.getElementById('overlayLogin');
  const modal   = overlay.querySelector('.pantallaLoggin');
  let lastFocused = null;

  function AbrirLogging() {
    lastFocused = document.activeElement;
    overlay.style.display = 'grid';
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    // Foco al primer input para accesibilidad
    const firstInput = modal.querySelector('#user');
    if (firstInput) firstInput.focus();

    // Cerrar con ESC
    document.addEventListener('keydown', escListener);
    // Cerrar al hacer clic fuera del modal
    overlay.addEventListener('click', clickOutsideListener);
  }

  function CerrarPanelLogin() {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    document.removeEventListener('keydown', escListener);
    overlay.removeEventListener('click', clickOutsideListener);

    if (lastFocused) lastFocused.focus();
  }

  function escListener(e) {
    if (e.key === 'Escape') CerrarPanelLogin();
  }

  function clickOutsideListener(e) {
    // cierra si el clic es en el overlay pero no dentro del modal
    if (!modal.contains(e.target)) CerrarPanelLogin();
  }



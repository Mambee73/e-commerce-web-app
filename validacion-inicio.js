document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.for-contacto');
    const nombreInput = document.getElementById('nombre');
    const contraseñaInput = document.getElementById('contraseña');
    const nombreError = document.getElementById('nombre-error');
    const contraseñaError = document.getElementById('contraseña-error');


    nombreInput.addEventListener('input', validateNombre);
    contraseñaInput.addEventListener('input', validateContraseña);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNombreValid = validateNombre();
        const isContraseñaValid = validateContraseña();
        
        if (isNombreValid && isContraseñaValid) {
            validateLogin();
        }
    });

    function validateNombre() {
        const nombre = nombreInput.value;
        
        if (nombre === '') {
            showFieldError(nombreInput, nombreError, 'El nombre de usuario es obligatorio');
            return false;
        }
        
        if (nombre.startsWith(' ')) {
            showFieldError(nombreInput, nombreError, 'El nombre no debe empezar por espacio');
            return false;
        }
        
        if (!/^[a-zA-Z0-9__]+$/.test(nombre)) {
            showFieldError(nombreInput, nombreError, 'No se pueden usar caracteres especiales');
            return false;
        }

        showFieldSuccess(nombreInput, nombreError, 'Usuario válido');
        return true;
    }

    function validateContraseña() {
        const contraseña = contraseñaInput.value;
        
        if (contraseña === '') {
            showFieldError(contraseñaInput, contraseñaError, 'La contraseña es obligatoria');
            return false;
        }
        
        if (contraseña.length < 6) {
            showFieldError(contraseñaInput, contraseñaError, 'La contraseña debe tener mínimo 6 caracteres');
            return false;
        }
        
        if (contraseña.length > 12) {
            showFieldError(contraseñaInput, contraseñaError, 'La contraseña debe tener máximo 12 caracteres');
            return false;
        }

        showFieldSuccess(contraseñaInput, contraseñaError, 'Contraseña válida');
        return true;
    }

    function validateLogin() {
 

        showSuccess();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1);
    }

    function showFieldError(input, errorElement, message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
    }
    
    function showFieldSuccess(input, errorElement, message) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        errorElement.textContent = message;
        errorElement.style.color = '#28a745';
    }
    
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div class="alert alert-success" role="alert">
                Inicio exitoso! Redirigiendo...
            </div>
        `;
        form.insertBefore(successDiv, form.firstChild);
    }
});
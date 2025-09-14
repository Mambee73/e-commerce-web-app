document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.for-contacto');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');
    
    const nombreError = document.getElementById('nombre-error');
    const correoError = document.getElementById('correo-error');
    const mensajeError = document.getElementById('mensaje-error');

    nombreInput.addEventListener('input', validateNombre);
    nombreInput.addEventListener('blur', validateNombre);
    
    correoInput.addEventListener('input', validateCorreo);
    correoInput.addEventListener('blur', validateCorreo);
    
    mensajeInput.addEventListener('input', validateMensaje);
    mensajeInput.addEventListener('blur', validateMensaje);

    form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNombreValid = validateNombre();
    const isCorreoValid = validateCorreo();
    const isMensajeValid = validateMensaje();
    
    if (isNombreValid && isCorreoValid && isMensajeValid) {
        showSuccess();
        setTimeout(() => {
            window.location.href = 'mensaje.html';
        }, 2000);
    } else {
        showError('Por favor, corrige los errores antes de enviar.');
    }
});


    function validateNombre() {
        const nombre = nombreInput.value.trim();
        
        if (nombre === '') {
            showFieldError(nombreInput, nombreError, 'El nombre es obligatorio');
            return false;
        }
        
        if (nombre.length < 2) {
            showFieldError(nombreInput, nombreError, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        
        if (nombre.length > 50) {
            showFieldError(nombreInput, nombreError, 'El nombre no puede tener más de 50 caracteres');
            return false;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(nombre)) {
            showFieldError(nombreInput, nombreError, 'El nombre solo puede contener letras y espacios (sin números ni símbolos)');
            return false;
        }
        

        if (/\s{2,}/.test(nombre)) {
            showFieldError(nombreInput, nombreError, 'No se permiten espacios múltiples seguidos');
            return false;
        }
        
        
        if (nombre !== nombre.trim()) {
            showFieldError(nombreInput, nombreError, 'El nombre no puede comenzar o terminar con espacios');
            return false;
        }
        
        showFieldSuccess(nombreInput, nombreError, 'Nombre valido');
        return true;
    }
    function validateCorreo() {
        const correo = correoInput.value.trim();
        
        if (correo === '') {
            showFieldError(correoInput, correoError, 'Este campo es obligatorio');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            showFieldError(correoInput, correoError, 'Por favor, ingresa un correo válido');
            return false;
        }
        
        if (correo.length > 100) {
            showFieldError(correoInput, correoError, 'El correo no puede tener más de 100 caracteres');
            return false;
        }
        
        showFieldSuccess(correoInput, correoError, 'Correo valido');
        return true;
    }
        


    function validateMensaje() {
        const mensaje = mensajeInput.value.trim();
        
        if (mensaje === '') {
            showFieldError(mensajeInput, mensajeError, 'El mensaje es obligatorio');
            return false;
        }
        
        if (mensaje.length > 1000) {
            showFieldError(mensajeInput, mensajeError, 'El mensaje no puede tener más de 1000 caracteres');
            return false;
        }
        
        showFieldSuccess(mensajeInput, mensajeError, `Mensaje válido ✓ (${mensaje.length}/500)`);
        return true;
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
                  Formulario valido! Enviando...
            </div>
        `;
        form.insertBefore(successDiv, form.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 1);
    }
    
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        `;
        form.insertBefore(errorDiv, form.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    const resetBtn = document.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            setTimeout(() => {
                clearValidations();
            }, 10);
        });
    }
    
    function clearValidations() {
        [nombreInput, correoInput, mensajeInput].forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        [nombreError, correoError, mensajeError].forEach(error => {
            error.textContent = '';
        });
    }
});

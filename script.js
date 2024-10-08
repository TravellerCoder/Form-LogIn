document.addEventListener('DOMContentLoaded', function() {

    const logInForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput= document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('errorEmail');
    const passwordError = document.getElementById('errorPassword');
    const confirmPasswordError = document.getElementById('errorConfirmPassword');
    const showHideButton = document.getElementById('show-hide');

    logInForm.addEventListener('submit', function(event){
        event.preventDefault();
        validateForm()
    });

    emailInput.addEventListener('blur', function(){
        validateEmail()
    });

    emailInput.addEventListener('change', function(){
        clearError(emailError)
    });

    passwordInput.addEventListener('change', function(){
        clearError(passwordError)
    });
    confirmPasswordInput.addEventListener('change', function(){
        clearError(confirmPasswordError)
    });
    showHideButton.addEventListener('click', function(){
        if(passwordInput.type == 'password'){
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
    })

    function validateForm(){
        const validEmail = validateEmail();
        const validPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if(validEmail && validPassword && passwordMatch){
            saveToLocalStorage()
            alert('Has ingresado con exito, BIENVENIDO AL SITIO')
        }
    };

    function validateEmail(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim() //el trim lo que hace es eliminar si hubiesa un espacio vacio antes del imput

        if(!emailRegex.test(emailValue)){
            showError(emailError, 'Ingresa un Email valido')
        return false
        }

        return true
    };

    function validatePassword(){
        const passwordValue = passwordInput.value.trim()

        if(passwordValue.length < 6 ){
            showError(passwordError, 'La clave debe tener al menos 6 caracteres')
            return false;
        }
        return true;
    };
        function validatePasswordMatch(){
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        
        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError, 'Las claves no coinciden')
            return false;
        }
        return true;
    };

        function showError(errorElement, msj){
            errorElement.innerHTML = msj
            errorElement.style.display='block'
        };

        function clearError(errorElement,){
            errorElement.innerHTML = ''
            errorElement.style.display='none'
        };

        function saveToLocalStorage(){
            const emailValue = emailInput.value.trim();
            localStorage.setItem('email', emailValue);
            const body = bodyBuilderJSON();
            console.log(body);
            
        }

        function bodyBuilderJSON(){
            return {
                'email' : emailInput.value,
                'password' : passwordInput.value,
            }
        }
    })




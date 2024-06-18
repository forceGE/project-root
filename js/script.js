document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('input', function () {
        validateForm();
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            sendFormData(new FormData(form));
        }
    });

    function validateForm() {
        let isValid = true;

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        const age = document.getElementById('age');

        resetValidation();

        if (firstName.value.trim() === '') {
            showError(firstName, 'Имя обязательно');
            isValid = false;
        }

        if (lastName.value.trim() === '') {
            showError(lastName, 'Фамилия обязательна');
            isValid = false;
        }

        if (!validateEmail(email.value)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        if (!validatePhone(phone.value)) {
            showError(phone, 'Введите корректный номер телефона');
            isValid = false;
        }

        if (message.value.trim() === '') {
            showError(message, 'Сообщение обязательно');
            isValid = false;
        }

        if (age.value.trim() === '' || isNaN(age.value) || age.value < 0 || age.value > 120) {
            showError(age, 'Введите корректный возраст');
            isValid = false;
        }

        return isValid;
    }

    function resetValidation() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        inputs.forEach(input => input.classList.remove('invalid'));
    }

    function showError(element, message) {
        const errorElement = element.nextElementSibling;
        errorElement.textContent = message;
        element.classList.add('invalid');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^\+?[1-9]\d{1,14}$/;
        return re.test(String(phone));
    }

    function sendFormData(formData) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                showSuccessMessage();
                form.reset();
            } else {
                showErrorMessage();
            }
        };
        xhr.onerror = function () {
            showErrorMessage();
        };
        xhr.send(JSON.stringify(Object.fromEntries(formData)));
    }

    function showSuccessMessage() {
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    function showErrorMessage() {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
});

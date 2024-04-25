// JavaScript source code
document.addEventListener('DOMContentLoaded', () => {
    const signUpFormContainer = document.getElementById('sign-up-form');

    // Generate sign-up form
    const signUpForm = generateSignUpForm();
    signUpFormContainer.appendChild(signUpForm);
});

function generateSignUpForm() {
    const form = document.createElement('form');

    // Add email input
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.name = 'email';
    emailInput.required = true;
    form.appendChild(emailInput);

    // Add password input
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.name = 'password';
    passwordInput.required = true;
    form.appendChild(passwordInput);

    // Add submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Sign Up';
    form.appendChild(submitButton);

    // Add event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const userData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Save user data to JSON file
        saveUserData(userData);
    });

    return form;
}

function saveUserData(userData) {
    fetch('us')
        .then((response) => response.json())
        .then((users) => {
            users.push(userData);
            return users;
        })
        .then((users) => {
            return fetch('users.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            });
        })
        .then(() => {
            alert('User data saved successfully!');
        })
        .catch((error) => {
            console.error('Error saving user data:', error);
            alert('Error saving user data. Please try again later.');
        });
}
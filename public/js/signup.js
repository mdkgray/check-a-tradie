const signupFormHandler = async (event) => {
  event.preventDefault();

  const businessName = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  const validate = validator.isEmail(email);
  console.log(validate);

  if (!validate) {
    document.getElementById('signup-email-error').innerHTML='Email not valid';
    document.getElementById('signup-email-error').style.color = 'red';
  }

  if (businessName && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ businessName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    console.log(response.statusText);
    alert('Please try again');
  }
}};

const signUp = document.querySelector('#sign-up-form')
if (signUp) {
  signUp.addEventListener('submit', signupFormHandler);
};
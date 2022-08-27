const loginFormHandler = async (event) => {
  event.preventDefault();
  
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  const validate = validator.isEmail(email);
  console.log(validate);

  if (!validate) {
    document.getElementById('login-email-error').innerHTML='Email not valid';
    document.getElementById('login-email-error').style.color = 'red';
  }

  if (email && password) {
    console.log(email,password);
    const response = await fetch ('/api/users/login', 
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response.statusText);
      alert('Incorrect email or password. Please try again');
    }
  }
};

const login = document.querySelector('#login-form')
if (login) {
  login.addEventListener('submit', loginFormHandler);
};
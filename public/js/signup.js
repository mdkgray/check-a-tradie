const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#exampleFormControlInput1').value.trim();
    const email = document.querySelector('#formGroupExampleInput').value.trim();
    const password = document.querySelector('#exampleInputPassword1').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
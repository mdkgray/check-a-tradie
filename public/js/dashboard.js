

// event listener for button (type: save/)
// this will link to new put request 

// change business name, license, phone, bio and specialties
// if changes are present post request 

// document location reload to bring back up dashboard page 
const editDashboard = async () => {
    const response = await fetch('/api/users/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

document
.querySelector('.')
.addEventListener('saveButton', editDashboard);
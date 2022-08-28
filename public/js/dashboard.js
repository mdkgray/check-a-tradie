const editDashboard = async (event) => {
  event.preventDefault();

  const businessName = document.querySelector("#name-signup").value.trim();
  const licenseNumber = document.querySelector("#license-number").value.trim();
  const bio = document.querySelector("#about-listing").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const phoneNumber = document.querySelector("#phone-number").value.trim();
  const specialities = document.querySelector("#special-tasks").value.trim();

  if (businessName && licenseNumber && bio && email && phoneNumber && specialities) {

    const response = await fetch('/api/users/', {
        method: 'PUT',
        body: JSON.stringify({businessName, licenseNumber, bio, email, phoneNumber, specialities}),         
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.alert('Successfully saved information');
    } 
  }else {
    alert('Make sure all fields are filled out');
  };
};

document.querySelector('#form-group').addEventListener('submit', editDashboard);

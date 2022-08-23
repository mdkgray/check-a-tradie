const editDashboard = async (event) => {
    event.preventDefault();

    const businessName = document.querySelector("#name-signup").value.trim();
    const licenseNumber = document.querySelector("#license-number").value.trim();
    const bio = document.querySelector("#about-listing").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const phoneNumber = document.querySelector("#phone-number").value.trim();
    const specialties = document.querySelector("#special-tasks").value.trim();

    if (businessName && licenseNumber && bio && email && phoneNumber && specialties) {

      const response = await fetch('/api/users/dashboard', {
          method: 'POST',
          body: JSON.stringify({businessName, licenseNumber, bio, email, phoneNumber, specialties}),         
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          // document location reload to bring back up dashboard page 
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      };
    };
  };

document.querySelector('.form-group').addEventListener('submit', editDashboard);

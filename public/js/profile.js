const viewProfile = async () => {
    const response = await fetch('/api/users/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Sorry, there was an error');
    }
};

const profile = document.querySelector('#profile-button');
if (profile) {
    profile.addEventListener('submit', viewProfile);
};
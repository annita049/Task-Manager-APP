// window.onclick = function(event) {
//     if (event.target == document.getElementById('popupForm')) {
//         document.getElementById('popupForm').style.display = 'none';
//     }
// };  // when other area of the page except the popup is clicked the popup closes.

window.addEventListener('DOMContentLoaded', () => {
    fetch('/user/profile')
    .then(response => response.json())
    .then(data => {
        if(data.success){
            document.getElementById('dropdownMenuButton').textContent = data.user.firstname + " " + data.user.lastname;
        }
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const dropdownContent = document.getElementById('dropdownContent');

    // Toggle dropdown visibility on button click
    dropdownButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    // Close the dropdown if clicked outside of it
    window.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});
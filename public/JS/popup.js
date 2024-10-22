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

    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const dropdownContent = document.getElementById('dropdownContent');

    dropdownButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});
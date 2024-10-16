document.getElementById('createTask').addEventListener('click', function() {
    document.getElementById('popupForm').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupForm').style.display = 'none';
});

// window.onclick = function(event) {
//     if (event.target == document.getElementById('popupForm')) {
//         document.getElementById('popupForm').style.display = 'none';
//     }
// }; when other area of the page except the popup is clicked the popup closes.


document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted!');
    document.getElementById('popupForm').style.display = 'none';
});


// const d = document.getElementById('updateTask');
// if(d) console.log("Sihau");
// popup opening clicking on different buttons
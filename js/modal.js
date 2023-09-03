// Get the modal and close button elements
var modal = document.getElementById('myModal');
var closeBtn = document.getElementsByClassName('close-btn')[0];

// When the close button is clicked, hide the modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// When anywhere outside of the modal content is clicked, hide the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Function to show the modal
function showModal() {
    modal.style.display = 'block';
}


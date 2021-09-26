// Copy url from clipboard
const copyBtns = document.querySelectorAll('.js--btn-copy');
[...copyBtns].forEach(btn => {
    btn.addEventListener('click', function () {
        this.innerHTML = 'Copied';
        const inputc = document.body.appendChild(document.createElement('input'));
        inputc.value = btn.previousElementSibling.getAttribute('href');
        inputc.select();
        document.execCommand('copy');
        inputc.parentNode.removeChild(inputc);
    });
});

// Confirmation for delete url
function deleteUrl() {
    if (confirm('Are you sure you want to delete this item?')) {
        return true;
    } else {
        return false;
    }
}

// Event listener for the character limit on the details textarea

const details = document.getElementById("details");
const detailsCount = document.getElementById("details_count");
const detailsError = document.getElementById("details_error");
const maxChar = 180;

details.addEventListener("input", function() {
    const remaining = maxChar - details.value.length;

    detailsCount.textContent = remaining + ' characters remaining';
    detailsError.textContent = remaining <= 0 ? 'You have exceeded the maximum number of characters allowed.' : '';

    details.setCustomValidity(
        remaining < 0 ? 'You have exceeded the maximum number of characters allowed.' : ''
    );
});
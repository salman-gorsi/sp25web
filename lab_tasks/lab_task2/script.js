document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkout-form');
    const successMessage = document.getElementById('success-message');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Input elements
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    
    // Error message elements
    const fullNameError = document.getElementById('fullName-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const addressError = document.getElementById('address-error');
    const cardNumberError = document.getElementById('cardNumber-error');
    const expiryDateError = document.getElementById('expiryDate-error');
    const cvvError = document.getElementById('cvv-error');
    
    // Format credit card number as user types
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
    });
    
    // Format expiry date as MM/YY as user types
    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
    });
    
    // Validate full name
    function validateFullName() {
        const value = fullNameInput.value.trim();
        const nameRegex = /^[A-Za-z\s]+$/;
        
        if (!value) {
            fullNameError.textContent = 'Name is required';
            fullNameInput.classList.add('error');
            return false;
        } else if (!nameRegex.test(value)) {
            fullNameError.textContent = 'Name can only contain alphabets';
            fullNameInput.classList.add('error');
            return false;
        } else if (value.length < 2) {
            fullNameError.textContent = 'Name must be at least 2 characters';
            fullNameInput.classList.add('error');
            return false;
        } else {
            fullNameError.textContent = '';
            fullNameInput.classList.remove('error');
            return true;
        }
    }
    
    // Validate email
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            return false;
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }
    
    // Validate phone
    function validatePhone() {
        const value = phoneInput.value.trim();
        const phoneRegex = /^\d+$/;
        
        if (!value) {
            phoneError.textContent = 'Phone number is required';
            phoneInput.classList.add('error');
            return false;
        } else if (!phoneRegex.test(value)) {
            phoneError.textContent = 'Phone number can only contain digits';
            phoneInput.classList.add('error');
            return false;
        } else if (value.length < 10) {
            phoneError.textContent = 'Phone number must be at least 10 digits';
            phoneInput.classList.add('error');
            return false;
        } else if (value.length > 15) {
            phoneError.textContent = 'Phone number must not exceed 15 digits';
            phoneInput.classList.add('error');
            return false;
        } else {
            phoneError.textContent = '';
            phoneInput.classList.remove('error');
            return true;
        }
    }
    
    // Validate address
    function validateAddress() {
        const value = addressInput.value.trim();
        
        if (!value) {
            addressError.textContent = 'Address is required';
            addressInput.classList.add('error');
            return false;
        } else if (value.length < 5) {
            addressError.textContent = 'Address must be at least 5 characters';
            addressInput.classList.add('error');
            return false;
        } else {
            addressError.textContent = '';
            addressInput.classList.remove('error');
            return true;
        }
    }
    
    // Validate card number
    function validateCardNumber() {
        const value = cardNumberInput.value.trim();
        const cardRegex = /^\d+$/;
        
        if (!value) {
            cardNumberError.textContent = 'Card number is required';
            cardNumberInput.classList.add('error');
            return false;
        } else if (!cardRegex.test(value)) {
            cardNumberError.textContent = 'Card number can only contain digits';
            cardNumberInput.classList.add('error');
            return false;
        } else if (value.length !== 16) {
            cardNumberError.textContent = 'Card number must be exactly 16 digits';
            cardNumberInput.classList.add('error');
            return false;
        } else {
            cardNumberError.textContent = '';
            cardNumberInput.classList.remove('error');
            return true;
        }
    }
    
    // Validate expiry date
    function validateExpiryDate() {
        const value = expiryDateInput.value.trim();
        const expiryRegex = /^\d{2}\/\d{2}$/;
        
        if (!value) {
            expiryDateError.textContent = 'Expiry date is required';
            expiryDateInput.classList.add('error');
            return false;
        } else if (!expiryRegex.test(value)) {
            expiryDateError.textContent = 'Expiry date must be in MM/YY format';
            expiryDateInput.classList.add('error');
            return false;
        } else {
            // Check if the expiry date is in the future
            const [month, year] = value.split('/').map(Number);
            if (!month || !year || month < 1 || month > 12) {
                expiryDateError.textContent = 'Invalid expiry date';
                expiryDateInput.classList.add('error');
                return false;
            }
            
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // Get last two digits of year
            const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed
            
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                expiryDateError.textContent = 'Expiry date must be in the future';
                expiryDateInput.classList.add('error');
                return false;
            } else {
                expiryDateError.textContent = '';
                expiryDateInput.classList.remove('error');
                return true;
            }
        }
    }
    
    // Validate CVV
    function validateCVV() {
        const value = cvvInput.value.trim();
        const cvvRegex = /^\d+$/;
        
        if (!value) {
            cvvError.textContent = 'CVV is required';
            cvvInput.classList.add('error');
            return false;
        } else if (!cvvRegex.test(value)) {
            cvvError.textContent = 'CVV can only contain digits';
            cvvInput.classList.add('error');
            return false;
        } else if (value.length !== 3) {
            cvvError.textContent = 'CVV must be exactly 3 digits';
            cvvInput.classList.add('error');
            return false;
        } else {
            cvvError.textContent = '';
            cvvInput.classList.remove('error');
            return true;
        }
    }
    
    // Add input event listeners for real-time validation
    fullNameInput.addEventListener('input', validateFullName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    addressInput.addEventListener('input', validateAddress);
    cardNumberInput.addEventListener('input', validateCardNumber);
    expiryDateInput.addEventListener('input', validateExpiryDate);
    cvvInput.addEventListener('input', validateCVV);
    
    // Show toast notification
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isAddressValid = validateAddress();
        const isCardNumberValid = validateCardNumber();
        const isExpiryDateValid = validateExpiryDate();
        const isCVVValid = validateCVV();
        
        // Check if all validations pass
        if (
            isFullNameValid && 
            isEmailValid && 
            isPhoneValid && 
            isAddressValid && 
            isCardNumberValid && 
            isExpiryDateValid && 
            isCVVValid
        ) {
            // In a real application, you would process the payment here
            console.log('Form submitted successfully:', {
                fullName: fullNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                cardNumber: cardNumberInput.value,
                expiryDate: expiryDateInput.value,
                cvv: cvvInput.value
            });
            
            // Show success message
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            showToast('Order Placed Successfully!');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.classList.add('hidden');
            }, 3000);
        }
    });
});
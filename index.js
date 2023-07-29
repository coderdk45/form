// $(document).ready(function() { 
//     $(".form-group input[type='text'], .form-group input[type='tel']").on( 
//       "click", 
//       function() { 
//         $(this).get(0).setSelectionRange(0, 0); 
//       } 
//     ); 
//   }); 

//   // Validate mobile number 
//   $(document).ready(function() { 
//     $("#mobile-no").on("input", function() { 
//       var mobileNo = $(this).val(); 
//       if (mobileNo.length < 10 || !/^\d+$/.test(mobileNo)) { 
//         $(this) 
//           .closest(".form-group") 
//           .find(".error-message") 
//           .addClass("error") 
//           .text("Invalid mobile number"); 
//       } else { 
//         $(this) 
//           .closest(".form-group") 
//           .find(".error-message") 
//           .removeClass("error") 
//           .text(""); 
//       } 
//     }); 
//   }); 


const form = document.getElementById('multi-step-form'); 
const tabs = fieldsets = Array.from(document.querySelectorAll('fieldset')); 
const nextButton = document.querySelector('.next'); 
const submitButton = document.querySelector('.submit'); 
const checkboxes = Array.from(document.querySelectorAll('.tab-checkbox')); 
 
// Set initial state 
let currentStep = 0; 
updateForm(); 
 
// Add event listeners to navigation buttons 
document.querySelector('.next').addEventListener('click', () => { 
  validateStep(currentStep + 1); 
}); 
 
document.querySelector('.previous').addEventListener('click', () => { 
  if (currentStep > 0) { 
    currentStep--; 
    updateForm(); 
  } 
}); 
 
form.addEventListener('submit', (e) => { 
  e.preventDefault(); 
  validateStep(currentStep + 1); 
}); 
 
// Add event listeners to input fields to enable/disable the "Next" button and validate fields on blur 
const inputFields = form.querySelectorAll('input[required], select[required]'); 
inputFields.forEach((field) => { 
  field.addEventListener('blur', function () { 
    validateField(this); 
  }); 
 
  field.addEventListener('input', function () { 
    clearErrorMessage(this); 
    updateNextButtonState(); 
    updateCheckboxes(); 
  }); 
}); 
 
// Function to update form visibility based on current step 
function updateForm() { 
  tabs.forEach((tab, index) => { 
    if (index === currentStep) { 
      tab.classList.add('active'); 
    } else { 
      tab.classList.remove('active'); 
    } 
  }); 
 
  fieldsets.forEach((fieldset, index) => { 
    if (index === currentStep) { 
      fieldset.style.display = 'block'; 
    } else { 
      fieldset.style.display = 'none'; 
    } 
  }); 
 
  checkboxes.forEach((checkbox, index) => { 
    if (index <= currentStep) { 
      checkbox.checked = true; 
    } else { 
      checkbox.checked = false; 
    } 
  }); 
 
  // Hide or show navigation buttons based on current step 
  if (currentStep === 0) { 
    document.querySelector('.previous').style.display = 'none'; 
  } else { 
    document.querySelector('.previous').style.display = 'inline-block'; 
  } 
 
  if (currentStep === fieldsets.length - 1) { 
    document.querySelector('.next').style.display = 'none'; 
    document.querySelector('.submit').style.display = 'inline-block'; 
  } else { 
    document.querySelector('.next').style.display = 'inline-block'; 
    document.querySelector('.submit').style.display = 'none'; 
  } 
 
  // Hide all error messages in the current step 
  const currentStepFieldset = fieldsets[currentStep]; 
  const errorMessages = currentStepFieldset.querySelectorAll('.error-message'); 
  errorMessages.forEach((errorMessage) => { 
    errorMessage.textContent = ''; 
  }); 
 
  // Update the state of the "Next" button 
  updateNextButtonState(); 
} 
 
// Function to validate the form fields of a specific step 
function validateStep(step) { 
  const currentStepFieldset = fieldsets[step - 1]; 
  const requiredFields = currentStepFieldset.querySelectorAll( 
    'input[required], select[required]' 
  ); 
  let isValid = true; 
 
  requiredFields.forEach((field) => { 
    const isValidField = validateField(field); 
    if (!isValidField) { 
      isValid = false; 
    } 
  }); 
 
  if (isValid) { 
    if (step < fieldsets.length) { 
      currentStep = step; 
      updateForm(); 
    } else { 
      form.submit(); 
    } 
  } 
} 
 
// Function to validate a specific field and display an error message if empty 
function validateField(field) { 
  const value = field.value.trim(); 
  const errorContainer = field 
    .closest('.form-group') 
    .querySelector('.error-message'); 
 
  if (value === '') { 
    errorContainer.textContent = `Please enter ${field.name.replace( 
      /-/g, 
      ' ' 
    )}`; 
    return false; 
  } 
 
  errorContainer.textContent = ''; 
  return true; 
} 
 
// Function to clear the error message for a specific input field 
function clearErrorMessage(inputField) { 
  const errorContainer = inputField 
    .closest('.form-group',message)
  errorContainer.textContent = '';
} 
 
// Function to update the state of the "Next" button 
function updateNextButtonState() { 
  const currentStepFieldset = fieldsets[currentStep]; 
  const requiredFields = currentStepFieldset.querySelectorAll( 
    'input[required], select[required]' 
  ); 
  const isFormValid = Array.from(requiredFields).every( 
    (field) => field.value.trim() !== '' 
  ); 
  nextButton.disabled = !isFormValid; 
} 
 
// Function to update the state of checkboxes based on form completion 
function updateCheckboxes() { 
  checkboxes.forEach((checkbox, index) => { 
    if (index < currentStep) { 
      checkbox.checked = true; 
    } else { 
      checkbox.checked = false; 
    } 
  }); 
} 
 
// Initial state of the "Next" button 
updateNextButtonState(); 
 
// Check filled steps on load 
updateCheckboxes(); 
 
// Add event listeners to input fields to check filled steps 
inputFields.forEach((field) => { 
  field.addEventListener('input', updateCheckboxes); 
}); 
 
 
// Fetch countries 
const countryDropdown = document.getElementById('country'); 
const stateDropdown = document.getElementById('state'); 
const cityDropdown = document.getElementById('city'); 
const username = 'harshita_47'; 
 
// Fetch countries 
fetch(`http://api.geonames.org/countryInfoJSON?username=${username}`) 
  .then(response => response.json()) 
  .then(data => { 
    // Populate country dropdown 
    data.geonames.forEach(country => { 
      const option = document.createElement('option'); 
      option.value = country.countryName; 
      option.textContent = country.countryName; 
      countryDropdown.appendChild(option); 
    }); 
  }) 
  .catch(error => { 
    console.error('Error fetching countries:', error); 
  }); 
 
// Add event listener to country dropdown 
countryDropdown.addEventListener('change', () => { 
  const selectedCountry = countryDropdown.value; 
 
  // Fetch states based on selected country 
  fetch(`http://api.geonames.org/searchJSON?q=${selectedCountry}&username=${username}`) 
    .then(response => response.json()) 
    .then(data => { 
      // Clear existing options 
      stateDropdown.innerHTML = ''; 
      cityDropdown.innerHTML = ''; 
 
      // Populate state dropdown 
      data.geonames.forEach(state => { 
        const option = document.createElement('option'); 
        option.value = state.adminCode1; 
        option.textContent = state.adminName1; 
        stateDropdown.appendChild(option); 
      }); 
    }) 
    .catch(error => { 
      console.error('Error fetching states:', error); 
    }); 
}); 
 
// Add event listener to state dropdown 
stateDropdown.addEventListener('change', () => { 
  const selectedState = stateDropdown.value; 
 
  // Fetch cities based on selected state 
  fetch(`http://api.geonames.org/searchJSON?adminCode1=${selectedState}&username=${username}`) 
    .then(response => response.json()) 
    .then(data => { 
      // Clear existing options 
      cityDropdown.innerHTML = ''; 
 
      // Populate city dropdown 
      data.geonames.forEach(city => { 
        const option = document.createElement('option'); 
        option.value = city.geonameId; 
        option.textContent = city.name; 
        cityDropdown.appendChild(option); 
      }); 
    }) 
    .catch(error => { 
      console.error('Error fetching cities:', error); 
    }); 
}); 
const uploadOption = document.querySelector('.upload-option'); 
const uploadYesRadio = document.getElementById('upload-yes'); 
const photoInput = document.getElementById('photo'); 
 
uploadOption.addEventListener('change', () => { 
  if (uploadYesRadio.checked) { 
    photoInput.disabled = false; 
  } else { 
    photoInput.disabled = true; 
  } 
}); 
// $(document).ready(function() { 
//   $(".form-group input[type='text'], .form-group input[type='tel']").on( 
//     "click", 
//     function() { 
//       $(this).get(0).setSelectionRange(0,0); 
//     } 
//   ); 
// }); 
function validateMobileNumber() { 
  const mobileNumberField = document.getElementById('mobile-no'); 
  const mobileNumberError = mobileNumberField.nextE

lementSibling; 
 
  const mobileNumber = mobileNumberField.value.trim(); 
  const isValid = /^\d{10}$/.test(mobileNumber); 
 
  if (!isValid) { 
    mobileNumberField.classList.add('error-message'); 
    mobileNumberError.textContent = 'Please enter a valid 10-digit mobile number'; 
  } else { 
    mobileNumberField.classList.remove('error-message'); 
    mobileNumberError.textContent = ''; 
  } 
 
  return isValid; 
} 
 
// Get the input element 
var input = document.getElementById("mobile-no"); 
 
// Store the initial value 
var initialValue = input.value; 
 
// Add an event listener for input changes 
input.addEventListener("input", function() { 
  // Check if the input value has changed from the initial value 
  if (input.value !== initialValue) { 
    // Remove the 'start' class to prevent resetting the focus 
    input.classList.remove("start"); 
  } else { 
    // Add the 'start' class to reset the focus 
    input.classList.add("start"); 
  } 
}); 
 
// Get the input element 
var adharNoInput = document.getElementById("adhar-no"); 
 
// Store the initial value 
var adharNoInitialValue = adharNoInput.value; 
 
// Add an event listener for input changes 
adharNoInput.addEventListener("input", function() { 
  // Check if the input value has changed from the initial value 
  if (adharNoInput.value !== adharNoInitialValue) { 
    // Remove the 'start' class to prevent resetting the focus 
    adharNoInput.classList.remove("start"); 
  } else { 
    // Add the 'start' class to reset the focus 
    adharNoInput.classList.add("start"); 
  } 
}); 
 
 
// Aadhaar number validation 
const aadhaarNumberField = document.getElementById('adhar-no'); 
const aadhaarNumberError = document.querySelector('#adhar-no + .error-message'); 
 
if (aadhaarNumberField && aadhaarNumberError) { 
  aadhaarNumberField.addEventListener('blur', () => { 
    validateAadhaarNumber(); 
  }); 
} 
 
function validateAadhaarNumber() { 
  if (aadhaarNumberField && aadhaarNumberError) { 
    const aadhaarNumber = aadhaarNumberField.value.trim(); 
 
    if (!/^\d{12}$/.test(aadhaarNumber)) { 
      aadhaarNumberError.textContent = 'Aadhaar number must be a 12-digit numeric value'; 
      return false; 
    } else { 
      aadhaarNumberError.textContent = ''; 
      return true; 
    } 
  } 
 
  return false; 
} 
 
// Navigate to list view on form submission 
if (form) { 
  form.addEventListener('submit', (e) => { 
    e.preventDefault(); 
 
    if (validateForm()) { 
      // Form is valid, navigate to list view 
      window.location.href = 'list-view.html'; // Replace 'list-view.html' with your desired URL 
    } else { 
      // Form validation failed, display error messages 
      displayErrorMessages(); 
    } 
  }); 
} 
 
// Function to validate the entire form 
function validateForm() { 
  let isValid = true; 
 
  // Validate each required input field 
  const requiredFields = form.querySelectorAll('input[required], select[required]'); 
  requiredFields.forEach((field) => { 
    if (!validateField(field)) { 
      isValid = false; 
    } 
  }); 
 
  return isValid; 
} 
 
// Function to display error messages for empty fields 
function displayErrorMessages() { 
  const errorMessages = form.querySelectorAll('.error-message'); 
  errorMessages.forEach((errorMessage) => { 
    const inputField = errorMessage.previousElementSibling; 
    if (inputField && inputField.value.trim() === '') { 
      errorMessage.textContent = `Please enter ${inputField.name.replace(/-/g, ' ')}`; 
    }
  }); 
} 
 
// Function to validate a specific field and display an error message if empty 
function validateField(field) { 
  const value = field.value.trim(); 
  const errorContainer = field.closest('.form-group').querySelector('.error-message'); 
 
  if (value === '') { 
    errorContainer.textContent = `Please enter ${field.name.replace(/-/g, ' ')}`; 
    return false; 
  } 
 
  errorContainer.textContent = ''; 
  return true; 
}
document.addEventListener('DOMContentLoaded', function() {
    // Get the checkbox and address details fieldset elements
    const addressDetailsCheckbox = document.querySelector('.tab:nth-child(2) .tab-checkbox');
    const addressDetailsFieldset = document.querySelector('.address-details');
  
    // Hide the address details fieldset initially
    addressDetailsFieldset.style.display = 'none';
  
    // Add event listener to the checkbox
    addressDetailsCheckbox.addEventListener('change', function() {
      // Check if the checkbox is checked
      if (addressDetailsCheckbox.checked) {
        // Show the address details fieldset
        addressDetailsFieldset.style.display = 'block';
      } else {
        // Hide the address details fieldset
        addressDetailsFieldset.style.display = 'none';
      }
    });
  });
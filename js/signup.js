/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/


document.addEventListener('DOMContentLoaded', function() {
    var signUp = document.getElementById('signup');
    var stateSelect = signUp.elements['state'];
    var idx;
    var option;
    var state;

    for (idx = 0; idx < usStates.length; idx++) {
        option = document.createElement('option');
        state = usStates[idx];
        option.value = state.code;
        option.innerHTML = state.name;
        stateSelect.appendChild(option);
    }

    signUp.addEventListener('change', selectOccupation);
    var noThanks = document.getElementById('cancelButton')
    noThanks.addEventListener('click', confirmMove);
    var submit = document.getElementById('submitButton');
    signUp.addEventListener('submit', onSubmit);
});

function selectOccupation() {
    occupation = document.getElementById('occupation');
    var other = document.getElementById('occupationOther');
    if (occupation.value == 'other') {
        other.style.display = 'block';
    } else {
        other.style.display = 'none';
    }
}

function confirmMove() {
    if (window.confirm("Do you really want to leave the page?")) {
        window.location = 'http://google.com';
    }
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    if (occupation.value == 'other') {
        requiredFields.push('occupationOther');
    }
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; idx++) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    valid &= validateZip();
    valid &= validateAge();
    return valid;
}

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;

    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid';
    }
    return valid;
}

function onSubmit(eventObject) {
    try {
        var valid = validateForm(this);
    } catch(exception) {
        console.log(exception);
    }

    if (!valid && eventObject.preventDefault) {
        eventObject.preventDefault();
    }

    eventObject.returnValue = valid;
    return valid;
}

function validateZip() {
    var zipField = document.getElementById('zip');
    var zipRegExp = new RegExp('^\\d{5}$');
    if (zipRegExp.test(zipField.value)) {
        zipField.className = 'form-control';
        return true;
    } else {
        zipField.className = 'form-control invalid';
        return false;
    }
}

function validateAge() {
    var dob = document.getElementById('birthdate');
    var dobField = dob;
    var msgElem = document.getElementById('birthdateMessage');
    if (!dobField.value) {
        dobField.className = 'form-control invalid';
        return false;
    }
    dob = new Date(dob.value);
    var today = new Date();

    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }

    if (yearsDiff < 13) {
        msgElem.innerHTML = 'Sorry, you must be over 13 years of age to sign up!';
        dobField.className = 'form-control invalid';
        return false;
    } else {
        msgElem.innerHTML = '';
        dobField.className ='form-control';
        return true;
    }
}






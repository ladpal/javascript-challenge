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
    var choice = confirm("Do you really want to leave the page?");
        if (choice == true) {
            window.location.href = 'http://google.com';
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
    valid = validateZip();
    valid = validateAge();
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

function onSubmit(evt) {
    var valid = validateForm(this);

    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
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
    var dateField = document.getElementById('birthdate');
    var date = dateField.value;
    var day  = date.getUTCDate();
    var month = date.getUTCMonth();
    var year = date.getUTCFullYear();
    var current = new Date();
    var currentDay = current.getUTCDate();
    var currentMonth = current.getUTCMonth();
    var currentYear = current.getUTCFullYear();
    var oldEnough = true;
    if ((currentYear - year) < 13) {
        dateField.className = 'form-control invalid';
        oldEnough = false;
    } else if ((currentMonth - month) < 0) {
        dateField.className = 'form-control invalid';
        oldEnough = false;
    } else if ((currentDay - day) < 0) {
        dateField.className = 'form-control invalid';
        oldEnough = false;
    } else {
        dateField.className = 'form control';
        oldEnough = true;
    }
    if (oldEnough = false) {
        var message = document.getElementById('birthdateMessage');
        message.innerHTML = 'Sorry, you must be over 13 years of age to sign up!'
    }
    return oldEnough;
}


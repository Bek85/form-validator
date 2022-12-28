const form = document.getElementById('form'),
  username = document.getElementById('username'),
  email = document.getElementById('email'),
  password = document.getElementById('password'),
  confirmPassword = document.getElementById('confirmPassword');

const inputFieldNames = {
  username: 'Username',
  confirmPassword: 'Confirm Password',
  password: 'Password',
  email: 'E-mail',
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

const getFieldName = (input) => {
  return inputFieldNames[input.id]
    ? inputFieldNames[input.id]
    : input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkRequired = (inputArr) => {
  let isRequired = false;
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (checkRequired([username, email, password, confirmPassword])) {
    return;
  } else {
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordMatch(password, confirmPassword);
  }
});

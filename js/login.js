
window.addEventListener('load', () => {
    const preload = document.querySelector('.load-container');
    if (localStorage.getItem('user') && localStorage.getItem('pin')) {
        return window.location.replace('index.html');
    }
    preload.classList.add('load-container_fade');
    
})


//DOM Strings
const userName = document.getElementById('name');
const newUser = document.getElementById('username');
const newPin = document.getElementById('userpin');
const pin = document.getElementById('pin');
const userNameText = document.querySelector('.form__input-user');
const newUserText = document.querySelector('.signup__input-text');
const pinText = document.querySelector('.form__input-pin');
const newPinText = document.querySelector('.signup__input-pin');
const submitBtn = document.querySelector('.btn--full');
const signUpBtn = document.querySelector('.btn--signup');
const createAccount = document.querySelector('.btn--white');

//display sign up section
signUpBtn.addEventListener('click', event => {
    event.preventDefault();
    const signUpSection = document.querySelector('.signup__info');
    const signUpForm = document.querySelector('.signup__form');
    signUpSection.classList.add('signup__info-slideup');
    signUpForm.classList.add('signup-appear');
});


//username validation
// newUser.addEventListener('blur', () => {
//     if (!isNaN(newUser.value)) {
//         newUserText.textContent = 'Username must include letter';
//         newUserText.classList.add('appear');
//     } else {
//         newUserText.classList.remove('appear');
//     }
// });

// newPin.addEventListener('focus', () => {
//     newPinText.classList.add('appear');
// });

// //userPin Validation
// newPin.addEventListener('input', e => {
//     let inputData = parseFloat(e.data);
//     if (isNaN(inputData)) {
//         newPinText.textContent = 'Pin must include numbers 0-9 only'
//         newPinText.classList.add('appear');
//     } else {
//         newPinText.classList.remove('appear');
//     }
// });


//create new account
createAccount.addEventListener('click', event => {
    event.preventDefault();
    
    let userNameInput = newUser.value;
    let pinInput = parseFloat(newPin.value);
    
    if (isNaN(userNameInput) === false && isNaN(pinInput) === false) {
        newUserText.textContent = 'Username must include letter';
        newUserText.classList.add('appear');
    } else if (isNaN(pinInput) && isNaN(userNameInput)) {
        newPinText.textContent = 'Pin must include numbers 0-9 only';
        newPinText.classList.add('appear');
    } else if (localStorage.getItem('user') && localStorage.getItem('pin')) {
        newPinText.textContent = 'There is an exisiting user';
        newPinText.classList.add('appear');
    } else if (isNaN(userNameInput) === true && isNaN(pinInput) === false) {
        console.log(!isNaN(pinInput));
        localStorage.setItem('user', userNameInput);
        localStorage.setItem('pin', pinInput);
        localStorage.setItem('loggedIn', true);
        window.location.replace('index.html');
    }
});


// submitBtn.addEventListener('click', event => {
//     event.preventDefault();
//     let userNameInput = userName.value;
//     let pinInput = parseFloat(pin.value);
//     let curUserName = localStorage.getItem('user');
//     let curPin = parseFloat(localStorage.getItem('pin'));
//     //console.log(pinInput === curPin);

//     if (userNameInput !== curUserName || pinInput !== curPin) {
//         pinText.textContent = 'Username or Pin is incorrect';
//         pinText.classList.add('appear');
//     } else if (userNameInput === curUserName && pinInput === curPin) {
//         window.location.replace('index.html');
//     }


// });

// async function getQoute() {
//     const response = await fetch('https://cors-anywhere.herokuapp.com/https://sv443.net/jokeapi/category/Programming?blacklistFlags=nsfw,religious,political');
//     const data = await response.json()
//     console.log(data.joke);
// };

// getQoute();
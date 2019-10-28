
/*
 * Override default toString method
 * @coefficients este un dictionar ce contine puterile lui X si coeficientii
 * @grad este gradul polinomului
*/
function polynomToString(coefficients, grad) {
    message = ``

    for (i = grad; i >= 0; i--) {
        if (coefficients[i] % 2 == 1 || coefficients[i] % 2 == -1) {   
            if (message != '') {
                message += '+ '
            }

            if (i == 0) {
                message += `1`
            } else if (i == 1) {
                message += `X `
            } else {
                message += `X^${i} `
            }
        }
    }

    if (message == '') return '0';
    return message;
}


// To String for UI
function polynomToStringUI(coefficients, grad) {
    message = ``

    for (i = grad; i >= 0; i--) {
        if (coefficients[i] % 2 == 1 || coefficients[i] % 2 == -1) {
            if (message != '') {
                message += '&#8853; '
            }

            if (i == 0) {
                message += `1`
            } else if (i == 1) {
                message += `X `
            } else {
                message += `X<sup>${i}</sup> `
            }
        }
    }

    if (message == '') return '0';
    return message;
}

// Binary version
/*
 * Reprezentare binara a polinomului
 *
*/
function getBinary(coefficients, grad) {
    coefficients_list = []
    message = ''

    for (key in coefficients) {
        if (coefficients[key] != 0) {
            coefficients_list.push(parseInt(key))
        }
    }

    for (i = grad; i >= 0; i--) {
        if (coefficients_list.includes(i)) {
            message += '1'
        } else {
            message += '0'
        }
    }

    return message;
}

const actionBtnCode = document.querySelector('.codificare-btn')
const actionBtnDecode = document.querySelector('.decodificare-btn')
const resultContainer = document.querySelector('.result-container')
const resultContainerDecode = document.querySelector('.result-container-decode')
const inputs = document.querySelectorAll('.user-input')
const tabs = document.querySelectorAll('.tab')
const codificare = document.querySelector('.codificare')
const decodificare = document.querySelector('.decodificare')
const values = document.querySelectorAll('.valuex')

let canDo

// Event listener for 1st btn
actionBtnCode.addEventListener('click', () => {
    if (inputs[0].value && inputs[1].value && String(inputs[1].value).includes('1')) {
        resultContainer.style.display = 'block';
        canDo = true
    } else {
        alert('Completati ambele campuri!')
        canDo = false
    }
})

// Event listener for 2nd btn
actionBtnDecode.addEventListener('click', () => {
    if (inputs[2].value && inputs[3].value && String(inputs[2].value).includes('1')) {
        resultContainerDecode.style.display = 'block';
        canDo = true
    } else {
        alert('Completati ambele campuri!')
        canDo = false
    }
})

// Clear inputs
function clearInput() {
    inputs.forEach(input => {
        input.value = ''
    })
    resultContainer.style.display = 'none';
}

// Clear values
function clearValues() {
    values.forEach(value => {
        value.innerHTML = ''
    })
}

tabs[0].addEventListener('click', () => {
    if(!tabs[0].classList.contains('active')) {
        tabs[0].classList.toggle('active')
        tabs[1].classList.toggle('active')
    }
})

tabs[1].addEventListener('click', () => {
    if(!tabs[1].classList.contains('active')) {
        tabs[0].classList.toggle('active')
        tabs[1].classList.toggle('active')
    }
})

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        clearInput()
        clearValues()
        resultContainerDecode.style.display = 'none';
        resultContainer.style.display = 'none';
    })
})

//Input filter
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.oldValue = "";
        textbox.addEventListener(event, function () {
            if (inputFilter(textbox.value)) {
                textbox.oldValue = textbox.value;
                textbox.oldSelectionStart = textbox.selectionStart;
                textbox.oldSelectionEnd = textbox.selectionEnd;
            } else if (textbox.hasOwnProperty("oldValue")) {
                textbox.value = textbox.oldValue;
                textbox.setSelectionRange(textbox.oldSelectionStart, textbox.oldSelectionEnd);
            }
        });
    });
}

// Restrict input to 0 and 1
inputs.forEach(input => {
    setInputFilter(input, function (value) {
        return (/^[0-1]+$/.test(value) || value == '')
    });
})

tabs[0].addEventListener('click', () => {
    decodificare.style.display = 'none';
    codificare.style.display = 'block';
})


tabs[1].addEventListener('click', () => {
    codificare.style.display = 'none';
    decodificare.style.display = 'block';
})


// Bind enter
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        e.preventDefault()
        if (tabs[0].classList.contains('active')) {
            actionBtnCode.click()
        } else {
            actionBtnDecode.click()
        }
    }
})
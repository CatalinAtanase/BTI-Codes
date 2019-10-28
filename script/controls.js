const codificareBtn = document.querySelector('.codificare-hamming')
const decodificareBtn = document.querySelector('.decodificare-hamming')
const infoContainerCode = document.querySelector('.info-container-code')
const infoContainerDecode = document.querySelector('.info-container-decode')
const inputCode = document.querySelector('.hamming-code-input')
const inputDecode = document.querySelector('.hamming-decode-input')
const executeBtnCode = document.querySelector('.execute-btn-hamming-code')
const executeBtnDecode = document.querySelector('.execute-btn-hamming-decode')
const inputs = document.querySelectorAll('input')
const messageContainers = document.querySelectorAll('.messages-container')
const codeContainer = document.querySelector('.hamming-code')
const codeMessages = document.querySelector('.messages-container-code-hamming')
const codeResult = document.querySelector('.result-container-code-hamming')
const decodeContainer = document.querySelector('.hamming-decode')
const decodeMessages = document.querySelector('.messages-container-decode-hamming')
const decodeResult = document.querySelector('.result-container-decode-hamming')

let canDo


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

function clearInput() {
    inputs.forEach(input => {
        input.value = ''
    })
    infoContainerCode.style.display = 'none';
    infoContainerDecode.style.display = 'none';
}

codificareBtn.addEventListener('click', () => {
    codeContainer.style.display = 'block'
    decodeContainer.style.display = 'none'
    clearInput()

    if(!codificareBtn.classList.contains('active')) {
        codificareBtn.classList.toggle('active')
        decodificareBtn.classList.toggle('active')
    }
})

decodificareBtn.addEventListener('click', () => {
    decodeContainer.style.display = 'block'
    codeContainer.style.display = 'none'
    clearInput()

    if(!decodificareBtn.classList.contains('active')) {
        decodificareBtn.classList.toggle('active')
        codificareBtn.classList.toggle('active')
    }
})

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        e.preventDefault()
        if (codificareBtn.classList.contains('active')) {
            executeBtnCode.click()
        } else {
            executeBtnDecode.click()
        }
    }
})

executeBtnCode.addEventListener('click', () => {
    if(inputCode.value) {
        infoContainerCode.style.display = 'block'
        canDo = true
    } else {
        alert("Completati campul")
        canDo = false
    }
})

executeBtnDecode.addEventListener('click', () => {
    if(inputDecode.value && inputDecode.value.length > 2) {
        infoContainerDecode.style.display = 'block'
        canDo = true
    } else {
        alert("Completati campul cu cel putin 3 cifre.")
        canDo = false
    }
})





let display = document.getElementById('summe');
let buttons = Array.from(document.getElementsByTagName('button'));

buttons.map(button => {
    button.addEventListener('click', (e) => {
        if (display.innerText === "Error" && e.target.innerText !== 'C') {
            return;
        }
        switch (e.target.innerText) {
            case 'C':
                display.innerText = '0';
                break;
            case '=':
                try {
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = "Error";
                }
                break;
            case 'CE':
            case '⌫': // Add functionality for Backspace
                if (display.innerText.length > 1) {
                    display.innerText = display.innerText.slice(0, -1);
                } else {
                    display.innerText = '0';
                }
                break;
            default:
                if (display.innerText === '0') {
                    display.innerText = e.target.innerText;
                } else {
                    display.innerText += e.target.innerText;
                }
        }
    });
});


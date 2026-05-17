let display = document.getElementById('display');
const themeToggler = document.getElementById('theme-toggler');
const body = document.body;
const icons = themeToggler.querySelectorAll('i');

// --- Calculator Logic ---
function appendNumber(number) {
    if (display.value === 'Error') display.value = '';
    display.value += number;
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (display.value === '' || ['+', '-', '*', '/', '%'].includes(lastChar)) return;
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    if (display.value === 'Error') {
        display.value = '';
    } else {
        display.value = display.value.toString().slice(0, -1);
    }
}

function calculate() {
    try {
        if (display.value === '') return;
        let result = eval(display.value);
        if (!isFinite(result) || isNaN(result)) {
            display.value = "Error";
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = "Error";
    }
}

// --- Theme Toggler Logic ---
themeToggler.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    // Toggle active icon state
    icons.forEach(icon => {
        icon.classList.toggle('active');
    });

    // Optional: Save preference to LocalStorage so it remembers choice
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Check saved preference on load
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        icons[0].classList.remove('active'); // Sun
        icons[1].classList.add('active');    // Moon
    }
};

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.') appendNumber(key);
    else if (['+', '-', '*', '/', '%'].includes(key)) appendOperator(key);
    else if (key === 'Enter' || key === '=') calculate();
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape') clearDisplay();
});
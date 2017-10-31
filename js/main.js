// // UI elements
// let deviceNameLabel = document.getElementById('device-name');
// let connectButton = document.getElementById('connect');
// let disconnectButton = document.getElementById('disconnect');
// let terminalContainer = document.getElementById('terminal');
// let sendForm = document.getElementById('send-form');
// let inputField = document.getElementById('input');
//
// // Helpers
// let defaultDeviceName = 'Terminal';
// let terminalAutoScrollingLimit = terminalContainer.offsetHeight / 2;
// let isTerminalAutoScrolling = true;
//
// function scrollElement(element) {
//   let scrollTop = element.scrollHeight - element.offsetHeight;
//
//   if (scrollTop > 0) {
//     element.scrollTop = scrollTop;
//   }
// }
//
// function logToTerminal(message, type = '') {
//   let element = '<div' + (type ? ' class="' + type + '"' : '') + '>' + message +
//       '</div>';
//
//   terminalContainer.insertAdjacentHTML('beforeend', element);
//
//   if (isTerminalAutoScrolling) {
//     scrollElement(terminalContainer);
//   }
// }

let connectButton = document.getElementById('connect');
let disconnectButton = document.getElementById('disconnect');

document.querySelectorAll( '.cmd' ).forEach( d => d.addEventListener( 'click', e => {
    console.log( d.innerText );
    terminal.send( d.innerText );
} ) );

// Obtain configured Bluetooth Terminal instance
let terminal = new BluetoothTerminal();

// Override `receive` method to log incoming data to the terminal
terminal.receive = function(data) {
    console.log(data, 'in');
};

// Override default log method to output messages to the terminal and console
// terminal._log = function(...messages) {
//     // We cannot use `super._log()` here
//     messages.forEach(message => {
//         console.log(message);
//     });
// };

// Implement own send function to log outcoming data to the terminal
function send(data) {
    terminal.send(data).then(() => console.log(data, 'out')).catch(error => console.log(error));
}

// Bind event listeners to the UI elements
connectButton.addEventListener('click', function() {
    terminal.connect().then(() => {
        // deviceNameLabel.textContent = terminal.getDeviceName()
        //     ? terminal.getDeviceName()
        //     : defaultDeviceName;
        console.log( `connected to ${terminal.getDeviceName()}`)
    });
});

disconnectButton.addEventListener('click', function() {
    terminal.disconnect();
    console.log( 'disconnected' );
    // deviceNameLabel.textContent = defaultDeviceName;
});

// sendForm.addEventListener('submit', function(event) {
//     event.preventDefault();
//
//     send(inputField.value);
//
//     inputField.value = '';
//     inputField.focus();
// });

// Switch terminal auto scrolling if it scrolls out of bottom
// terminalContainer.addEventListener('scroll', function() {
//     let scrollTopOffset = terminalContainer.scrollHeight - terminalContainer.offsetHeight - terminalAutoScrollingLimit;
//
//     isTerminalAutoScrolling = (scrollTopOffset < terminalContainer.scrollTop);
// });

addEventListener('load', e => {
    mobileConsole.init();
    console.log('v0.2');
    console.log('no sw.js');
});

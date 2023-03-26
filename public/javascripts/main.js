const socket = io()

// Finde das HTML-Element für den Verbindingsstatus
const ioStatus = document.getElementById("ioStatus");
const elementBesucher = document.getElementById("besucher")
const elementMomentan = document.getElementById("momentan")
const elementAusgetreten = document.getElementById("ausgetreten")
const elementHeute = document.getElementById("heute")

socket.on('connect', () => {
    ioStatus.innerText = 'Verbindungsstatus: verbunden'
    ioStatus.classList.replace('disconnected', 'connected')
})

socket.on('disconnect', () => {
    ioStatus.innerText = 'Verbindungsstatus: getrennt'
    ioStatus.classList.replace('connected', 'disconnected')
})

socket.on('BesucherZaehler', (zaehlerStand) => {
    // console.log(zaehlerStand)    
    elementBesucher.innerText = zaehlerStand.besucher
    elementMomentan.innerText = zaehlerStand.momentan
    elementAusgetreten.innerText = zaehlerStand.ausgetreten
    elementHeute.innerText = zaehlerStand.heute
})

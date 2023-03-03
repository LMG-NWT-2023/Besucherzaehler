
// Die möglichen Zustände - damit wir beim Entwickeln eine ordenliche Code-Completion Unterstützung bekommen. 

const States = {
    S0: "S0",
    E1: "E1",
    E2: "E2",
    E3: "E3",
    E4: "E4",
    A1: "A1",
    A2: "A2",
    A3: "A3",
    A4: "A4",
    ERROR: "ERROR",
}
exports.States = States
class SensorStateMachine {
    state = States.S0
    ausgetreten = 0
    eingetreten = 0
    startDerMessung = 0
    constructor(aktuellerStand){
        if (aktuellerStand){
            this.ausgetreten = aktuellerStand.ausgetreten
            this.eingetreten = aktuellerStand.besucher
        }
    }

    aktuellerStand() {
        return {
            momentan: this.eingetreten-this.ausgetreten,
            besucher: this.eingetreten, 
            ausgetreten: this.ausgetreten
        }
    }

    momentan() {
        return this.eingetreten - this.ausgetreten
    }
    messungBeginnen() {
        this.startDerMessung = (new Date()).getTime()
    }

    istAuszeitVorbei() {
        const now = new Date()
        return (now.getTime() - this.startDerMessung > 1000)
    }


    log() {
        console.log(`SensorStateMachine.state: ${this.state} - eingetreten: ${this.eingetreten} - ausgetreten: ${this.ausgetreten} - besucher: ${this.momentan()}`)
    }

    onChange( callback) {
        this.onChangeCallback = callback
    }

    incrEingetreten() {
        this.eingetreten++
        if(this.onChangeCallback) {
            this.onChangeCallback(this.aktuellerStand())
        }
    }

    incrAusgetreten() {
        this.ausgetreten++
        if(this.onChangeCallback) {
            this.onChangeCallback(this.aktuellerStand())
        }
    }
    input(newValues) {
        const index = newValues.Sensor1 * 1 + newValues.Sensor2 * 2
        const m_Inputs = ["0;0", "1;0", "0;1", "1;1"][index]

        switch (this.state) {
            case States.S0:

                if (m_Inputs === "1;0") {
                    this.state = States.A1
                }
                else if (m_Inputs === "0;1") {
                    this.state = States.E1
                }
                break
            case States.A1:

                //Cases für Verlassensprozess
                if (m_Inputs === "1;1") {
                    this.state = States.A2
                }
                else if (m_Inputs === "0;0" || m_Inputs === "0;1") {
                    this.state = States.S0
                }
                break

            case States.A2:

                if (m_Inputs === "0;1") {
                    this.state = States.A3
                }
                else if (m_Inputs === "0;0") {
                    this.state = States.S0
                }
                // Wackler - wir bleiben im Zustand A2
                else if (m_Inputs === "1;0") {
                    this.state = States.A2
                }
                break

            case States.A3:

                if (m_Inputs === "0;0") {
                    this.state = States.A4
                    this.messungBeginnen()
                    this.incrAusgetreten()
                }
                break

            case States.A4:

                if (this.istAuszeitVorbei()) {
                    this.state = States.S0
                    this.input(newValues)
                }
                break

            case States.E1:

                if (m_Inputs === "1;1") {
                    this.state = States.E2
                }
                else if (m_Inputs === "0;0" || m_Inputs === "1;0") {
                    this.state = States.S0
                }
                break

            case States.E2:

                if (m_Inputs === "1;0") {
                    this.state = States.E3
                }
                else if (m_Inputs === "0;0") {
                    this.state = States.S0
                }
                // Wackler - wir bleiben im Zustand E2
                else if (m_Inputs === "0;1") {
                    this.state = States.E2
                }
                break

            case States.E3:

                if (m_Inputs === "0;0") {
                    this.state = States.E4
                    this.messungBeginnen()
                    this.incrEingetreten()
                }
                break

            case States.E4:

                if (this.istAuszeitVorbei()) {
                    this.state = States.S0
                    this.input(newValues)
                }
                break

            default:
                this.state = States.ERROR
                break
        }
        this.log()
    }
}
exports.SensorStateMachine = SensorStateMachine


// Besucher betritt den Raum 
/*
const stateMachineLinks = new StateMachine()
const stateMachineRechts = new StateMachine()
console.log('---- links')

stateMachineLinks.input({ Sensor1: 1, Sensor2: 0 })
stateMachineLinks.input({ Sensor1: 1, Sensor2: 1 })
stateMachineLinks.input({ Sensor1: 1, Sensor2: 0 })
stateMachineLinks.input({ Sensor1: 0, Sensor2: 0 })

console.log('---- links')
    
stateMachineLinks.input({ Sensor1: 0, Sensor2: 1 })
stateMachineLinks.input({ Sensor1: 1, Sensor2: 1 })
stateMachineLinks.input({ Sensor1: 1, Sensor2: 0 })
stateMachineLinks.input({ Sensor1: 0, Sensor2: 0 })
stateMachineLinks.log()
// jetzt sollte Besucher eins mehr sein

console.log('---- rechts')
// Besucher verläßt den Raum
stateMachineRechts.input({ Sensor1: 1, Sensor2: 0 })
stateMachineRechts.input({ Sensor1: 1, Sensor2: 1 })
stateMachineRechts.input({ Sensor1: 0, Sensor2: 1 })
stateMachineRechts.input({ Sensor1: 0, Sensor2: 0 })
stateMachineRechts.log()
// Besucher dreht beim Betreten um

*/

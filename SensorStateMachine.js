
// Die möglichen Zustände - damit wir beim Entwickeln eine ordenliche Code-Completion Unterstützung bekommen. 

const States = {
    S0: "S0",
    E1: "E1",
    E2: "E2",
    E3: "E3",
    A1: "A1",
    A2: "A2",
    A3: "A3",
    ERROR: "ERROR",
}
exports.States = States
var myState = States.S0
console.log(myState)

class StateMachine {
    state = States.S0
    besucher = 0

    log() {
        console.log(this.state)
    }

    input(newValues) {
        switch (this.state) {
            case States.S0:
                // zwei Zeige - Eingane und Ausgang
                if (newValues.Sensor1 === 0 && newValues.Sensor2 === 1) {
                    this.state = States.A1
                } else if (newValues.Sensor1 === 1 && newValues.Sensor2 === 0) {
                    this.state = States.E1
                } else {
                    this.state = States.S0
                }
                break
            case States.A2:
                if (newValues.Sensor1 === 0 && newValues.Sensor2 === 1) {
                    this.state = States.A1
                } else {
                    this.state = States.ERROR
                }
                break
            case States.A3:
                if (newValues.Sensor1 === 0 && newValues.Sensor2 === 1) {
                    this.state = States.A1
                } else {
                    this.state = States.ERROR
                }
                break
            case States.A1:
                if (newValues.Sensor1 === 0 && newValues.Sensor2 === 1) {
                    this.state = States.A1
                } else {
                    this.state = States.ERROR
                }
                break
            case States.A2:
                if (newValues.Sensor1 === 0 && newValues.Sensor2 === 0) {
                    this.state = States.S0
                    this.besucher++
                } else {
                    this.state = States.ERROR
                }
                break

            default:
                this.state = States.ERROR
                break
        }
        this.log()
    }
}
exports.StateMachine = StateMachine

// Besucher betritt den Raum 

const stateMachine = new StateMachine()

stateMachine.input({ Sensor1: 0, Sensor2: 1 })
stateMachine.input({ Sensor1: 1, Sensor2: 1 })
stateMachine.input({ Sensor1: 1, Sensor2: 0 })
stateMachine.input({ Sensor1: 0, Sensor2: 0 })
// jetzt sollte Besucher eins mehr sein

// Besucher verläßt den Raum

// Besucher dreht beim Betreten um


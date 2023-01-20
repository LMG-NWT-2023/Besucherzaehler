
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
class StateMachine
{
    state = States.S0
    ausgetreten = 0
    eingetreten = 0
    besucher() {
        return this.eingetreten - this.ausgetreten
    }

    log() {
        console.log(`SensorStateMachine.state: ${this.state} - eingetreten: ${this.eingetreten} - ausgetreten: ${this.ausgetreten}`)
   }

    input(newValues)
     {
        const index = newValues.Sensor1*1 + newValues.Sensor2*2
        const m_Inputs = ["a", "b", "d", "c"][index]

        switch (this.state) {
            case States.A1:

                //Cases für Verlassensprozess
                if(m_Inputs === ("c"))
                {
                    this.state = States.A2
                }
                else if(m_Inputs === ("a") || m_Inputs === ("d"))
                {
                    this.state = States.S0
                } 
                break

            case States.A2:

                if(m_Inputs === ("d")) 
                {
                    this.state = States.A3
                } 
                else if(m_Inputs === ("a") || m_Inputs === ("b")){
                    this.state = States.S0
                }
                break

            case States.A3:

                if (m_Inputs === ("a"))
                {
                    this.state = States.S0	
                    this.ausgetreten++
                }
                break

            case States.S0:

                if(m_Inputs === ("b"))
                {
                    this.state = States.A1
                } 
                else if(m_Inputs === ("d")) 
                {
                    this.state = States.E1
                }
                break

            case States.E1:

                if(m_Inputs === ("c"))
                {
                    this.state = States.E2
                }
                else if(m_Inputs === ("a") || m_Inputs === ("b"))
                {
                    this.state = States.S0
                }
                break

            case States.E2:

            if(m_Inputs === ("b"))
            {
                this.state = States.E3
            }
            else if(m_Inputs === ("a") || m_Inputs === ("d"))
            {
                this.state = States.S0
            }
            break

            case States.E3: 

            if(m_Inputs === ("a"))
            {
                this.state = States.S0
                this.eingetreten++
            }
            break

            default:
                this.state = States.ERROR
                break
        }
        // this.log()
    }
}
exports.StateMachine = StateMachine


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

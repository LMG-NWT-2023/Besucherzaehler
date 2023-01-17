
// Die möglichen Zustände - damit wir beim Entwickeln eine ordenliche Code-Completion Unterstützung bekommen. 

const m_Inputs = "a"

var verlassen = 0;
var besucher

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

    log() {
        console.log(`SensorStateMachine.state: ${this.state} - Besucher: ${this.besucher}`)
   }

    input(newValues)
     {
        if(newValues.Sensor1 === 0 && newValues.Sensor2 === 0)
        {
            m_Inputs = ("a")
        }
        else if(newValues.Sensor1 === 1 && newValues.Sensor2 === 0)
        {
            m_Inputs = ("b")
        }
        else if(newValues.Sensor1 === 1 && newValues.Sensor2 === 1)
        {
            m_Inputs = ("c")
        }
        else if(newValues.Sensor1 === 0 && newValues.Sensor === 1)
        {
            m_Inputs = ("d")
        }

        switch (this.state) {
            case States.A1:

                //Cases für Verlassensprozess
                if(m_Inputs === ("c"))
                {
                    this.state = States.A2
                }
                else if(m_Inputs === ("a") || m_Inputs === ("d"))
                {
                    this.state = States.E1
                } 
                break

            case States.A2:

                if(m_Inputs === ("d")) 
                {
                    this.state = States.A3
                } 
                else if(m_Inputs === ("a") || m_Inputs === ("b")){
                    this.state = States.ERROR
                }
                break

            case States.A3:

                if (m_Inputs === ("a"))
                {
                    this.state = States.S0	
                    verlassen --;
                }
                break

            case States.S0:

                if(m_Input === ("b"))
                {
                    this.state = States.A1
                } 
                else if(m_Input === ("d")) 
                {
                    this.state = States.E1
                }
                break

            case States.E1:

                if(m_Input === ("c"))
                {
                    this.state = States.E2
                }
                else if(m_Inputs === ("a") || m_Inputs === ("b"))
                {
                    this.state = State.S0
                }
                break

            case States.E2:

            if(m_Input === ("b"))
            {
                this.state = State.E3
            }
            else if(m_Inputs === ("a") || m_Inputs === ("d"))
            {
                this.state = State.S0
            }
            break

            case States.E3: 

            if(m_Input === ("a"))
            {
                this.state = State.S0
                besucher ++
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
stateMachine.log()

stateMachine.input({ Sensor1: 0, Sensor2: 1 })
stateMachine.input({ Sensor1: 1, Sensor2: 1 })
stateMachine.input({ Sensor1: 1, Sensor2: 0 })
stateMachine.input({ Sensor1: 0, Sensor2: 0 })
// jetzt sollte Besucher eins mehr sein

// Besucher verläßt den Raum

// Besucher dreht beim Betreten um


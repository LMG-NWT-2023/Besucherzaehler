const assert = require('assert')
const {States, SensorStateMachine} = require('../SensorStateMachine')

describe('SendorStateMachine', function () {
  it('soll mit dem initialen Zustand State S0 beginnen', () => {
    const stateMachine = new SensorStateMachine()
    assert.equal(stateMachine.state, States.S0)
  })
  it('soll einen eintretenden Besucher erkennen', ()=> {
    const stateMachine = new SensorStateMachine()

    assert.equal(stateMachine.momentan(), 0)
    stateMachine.input({ Sensor1: 0, Sensor2: 1 })
    assert.equal(stateMachine.state, States.E1)
    stateMachine.input({ Sensor1: 1, Sensor2: 1 })
    assert.equal(stateMachine.state, States.E2)
    stateMachine.input({ Sensor1: 1, Sensor2: 0 })
    assert.equal(stateMachine.state, States.E3)
    stateMachine.input({ Sensor1: 0, Sensor2: 0 })
    assert.equal(stateMachine.state, States.E4)
    assert.equal(stateMachine.momentan(), 1)
  })
  it('soll einen austretenden Besucher erkennen', ()=> {
    const stateMachine = new SensorStateMachine()

    assert.equal(stateMachine.momentan(), 0)

    stateMachine.input({ Sensor1: 1, Sensor2: 0 })
    assert.equal(stateMachine.state, States.A1)
    stateMachine.input({ Sensor1: 1, Sensor2: 1 })
    assert.equal(stateMachine.state, States.A2)
    stateMachine.input({ Sensor1: 0, Sensor2: 1 })
    assert.equal(stateMachine.state, States.A3)
    stateMachine.input({ Sensor1: 0, Sensor2: 0 })
    assert.equal(stateMachine.state, States.A4)
    assert.equal(stateMachine.momentan(), -1)
  })

  it('soll erkennen wenn ein eintretender Besucher IN der Tür umdreht', () => {
    const stateMachine = new SensorStateMachine()

    assert.equal(stateMachine.momentan(), 0)
    stateMachine.input({ Sensor1: 0, Sensor2: 1 })
    stateMachine.input({ Sensor1: 1, Sensor2: 1 })
    stateMachine.input({ Sensor1: 0, Sensor2: 1 })
    stateMachine.input({ Sensor1: 0, Sensor2: 0 })
    assert.equal(stateMachine.momentan(), 0)
    assert.equal(stateMachine.state, States.S0)
  })
  it('soll erkennen wenn ein eintretender Besucher VOR der Tür umdreht', () => {
    const stateMachine = new SensorStateMachine()

    assert.equal(stateMachine.momentan(), 0)
    stateMachine.input({ Sensor1: 0, Sensor2: 1 })
    stateMachine.input({ Sensor1: 0, Sensor2: 0 })
    assert.equal(stateMachine.momentan(), 0)
    assert.equal(stateMachine.state, States.S0)
  })
  it('soll erkennen wenn ein austretender Besucher IN der Tür umdreht', () => {
    const stateMachine = new SensorStateMachine()

    assert.equal(stateMachine.momentan(), 0)
    stateMachine.input({ Sensor1: 1, Sensor2: 0 })
    stateMachine.input({ Sensor1: 1, Sensor2: 1 })
    stateMachine.input({ Sensor1: 1, Sensor2: 0 })
    stateMachine.input({ Sensor1: 0, Sensor2: 0 })
    assert.equal(stateMachine.momentan(), 0)
    assert.equal(stateMachine.state, States.S0)
  })
  it('soll erkennen wenn ein austretender Besucher VOR der Tür umdreht', () => {
    const stateMachine = new SensorStateMachine()

    assert.equal(stateMachine.momentan(), 0)
    stateMachine.input({ Sensor1: 1, Sensor2: 0 })
    stateMachine.input({ Sensor1: 0, Sensor2: 0 })
    assert.equal(stateMachine.momentan(), 0)
    assert.equal(stateMachine.state, States.S0)
  })
  describe('Änderungs-Event', () => {
    it('soll mich benachtichtigen wenn sich der Wert ändert', () => {
      var wurdeGerufen = false
      const stateMachine = new SensorStateMachine()

      assert.equal(stateMachine.momentan(), 0)

      stateMachine.onChange((aktuellerStand) => {
        wurdeGerufen = true
        assert.equal(stateMachine.state, States.E4)
        assert.equal(aktuellerStand.momentan, 1)
        assert.equal(aktuellerStand.besucher, 1)
        assert.equal(aktuellerStand.ausgetreten, 0)
      })

      stateMachine.input({ Sensor1: 0, Sensor2: 1 })
      stateMachine.input({ Sensor1: 1, Sensor2: 1 })
      stateMachine.input({ Sensor1: 1, Sensor2: 0 })
      stateMachine.input({ Sensor1: 0, Sensor2: 0 })

      assert.ok(wurdeGerufen)
    })
  })

}) 



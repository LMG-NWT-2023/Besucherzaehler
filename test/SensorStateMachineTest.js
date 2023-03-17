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
  it('soll mit einem Anfangswert beginnen', () => {
    const stateMachine = new SensorStateMachine()
    stateMachine.setzeAktuellenStand({momentan:4,besucher:6,ausgetreten:2})

    assert.equal(stateMachine.momentan(), 4)
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
  describe('Tageszähler', () => {
    it('soll das aktuelle Datum im aktuellen Stand angeben', () => {
      const stateMachine = new SensorStateMachine()

      stateMachine.input({ Sensor1: 0, Sensor2: 1 })
      stateMachine.input({ Sensor1: 1, Sensor2: 1 })
      stateMachine.input({ Sensor1: 1, Sensor2: 0 })
      stateMachine.input({ Sensor1: 0, Sensor2: 0 })

      assert.equal(stateMachine.momentan(), 1)
      const aktuellerStand = stateMachine.aktuellerStand()
      assert.equal(aktuellerStand.heute.length, 10)
    })
    it('soll das aktuelle Datum im aktuellen Stand angeben', () => {
      const stateMachine = new SensorStateMachine()
      stateMachine.setzeAktuellenStand({momentan:4,besucher:6,ausgetreten:2, heute: "01.03.2023"})
      const aktuellerStand = stateMachine.aktuellerStand()
      assert.equal(aktuellerStand.heute, "01.03.2023")
    })
    it('soll den Zäher auf Null setzten, wenn der aktuelle Stand von einem Tag in der Vergangenheit ist', () => {
      const stateMachine = new SensorStateMachine()
      stateMachine.setzeAktuellenStand({momentan:4,besucher:6,ausgetreten:2, heute: "01.03.2023"})

      const alterStand = stateMachine.aktuellerStand()
      assert.equal(alterStand.heute, "01.03.2023")
      assert.equal(alterStand.besucher, 6)
      // Person betritt den Raum
      stateMachine.input({ Sensor1: 0, Sensor2: 1 })
      stateMachine.input({ Sensor1: 1, Sensor2: 1 })
      stateMachine.input({ Sensor1: 1, Sensor2: 0 })
      stateMachine.input({ Sensor1: 0, Sensor2: 0 })

      const aktuellerStand = stateMachine.aktuellerStand()
      assert.notEqual(aktuellerStand.heute, "01.03.2023")
      assert.equal(aktuellerStand.besucher, 1)

    })
  })
}) 



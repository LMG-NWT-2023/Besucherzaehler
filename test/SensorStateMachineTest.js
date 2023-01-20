const assert = require('assert')
const {States, StateMachine} = require('../SensorStateMachine')

describe('SendorStateMachine', function () {
  describe('initialize', function () {
    it('should start with initial State S0', () => {
      const stateMachine = new StateMachine()
      assert.equal(stateMachine.state, States.S0)
    })
  })
}) 
const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const Tool = require('./tool')

module.exports = NewComponent

inherits(NewComponent, Component)
function NewComponent () {
  Component.call(this)
}

NewComponent.prototype.render = function () {
  const props = this.props
  const state = this.state

  return (
    h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: '#DDD',
        height:'100%',
        padding: '10px',
      },
    }, [
      h('h3','Toolbar'),
      h(Tool, {
        name: 'Token',
        isInstance: false,
      }),

      h(Tool, {
        name: 'Multisig',
        isInstance: false,
        color: '#AFA',
      }),

      h(Tool, {
        name: 'Oracle',
        isInstance: false,
        color: '#FAA'
      }),

    ])
  )
}

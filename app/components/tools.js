const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

module.exports = NewComponent

inherits(NewComponent, Component)
function NewComponent () {
  Component.call(this)
}

NewComponent.prototype.render = function () {
  const props = this.props

  return (
    h('div', {
      style: {
        background: '#DDD',
        height:'100%',
      },
    }, [
      h('h3','Toolbar'),
      h('ol', [
        h(Tool),
      ])
    ])
  )
}

const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

module.exports = NewComponent

inherits(NewComponent, Component)
function NewComponent () {
  Component.call(this)
	this.state = {
		isBeingDragged: false,
	}
}

NewComponent.prototype.render = function () {
	const { isBeingDragged } = this.state
	const	props = this.props
  const { name, color, id, isInstance } = props
	const x = props.x || 0
	const y = props.y || 0

  return (
    h('div', {
      draggable: true,
			key: `name: ${id}`,
      style: {
				display: 'inline-block',
				cursor: 'grab',
        background: color || '#CCF',
        minHeight: '50px',
				transform: `translate(${x}px, ${y}px)`,
      },
      onDragStart: this.onDragStart.bind(this),
			onDragEnd: this.onDragEnd.bind(this),
    }, name)
  )
}

NewComponent.prototype.onDragEnd = function (event) {
console.log('drag ended, showing')
	this.setState({ isBeingDragged: false })
}

NewComponent.prototype.onDragStart = function (event) {
	const { isInstance, name, id, color } = this.props

	if (isInstance) {
		event.dataTransfer.dropEffect = 'move'
		this.setState({ isBeingDragged: true })
	} else {
		event.dataTransfer.effectAllowed = 'copy'
		event.dataTransfer.dropEffect = 'copy'
	}

	const data = {
		isInstance,
		id,
		name,
		color,
	}

	const stringified = JSON.stringify(data)
	event.dataTransfer.setData('text/plain', stringified)
}


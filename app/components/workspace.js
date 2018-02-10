const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const Tool = require('./tool')

module.exports = NewComponent

inherits(NewComponent, Component)
function NewComponent () {
  Component.call(this)
  this.state = {
    hover: false,
    nodes: [],
  }
}

NewComponent.prototype.render = function () {
  const { state, props } = this
  const { hover, nodes } = state

  return (
    h('.workspace', {
      style: {
        background: hover ? '#999' : '#CCC',
        width: '100%',
        height:'100%',
        position: 'relative',
      },
      onDragOver: this.startDragStyle.bind(this),
      onDrop: this.onDrop.bind(this),
      onDragEnd: this.clearDragStyle.bind(this),
    }, [
      nodes.map((node) => {
        return h(Tool, node)
      })
    ])
  )
}

NewComponent.prototype.onDrop = function (event) {
  event.preventDefault()
  console.log('drop detected', event)
  const data = event.dataTransfer.getData('text')

  const { name, isInstance, color } = JSON.parse(data)
  const { offsetX, offsetY } = event.nativeEvent
  const { nodes } = this.state

  if (isInstance) {
    return this.updateNodePosition(event)
  }

    console.log('i guess not an instance', data)

  const id = String(Math.random())

  nodes.push({
    x: offsetX,
    y: offsetY,
    name,
    isInstance: true,
    key: id,
    color,
    id,
    draggable: false,
  })
  this.setState({ nodes })
  this.clearDragStyle()
}

NewComponent.prototype.updateNodePosition = function (event) {
  event.dataTransfer.dropEffect = 'copy'
  const data = event.dataTransfer.getData('text')
  const { id } = JSON.parse(data)
  const { offsetX, offsetY } = event.nativeEvent
  const nodes = this.state.nodes.map((node) => {
    if (node.id === id) {
      node.x = offsetX
      node.y = offsetY
    }
    return node
  })
  this.setState({ nodes })
}


NewComponent.prototype.startDragStyle = function (event) {
  event.preventDefault()

  const data = event.dataTransfer.getData('text')
  console.log('parsing: ', data)

  if (data) {
    const { isInstance } = JSON.parse(data)
    if (isInstance) return
  }

  event.dataTransfer.dropEffect = 'copy'
  this.setState({ hover: true })
}

NewComponent.prototype.clearDragStyle = function () {
  console.log('clearing drag style')
  this.setState({ hover: false })
}


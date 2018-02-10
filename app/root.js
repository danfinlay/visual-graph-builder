const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const Tools = require('./components/tools')
const Workspace = require('./components/workspace')

module.exports = connect(mapStateToProps)(AppRoot)

function mapStateToProps (state) {
  return {
    view: state.currentView,
    nonce: state.nonce,
  }
}

inherits(AppRoot, Component)
function AppRoot () {
  Component.call(this)
}

AppRoot.prototype.render = function () {
  const props = this.props
  return (
    h('.content', {
      style: {
        height: '100%',
      }
    }, [
      h('div', {
        style: {
        },
      }, [
        h('h1', `Graph Builder`),
      ]),

      h('.workspace', {
        style: {
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
        },
      }, [
        h(Tools),
        h(Workspace),
      ]),
    ])
  )
}

AppRoot.prototype.incrementNonce = function() {
  this.props.dispatch({
    type: 'INCREMENT_NONCE'
  })
}

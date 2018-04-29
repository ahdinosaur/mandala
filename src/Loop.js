import { Component } from 'react'

class Loop extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      time: Date.now(),
      intervalId: null
    }

    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    const { interval } = this.props
    const intervalId = window.setInterval(this.tick, interval)
    this.setState({ intervalId })
  }

  componentWillUnmount () {
    const { intervalId } = this.state
    window.clearInterval(intervalId)
    this.setState({ intervalId: null })
  }

  tick () {
    this.setState({
      time: Date.now()
    })
  }

  render () {
    const { render } = this.props
    const { time } = this.state
    return render({ time })
  }
}

Loop.defaultProps = {
  interval: (1000 / 30) // 30 fps
}

export default Loop

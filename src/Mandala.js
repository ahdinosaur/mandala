import React, { Component } from 'react'

const fn = function (theta, time) {
  // copied from https://substack.neocities.org/polar.html#cmV0dXJuIChEYXRlLm5vdygpLzEyZTEyLTMpLU1hdGguc2luKHgqRGF0ZS5ub3coKS8xMmUzLzIpKzI=
  return ((time/12e12-3)-Math.sin(theta*time/12e3/2)+2)/4
}

class Mandala extends Component {
  render () {
    const { time } = this.props
    return (
      <svg
        className="mandala"
        viewBox="-0.5 -0.5 1 1"
        preserveAspectRatio="xMidYMid meet"
      >
        <PolarLine
          fn={fn}
          time={time}
        />
      </svg>
    )
  }
}

function PolarLine (props) {
  const { fn, time } = props
  const points = generatePointsFromPolarFunction({ fn, time })
  const pointsString = points.map(({ x, y }) => `${x},${y}`).join(' ')

  return (
    <polyline
      stroke={'teal'}
      strokeWidth={0.0025}
      fill={'transparent'}
      points={pointsString}
    />
  )
}

function generatePointsFromPolarFunction (options) {
  const {
    fn,
    time,
    n = 8,
    step = 0.1
  } = options

  const startTheta = time / 1000

  var points = []
  for (var pointTheta = 0; pointTheta < 2 * Math.PI * n; pointTheta += step) {
    var r = fn(pointTheta, time)
    points.push(polarToCartesian(r, startTheta + pointTheta))
  }
  return points
}

function polarToCartesian (r, theta) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta)
  }
}

export default Mandala

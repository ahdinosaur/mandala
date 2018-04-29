import React, { Component } from 'react'
import { range } from 'lodash'

const mainLineFn = function (theta, time) {
  // copied from https://substack.neocities.org/polar.html#cmV0dXJuIChEYXRlLm5vdygpLzEyZTEyLTMpLU1hdGguc2luKHgqRGF0ZS5ub3coKS8xMmUzLzIpKzI=
  return ((time/12e12-3)-Math.sin(theta*time/12e3/2)+2)/4
}

const accentLineFn = function (theta, time) {
  return Math.sin(0.3 * theta * ((time / 12e12) - 3))
}

const bigTriangle = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 }
]

class Mandala extends Component {
  render () {
    const { time } = this.props
    return (
      <svg
        className="mandala"
        viewBox="-0.5 -0.5 1 1"
        preserveAspectRatio="xMidYMid meet"
      >
        <PolarTriangles
          n={7}
          shape={bigTriangle}
          time={time}
          color='#7ABA7A'
          offset={360/14}
        />
        <PolarTriangles
          n={7}
          shape={bigTriangle}
          time={time}
          color='#49375C'
          direction={-1}
        />
        <PolarLine
          fn={accentLineFn}
          time={time}
          color='#B76EB8'
          strokeWidth={0.001}
          direction={-1}
        />
        <PolarLine
          fn={mainLineFn}
          time={time}
          color='#028482'
          strokeWidth={0.0025}
        />
      </svg>
    )
  }
}

function PolarTriangles (props) {
  const {
    shape,
    n,
    time,
    color,
    offset = 0,
    direction = 1
  } = props

  return (
    <g>
      {range(n).map(i => {
        const startRotation = ((time / 10000) * 360) % 360
        const stepRotation = (i / n) * 360
        const rotation = direction * (startRotation + stepRotation + offset)
        return (
          <polygon
            fill={color}
            points={formatPoints(shape)}
            transform={`rotate(${rotation} 0 0)`}
          />
        )
      })}
    </g>
  )
}

function PolarLine (props) {
  const {
    fn,
    time,
    color,
    strokeWidth,
    direction
  } = props

  const points = generatePointsFromPolarFunction({ fn, time, direction })

  return (
    <polyline
      stroke={color}
      strokeWidth={strokeWidth}
      fill='transparent'
      points={formatPoints(points)}
    />
  )
}

function generatePointsFromPolarFunction (options) {
  const {
    fn,
    time,
    direction = 1,
    n = 8,
    step = 0.1
  } = options

  const startTheta = time / 1000

  var points = []
  for (var pointTheta = 0; pointTheta < 2 * Math.PI * n; pointTheta += step) {
    var r = fn(pointTheta, time)
    points.push(polarToCartesian(r, direction * (startTheta + pointTheta)))
  }
  return points
}

function polarToCartesian (r, theta) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta)
  }
}

function formatPoints (points) {
  return points.map(({ x, y }) => `${x},${y}`).join(' ')
}

export default Mandala

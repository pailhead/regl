const regl = require('../regl')()

const drawCheckerboard = regl({
  frag: `
  precision mediump float;
  uniform sampler2D texture;
  uniform float tick;
  varying vec2 uv;
  void main () {
    mat3 m = mat3(
      cos(tick), sin(tick), -1.1 + cos(tick),
      -sin(tick), cos(tick), 0,
      0, 0, 1);
    vec3 p = m * vec3(uv, 1);
    gl_FragColor = texture2D(texture, p.xy / p.z);
  }`,

  vert: `
  precision mediump float;
  attribute vec2 position;
  varying vec2 uv;
  void main () {
    uv = position;
    gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
  }`,

  attributes: {
    position: regl.buffer([
      -2, 0,
      0, -2,
      2, 2])
  },

  uniforms: {
    tick: (props, {count}) => 0.005 * count,

    texture: regl.texture({
      min: 'nearest mipmap linear',
      mag: 'nearest',
      wrap: 'repeat',
      data: [
        [255, 255, 255, 255, 0, 0, 0, 0],
        [255, 255, 255, 255, 0, 0, 0, 0],
        [255, 255, 255, 255, 0, 0, 0, 0],
        [255, 255, 255, 255, 0, 0, 0, 0],
        [0, 0, 0, 0, 255, 255, 255, 255],
        [0, 0, 0, 0, 255, 255, 255, 255],
        [0, 0, 0, 0, 255, 255, 255, 255],
        [0, 0, 0, 0, 255, 255, 255, 255]
      ]
    })
  },

  count: 3
})

regl.frame((props, context) => {
  drawCheckerboard()
})

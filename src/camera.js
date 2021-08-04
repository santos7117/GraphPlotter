const Camera = new (function(canvas, pos) {
  self = this

  self.position = pos
  self.orientation = vec3.create(0.0, 0.0, -1.0)
  self.up = Y_AXIS
  self.width = canvas.width
  self.height = canvas.height
  self.speed = 0.1
  self.sensitivity = 100.0
  self.view = mat4.create()
  
  
  // Constructor
  // initialize camera view
  mat4.lookAt(
    self.view,
    self.position,   // eye
    CENTER,         // center
    self.up,         // up
  )
})(canvas, INIT_EYE_POS)
const CoordAxes = new (function() {
  self = this

  self.primitive = gl.LINES
  self.posVertBuffId = null
  self.colorVertBuffId = null
  // self.normalsVertBuffId = null
  // Initialize vertices
  self.posVertices = new Float32Array([
    // X-axis coordinates
    ORIGIN.X,          ORIGIN.Y,         ORIGIN.Z,       
    INIT_AXES_RANGE,   ORIGIN.Y,         ORIGIN.Z,       
    // Y-axis coordinates
    ORIGIN.X,         ORIGIN.Y,          ORIGIN.Z,       
    ORIGIN.X,         INIT_AXES_RANGE,   ORIGIN.Z,       
    // Z-axis coordinates
    ORIGIN.X,          ORIGIN.Y,         ORIGIN.Z,        
    ORIGIN.X,          ORIGIN.Y,         INIT_AXES_RANGE,
  ])
  self.colorVertices = new Float32Array([
    // X-axis red
    1, 0, 0,
    1, 0, 0,
    // Y-axis green
    0, 1, 0,
    0, 1, 0,
    // Z-axis blue
    0, 0, 1,
    0, 0, 1,
  ])

  self.setVertices = (minX, maxX, minY, maxY, minZ, maxZ) => {
    let midX = ORIGIN.X
    let midY = ORIGIN.Y
    let midZ = ORIGIN.Z

    self.axesVertices = [
      minX, midY, midZ,
      maxX, midY, midZ,
      midX, minY, midZ,
      midX, maxY, midZ,
      midX, midY, minZ,
      midX, midY, maxZ,
    ]
  }
  
})()
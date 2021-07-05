"use strict";

// Global definitions used in this code:
//var Float32Array, Uint16Array, parseInt, parseFloat, console;

//-------------------------------------------------------------------------
// Build, create, copy and render 3D objects specific to a particular
// model definition and particular WebGL shaders.
//-------------------------------------------------------------------------
var SceneRenderer = function (controls) {

  let self = this; // Store a local reference to the new object.

  //-----------------------------------------------------------------------
  // Public function to render the scene.
  self.render = function () {
    // Clear the entire canvas window background with the clear color
    // out.display_info("Clearing the screen");
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Build individual transforms
    mat4.rotateX(rot_x_mat, rot_x_mat, self.angle_x);
    mat4.rotateY(rot_y_mat, rot_y_mat, self.angle_y);

    // Combine the transforms into a single transformation
    mat4.multiply(mvp_mat, mvp_mat, rot_x_mat);
    mat4.multiply(mvp_mat, mvp_mat, rot_y_mat);

    vob_model.coord_axes.render(mvp_loc, mvp_mat);
  };

  //-----------------------------------------------------------------------
  // Public function to delete and reclaim all rendering objects.
  self.delete = function () {

    // Clean up shader programs
    gl.deleteProgram(shaderProg);

    // Delete each model's VOB
    vob_model.coord_axes.delete();
    vob_model = null;

    // Remove all event handlers
    var id = '#' + 'graphics-canvas';
    $( id ).unbind( "mousedown", events.mouse_drag_started );
    $( id ).unbind( "mouseup", events.mouse_drag_ended );
    $( id ).unbind( "mousemove", events.mouse_dragged );
    events.removeAllEventHandlers();
    events = null;

    // Disable any animation
    self.animate_active = false;

    gl = null;
  };

  //-----------------------------------------------------------------------
  // Object constructor. One-time initialization of the scene.

  // Private variables
  // var out = new ErrorHandler(canvas)
  let gl = null;
  let vob_model = {};

  let mvp_loc = 0;
  let mvp_mat = mat4.create()
  let model_mat = mat4.create()
  let view_mat = mat4.create()
  let proj_mat = mat4.create()
  let rot_x_mat = mat4.create()
  let rot_y_mat = mat4.create()

  // Public variables that will be changed by event handlers.
  self.canvas = null;
  self.angle_x = 0.0;
  self.angle_y = 0.0;
  self.animate_active = false;

  // Get the rendering context for the canvas
  self.canvas = canvas;
  gl = getGL(self.canvas);

  // Set up the rendering program and set the state of webgl
  gl.useProgram(shaderProg);

  // Enable hidden-surface removal
  gl.enable(gl.DEPTH_TEST);

  // Remember the location of the transformation variable in the shader program
  mvp_loc = gl.getUniformLocation(shaderProg, "u_MVP");

  mat4.lookAt(
    view_mat,
    INIT_EYE_POS,   // eye
    [0, 0, 0],      // center
    Y_AXIS,         // up
  )
  mat4.perspective(
    proj_mat,
    45 * Math.PI/180,
    1,
    0.1,
    1000.0
  )
  mat4.multiply(mvp_mat, proj_mat, view_mat, model_mat)

  vob_model.coord_axes = new VOBModel(CoordAxes)

  // Set up callbacks for user and timer events
  var events;
  events = new EventHandler(self, controls);
  // events.animate();

  var id = '#graphics-canvas';
  $( id ).mousedown( events.mouse_drag_started );
  $( id ).mouseup( events.mouse_drag_ended );
  $( id ).mousemove( events.mouse_dragged );
};


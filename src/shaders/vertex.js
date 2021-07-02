const vertexShaderSrc = 
`
precision mediump float;
// attribute vec4 a_position;
// attribute vec4 a_normal;
// uniform mat4 transform;
// varying vec3 v_transformedNormal;

attribute vec4 u_ObjVert;
uniform mat4 u_WorldMat;
uniform mat4 u_ViewMat;
uniform mat4 u_ProjMat;

void main() {
    gl_Position = u_ProjMat * u_ViewMat * u_WorldMat * u_ObjVert;
    
    // gl_Position = transform * a_position;
    // v_transformedNormal = normalize(vec3(transform * a_normal));
    // v_transformedNormal = normalize(vec3(a_normal));
}
`

// module.exports = vertexShaderSource
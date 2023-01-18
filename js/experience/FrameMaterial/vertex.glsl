uniform float uTime;
uniform float uDistanceFromCenter;
uniform float uBendFactor;
uniform vec2 uFrequency;
varying vec2 vUv;

float PI = 3.141592653589793238;

void main() {
    vUv = ((uv - vec2(0.5)) * (0.8 - 0.2*uDistanceFromCenter*(2.0 - uDistanceFromCenter)) + vec2(0.5) ); // scaling to avoid blurry effect on Y when moving
    
    vec3 pos = position;
    pos.y += sin(PI*uv.x)*uBendFactor;
    pos.z += sin(PI*uv.x)*uBendFactor;
    pos.y += sin(uTime * 0.3) * 0.2;

    vUv.y -= sin(uTime * 0.3) * 0.052;
    
    float elevation = sin(pos.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(pos.y * uFrequency.y - uTime) * 0.1;
    pos.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
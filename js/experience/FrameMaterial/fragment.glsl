uniform float uDistanceFromCenter;
uniform sampler2D uTexture;
uniform float hasTexture;
uniform float shift;
uniform float scale;
uniform vec3 color;
uniform float opacity;
varying vec2 vUv;
varying vec3 vPosition;

void main()	{
    vec4 t = texture2D(uTexture, vUv);
    float bw = (t.r + t.b + t.g) / 3.0;
    gl_FragColor = t * 1.35;
    gl_FragColor.a = clamp(uDistanceFromCenter, 0.3, 1.0);
}
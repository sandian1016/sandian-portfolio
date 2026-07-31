import{r as _,j as Z}from"./index-C_QZilOV.js";import{R as H,P as I,T as D,M as N}from"./Triangle-GlFcswsc.js";const j=8,q=r=>{const o=r.replace("#","").padEnd(6,"0");return[parseInt(o.slice(0,2),16)/255,parseInt(o.slice(2,4),16)/255,parseInt(o.slice(4,6),16)/255]},$=r=>{const o=(r!=null&&r.length?r:["#A6C8FF","#5227FF","#FF9FFC"]).slice(0,j),l=Array.from({length:j},(s,u)=>q(o[Math.min(u,o.length-1)])),a=[0,0,0];return o.forEach((s,u)=>{a[0]+=l[u][0],a[1]+=l[u][1],a[2]+=l[u][2]}),{arr:l,count:o.length,avg:a.map(s=>s/o.length)}},J=`
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`,K=`
  precision highp float;

  uniform vec3 iResolution;
  uniform vec2 iMouse;
  uniform float iTime;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  uniform vec3 uColor6;
  uniform vec3 uColor7;
  uniform int uColorCount;
  uniform vec3 uBgColor;
  uniform vec3 uMouseColor;
  uniform float uSpeed;
  uniform int uStreakCount;
  uniform float uStreakWidth;
  uniform float uStreakLength;
  uniform float uGlow;
  uniform float uDensity;
  uniform float uTwinkle;
  uniform float uZoom;
  uniform float uBgGlow;
  uniform float uOpacity;
  uniform float uMouseEnabled;
  uniform float uMouseStrength;
  uniform float uMouseRadius;
  varying vec2 vUv;

  vec3 palette(float h) {
    int count = uColorCount;
    if (count < 1) count = 1;
    int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
    if (idx <= 0) return uColor0;
    if (idx == 1) return uColor1;
    if (idx == 2) return uColor2;
    if (idx == 3) return uColor3;
    if (idx == 4) return uColor4;
    if (idx == 5) return uColor5;
    if (idx == 6) return uColor6;
    return uColor7;
  }

  vec3 tanhv(vec3 x) {
    vec3 e = exp(-2.0 * x);
    return (1.0 - e) / (1.0 + e);
  }

  vec2 sceneC(vec2 frag, vec2 r) {
    vec2 P = (frag + frag - r) / r.x;
    float z = 0.0;
    float d = 1e3;
    vec4 O = vec4(0.0);
    for (int k = 0; k < 39; k++) {
      if (d <= 1e-4) break;
      O = z * normalize(vec4(P, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;
      d = 1.0 - sqrt(length(O * O));
      z += d;
    }
    return vec2(O.x, atan(O.z, O.y));
  }

  void mainImage(out vec4 outputColor, vec2 coordinates) {
    vec2 resolution = iResolution.xy;
    vec2 uv0 = (coordinates + coordinates - resolution) / resolution.x;
    float time = 0.1 * iTime * uSpeed + 9.0;
    float rings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));
    vec2 cell = vec2(5e-3, 6.28318530718 / rings);
    vec2 current = sceneC(coordinates, resolution);
    vec2 dx = sceneC(coordinates + vec2(1.0, 0.0), resolution) - current;
    vec2 dy = sceneC(coordinates + vec2(0.0, 1.0), resolution) - current;
    dx.y -= 6.28318530718 * floor(dx.y / 6.28318530718 + 0.5);
    dy.y -= 6.28318530718 * floor(dy.y / 6.28318530718 + 0.5);
    vec2 fw = abs(dx) + abs(dy);
    vec2 position = vec2(2.0, 1.0) * uv0 - (resolution / resolution.x) * vec2(0.0, 1.0);
    vec4 color = vec4(uBgColor * 90.0 * uBgGlow / (1e3 * dot(position, position) + 6.0), 0.0);

    float mouseGlow = 0.0;
    if (uMouseEnabled > 0.5) {
      vec2 mouse = (iMouse + iMouse - resolution) / resolution.x;
      float distanceToMouse = length(uv0 - mouse);
      mouseGlow = exp(-distanceToMouse * distanceToMouse / max(uMouseRadius * uMouseRadius, 1e-4)) * uMouseStrength;
      color.rgb += uMouseColor * mouseGlow * 0.25;
    }

    float width = 5e-4 * uStreakWidth;
    vec2 antialiasing = vec2(max(length(fw), 1e-5));
    float tail = 19.0 / max(uStreakLength, 0.05);
    for (int index = 0; index < 16; index++) {
      if (index >= uStreakCount) break;
      float layer = float(index) + 1.0;
      float randomValue = fract(sin(dot(vec2(layer, floor(current.x / cell.x + 0.5)), vec2(7.0, 11.0)) * 73.0));
      vec2 streak = current - (time + time * randomValue) * vec2(0.0, 1.0);
      streak -= floor(streak / cell + 0.5) * cell;
      float hue = fract(8663.0 * randomValue);
      vec3 streakColor = palette(hue);
      float weight = mix(1.5, 1.0 + sin(time + 7.0 * hue + 4.0), uTwinkle);
      weight *= 1.0 + mouseGlow * 2.0;
      vec2 inner = vec2(length(max(streak, vec2(-1.0, 0.0))), length(streak) - width) - width;
      vec2 smoothMask = vec2(1.0) - smoothstep(-antialiasing, antialiasing, inner);
      color.rgb += dot(smoothMask, vec2(exp(tail * streak.y), 3.0)) * streakColor * weight;
      current.x += cell.x / 8.0;
    }
    outputColor = vec4(sqrt(tanhv(max(color.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0))), uOpacity);
  }

  void main() {
    vec4 color;
    mainImage(color, vUv * iResolution.xy);
    gl_FragColor = color;
  }
`;function oe({className:r,dpr:o,paused:l=!1,colors:a=["#A6C8FF","#5227FF","#FF9FFC"],backgroundColor:s="#0A29FF",speed:u=.5,streakCount:M=2,streakWidth:w=1,streakLength:y=1,glow:k=1,density:F=.6,twinkle:R=1,zoom:b=3,backgroundGlow:S=.5,opacity:O=1,mouseInteraction:d=!0,mouseStrength:T=.5,mouseRadius:B=1,mouseDampening:x=.15,mixBlendMode:E}){const G=_.useRef(null);return _.useEffect(()=>{const v=G.current;if(!v)return;const g=new H({dpr:Math.min(o??1.25,window.devicePixelRatio||1),alpha:!0,antialias:!0}),i=g.gl,f=i.canvas;Object.assign(f.style,{width:"100%",height:"100%",display:"block"}),v.appendChild(f);const{arr:n,count:U,avg:W}=$(a),c={iResolution:{value:[i.drawingBufferWidth,i.drawingBufferHeight,1]},iMouse:{value:[0,0]},iTime:{value:0},uColor0:{value:n[0]},uColor1:{value:n[1]},uColor2:{value:n[2]},uColor3:{value:n[3]},uColor4:{value:n[4]},uColor5:{value:n[5]},uColor6:{value:n[6]},uColor7:{value:n[7]},uColorCount:{value:U},uBgColor:{value:q(s)},uMouseColor:{value:W},uSpeed:{value:u},uStreakCount:{value:Math.max(1,Math.min(16,Math.round(M)))},uStreakWidth:{value:w},uStreakLength:{value:y},uGlow:{value:k},uDensity:{value:F},uTwinkle:{value:R},uZoom:{value:b},uBgGlow:{value:S},uOpacity:{value:O},uMouseEnabled:{value:d?1:0},uMouseStrength:{value:T},uMouseRadius:{value:B}},X=new I(i,{vertex:J,fragment:K,uniforms:c}),V=new D(i),Y=new N(i,{geometry:V,program:X}),h=[0,0];let p=0,C=0;const z=()=>{const e=v.getBoundingClientRect();g.setSize(e.width,e.height),c.iResolution.value=[i.drawingBufferWidth,i.drawingBufferHeight,1]},A=e=>{const t=f.getBoundingClientRect();if(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)return;const m=g.dpr||1;h[0]=(e.clientX-t.left)*m,h[1]=(t.height-(e.clientY-t.top))*m},P=e=>{p=requestAnimationFrame(P),c.iTime.value=e*.001,C||(C=e);const t=(e-C)/1e3;C=e;const m=x<=0?1:Math.min(1,1-Math.exp(-t/Math.max(1e-4,x)));c.iMouse.value[0]+=(h[0]-c.iMouse.value[0])*m,c.iMouse.value[1]+=(h[1]-c.iMouse.value[1])*m,l||g.render({scene:Y})},L=new ResizeObserver(z);return L.observe(v),d&&window.addEventListener("pointermove",A,{passive:!0}),z(),p=requestAnimationFrame(P),()=>{cancelAnimationFrame(p),L.disconnect(),d&&window.removeEventListener("pointermove",A),f.parentElement===v&&v.removeChild(f)}},[s,S,a,F,o,k,x,d,B,T,O,l,u,M,y,w,R,b]),Z.jsx("div",{className:`lightfall-container ${r??""}`,ref:G,style:E?{mixBlendMode:E}:void 0})}export{oe as default};

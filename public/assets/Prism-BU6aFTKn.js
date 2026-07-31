import{r as ie,j as He}from"./index-C_QZilOV.js";import{R as Pe,T as Ae,P as ye,M as Fe}from"./Triangle-GlFcswsc.js";const ze=({height:q=3.5,baseWidth:U=5.5,animationType:c="rotate",glow:W=1,offset:n={x:0,y:0},noise:_=.5,transparent:P=!0,scale:N=3.6,hueShift:j=0,colorFrequency:G=1,hoverStrength:V=2,inertia:X=.05,bloom:Y=1,dpr:b=1.25,suspendWhenOffscreen:D=!1,timeScale:Z=.5})=>{const k=ie.useRef(null);return ie.useEffect(()=>{const s=k.current;if(!s)return;const g=Math.max(.001,q),A=Math.max(.001,U)*.5,se=Math.max(0,W),Q=Math.max(0,_),re=(n==null?void 0:n.x)??0,le=(n==null?void 0:n.y)??0,ce=P?1.5:1,y=Math.max(.001,N),ue=j||0,me=Math.max(0,G||1),fe=Math.max(0,Y||1),B=Math.max(0,Z||1),J=Math.max(0,V||1),K=Math.max(0,Math.min(1,X||.12)),ve=Math.min(b,window.devicePixelRatio||1),F=new Pe({dpr:ve,alpha:P,antialias:!1}),e=F.gl;e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.BLEND),Object.assign(e.canvas.style,{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block"}),s.appendChild(e.canvas);const he=`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,de=`
      precision highp float;

      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3 uRot;
      uniform int uUseBaseWobble;
      uniform float uGlow;
      uniform vec2 uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x) {
        vec4 e2x = exp(2.0 * x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p) {
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p) {
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a) {
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main() {
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;
        float z = 5.0;
        float d = 0.0;
        vec3 p;
        vec4 o = vec4(0.0);
        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);
        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);
        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);
        if (abs(uHueShift) > 0.0001) {
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }
        gl_FragColor = vec4(col, o.a);
      }
    `,xe=new Ae(e),I=new Float32Array(2),L=new Float32Array(2),l=new ye(e,{vertex:he,fragment:de,uniforms:{iResolution:{value:I},iTime:{value:0},uHeight:{value:g},uBaseHalf:{value:A},uUseBaseWobble:{value:1},uRot:{value:new Float32Array([1,0,0,0,1,0,0,0,1])},uGlow:{value:se},uOffsetPx:{value:L},uNoise:{value:Q},uSaturation:{value:ce},uScale:{value:y},uHueShift:{value:ue},uColorFreq:{value:me},uBloom:{value:fe},uCenterShift:{value:g*.25},uInvBaseHalf:{value:1/A},uInvHeight:{value:1/g},uMinAxis:{value:Math.min(A,g)},uPxScale:{value:1/((e.drawingBufferHeight||1)*.1*y)},uTimeScale:{value:B}}}),we=new Fe(e,{geometry:xe,program:l}),$=()=>{const t=s.clientWidth||1,a=s.clientHeight||1;F.setSize(t,a),I[0]=e.drawingBufferWidth,I[1]=e.drawingBufferHeight,L[0]=re*b,L[1]=le*b,l.uniforms.uPxScale.value=1/((e.drawingBufferHeight||1)*.1*y)},ee=new ResizeObserver($);ee.observe(s),$();const te=new Float32Array(9),ae=(t,a,i,o)=>{const x=Math.cos(t),w=Math.sin(t),H=Math.cos(a),M=Math.sin(a),p=Math.cos(i),S=Math.sin(i);return o[0]=x*p+w*M*S,o[1]=H*S,o[2]=-w*p+x*M*S,o[3]=-x*S+w*M*p,o[4]=H*p,o[5]=w*S+x*M*p,o[6]=w*H,o[7]=-M,o[8]=x*H,o},Me=Q<1e-6;let u=0;const pe=performance.now(),C=()=>{u||(u=requestAnimationFrame(ne))},oe=()=>{u&&(cancelAnimationFrame(u),u=0)},v=()=>Math.random(),Se=.3+v()*.6,be=.2+v()*.7,ge=.1+v()*.5,Be=v()*Math.PI*2,Re=v()*Math.PI*2;let m=0,f=0,h=0,z=0,O=0;const T=(t,a,i)=>t+(a-t)*i,r={x:0,y:0,inside:!0},Ee=t=>{const a=Math.max(1,window.innerWidth),i=Math.max(1,window.innerHeight);r.x=Math.max(-1,Math.min(1,(t.clientX-a*.5)/(a*.5))),r.y=Math.max(-1,Math.min(1,(t.clientY-i*.5)/(i*.5))),r.inside=!0},R=()=>{r.inside=!1};let E=null;c==="hover"?(E=t=>{Ee(t),C()},window.addEventListener("pointermove",E,{passive:!0}),window.addEventListener("mouseleave",R),window.addEventListener("blur",R),l.uniforms.uUseBaseWobble.value=0):c==="3drotate"&&(l.uniforms.uUseBaseWobble.value=0);function ne(t){const a=(t-pe)*.001;l.uniforms.iTime.value=a;let i=!0;if(c==="hover")z=(r.inside?-r.x:0)*.6*J,O=(r.inside?r.y:0)*.6*J,m=T(m,z,K),f=T(f,O,K),h=T(h,0,.1),l.uniforms.uRot.value=ae(m,f,h,te),Me&&Math.abs(m-z)<1e-4&&Math.abs(f-O)<1e-4&&(i=!1);else if(c==="3drotate"){const o=a*B;m=o*be,f=Math.sin(o*Se+Be)*.6,h=Math.sin(o*ge+Re)*.5,l.uniforms.uRot.value=ae(m,f,h,te),B<1e-6&&(i=!1)}else B<1e-6&&(i=!1);F.render({scene:we}),u=i?requestAnimationFrame(ne):0}let d;return D&&(d=new IntersectionObserver(t=>{t.some(a=>a.isIntersecting)?C():oe()}),d.observe(s)),C(),()=>{oe(),ee.disconnect(),d==null||d.disconnect(),c==="hover"&&(E&&window.removeEventListener("pointermove",E),window.removeEventListener("mouseleave",R),window.removeEventListener("blur",R)),e.canvas.parentElement===s&&s.removeChild(e.canvas)}},[q,U,c,W,_,n==null?void 0:n.x,n==null?void 0:n.y,N,P,j,G,Z,V,X,Y,b,D]),He.jsx("div",{className:"prism-container",ref:k})};export{ze as default};

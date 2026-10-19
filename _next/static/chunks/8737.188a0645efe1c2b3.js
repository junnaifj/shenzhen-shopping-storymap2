"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8737],{34349:(e,t,i)=>{i.d(t,{q:()=>v,h:()=>g});var r=i(607691),a=i(599760),n=i(125320),o=i(671165),s=i(589195),l=i(553457),p=i(759520),d=i(231596),c=i(471406),h=i(306126),u=i(748194),f=i(332352);let m=(0,f.vt)();function v(e,t){if(!t.stippleEnabled)return void e.fragment.code.add((0,p.H)`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let i=!(t.draped&&t.stipplePreferContinuous),{vertex:c,fragment:h}=e;t.draped||((0,n.yu)(c,t),c.uniforms.add(new s.U("worldToScreenPerDistanceRatio",({camera:e})=>1/e.perScreenPixelRatio)).code.add((0,p.H)`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),c.code.add((0,p.H)`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${p.H.float(S)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),(0,n.Nz)(c),c.code.add((0,p.H)`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${i?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),h.uniforms.add(new d.N("stipplePatternTexture",e=>e.stippleTexture),new l.m("stipplePatternPixelSizeInv",e=>1/g(e))),t.stippleOffColorEnabled&&h.uniforms.add(new o.E("stippleOffColor",e=>{var t;return null==(t=e.stippleOffColor)?f.uY:4===t.length?t:(0,u.hZ)(m,t[0],t[1],t[2],1)})),e.include(a.m),t.worldSizedImagePattern?(e.varyings.add("vStippleV","float"),e.fragment.include(r.N),h.code.add((0,p.H)`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):h.code.add((0,p.H)`
    float getStippleSDF(out bool isClamped) {
      float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
      isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;

      float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return (sdf - 0.5) * vStipplePatternStretch + 0.5;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `),h.code.add((0,p.H)`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${(0,p.If)(!t.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }
  `)}function g(e){let t=e.stipplePattern;return(0,c.sL)(t)?t.length:t?(0,h.GQ)(t)/t.pixelRatio:1}let S=.4},67228:(e,t,i)=>{i.d(t,{f:()=>a});var r=i(993355);class a{constructor(e,t,i){this._createTexture=e,this._parametersKey=t,this._repository=new Map,this._orphanCache=i.newCache(`procedural-texture-repository:${(0,r.c)()}`,e=>e.dispose())}destroy(){for(let{texture:e}of this._repository.values())e.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(e,t=null){let i=this._acquire(e);return this.release(t),i}release(e){if(null==e)return;let t=this._parametersKey(e),i=this._repository.get(t);if(i&&(i.refCount--,0===i.refCount)){this._repository.delete(t);let{texture:e}=i;this._orphanCache.put(t,e)}}_acquire(e){if(null==e)return null;let t=this._parametersKey(e),i=this._repository.get(t);if(i)return i.refCount++,i.texture;let r=this._orphanCache.pop(t)??this._createTexture(e),a=new n(r);return this._repository.set(t,a),r}}class n{constructor(e){this.texture=e,this.refCount=1}}},88798:(e,t,i)=>{i.d(t,{G:()=>r,Q:()=>a});let r={stableRendering:!1},a={rootOrigin:null}},151925:(e,t,i)=>{i.d(t,{s:()=>u});var r=i(126842),a=i(555936),n=i(736280),o=i(452562),s=i(125320),l=i(79022),p=i(553457),d=i(541422),c=i(759520),h=i(280123);function u(e,t){let{vertex:i,attributes:a}=e;i.uniforms.add(new p.m("intrinsicWidth",e=>e.width));let{hasScreenSizePerspective:u,spherical:m}=t;u?(e.include(o.Y6,t),(0,o.pM)(i),(0,s.yu)(i,t),i.uniforms.add(new h.S("inverseViewMatrix",(e,t)=>(0,r.B8)(f,(0,r.Tl)(f,t.camera.viewMatrix,e.origin)))),i.code.add((0,c.H)`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${m?(0,c.H)`normalize(worldPos + localOrigin)`:(0,c.H)`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):i.code.add((0,c.H)`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),t.hasVVSize?(a.add("sizeFeatureAttribute","float"),i.uniforms.add(new l.t("vvSizeMinSize",e=>e.vvSize.minSize),new l.t("vvSizeMaxSize",e=>e.vvSize.maxSize),new l.t("vvSizeOffset",e=>e.vvSize.offset),new l.t("vvSizeFactor",e=>e.vvSize.factor),new l.t("vvSizeFallback",e=>e.vvSize.fallback)),i.code.add((0,c.H)`
    float getSize(${(0,c.If)(u,"vec3 pos")}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${(0,c.If)(u,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):(a.add("size","float"),i.code.add((0,c.H)`
    float getSize(${(0,c.If)(u,"vec3 pos")}) {
      float fullSize = intrinsicWidth * size;
      return ${(0,c.If)(u,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `)),t.hasVVOpacity?(a.add("opacityFeatureAttribute","float"),i.constants.add("vvOpacityNumber","int",8),i.uniforms.add(new d.x("vvOpacityValues",8,e=>e.vvOpacity.values),new d.x("vvOpacityOpacities",8,e=>e.vvOpacity.opacityValues),new p.m("vvOpacityFallback",e=>e.vvOpacity.fallback,{supportsNaN:!0})),i.code.add((0,c.H)`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${(0,c.If)(t.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):i.code.add((0,c.H)`vec4 applyOpacity(vec4 color) {
return color;
}`),t.hasVVColor?(e.include(n.A,t),a.add("colorFeatureAttribute","float"),i.code.add((0,c.H)`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(a.add("color","vec4"),i.code.add((0,c.H)`vec4 getColor() {
return applyOpacity(color);
}`))}let f=(0,a.vt)()},195659:(e,t,i)=>{i.d(t,{CN:()=>s,PY:()=>l,Q_:()=>o,m9:()=>c,ny:()=>p,sZ:()=>d});var r=i(332352),a=i(878719),n=i(556338);let o=128,s=.5,l=(0,r.CN)(s/2,s/2,1-s/2,1-s/2);function p(e){return"cross"===e||"x"===e}function d(e,t=o,i=t*s,r=0){let{data:l,parameters:p}=function(e,t=o,i=t*s,r=0){return{data:c(e,t,i,r),parameters:{mipmap:!1,wrap:{s:33071,t:33071},width:t,height:t,noUnpackFlip:!0,dataType:n.ld.FLOAT,pixelFormat:6403,internalFormat:n.H0.R16F,reloadable:!0}}}(e,t,i,r);return new a.h(l,p)}function c(e,t=o,i=t*s,r=0){var a,n,l,p,d,g;switch(e){case"circle":default:let S;return a=t,n=i,S=a/2-.5,v(a,f(S,S,n/2));case"square":return h(t,i,!1);case"cross":return function(e,t,i=0){return u(e,t,!1,i)}(t,i,r);case"x":return function(e,t,i=0){return u(e,t,!0,i)}(t,i,r);case"kite":return h(t,i,!0);case"triangle":return v(l=t,m(l/2,p=i,p/2));case"arrow":let x,y,C,T,D;return d=t,x=(g=i)/2,y=d/2,C=.8*g,T=f(y,(d-g)/2-C,Math.sqrt(C*C+x*x)),D=m(y,g,x),v(d,(e,t)=>Math.max(D(e,t),-T(e,t)))}}function h(e,t,i){return i&&(t/=Math.SQRT2),v(e,(r,a)=>{let n=r-.5*e+.25,o=.5*e-a-.75;if(i){let e=(n+o)/Math.SQRT2;o=(o-n)/Math.SQRT2,n=e}return Math.max(Math.abs(n),Math.abs(o))-.5*t})}function u(e,t,i,r=0){t-=r,i&&(t*=Math.SQRT2);let a=.5*t;return v(e,(t,n)=>{let o=t-.5*e,s=.5*e-n-1;if(i){let e=(o+s)/Math.SQRT2;s=(s-o)/Math.SQRT2,o=e}return((o=Math.abs(o))>(s=Math.abs(s))?o>a?Math.sqrt((o-a)*(o-a)+s*s):s:s>a?Math.sqrt(o*o+(s-a)*(s-a)):o)-r/2})}function f(e,t,i){return(r,a)=>{let n=r-e,o=a-t;return Math.sqrt(n*n+o*o)-i}}function m(e,t,i){let r=Math.sqrt(t*t+i*i);return(a,n)=>{let o=Math.abs(a-e)-i,s=n-e+t/2+.75;return Math.max((t*o+i*s)/r,-s)}}function v(e,t){let i=new Float32Array(e*e);for(let r=0;r<e;r++)for(let a=0;a<e;a++)i[a+e*r]=t(a,r)/e;return i}},239467:(e,t,i)=>{i.d(t,{Z:()=>a});var r=i(759520);let a=(0,r.H)`vec4(0.0, 0.0, 2.0, 1.0)`},306126:(e,t,i)=>{i.d(t,{GQ:()=>d,Ry:()=>l});var r=i(471406),a=i(67228),n=i(556338),o=i(542231),s=i(705594);function l(e,t){return new a.f(t=>{if((0,r.sL)(t))return function(e,t){let{data:i,width:r,height:a}=t,l=new s.R(r,a);return l.dataType=n.ld.UNSIGNED_BYTE,l.pixelFormat=6408,l.internalFormat=n.H0.RGBA8,l.wrapMode={s:10497,t:33071},l.hasMipmap=!0,l.samplingMode=9987,new o.A(e,l,i)}(e,t.image);let{data:i,textureSize:a}=function(e){let t=p(e),i=1/e.pixelRatio,r=d(e),a=[],n=1;for(let e of t){for(let t=0;t<e;t++){let r=n*(Math.min(t,e-1-t)+.5)*i;a.push(r)}n=-n}let o=Math.round(t[0]/2);return{data:new Float32Array([...a.slice(o),...a.slice(0,o)]),textureSize:r}}(t),l=new s.R(a,1);return l.dataType=n.ld.FLOAT,l.pixelFormat=6403,l.internalFormat=n.H0.R16F,l.wrapMode=10497,new o.A(e,l,i)},e=>(0,r.sL)(e)?`image-${e.uuid}`:`${e.pattern.join(",")}-r${e.pixelRatio}`,t)}function p(e){return e.pattern.map(t=>Math.round(t*e.pixelRatio))}function d(e){return null==e?1:Math.floor(p(e).reduce((e,t)=>e+t))}},335296:(e,t,i)=>{i.d(t,{$7:()=>d,Ci:()=>m,Cq:()=>v,LL:()=>c,NK:()=>u,S$:()=>a,iM:()=>f,jt:()=>o,nD:()=>p,q6:()=>s,q7:()=>l,ti:()=>h,um:()=>n});var r=i(458954);let a=.1,n=(0,r.Kp)(1),o=(0,r.Kp)(1),s=1e3,l=!1,p=3,d=1,c=27e6,h=501,u=256,f=3,m=2,v=2},461336:(e,t,i)=>{i.d(t,{f:()=>n});var r=i(442039);class a{constructor(e,t){this.vec3=e,this.id=t}}function n(e,t,i,n){return new a((0,r.fA)(e,t,i),n)}},471406:(e,t,i)=>{i.d(t,{Xq:()=>u,sL:()=>c,wk:()=>h});var r=i(653040);let a=[4,3],n=[1,3],o=[8,3],s=[4,1],l=[1,1],p={dash:a,"dash-dot":[...a,...n],dot:n,"long-dash":o,"long-dash-dot":[...o,...n],"long-dash-dot-dot":[...o,...n,...n],none:null,"short-dash":s,"short-dash-dot":[...s,...l],"short-dash-dot-dot":[...s,...l,...l],"short-dot":l,solid:null};class d{constructor(e,t,i){this.image=e,this.width=t,this.length=i,this.uuid=(0,r.lk)()}}function c(e){return null!=e&&"image"in e}function h(e){return{pattern:[e,e],pixelRatio:2}}function u(e){switch(e?.type){case"style":var t,i;return null!=(t=e.style)?null==(i=p[t])?i:{pattern:i.slice(),pixelRatio:8}:null;case"image":return new d(e.image,e.width,e.length)}return null}},488106:(e,t,i)=>{i.d(t,{I2:()=>u,Kf:()=>m,Uk:()=>S,ai:()=>g,au:()=>d,fe:()=>v,nG:()=>h,nu:()=>f,sE:()=>c});var r=i(126842),a=i(555936),n=i(442039),o=i(608274),s=i(288847),l=i(713983),p=i(889127);function d(e,t,i,r,a,n,o,l,p,d,c){let h=x[c.mode],u,f,m=0;if((0,s.projectBuffer)(e,t,i,r,p.spatialReference,a,l))return h?.requiresAlignment(c)?(m=h.applyElevationAlignmentBuffer(r,a,n,o,l,p,d,c),u=n,f=o):(u=r,f=a),(0,s.projectBuffer)(u,p.spatialReference,f,n,d.spatialReference,o,l)?m:void 0}function c(e,t,i,r,a){let n=((0,l.v)(e)?e.z:(0,p.cN)(e)?e.array[e.offset+2]:e[2])||0;switch(i.mode){case"on-the-ground":{let i=(0,p.R1)(t,e,"ground")??0;return a.verticalDistanceToGround=0,a.sampledElevation=i,void(a.z=i)}case"relative-to-ground":{let o=(0,p.R1)(t,e,"ground")??0,s=i.geometryZWithOffset(n,r);return a.verticalDistanceToGround=s,a.sampledElevation=o,void(a.z=s+o)}case"relative-to-scene":{let o=(0,p.R1)(t,e,"scene")??0,s=i.geometryZWithOffset(n,r);return a.verticalDistanceToGround=s,a.sampledElevation=o,void(a.z=s+o)}case"absolute-height":{let o=i.geometryZWithOffset(n,r),s=(0,p.R1)(t,e,"ground")??0;return a.verticalDistanceToGround=o-s,a.sampledElevation=s,void(a.z=o)}default:return void(a.z=0)}}function h(e,t,i,r){return c(e,t,i,r,C),C.z}function u(e,t,i){return"on-the-ground"===t&&"on-the-ground"===i?e.staysOnTheGround:t===i||"on-the-ground"!==t&&"on-the-ground"!==i?null==t||null==i?e.definedChanged:1:e.onTheGroundChanged}function f(e){return"relative-to-ground"===e||"relative-to-scene"===e}function m(e){return"absolute-height"!==e}function v(e,t,i,a,n){c(t,i,n,a,C),g(e,C.verticalDistanceToGround);let s=C.sampledElevation,l=(0,r.C)(y,e.transformation);return T[0]=t.x,T[1]=t.y,T[2]=C.z,(0,o.l)(t.spatialReference,T,l,a.spatialReference)?e.transformation=l:console.warn("Could not locate symbol object properly, it might be misplaced"),s}function g(e,t){for(let i=0;i<e.geometries.length;++i){let r=e.geometries[i].getMutableAttribute("groundDistance");r&&r.data[0]!==t&&(r.data[0]=t,e.geometryVertexAttributeUpdated(e.geometries[i],"groundDistance"))}}class S{constructor(){this.verticalDistanceToGround=0,this.sampledElevation=0,this.z=0}}let x={"absolute-height":{applyElevationAlignmentBuffer:function(e,t,i,r,a,n,o,s){let l=s.calculateOffsetRenderUnits(o),p=s.featureExpressionInfoContext;t*=3,r*=3;for(let n=0;n<a;++n){let a=e[t],n=e[t+1],o=e[t+2];i[r]=a,i[r+1]=n,i[r+2]=null==p?o+l:l,t+=3,r+=3}return 0},requiresAlignment:function(e){let t=e.meterUnitOffset,i=e.featureExpressionInfoContext;return 0!==t||null!=i}},"on-the-ground":{applyElevationAlignmentBuffer:function(e,t,i,r,a,n){let o=0,s=n.spatialReference;t*=3,r*=3;for(let l=0;l<a;++l){let a=e[t],l=e[t+1],p=e[t+2],d=n.getElevation(a,l,p,s,"ground")??0;o+=d,i[r]=a,i[r+1]=l,i[r+2]=d,t+=3,r+=3}return o/a},requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:function(e,t,i,r,a,n,o,s){let l=0,p=s.calculateOffsetRenderUnits(o),d=s.featureExpressionInfoContext,c=n.spatialReference;t*=3,r*=3;for(let o=0;o<a;++o){let a=e[t],o=e[t+1],s=e[t+2],h=n.getElevation(a,o,s,c,"ground")??0;l+=h,i[r]=a,i[r+1]=o,i[r+2]=null==d?s+h+p:h+p,t+=3,r+=3}return l/a},requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:function(e,t,i,r,a,n,o,s){let l=0,p=s.calculateOffsetRenderUnits(o),d=s.featureExpressionInfoContext,c=n.spatialReference;t*=3,r*=3;for(let o=0;o<a;++o){let a=e[t],o=e[t+1],s=e[t+2],h=n.getElevation(a,o,s,c,"scene")??0;l+=h,i[r]=a,i[r+1]=o,i[r+2]=null==d?s+h+p:h+p,t+=3,r+=3}return l/a},requiresAlignment:()=>!0}},y=(0,a.vt)(),C=new S,T=(0,n.vt)()},595008:(e,t,i)=>{i.d(t,{KH:()=>o,xJ:()=>s});var r=i(990616),a=i(488705),n=i(698270);let o=16;class s extends n.L{constructor(e){super(),this.spherical=e,this.capType=0,this.emissionSource=0,this.animation=2,this.polygonOffsetIndex=0,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.numJoinSubdivisions=1,this.roundJoins=!1,this.applyMarkerOffset=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.hasScreenSizePerspective=!1,this.worldSizedImagePattern=!1,this.textureCoordinateType=0,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}get hasAnimation(){return 0!==this.animation}}(0,r.Cg)([(0,a.W)({count:3})],s.prototype,"capType",void 0),(0,r.Cg)([(0,a.W)({count:8})],s.prototype,"emissionSource",void 0),(0,r.Cg)([(0,a.W)({count:4})],s.prototype,"animation",void 0),(0,r.Cg)([(0,a.W)({count:o})],s.prototype,"polygonOffsetIndex",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"writeDepth",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"draped",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"stippleEnabled",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"stippleOffColorEnabled",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"stipplePreferContinuous",void 0),(0,r.Cg)([(0,a.W)({count:8})],s.prototype,"numJoinSubdivisions",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"roundJoins",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"applyMarkerOffset",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"hasVVSize",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"hasVVColor",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"hasVVOpacity",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"falloffEnabled",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"innerColorEnabled",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"hasOccludees",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"occluder",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"wireframe",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"discardInvisibleFragments",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"hasScreenSizePerspective",void 0),(0,r.Cg)([(0,a.W)()],s.prototype,"worldSizedImagePattern",void 0)},599760:(e,t,i)=>{function r(e){e.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function a(e){e.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}i.d(t,{F:()=>r,m:()=>a})},695316:(e,t,i)=>{i.d(t,{g:()=>v}),i(344881);var r=i(993355),a=i(914850),n=i(587751),o=i(442039),s=i(332352),l=i(288847),p=i(308207),d=i(284373),c=i(461336),h=i(338741),u=i(88798),f=i(818326),m=i(890770);class v{constructor(e){this._originSR=e,this._rootOriginId="root/"+(0,r.c)(),this._origins=new Map,this._objects=new Map,this._gridSize=5e5,this._originSR?.isGeographic&&(this._gridSize/=(0,a.GA)(this._originSR)),this._baselineDistance=.5*this._gridSize;const t=this._baselineDistance*S;this._baselineObjectSize=t/x}getOrigin(e){let t=this._origins.get(this._rootOriginId);if(null==t){let t=u.Q.rootOrigin;if(null!=t)return this._origins.set(this._rootOriginId,(0,c.f)(t[0],t[1],t[2],this._rootOriginId)),this.getOrigin(e);let i=(0,c.f)(e[0]+Math.random()-.5,e[1]+Math.random()-.5,e[2]+Math.random()-.5,this._rootOriginId);return this._origins.set(this._rootOriginId,i),i}let i=this._gridSize,r=Math.round(e[0]/i),a=Math.round(e[1]/i),o=Math.round(e[2]/i),s=`${r}/${a}/${o}`,l=this._origins.get(s),p=.5*i;if((0,n.Re)(g,e,t.vec3),g[0]=Math.abs(g[0]),g[1]=Math.abs(g[1]),g[2]=Math.abs(g[2]),g[0]<p&&g[1]<p&&g[2]<p){if(l){let t=Math.max(...g);if((0,n.Re)(g,e,l.vec3),g[0]=Math.abs(g[0]),g[1]=Math.abs(g[1]),g[2]=Math.abs(g[2]),Math.max(...g)<t)return l}return t}return l||(l=(0,c.f)(r*i,a*i,o*i,s),this._origins.set(s,l)),l}needsOriginUpdate(e,t,i){let r=(0,n.Io)(e.vec3,t),a=Math.max(1,i/this._baselineObjectSize);return r>this._baselineDistance*a}_drawOriginBox(e,t=(0,s.fA)(1,1,0,1)){let i=window.view,r=i.stage,a=t.toString();if(!this._objects.has(a)){this._material=new m.W({width:2,color:t},!1);let e=new f.x(r,{pickable:!1}),i=new h.B({castShadow:!1});e.add(i),this._objects.set(a,i)}let n=this._objects.get(a),o=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],c=o.length,u=Array(3*c),v=[],g=.5*this._gridSize;for(let t=0;t<c;t++)u[3*t]=e[0]+(1&o[t]?g:-g),u[3*t+1]=e[1]+(2&o[t]?g:-g),u[3*t+2]=e[2]+(4&o[t]?g:-g),t>0&&v.push(t-1,t);(0,l.projectBuffer)(u,this._originSR,0,u,i.renderSpatialReference,0,c);let S=new d.V(this._material,[["position",new p.n(u,v,3,!0)]],null,2);n.addGeometry(S)}get test(){}}let g=(0,o.vt)(),S=11920928955078125e-23,x=.05},763077:(e,t,i)=>{i.d(t,{r:()=>s});var r=i(817236),a=i(125320),n=i(589195),o=i(759520);function s(e,t){let i=e.vertex,s=t.hasScreenSizePerspective;(0,a.Nz)(i),null==i.uniforms.get("markerScale")&&i.constants.add("markerScale","float",1),i.constants.add("markerSizePerLineWidth","float",r.PV).code.add((0,o.H)`
  float getLineWidth(${(0,o.If)(s,"vec3 pos")}) {
     return max(getSize(${(0,o.If)(s,"pos")}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),2===t.space&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new n.U("perRenderPixelRatio",e=>e.camera.perRenderPixelRatio)),i.code.add((0,o.H)`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${(0,o.If)(s,"pos")})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${(0,o.If)(s,"pos")})) * screenToWorldRatio;
  }
  `))}},817236:(e,t,i)=>{i.d(t,{Cz:()=>l,DZ:()=>d,PV:()=>p,sS:()=>c,vO:()=>s});var r=i(195659),a=i(556338),n=i(542231),o=i(705594);let s=64,l=32,p=10,d=.25;function c(e,t){let i=(0,r.m9)(e,s,l,6.4),p=new o.R(s);return p.internalFormat=a.H0.R16F,p.dataType=a.ld.FLOAT,p.pixelFormat=6403,p.wrapMode=33071,new n.A(t,p,i)}},852480:(e,t,i)=>{i.d(t,{R:()=>w,b:()=>z,r:()=>b});var r=i(230843),a=i(619363),n=i(151925),o=i(34349),s=i(763077),l=i(525695),p=i(239467),d=i(875464),c=i(599760),h=i(125320),u=i(398709),f=i(913911),m=i(671165),v=i(589195),g=i(553457),S=i(759520),x=i(855272),y=i(748979),C=i(877821),T=i(546574),D=i(378836);let b=1;function z(e){let t=new D.N5,{attributes:i,varyings:b,vertex:z,fragment:w}=t,{applyMarkerOffset:P,draped:L,output:O,capType:_,stippleEnabled:R,falloffEnabled:W,roundJoins:F,wireframe:E,innerColorEnabled:A,hasAnimation:I,hasScreenSizePerspective:M,worldSizedImagePattern:H}=e;z.inputs.add("position",()=>"position"),w.include(l.p),t.include(n.s,e),t.include(o.q,e),t.include(a.g,e),t.include(C.Q,e);let V=P&&!L;V&&(z.uniforms.add(new g.m("markerScale",e=>e.markerScale)),t.include(s.r,{space:2,hasScreenSizePerspective:M})),(0,h.NB)(z,e),z.uniforms.add(new x.F("inverseProjectionMatrix",e=>e.camera.inverseProjectionMatrix),new u.E("nearFar",e=>e.camera.nearFar),new g.m("miterLimit",e=>"miter"!==e.join?0:e.miterLimit),new f.I("viewport",e=>e.camera.fullViewport)),z.constants.add("LARGE_HALF_FLOAT","float",65500),z.constants.add("EPS","float",.001),z.constants.add("NUM_JOIN_SUBDIVISIONS","float",e.numJoinSubdivisions),i.add("position","vec3"),i.add("previousDelta","vec4"),i.add("nextDelta","vec4"),i.add("lineParameters","vec2"),i.add("u0","float"),b.add("vColor","vec4"),b.add("vpos","vec3",{invariant:!0}),b.add("vLineDistance","float"),b.add("vLineWidth","float"),R||(b.add("vIsInsideJoin","int"),b.add("vStretchFactor","float"),b.add("vJoinCenterLineSDFs","vec2"),b.add("vSubdivisionFactor","float")),R&&b.add("vLineSizeInv","float");let N=2===_,j=R&&N,k=W||j;return k&&b.add("vLineDistanceNorm","float"),N&&(b.add("vSegmentSDF","float"),b.add("vReverseSegmentSDF","float")),z.code.add((0,S.H)`vec3 perpendicular(vec3 v) {
return vec3(v.y, -v.x, 0.0);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec3 rotateZ(vec3 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return vec3(m * v.xy, v.z);
}`),z.code.add((0,S.H)`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
posNdc.z /= posNdc.w;
return posNdc;
}`),z.code.add((0,S.H)`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),(0,h.Nz)(z),z.constants.add("aaWidth","float",+!R).main.add((0,S.H)`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${p.Z};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = abs(lineParameters.y) < 3.0;
  `),V&&z.main.add((0,S.H)`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),t.include(c.F),z.main.add((0,S.H)`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec3 left = (pos.xyz - prev.xyz);
      vec3 right = (next.xyz - pos.xyz);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${(0,S.If)(M,"clippedPos")});
      ${(0,S.If)(R&&M,"float patternLineSize = getSize(clippedCenter);")}
      ${(0,S.If)(R&&!M,"float patternLineSize = lineSize;")}

      ${(0,S.If)(H,(0,S.H)`
          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio * worldToScreenRatio;
          if (lineWidth < 1.0) {
            coverage = lineWidth;
            lineWidth = 1.0;
          }
        `,(0,S.H)`
          if (lineSize < 1.0) {
            coverage = lineSize; // convert sub-pixel coverage to alpha
            lineSize = 1.0;
          }

          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${R?(0,S.H)`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(R||N)&&z.main.add((0,S.H)`
      float isEndVertex = float(!isStartVertex);
      vec3 segmentOrigin = mix(pos.xyz, prev.xyz, isEndVertex);
      vec3 segment = mix(right, left, isEndVertex);
      ${N?(0,S.H)`vec3 segmentEnd = mix(next.xyz, pos.xyz, isEndVertex);`:""}
    `),z.main.add((0,S.H)`left = (leftLen > EPS) ? left/leftLen : vec3(0.0, 0.0, 0.0);
right = (rightLen > EPS) ? right/rightLen : vec3(0.0, 0.0, 0.0);
vec3 segmentDirection = isStartVertex ? right : left;
vec3 capDisplacementDir = vec3(0.0, 0.0, 0.0);
vec3 joinDisplacementDir = vec3(0.0, 0.0, 0.0);
float displacementLen = lineWidth;
float miterDisplacementLen = lineWidth;
float innerDisplacementLen = lineWidth;`),R||z.main.add((0,S.H)`vIsInsideJoin = 0;
vStretchFactor = 1.0;
vSubdivisionFactor = 0.0;
vJoinCenterLineSDFs = vec2(LARGE_HALF_FLOAT);`),z.main.add((0,S.H)`float subdivisionFactor = 0.0;
bool isOutside = false;
if (isJoin) {
isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
vec3 joinDirection = normalize(left + right);
joinDisplacementDir = perpendicular(joinDirection);
if (leftLen > EPS && rightLen > EPS) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
miterDisplacementLen = displacementLen;
innerDisplacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
if (!isOutside) {
displacementLen = innerDisplacementLen;
}
}
subdivisionFactor = lineParameters.x;`),R||z.main.add((0,S.H)`if(subdivisionFactor > 0.0) {
vIsInsideJoin = 1;
}
vSubdivisionFactor = isOutside ? subdivisionFactor : 0.5;
if (miterDisplacementLen > miterLimit * lineWidth) {
vec2 leftScreenDir = left.xy;
vec2 rightScreenDir = right.xy;
float leftScreenLen = length(leftScreenDir);
float rightScreenLen = length(rightScreenDir);
if (leftScreenLen > EPS && rightScreenLen > EPS) {
leftScreenDir /= leftScreenLen;
rightScreenDir /= rightScreenLen;
float theta = acos(clamp(dot(leftScreenDir, rightScreenDir), -1.0, 1.0));
float subdividedTriangleHeight = (innerDisplacementLen + lineWidth) * cos(theta / (2.0 + 2.0 * NUM_JOIN_SUBDIVISIONS));
float bevelTriangleHeight = innerDisplacementLen + lineWidth * cos(theta * 0.5);
float triangleHeight = NUM_JOIN_SUBDIVISIONS > 0.0 ? subdividedTriangleHeight : bevelTriangleHeight;
vStretchFactor = noPerspectiveWrite(max(triangleHeight / (2.0 * lineWidth), 1.0), pos.w);
}
}`),z.main.add((0,S.H)`if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),F?z.main.add((0,S.H)`
        vec3 startDir = leftLen < EPS ? right : left;
        startDir = perpendicular(startDir);

        vec3 endDir = rightLen < EPS ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${R?(0,S.H)`min(1.0, subdivisionFactor * ((NUM_JOIN_SUBDIVISIONS + 1.0) / NUM_JOIN_SUBDIVISIONS))`:(0,S.H)`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir.xy, endDir.xy), -1.0, 1.0));
        joinDisplacementDir = rotateZ(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):z.main.add((0,S.H)`
        vec3 startDir = perpendicular(leftLen < EPS ? right : left);
        vec3 endDir = perpendicular(rightLen < EPS ? left : right);

        ${(0,S.If)(R,(0,S.H)`joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? endDir : startDir;`,(0,S.H)`joinDisplacementDir = mix(startDir, endDir, subdivisionFactor);`)}
  `),z.main.add((0,S.H)`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${0!==_?(0,S.H)`capDisplacementDir = vec3((isStartVertex ? -right : left).xy, 0.0);`:""}
    }
  `),z.main.add((0,S.H)`
    // Displacement (in pixels) caused by join/or cap
    vec2 dposXY = (joinDisplacementDir.xy * sign(lineParameters.y) + capDisplacementDir.xy) * displacementLen;

    /**
     * To prevent z-fighting between layers, we also adjust the z value.
     * We want to ensure that the orientation of the final triangles is the same, regardless of the line width.
     * To do so, the below formula projects the xy displacement onto the original segment direction
     * to find the z-offset necessary so the triangle orientation is independent of the width.
     */
    float dposZ = dot(dposXY, segmentDirection.xy) / dot(segmentDirection.xy, segmentDirection.xy) * segmentDirection.z;
    vec3 dpos = vec3(dposXY, dposZ);

    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${k?(0,S.H)`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xyz += dpos;
  `),R||z.main.add((0,S.H)`if (isJoin) {
vec2 joinCenterToVertex = dposXY;
vec2 leftCenterlineDir = left.xy;
vec2 rightCenterlineDir = right.xy;
float leftCenterlineLen = length(leftCenterlineDir);
float rightCenterlineLen = length(rightCenterlineDir);
leftCenterlineDir = leftCenterlineLen > EPS ? leftCenterlineDir / leftCenterlineLen : vec2(1.0, 0.0);
rightCenterlineDir = rightCenterlineLen > EPS ? rightCenterlineDir / rightCenterlineLen : leftCenterlineDir;
vJoinCenterLineSDFs = noPerspectiveWrite(
vec2(
dot(vec2(rightCenterlineDir.y, -rightCenterlineDir.x), joinCenterToVertex),
dot(vec2(leftCenterlineDir.y, -leftCenterlineDir.x), joinCenterToVertex)
),
pos.w
);
}`),N&&z.main.add((0,S.H)`vec2 segmentDir = normalize(segment.xy);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin.xy, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd.xy, -segmentDir)), pos.w);`),R&&(L?z.uniforms.add(new v.U("worldToScreenRatio",e=>1/e.screenToPCSRatio)):z.main.add((0,S.H)`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),z.main.add((0,S.H)`float segmentLengthScreenDouble = length(segment.xy);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),L?z.main.add((0,S.H)`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):z.main.add((0,S.H)`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),z.uniforms.add(new g.m("stipplePatternPixelSize",e=>(0,o.h)(e))),z.main.add((0,S.H)`
      float patternLength = patternLineSize * stipplePatternPixelSize;

      ${(0,S.If)(H,(0,S.H)`
          float uu = mix(u0, u0 - segmentLengthRender, isEndVertex);
          vStippleDistanceLimits = vec2(uu, uu + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          // The v-coordinate used in case of an image pattern.
          bool isLeft = sign(lineParameters.y) < 0.0;
          vStippleV = isLeft ? 0.0 : 1.0;
        `,(0,S.H)`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= EPS) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec3 stippleDisplacement = pos.xyz - segmentOrigin;
        float stippleDisplacementFactor = dot(segment.xy, stippleDisplacement.xy) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen
      // distance
      vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e34, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e34);
    `)),z.main.add((0,S.H)`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;
      pos.z = pos.z * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${E&&!L?"pos.z -= EPS * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(r.HQ,e),t.include(T.D,e),w.include(d.a),w.main.add((0,S.H)`discardBySlice(vpos);`),t.include(c.m),w.include(y.Q),w.main.add((0,S.H)`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${(0,S.If)(k,(0,S.H)`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),E?w.main.add((0,S.H)`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(N&&w.main.add((0,S.H)`float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);
float fragmentRadius = length(fragmentPosition);
float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5;
float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);
if (capCoverage < alphaCutoff) {
discard;
}`),j?w.main.add((0,S.H)`vec2 stipplePosition = vec2(
min(getStippleSDF() * 2.0 - 1.0, 0.0),
lineDistanceNorm
);
float stippleRadius = length(stipplePosition * lineWidth);
float stippleCapSDF = (stippleRadius - lineWidth) * 0.5;
float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
float stippleAlpha = step(alphaCutoff, stippleCoverage);`):w.main.add((0,S.H)`float stippleAlpha = getStippleAlpha(lineWidth);`),11!==O&&w.main.add((0,S.H)`discardByStippleAlpha(stippleAlpha, alphaCutoff);`),t.include(c.m),w.uniforms.add(new m.E("intrinsicColor",e=>e.color)).main.add((0,S.H)`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),A&&w.uniforms.add(new m.E("innerColor",e=>e.innerColor??e.color),new g.m("innerWidth",(e,t)=>e.innerWidth*t.camera.pixelRatio)).main.add((0,S.H)`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),w.main.add((0,S.H)`vec4 finalColor = blendStipple(color, stippleAlpha);`),W&&(w.uniforms.add(new g.m("falloff",e=>e.falloff)),w.main.add((0,S.H)`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),R||w.main.add((0,S.H)`float stretchFactor = vIsInsideJoin == 1 ? noPerspectiveRead(vStretchFactor) : 1.0;
float featherWidth = 2.0;
float featherStartDistance = max(lineWidth - featherWidth / stretchFactor, 0.0);
float straightFeatherStartDistance = max(lineWidth - featherWidth, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
vec2 joinCenterSDFs = noPerspectiveRead(vJoinCenterLineSDFs);
float joinCenterDistance = abs(vSubdivisionFactor > 0.5 ? joinCenterSDFs.x : joinCenterSDFs.y);
float straightFeather = (joinCenterDistance - straightFeatherStartDistance) / (lineWidth - straightFeatherStartDistance);
feather = vIsInsideJoin == 1 ? max(feather, straightFeather) : feather;
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),I&&w.main.add((0,S.H)`
        finalColor = animate(finalColor);

        ${(0,S.If)(11!==O,(0,S.H)`
            if (finalColor.a <= alphaCutoff) {
              discard;
            }`)}
      `)),w.main.add((0,S.H)`outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),t}let w=Object.freeze(Object.defineProperty({__proto__:null,build:z,ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:"Module"}))},877821:(e,t,i)=>{i.d(t,{Q:()=>p});var r=i(698532),a=i(343994),n=i(335296),o=i(883107),s=i(553457),l=i(759520);function p(e,t){let{hasAnimation:i,animation:a}=t;if(!i)return;let{attributes:p,varyings:c,vertex:h,fragment:u}=e;p.add("timeStamps","vec4"),c.add("vTimeStamp","float"),c.add("vFirstTime","float"),c.add("vLastTime","float"),c.add("vTransitionType","float"),h.main.add((0,l.H)`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`),3===a&&u.constants.add("decayRate","float",2.3),u.code.add((0,l.H)`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${function(e){switch(e){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return"float cutOff = exp(-decayRate);\n        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);";default:return"return 1.0;"}}(a)}
    }`),u.uniforms.add(new s.m("timeElapsed",e=>e.timeElapsed),new s.m("trailLength",e=>e.trailLength),new s.m("speed",e=>e.animationSpeed),new o.G("startEndTime",e=>(0,r.hZ)(d,e.startTime,e.endTime))),u.constants.add("fadeInTime","float",n.jt),u.constants.add("fadeOutTime","float",n.um),u.constants.add("incomingTransition","int",0),u.constants.add("outgoingTransition","int",2),u.code.add((0,l.H)`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
vec4 animate(vec4 color) {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
animatedColor.a *= alpha;
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return vec4(0.0);
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
animatedColor.a *= alpha;
return animatedColor;
}`)}let d=(0,a.vt)()},890770:(e,t,i)=>{i.d(t,{W:()=>N});var r=i(999331),a=i(15982),n=i(371192),o=i(458954),s=i(698532),l=i(587751),p=i(442039),d=i(748194),c=i(332352),h=i(885047),u=i(866733),f=i(646324),m=i(737198),v=i(878166),g=i(505983),S=i(264368),x=i(594407),y=i(892893),C=i(471406),T=i(140111),D=i(605410),b=i(852480),z=i(17218);function w(e){let t=(0,z.BP)().vec3f("position").vec4f16("previousDelta").vec4f16("nextDelta").f32("u0").vec2f16("lineParameters");return e.hasVVColor?t.f32("colorFeatureAttribute"):t.vec4u8("color",{glNormalized:!0}),e.hasVVSize?t.f32("sizeFeatureAttribute"):t.f32("size"),e.hasVVOpacity&&t.f32("opacityFeatureAttribute"),(0,v.E)()&&t.vec4u8("olidColor"),e.hasAnimation&&t.vec4f16("timeStamps"),t}var P=i(990616),L=i(678619),O=i(688998),_=i(288193),R=i(377147),W=i(338237),F=i(415824),E=i(366255),A=i(556338),I=i(278477);let M=class extends R.w{constructor(e,t){super(e,t,(0,O.U)(w(t))),this.shader=new _.r(b.R,()=>i.e(20474).then(i.bind(i,320474))),this.ignoreUnused=!0,this.primitiveType=t.wireframe?A.WR.LINES:A.WR.TRIANGLE_STRIP}_makePipelineState(e,t){let{output:i,hasOccludees:r}=e;return(0,I.Ey)({blending:(0,W.Yf)(i,!1,e.emissionDimmingPass),depthTest:(0,W.mt)(i),depthWrite:(0,W.z5)(e),colorWrite:I.kn,stencilWrite:r?F.v0:null,stencilTest:r?t?F.Ax:F.cP:null,polygonOffset:(0,E.T)(e)})}initializePipeline(e){if(e.occluder){let{hasOccludees:t}=e;this._occluderPipelineTransparent=(0,I.Ey)({blending:I.T8,polygonOffset:(0,E.T)(e),depthTest:F.sf,depthWrite:null,colorWrite:I.kn,stencilWrite:null,stencilTest:t?F.Q0:null}),this._occluderPipelineOpaque=(0,I.Ey)({blending:I.T8,polygonOffset:(0,E.T)(e),depthTest:t?F.sf:F.m,depthWrite:null,colorWrite:I.kn,stencilWrite:t?F.r8:null,stencilTest:t?F.iB:null}),this._occluderPipelineMaskWrite=(0,I.Ey)({blending:null,polygonOffset:(0,E.T)(e),depthTest:F.m,depthWrite:null,colorWrite:null,stencilWrite:t?F.v0:null,stencilTest:t?F.Ax:null})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t,i){if(i)return this._occludeePipeline;switch(e.occluder){case 11:return this._occluderPipelineTransparent??super.getPipeline(e,t,i);case 10:return this._occluderPipelineOpaque??super.getPipeline(e,t,i);default:e.occluder;case void 0:case null:return this._occluderPipelineMaskWrite??super.getPipeline(e,t,i)}}};M=(0,P.Cg)([(0,L.$K)("esri.views.3d.webgl-engine.shaders.RibbonLineTechnique")],M);var H=i(595008),V=i(823405);class N extends S.i{constructor(e,t){super(e,k),this.produces=new Map([[2,e=>(0,m.Ex)(e)||(0,m._o)(e)&&8===this.parameters.renderOccluded],[3,e=>(0,m.eh)(e)],[10,e=>(0,m.gr)(e)&&8===this.parameters.renderOccluded],[11,e=>(0,m.gr)(e)&&8===this.parameters.renderOccluded],[4,e=>(0,m._o)(e)&&this.parameters.writeDepth&&8!==this.parameters.renderOccluded],[8,e=>(0,m._o)(e)&&!this.parameters.writeDepth&&8!==this.parameters.renderOccluded],[18,e=>(0,m.i3)(e)]]),this._configuration=new H.xJ(t)}updateConfiguration(e){var t;super.updateConfiguration(e);let i=18===e.slot,r=null!=this.parameters.stipplePattern&&null!=this.parameters.stippleTexture&&10!==e.output,a=r&&i&&this.parameters.isImagePattern();this._configuration.draped=i,this._configuration.polygonOffset=this.parameters.polygonOffset,this._configuration.stippleEnabled=r,this._configuration.stippleOffColorEnabled=r&&null!=this.parameters.stippleOffColor,this._configuration.stipplePreferContinuous=r&&this.parameters.stipplePreferContinuous,this._configuration.numJoinSubdivisions=U(this.parameters.join,r),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins="round"===this.parameters.join,this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=null!=this.parameters.markerParameters&&1===(t=this.parameters.markerParameters).anchor&&t.hideOnShortSegments&&"begin-end"===t.placement&&t.worldSpace,this._configuration.polygonOffsetIndex=this.parameters.polygonOffsetIndex,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&null!=this.parameters.innerColor,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=e.hasOccludees,this._configuration.occluder=8===this.parameters.renderOccluded,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=+!!this.emissions,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective&&!a,this._configuration.worldSizedImagePattern=a}get visible(){return this.parameters.color[3]>=V.Q||null!=this.parameters.stipplePattern&&(this.parameters.stippleOffColor?.[3]??0)>V.Q}get emissions(){return this.parameters.emissiveStrength>0?8!==this.parameters.renderOccluded?2:1:0}setParameters(e,t){e.animation=this.parameters.animation,super.setParameters(e,t)}intersectDraped({attributes:e,screenToWorldRatio:t},i,r,n,o){if(!i.options.selectionMode)return;let s=e.get("size"),l=this.parameters.width;if(this.parameters.vvSize){let t=e.get("sizeFeatureAttribute").data[0];Number.isNaN(t)?l*=this.parameters.vvSize.fallback[0]:l*=(0,a.qE)(this.parameters.vvSize.offset[0]+t*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else s&&(l*=s.data[0]);let p=r[0],d=r[1],c=(l/2+4)*t,h=Number.MAX_VALUE,u=0,f=e.get("position").data,m=J(this.parameters,e)?f.length-2:f.length-5;for(let e=0;e<m;e+=3){let t=f[e],i=f[e+1],r=(e+3)%f.length,n=p-t,o=d-i,s=f[r]-t,l=f[r+1]-i,c=(0,a.qE)((s*n+l*o)/(s*s+l*l),0,1),m=s*c-n,v=l*c-o,g=m*m+v*v;g<h&&(h=g,u=e/3)}h<c*c&&n(o.distance,o.renderDistance,o.normal,u)}intersect(e,t,i,n,o,p){let{options:d,camera:c,rayBegin:h,rayEnd:m}=i;if(!d.selectionMode||!e.visible||!c)return;if(!(0,y.zH)(t))return void r.A.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");let v=e.attributes,g=v.get("position").data,S=this.parameters.width;if(this.parameters.vvSize){let e=v.get("sizeFeatureAttribute").data[0];Number.isNaN(e)||(S*=(0,a.qE)(this.parameters.vvSize.offset[0]+e*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else v.has("size")&&(S*=v.get("size").data[0]);(0,s.C)(et,i.point);let x=S*c.pixelRatio,C=4*c.pixelRatio,T=x/2+C;(0,l.hZ)(eh[0],et[0]-T,et[1]+T,0),(0,l.hZ)(eh[1],et[0]+T,et[1]+T,0),(0,l.hZ)(eh[2],et[0]+T,et[1]-T,0),(0,l.hZ)(eh[3],et[0]-T,et[1]-T,0);for(let e=0;e<4;e++)if(!c.unprojectFromRenderScreen(eh[e],eu[e]))return;(0,f.Cr)(c.eye,eu[0],eu[1],ef),(0,f.Cr)(c.eye,eu[1],eu[2],em),(0,f.Cr)(c.eye,eu[2],eu[3],ev),(0,f.Cr)(c.eye,eu[3],eu[0],eg);let D=Number.MAX_VALUE,b=0,z=J(this.parameters,v)?g.length-2:g.length-5;for(let e=0;e<z;e+=3){q[0]=g[e]+t[12],q[1]=g[e+1]+t[13],q[2]=g[e+2]+t[14];let i=(e+3)%g.length;if(G[0]=g[i]+t[12],G[1]=g[i+1]+t[13],G[2]=g[i+2]+t[14],0>(0,f.mN)(ef,q)&&0>(0,f.mN)(ef,G)||0>(0,f.mN)(em,q)&&0>(0,f.mN)(em,G)||0>(0,f.mN)(ev,q)&&0>(0,f.mN)(ev,G)||0>(0,f.mN)(eg,q)&&0>(0,f.mN)(eg,G))continue;let r=c.projectToRenderScreen(q,ei),a=c.projectToRenderScreen(G,er);if(null==r||null==a)continue;if(r[2]<0&&a[2]>0){(0,l.Re)(X,q,G);let e=c.frustum,t=-(0,f.mN)(e[4],q)/(0,l.Om)(X,(0,f.Qj)(e[4]));if((0,l.hs)(X,X,t),(0,l.WQ)(q,q,X),!c.projectToRenderScreen(q,r))continue}else if(r[2]>0&&a[2]<0){(0,l.Re)(X,G,q);let e=c.frustum,t=-(0,f.mN)(e[4],G)/(0,l.Om)(X,(0,f.Qj)(e[4]));if((0,l.hs)(X,X,t),(0,l.WQ)(G,G,X),!c.projectToRenderScreen(G,a))continue}else if(r[2]<0&&a[2]<0)continue;r[2]=0,a[2]=0;let n=(0,u.Cr)(r,a,eo),o=(0,u.kb)(n,et);if(!(o>=D)){if(this.parameters.screenSizePerspective){let e=this.computeScreenSizePerspectiveWidth(n,q,G,et,c,S,C);if(o>=e*e)continue}D=o,(0,l.C)(ea,q),(0,l.C)(en,G),b=e/3}}if(D<T*T){let e=Number.MAX_VALUE;if((0,u.ld)((0,u.Cr)(ea,en,eo),(0,u.Cr)(h,m,es),ee)){(0,l.Re)(ee,ee,h);let t=(0,l.Bw)(ee);(0,l.hs)(ee,ee,1/t),e=t/(0,l.Io)(h,m)}p(e,e,ee,b)}}createBufferWriter(){return new $(w(this.parameters),this.parameters)}createGLMaterial(e){return new j(e)}validateParameters(e){"miter"!==e.join&&(e.miterLimit=0),null!=e.markerParameters&&(e.markerScale=e.markerParameters.width/e.width)}update(e){return!!this.parameters.hasAnimation&&(this.setParameters({timeElapsed:(0,o.y)(e.time)},!1),0!==e.dt)}computeScreenSizePerspectiveWidth(e,t,i,r,a,n,o){let s=(0,u.G1)(e,r);(0,l.Cc)(Q,t,i,s),(0,l.Z0)(Y,Q,a.viewMatrix);let p=(0,l.Bw)(Y),d=this.computeCameraAbsCosAngle(Q,a,this._configuration.spherical);return Z.update(d,p,this.parameters.screenSizePerspective,this.parameters.screenSizePerspectiveMinPixelReferenceSize),Z.apply(n)*a.pixelRatio/2+o}computeCameraAbsCosAngle(e,t,i){return i?(0,l.S8)(ee,e):(0,l.hZ)(ee,0,0,1),(0,l.Re)(K,e,t.eye),(0,l.S8)(K,K),Math.abs((0,l.Om)(ee,K))}}class j extends g.A{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures?.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){let{stipplePattern:t}=this._material.parameters;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.getTechnique(M,e)}}class k extends T.S{constructor(){super(...arguments),this._width=0,this.color=c.Un,this.join="miter",this.cap=0,this.miterLimit=5,this.writeDepth=!0,this.polygonOffset=0,this.polygonOffsetIndex=0,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=(0,o.Kp)(0),this.animation=0,this.animationSpeed=1,this.trailLength=1,this.startTime=(0,o.Kp)(0),this.endTime=(0,o.Kp)(1/0),this.emissiveStrength=0}get width(){return this.isImagePattern()?this.stipplePattern.width:this._width}set width(e){this._width=e}get transparent(){return this.color[3]<1||this.hasAnimation||null!=this.stipplePattern&&(this.stippleOffColor?.[3]??0)<1}get hasAnimation(){return 0!==this.animation}isImagePattern(){return(0,C.sL)(this.stipplePattern)&&null!=this.stippleTexture}}class ${constructor(e,t){this.layout=e,this._parameters=t,this.numJoinSubdivisions=U(this._parameters.join,null!=this._parameters.stipplePattern)}_isClosed(e){return J(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCount(e){let t=e.get("position").indices.length/2+1,i=this._isClosed(e),r=i?2:4;return r+=((i?t:t-1)-!i)*(2*this.numJoinSubdivisions+4)+2,this._parameters.wireframe&&(r=2+4*(r-2)),r}write(e,t,i,r,a){if(null==a)return;let{buffer:n,offset:o}=a,s=this.layout,p=i.get("position"),c=p.indices,u=p.data.length/3,f=i.get("distanceToStart")?.data;c&&c.length!==2*(u-1)&&console.warn("RibbonLineMaterial does not support indices");let m=s.fields.has("sizeFeatureAttribute"),g=1,S=null;if(m){let e=i.get("sizeFeatureAttribute");1===e.data.length?g=e.data[0]:S=e.data}else g=i.get("size")?.data[0]??1;let x=[1,1,1,1],y=0,C=null,T=s.fields.has("colorFeatureAttribute");if(T){let e=i.get("colorFeatureAttribute");1===e.data.length?y=e.data[0]:C=e.data}else x=i.get("color")?.data??x;let b=i.get("timeStamps")?.data,z=b&&s.fields.has("timeStamps"),w=s.fields.has("opacityFeatureAttribute"),P=0,L=null;if(w){let e=i.get("opacityFeatureAttribute");1===e.data.length?P=e.data[0]:L=e.data}let O=new Float32Array(n.buffer),_=(0,h.Bg)(n.buffer),R=new Uint8Array(n.buffer),W=s.stride/4,F=o*W,E=F,A=0,I=f?(e,t,i)=>A=f[i]:(e,t,i)=>A+=(0,l.Io)(e,t),M=O.BYTES_PER_ELEMENT/_.BYTES_PER_ELEMENT,H=4/M,V=(0,v.E)(),N=(e,t,i,a,n,o,s,l)=>{O[F++]=t[0],O[F++]=t[1],O[F++]=t[2],(0,D.Wu)(e,t,_,F*M),F+=H,(0,D.Wu)(i,t,_,F*M),F+=H,O[F++]=l;let p=F*M;if(_[p++]=n,_[p++]=o,F=Math.ceil(p/M),T)O[F]=C?.[s]??y;else{let e=Math.min(4*s,x.length-4),t=4*F;R[t]=255*x[e],R[t+1]=255*x[e+1],R[t+2]=255*x[e+2],R[t+3]=255*x[e+3]}if(F++,O[F++]=S?.[s]??g,w&&(O[F++]=L?.[s]??P),V){let e=4*F;r?(R[e++]=r[0],R[e++]=r[1],R[e++]=r[2],R[e++]=r[3]):(R[e++]=0,R[e++]=0,R[e++]=0,R[e++]=0),F=Math.ceil(.25*e)}z&&(p=F*M,_[p++]=a[0],_[p++]=a[1],_[p++]=a[2],_[p++]=a[3],F=Math.ceil(p/M))};F+=W,(0,l.hZ)(ep,p.data[0],p.data[1],p.data[2]),z&&(0,d.hZ)(ec,b[0],b[1],b[2],b[3]),e&&(0,l.Z0)(ep,ep,e);let j=this._isClosed(i);if(j){let t=p.data.length-3;(0,l.hZ)(el,p.data[t],p.data[t+1],p.data[t+2]),e&&(0,l.Z0)(el,el,e)}else(0,l.hZ)(ed,p.data[3],p.data[4],p.data[5]),e&&(0,l.Z0)(ed,ed,e),N(ep,ep,ed,ec,1,-4,0,0),N(ep,ep,ed,ec,1,4,0,0),(0,l.C)(el,ep),(0,l.C)(ep,ed),z&&(0,d.hZ)(ec,b[4],b[5],b[6],b[7]);let k=+!j,$=j?u:u-1;for(let t=k;t<$;t++){let i=(t+1)%u*3;(0,l.hZ)(ed,p.data[i],p.data[i+1],p.data[i+2]),e&&(0,l.Z0)(ed,ed,e),I(el,ep,t),N(el,ep,ed,ec,0,-1,t,A),N(el,ep,ed,ec,0,1,t,A);let r=this.numJoinSubdivisions;for(let e=0;e<r;++e){let i=(e+1)/(r+1);N(el,ep,ed,ec,i,-1,t,A),N(el,ep,ed,ec,i,1,t,A)}if(N(el,ep,ed,ec,1,-2,t,A),N(el,ep,ed,ec,1,2,t,A),(0,l.C)(el,ep),(0,l.C)(ep,ed),z){let e=(t+1)%u*4;(0,d.hZ)(ec,b[e],b[e+1],b[e+2],b[e+3])}}j?((0,l.hZ)(ed,p.data[3],p.data[4],p.data[5]),e&&(0,l.Z0)(ed,ed,e),A=I(el,ep,$),N(el,ep,ed,ec,0,-1,k,A),N(el,ep,ed,ec,0,1,k,A)):(A=I(el,ep,$),N(el,ep,ep,ec,0,-5,$,A),N(el,ep,ep,ec,0,5,$,A)),B(O,E+W,O,E,W),F=B(O,F-W,O,F,W),this._parameters.wireframe&&this._addWireframeVertices(n,E,F,W)}_addWireframeVertices(e,t,i,r){let a=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),n=new Float32Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,i-t),o=0,s=e=>o=B(n,e,a,o,r);for(let e=0;e<n.length-1;e+=2*r)s(e),s(e+2*r),s(e+ +r),s(e+2*r),s(e+ +r),s(e+3*r)}}function B(e,t,i,r,a){for(let n=0;n<a;n++)i[r++]=e[t++];return r}function J(e,t){return!!e.isClosed&&t.get("position").indices.length>2}function U(e,t){let i=+!!t;switch(e){case"miter":case"bevel":return i;case"round":return b.r+i}}let Z=new x.PS,q=(0,p.vt)(),G=(0,p.vt)(),Q=(0,p.vt)(),Y=(0,p.vt)(),K=(0,p.vt)(),X=(0,p.vt)(),ee=(0,p.vt)(),et=(0,p.vt)(),ei=(0,n.r_)(),er=(0,n.r_)(),ea=(0,p.vt)(),en=(0,p.vt)(),eo=(0,u.vt)(),es=(0,u.vt)(),el=(0,p.vt)(),ep=(0,p.vt)(),ed=(0,p.vt)(),ec=(0,c.vt)(),eh=[(0,n.r_)(),(0,n.r_)(),(0,n.r_)(),(0,n.r_)()],eu=[(0,p.vt)(),(0,p.vt)(),(0,p.vt)(),(0,p.vt)()],ef=(0,f.vt)(),em=(0,f.vt)(),ev=(0,f.vt)(),eg=(0,f.vt)()}}]);
"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[83095],{45198:(e,t,r)=>{r.d(t,{F:()=>f,a:()=>p,b:()=>u});var i=r(744359),a=r(620721),o=r(553457),s=r(759520),n=r(86613),l=r(231596),c=r(342471),d=r(378836);class f extends c.Y{constructor(){super(...arguments),this.effect=0,this.fadeFactor=(0,i.v)(1)}}function u(){let e=new d.N5;return e.include(a.c),e.outputs.add("fragColor","vec4",0),e.fragment.uniforms.add(new l.N("colorTexture",e=>e.color),new l.N("focusArea",e=>e.focusArea),new n.c("focusAreaEffectMode",e=>e.effect),new o.m("fadeFactor",e=>e.fadeFactor.value)).main.add((0,s.H)`
      float mask = texture( focusArea, uv, 0.0 ).r;
      vec4 color = texture( colorTexture, uv, 0.0 );
      vec4 colorDeSaturate = vec4(color.r * 0.25 + color.g * 0.5 + color.b * 0.25);
      if (focusAreaEffectMode == ${s.H.int(0)}) {
        fragColor = mask > 0.0 ? color : mix(color, 0.55 * colorDeSaturate + 0.45, fadeFactor);
      } else {
        fragColor = mask > 0.0 ? color : mix(color, 0.33 * color, fadeFactor);
      }
  `),e}let p=Object.freeze(Object.defineProperty({__proto__:null,FocusAreaColorPassParameters:f,build:u},Symbol.toStringTag,{value:"Module"}))},144618:(e,t,r)=>{r.d(t,{H:()=>H,a:()=>D,b:()=>_});var i=r(698532),a=r(343994),o=r(332352),s=r(737198),n=r(230843),l=r(619363),c=r(738455),d=r(631549),f=r(516784),u=r(41781),p=r(239467),h=r(736280),v=r(875464),g=r(452562),x=r(125320),m=r(883107),C=r(913911),O=r(671165),S=r(553457),b=r(759520),w=r(86613),y=r(666374),z=r(231596),P=r(455904),A=r(748979),V=r(546574),F=r(378836);function _(e){let t=new F.N5;t.include(d.Q,e),t.vertex.include(n.N,e);let{output:r,hasOcclusionTexture:a,signedDistanceFieldEnabled:_,pixelSnappingEnabled:H,hasEmission:I,hasScreenSizePerspective:T,debugDrawLabelBorder:j,hasVVSize:M,hasVVColor:B,hasRotation:W,occludedFragmentFade:$,sampleSignedDistanceFieldTexelCenter:G,hasVertexColor:L,hasVertexSize:q,hasVertexRotation:N,hasVertexUVi:k}=e;t.include(g.Y6),t.include(h.A,e),t.include(l.g,e),t.include(V.D,e);let{vertex:Z,fragment:Y}=t;Y.include(v.a),Y.code.add((0,b.H)`
    vec4 applyFocusAreaStyle(vec4 color, int style) {
      const float factor = 0.46;
      const float factorBright = 0.32;

      if (style == ${b.H.int(0)}) {
        float luma = (color.r + color.g + color.b) / 3.0;
        float bright = luma * (1.0 - 0.6 * factorBright) + 0.6 * factorBright * color.a;
        float brightScaled = bright * factorBright;
        return vec4(brightScaled, brightScaled, brightScaled, color.a * factorBright);
      }

      float darkScaled = factor * factor;
      return vec4(color.rgb * darkScaled, color.a * factor);
    }
  `),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2");let Q=10===r;Z.uniforms.add(new C.I("viewport",e=>e.camera.fullViewport),new m.G("screenOffset",(e,t)=>(0,i.hZ)(U,2*e.screenOffset[0]*t.camera.pixelRatio,2*e.screenOffset[1]*t.camera.pixelRatio)),new m.G("anchorPosition",e=>D(e)),new O.E("materialColor",({color:e})=>e),new S.m("materialRotation",e=>e.rotation),new m.G("materialSize",e=>e.size),new z.N("tex",e=>e.texture)),(0,x.Nz)(Z),_&&(Z.uniforms.add(new O.E("outlineColor",e=>e.outlineColor)),Y.uniforms.add(new O.E("outlineColor",e=>E(e)?e.outlineColor:o.uY),new S.m("outlineSize",e=>E(e)?e.outlineSize:0))),H&&Z.include(c.K),T&&((0,g.pM)(Z),(0,g.OH)(Z)),j&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add("uv0","vec2"),k&&t.attributes.add("uvi","vec4"),L&&t.attributes.add("color","vec4"),q&&t.attributes.add("size","vec2"),N&&t.attributes.add("rotation","float"),(M||B)&&t.attributes.add("featureAttribute","vec4"),Z.main.add((0,b.H)`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      gl_Position = ${p.Z};
      return;
    }

    vec2 vertexSize = materialSize${(0,b.If)(q," * size")};
    vec2 inputSize;
    ${(0,b.If)(T,(0,b.H)`
        inputSize = screenSizePerspectiveScaleVec2(vertexSize, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,(0,b.H)`
        inputSize = vertexSize;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${(0,b.If)(M,(0,b.H)`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);
  `);let K=(0,b.H)`
  ${(0,b.If)(k,(0,b.H)`
    vec2 texSize = vec2(textureSize(tex, 0));
    vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0)) / texSize;
    `,(0,b.H)`
    vec2 uv = mix(vec2(0.), vec2(1.), bvec2(uv0));
    `)}

    quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

    ${(0,b.If)(W,(0,b.H)`
        float angle = radians(materialRotation${(0,b.If)(N," + rotation")});
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

        quadOffset.xy = rotate * quadOffset.xy;
      `)}

    quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,X=H?_?(0,b.H)`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:(0,b.H)`posProj += quadOffset;
if (inputSize.x == vertexSize.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:(0,b.H)`posProj += quadOffset;`;Z.include(A.Q),Z.main.add((0,b.H)`
    ${K}
    ${B?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":L?"vcolor = color * materialColor;":"vcolor = materialColor;"}

    ${(0,b.If)(11===r,(0,b.H)`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < alphaCutoff;
    ${(0,b.If)(_,"alphaDiscard = alphaDiscard && outlineColor.a < alphaCutoff;")}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${X}
      gl_Position = posProj;
    }

    vtc = uv;

    ${(0,b.If)(j,(0,b.H)`debugBorderCoords = vec4(uv0, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `);let J=(0,s._o)(r)&&e.hasFocusAreaStyle&&!e.draped;switch(Y.uniforms.add(new z.N("tex",e=>e.texture)),J&&Y.uniforms.add(new w.c("focusAreaStyle",e=>{let t;return(t=e.focusAreaStyle)?P.i[t]:0})),$&&!Q&&(Y.include(u.E),Y.uniforms.add(new y.x("depthMap",e=>e.mainDepth),new S.m("occludedOpacity",e=>e.occludedFragmentOpacity?.value??1))),a&&Y.uniforms.add(new y.x("texOcclusion",e=>e.hudOcclusion?.attachment)),j?Y.main.add("\n        float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));\n        // don't discard fragments on debug border\n        float textureAlphaCutoff = isBorder > 0.0 ? 0.0 : alphaCutoff;\n      "):Y.main.add("float textureAlphaCutoff = alphaCutoff;"),Y.main.add("vec2 samplePos = vtc;"),G&&Y.main.add((0,b.H)`float txSize = float(textureSize(tex, 0).x);
float texelSize = 1.0 / txSize;
vec2 scaleFactor = (vsize - txSize) * texelSize;
samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`),_?Y.main.add((0,b.H)`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < textureAlphaCutoff ||
          fillPixelColor.a + outlinePixelColor.a < alphaCutoff
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
                              vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${(0,b.If)(!Q,(0,b.H)`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < textureAlphaCutoff) {
          discard;
        }

        ${(0,b.If)(!Q,(0,b.H)`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `):Y.main.add((0,b.H)`
        vec4 texColor = texture(tex, samplePos, -0.5);
        if (texColor.a < textureAlphaCutoff) {
          discard;
        }
        ${(0,b.If)(!Q,(0,b.H)`fragColor = texColor * premultiplyAlpha(vcolor);`)}
      `),$&&!Q&&Y.main.add((0,b.H)`
        float zSample = -linearizeDepth(texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x);
        float zFragment = -linearizeDepth(gl_FragCoord.z);
        if (zSample < ${b.H.float(1-R)} * zFragment) {
          fragColor *= occludedOpacity;
        }
      `),a&&Y.main.add("fragColor *= texelFetch(texOcclusion, ivec2(gl_FragCoord.xy), 0).r;"),!Q&&j&&Y.main.add("fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);"),2===r&&Y.main.add((0,b.H)`if (fragColor.a < alphaCutoff) {
discard;
}`),J&&Y.main.add((0,b.H)`fragColor = applyFocusAreaStyle(fragColor, focusAreaStyle);`),(0,s._o)(r)&&I&&Y.main.add("fragEmission = vec4(0.0);"),r){case 1:Y.main.add("\n        fragColor = vec4(fragColor.rgb * floatBlendOutputScale, fragColor.a);\n        fragAlpha = fragColor.a * floatBlendOutputScale;\n      ");break;case 2:Y.main.add("fragColor.rgb /= fragColor.a;");break;case 11:Y.main.add("outputObjectAndLayerIdColor();");break;case 10:t.include(f.Q,e),Y.main.add("outputHighlight(false);")}return t}function E(e){return e.outlineColor[3]>0&&e.outlineSize>0}function D(e){var t,r,a;return e.textureIsSignedDistanceField?(t=e.anchorPosition,r=e.distanceFieldBoundingBox,a=U,(0,i.hZ)(a,t[0]*(r[2]-r[0])+r[0],t[1]*(r[3]-r[1])+r[1])):(0,i.C)(U,e.anchorPosition),U}let U=(0,a.vt)(),R=.08,H=Object.freeze(Object.defineProperty({__proto__:null,anchorPosition:D,build:_},Symbol.toStringTag,{value:"Module"}))},383660:(e,t,r)=>{r.d(t,{KF:()=>h,MF:()=>p,VG:()=>d,g7:()=>u,gf:()=>f,hI:()=>l,o8:()=>n,q6:()=>c});var i=r(999331),a=r(23757),o=r(850160),s=r(292237);function n(e){return{cachedResult:e.cachedResult,arcade:e.arcade?{func:e.arcade.func,context:e.arcade.modules.arcadeUtils.createExecContext(null,{sr:e.arcade.context.spatialReference}),modules:e.arcade.modules}:null}}function l(e){let t=e?.expression;if("string"==typeof t){let e=g(t);if(null!=e)return{cachedResult:e}}return null}async function c(e,t,r,i){let o=e?.expression;if("string"!=typeof o)return null;let n=g(o);if(null!=n)return{cachedResult:n};let l=await (0,s.l)();(0,a.Te)(r);let c=l.arcadeUtils,d=c.createSyntaxTree(o);if(!d)return null;if(c.dependsOnView(d))return null!=i&&i.error("Expressions containing '$view' are not supported on ElevationInfo"),{cachedResult:0};let f=c.createFunction(d);return f?{arcade:{modules:l,func:f,context:c.createExecContext(null,{sr:t})}}:null}function d(e,t,r){return e.arcadeUtils.createFeature(t.attributes,t.geometry,r)}function f(e,t){if(null!=e&&!v(e)){if(!t||!e.arcade)return void i.A.getLogger("esri.views.3d.layers.graphics.featureExpressionInfoUtils").errorOncePerTick("Arcade support required but not provided");t._geometry&&(t._geometry=(0,o.wZ)(t._geometry)),e.arcade.modules.arcadeUtils.updateExecContext(e.arcade.context,t)}}function u(e){if(null!=e){if(v(e))return e.cachedResult;let t=e.arcade,r=t?.modules.arcadeUtils.executeFunction(t.func,t.context);return"number"!=typeof r&&(e.cachedResult=0,r=0),r}return 0}function p(e,t=!1){let r=e?.featureExpressionInfo,i=r?.expression;return t||"0"===i||(r=null),r??null}let h={cachedResult:0};function v(e){return null!=e.cachedResult}function g(e){return"0"===e?0:null}},455904:(e,t,r)=>{r.d(t,{f:()=>h,i:()=>v});var i=r(990616),a=r(935445),o=r(678619),s=r(512515),n=r(432476),l=r(45198),c=r(288193),d=r(377147),f=r(278477);let u=class extends d.w{constructor(){super(...arguments),this.shader=new c.r(l.a,()=>r.e(11290).then(r.bind(r,611290))),this.ignoreUnused=!0}initializePipeline(){return(0,f.Ey)({colorWrite:f.kn})}};u=(0,i.Cg)([(0,o.$K)("esri.views.3d.webgl-engine.effects.focusArea.FocusAreaColorTechnique")],u);var p=r(556338);let h=class extends n.A{constructor(e){super({...e,view:e.focusAreasView.view}),this.consumes={required:[s.OG.FOCUSAREA_COLOR,s.OG.FOCUSAREA]},this.produces=s.OG.FOCUSAREA_COLOR,this._fadeDirection=0,this._passParameters=new l.F}fadeOut(e){this.removeAllHandles(),this._startTime=null,this._fadeDirection=1,this.addHandles((0,a.wB)(()=>this._passParameters.fadeFactor.value,t=>{0===t&&(this.removeAllHandles(),e())})),this.requestRender(2)}render(e){let t=e.find(({name:e})=>e===this.produces),r=this.techniques.getCompiled(u);if(!r)return this.requestRender(1),t;let i=this.focusAreasView.style,a=this.bindParameters,o=a.camera,n=o.fullViewport[2],l=o.fullViewport[3];this._startTime??=this.view.stage?.renderer.renderContext.time;let c=this.view.qualitySettings.fadeDuration,d=c>0?Math.min(c,this.view.stage?.renderer.renderContext.time-this._startTime)/c:1,f=e.find(({name:e})=>e===s.OG.FOCUSAREA),h=this.fboCache.acquire(n,l,this.produces),g=this.renderingContext;return g.bindFramebuffer(h.fbo),this._passParameters.color=t.getTexture(),this._passParameters.focusArea=f.getTexture(),this._passParameters.effect=v[i],this._passParameters.fadeFactor.value=0===this._fadeDirection?d:1-d,g.bindTechnique(r,a,this._passParameters),g.screen.draw(),h.attachDepth(t.getAttachment(p.nI)),d<1&&this.requestRender(2),h}};(0,i.Cg)([(0,o.MZ)()],h.prototype,"consumes",void 0),(0,i.Cg)([(0,o.MZ)()],h.prototype,"produces",void 0),(0,i.Cg)([(0,o.MZ)({constructOnly:!0})],h.prototype,"focusAreasView",void 0),h=(0,i.Cg)([(0,o.$K)("esri.views.3d.webgl-engine.effects.focusArea.FocusAreaColorNode")],h);let v={bright:0,dark:1}},577743:(e,t,r)=>{r.d(t,{F:()=>o});var i=r(711454),a=r(383660);class o{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit="meters",this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.mode=null,this.centerInElevationSR=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(e){this._unit=e,this._metersPerElevationInfoUnit=(0,i.Ao)(e)}get requiresSampledElevationInfo(){return"absolute-height"!==this.mode}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit="meters"}set offsetMeters(e){this._meterUnitOffset=e,this._renderUnitOffset=0}set offsetElevationInfoUnits(e){this._meterUnitOffset=e*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(e){this._renderUnitOffset+=e}geometryZWithOffset(e,t){let r=this.calculateOffsetRenderUnits(t);return null!=this.featureExpressionInfoContext?r:e+r}calculateOffsetRenderUnits(e){let t=this._meterUnitOffset,r=this.featureExpressionInfoContext;return null!=r&&(t+=(0,a.g7)(r)*this._metersPerElevationInfoUnit),t/e.unitInMeters+this._renderUnitOffset}setFromElevationInfo(e){this.mode=e.mode,this.unit=(0,i.Tg)(e.unit)?e.unit:"meters",this.offsetElevationInfoUnits=e.offset??0}setFeatureExpressionInfoContext(e){this._featureExpressionInfoContext=e}updateFeatureExpressionInfoContextForGraphic(e,t,r){e.arcade?(this._featureExpressionInfoContext=(0,a.o8)(e),this.updateFeatureExpressionFeature(t,r)):this._featureExpressionInfoContext=e}updateFeatureExpressionFeature(e,t){let r=this.featureExpressionInfoContext;r?.arcade&&(r.cachedResult=void 0,(0,a.gf)(this._featureExpressionInfoContext,e.geometry?(0,a.VG)(r.arcade.modules,e,t):null))}static fromElevationInfo(e){let t=new o;return null!=e&&t.setFromElevationInfo(e),t}}},631549:(e,t,r)=>{r.d(t,{Q:()=>f,R:()=>d});var i=r(916145),a=r(452562),o=r(125320),s=r(913911),n=r(589195),l=r(553457),c=r(759520);let d=.5;function f(e,t){let r=e.vertex;e.include(a.Y6),e.attributes.add("position","vec3"),e.vertex.inputs.add("position",()=>"position"),e.attributes.add("normal","vec3"),t.hasVertexCenterOffset?e.attributes.add("centerOffset","vec3"):r.constants.add("centerOffset","vec3",[0,0,0]),e.attributes.add("groundDistance","float"),(0,o.NB)(r,t),(0,o.yu)(r,t),r.uniforms.add(new s.I("viewport",e=>e.camera.fullViewport),new l.m("polygonOffset",e=>e.shaderPolygonOffset),new n.U("aboveGround",e=>e.camera.aboveGround?1:-1)),t.hasVerticalOffset&&(0,i.VQ)(r),r.code.add((0,c.H)`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),r.code.add((0,c.H)`float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
float pointGroundSign = sign(pointGroundDistance);
if (pointGroundSign == 0.0) {
pointGroundSign = aboveGround;
}
float groundRelative = aboveGround * pointGroundSign;
if (polygonOffset > .0) {
float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
float factor = (1.0 - tanAlpha / viewport[2]);
if (groundRelative > 0.0) {
posView *= factor;
}
else {
posView /= factor;
}
}
return groundRelative;
}`),t.draped&&!t.hasVerticalOffset||(0,o.S7)(r),t.draped||(r.uniforms.add(new n.U("perDistancePixelRatio",e=>Math.tan(e.camera.fovY/2)/(e.camera.fullViewport[2]/2))),r.code.add((0,c.H)`
      void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
        float distanceToCamera = length(posView);

        // Compute offset in world units for a half pixel shift
        float pixelOffset = distanceToCamera * perDistancePixelRatio * ${c.H.float(d)};

        // Apply offset along normal in the direction away from the ground surface
        vec3 modelOffset = normalModel * aboveGround * pixelOffset;

        // Apply the same offset also on the view space position
        vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

        posModel += modelOffset;
        posView += viewOffset;
      }
    `)),t.screenCenterOffsetUnitsEnabled&&(0,o.Nz)(r),t.hasScreenSizePerspective&&(0,a.OH)(r),r.code.add((0,c.H)`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      float pointGroundDistance = groundDistance;
      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${t.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${t.hasScreenSizePerspective&&(t.hasVerticalOffset||t.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${t.hasVerticalOffset?t.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${t.hasVerticalOffset?(0,c.H)`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${t.screenCenterOffsetUnitsEnabled?"":(0,c.H)`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${t.screenCenterOffsetUnitsEnabled?t.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${t.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}},738455:(e,t,r)=>{r.d(t,{K:()=>o});var i=r(314009),a=r(759520);function o(e){e.uniforms.add(new i.o("alignPixelEnabled",e=>e.alignPixelEnabled)),e.code.add((0,a.H)`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add((0,a.H)`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}},860845:(e,t,r)=>{r.d(t,{R:()=>L});var i=r(15982),a=r(756223),o=r(723799),s=r(126842),n=r(555936),l=r(698532),c=r(343994),d=r(587751),f=r(442039),u=r(332352),p=r(619146),h=r(667499),v=r(530843),g=r(324588),x=r(737198),m=r(631549),C=r(95016),O=r(264368),S=r(594407),b=r(892893),w=r(605410),y=r(409609),z=r(144618),P=r(990616),A=r(678619),V=r(688998),F=r(17218),_=r(288193),E=r(377147),D=r(878166),U=r(338237),R=r(366255),H=r(556338),I=r(278477);let T=class extends E.w{constructor(e,t){super(e,t,(0,V.U)(j).concat((0,V.U)(M(t)))),this.shader=new _.r(z.H,()=>r.e(63812).then(r.bind(r,263812))),this.ignoreUnused=!0,this.primitiveType=H.WR.TRIANGLE_STRIP}initializePipeline(e){let{draped:t,output:r,depthTestEnabled:i}=e,a=(0,x._$)(r),o=i&&!t&&!a&&10!==r;return(0,I.Ey)({blending:(0,U.Yf)(r,!0),depthTest:i&&!t?{func:515}:null,depthWrite:o?I.Uy:null,colorWrite:I.kn,polygonOffset:(0,R.s)(e)})}};T=(0,P.Cg)([(0,A.$K)("esri.views.3d.webgl-engine.shaders.HUDMaterialTechnique")],T);let j=(0,F.BP)().vec2u8("uv0",{glNormalized:!0});function M(e){let t=(0,F.BP)().vec3f("position").vec3f("normal").f32("groundDistance");return e.hasVertexCenterOffset&&(t=t.vec3f("centerOffset")),e.hasVertexColor&&(t=t.vec4u8("color",{glNormalized:!0})),e.hasVertexSize&&(t=t.vec2f("size")),e.hasVertexRotation&&(t=t.f32("rotation")),(e.hasVVColor||e.hasVVSize)&&(t=t.vec4f("featureAttribute")),e.hasVertexUVi&&(t=t.vec4i16("uvi")),(0,D.E)()?t.vec4u8("olidColor"):t}var B=r(488705),W=r(870843);class $ extends W.E{constructor(e,t){super(),this.spherical=e,this.polygonOffset=0,this.enableOITOffset=!1,this.screenCenterOffsetUnitsEnabled=!1,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.occludedFragmentFade=!1,this.hasOcclusionTexture=!1,this.hasFocusAreaStyle=!1,this.hasVertexColor=!0,this.hasVertexSize=!0,this.hasVertexRotation=!0,this.hasVertexUVi=!0,this.hasVertexCenterOffset=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1,this.transparentOccluded=t}}(0,P.Cg)([(0,B.W)()],$.prototype,"transparentOccluded",void 0),(0,P.Cg)([(0,B.W)({count:5})],$.prototype,"polygonOffset",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"enableOITOffset",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"screenCenterOffsetUnitsEnabled",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"signedDistanceFieldEnabled",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVVSize",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVVColor",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVerticalOffset",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasScreenSizePerspective",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasRotation",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"debugDrawLabelBorder",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"depthTestEnabled",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"pixelSnappingEnabled",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"draped",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"occludedFragmentFade",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasOcclusionTexture",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasFocusAreaStyle",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVertexColor",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVertexSize",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVertexRotation",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVertexUVi",void 0),(0,P.Cg)([(0,B.W)()],$.prototype,"hasVertexCenterOffset",void 0);var G=r(823405);class L extends O.i{constructor(e,t,r=!1){super(e,eu),this.produces=new Map([[12,e=>(0,x.Lc)(e)&&!this.parameters.drawAsLabel&&!this._configuration.transparentOccluded],[13,e=>(0,x.Lc)(e)&&!this.parameters.drawAsLabel&&this._configuration.transparentOccluded],[14,e=>(0,x.Lc)(e)&&this.parameters.drawAsLabel],[18,e=>this.parameters.draped&&(0,x.Lc)(e)]]),this._visible=!0,this._configuration=new $(t,r)}updateConfiguration(e){super.updateConfiguration(e);let{parameters:t,_configuration:r}=this,i=t.draped;r.enableOITOffset=e.enableOITOffset,r.hasSlicePlane=this.parameters.hasSlicePlane,r.hasVerticalOffset=!!this.parameters.verticalOffset,r.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,r.screenCenterOffsetUnitsEnabled="screen"===this.parameters.centerOffsetUnits,r.polygonOffset=this.parameters.polygonOffset,r.draped=i,r.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,r.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,r.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,r.hasRotation=this.parameters.hasRotation,r.hasVVSize=!!this.parameters.vvSize,r.hasVVColor=!!this.parameters.vvColor,r.occludedFragmentFade=!i&&!!this.parameters.occludedFragmentOpacity,r.hasFocusAreaStyle=null!=this.parameters.focusAreaStyle,r.depthTestEnabled=this.parameters.depthEnabled,r.hasVertexColor=this.parameters.hasVertexColor,r.hasVertexSize=this.parameters.hasVertexSize,r.hasVertexRotation=this.parameters.hasVertexRotation,r.hasVertexUVi=this.parameters.hasVertexUVi,r.hasVertexCenterOffset=this.parameters.hasVertexCenterOffset,(0,x._o)(e.output)&&(r.debugDrawLabelBorder=!!g.b.LABELS_SHOW_BORDER),r.hasOcclusionTexture=!t.drawAsLabel&&r.transparentOccluded&&(0,x.ZH)(e.output)}intersect(e,t,r,i,o,n){let{options:{selectionMode:l,hud:c,excludeLabels:p},point:h,camera:v}=r,{parameters:g}=this;if(!l||!c||p&&g.isLabel||!e.visible||!h||!v)return;let x=e.attributes.get("featureAttribute"),{scaleX:m,scaleY:C}=eh(null==x?null:(0,u.ci)(x.data,es),g,v.pixelRatio),O=e.attributes.get("position"),S=e.attributes.get("size"),w=e.attributes.get("normal"),y=e.attributes.get("rotation"),P=e.attributes.get("centerOffset"),A=this.parameters.size;(0,b.vA)(O.size>=3);let V="screen"===this.parameters.centerOffsetUnits;for(let e=0;e<O.data.length/O.size;e++){let i=e*O.size;if((0,d.hZ)(Y,O.data[i],O.data[i+1],O.data[i+2]),(0,d.Z0)(Y,Y,t),(0,d.Z0)(Y,Y,v.viewMatrix),P){let t=e*P.size;(0,d.hZ)(ea,P.data[t],P.data[t+1],P.data[t+2])}else(0,d.hZ)(ea,0,0,0);if(!V&&(Y[0]+=ea[0],Y[1]+=ea[1],0!==ea[2])){let e=ea[2];(0,d.S8)(ea,Y),(0,d.Re)(Y,Y,(0,d.hs)(ea,ea,e))}let o=e*w.size;(0,d.hZ)(Q,w.data[o],w.data[o+1],w.data[o+2]),(0,d.ei)(Q,Q,(0,a.z0)(er,t));let{normal:l,cosAngle:c}=N(Q,v,en),u=ev(this.parameters,Y,c,v,Z);if((0,d.Ln)(Y,Y,l,u),v.applyProjection(Y,K),K[0]>-1){if(V&&(ea[0]||ea[1])&&(K[0]+=ea[0]*v.pixelRatio,0!==ea[1]&&(K[1]+=Z.alignmentEvaluator.apply(ea[1])*v.pixelRatio),v.unapplyProjection(K,Y)),K[0]+=this.parameters.screenOffset[0]*v.pixelRatio,K[1]+=this.parameters.screenOffset[1]*v.pixelRatio,K[0]=Math.floor(K[0]),K[1]=Math.floor(K[1]),ed[0]=A[0],ed[1]=A[1],null!=S){let t=e*S.size;ed[0]*=S.data[t],ed[1]*=S.data[t+1]}Z.evaluator.applyVec2(ed,ed);let t=el*v.pixelRatio,i=0;g.textureIsSignedDistanceField&&(i=Math.min(g.outlineSize,.5*ed[0])*v.pixelRatio/2),ed[0]*=m,ed[1]*=C;let a=g.rotation+(null!=y?y.data[e*y.size]:0),o=(0,z.a)(g);if(k(h,K[0],K[1],ed,t,i,a,g,o)){let e=r.ray;if((0,d.Z0)(J,Y,(0,s.B8)(ei,v.viewMatrix)),K[0]=h[0],K[1]=h[1],v.unprojectFromRenderScreen(K,Y)){let t=(0,f.vt)();(0,d.C)(t,e.direction);let r=1/(0,d.Bw)(t);(0,d.hs)(t,t,r);let i=(0,d.Io)(e.origin,Y)*r;n(i,i,t,-1,J)}}}}}intersectDraped(e,t,r,i,a){let o=e.attributes.get("position"),s=e.attributes.get("size"),n=e.attributes.get("rotation"),l=this.parameters,c=l.size,d=e.attributes.get("featureAttribute"),{scaleX:f,scaleY:p}=eh(null==d?null:(0,u.ci)(d.data,es),l,e.screenToWorldRatio),h=ec*e.screenToWorldRatio;for(let t=0;t<o.data.length/o.size;t++){let d=t*o.size,u=o.data[d],v=o.data[d+1];if(ed[0]=c[0],ed[1]=c[1],null!=s){let e=t*s.size;ed[0]*=s.data[e],ed[1]*=s.data[e+1]}let g=0;l.textureIsSignedDistanceField&&(g=Math.min(l.outlineSize,.5*ed[0])*e.screenToWorldRatio/2),ed[0]*=f,ed[1]*=p;let x=l.rotation+(null!=n?n.data[t*n.size]:0),m=(0,z.a)(l);k(r,u,v,ed,h,g,x,l,m)&&i(a.distance,a.renderDistance,a.normal,-1)}}createBufferWriter(){return new ep(this.parameters)}applyShaderOffsets(e,t,r,i,o,s,n,l){var c,f;let u;(0,d.ei)(X,r,(0,a.z0)(er,i));let p=N(X,n,en),h=(c=(0,d.Bw)(t),u=(f=n).computeRenderPixelSizeAtDist(c)*m.R,(f.aboveGround?1:-1)*u),v=ev(this.parameters,t,p.cosAngle,n,l);(0,d.Ln)(t,t,p.normal,v+h),(0,d.Ln)(e,e,X,v+h),this._applyPolygonOffsetView(t,p,s+v,n,t),this._applyCenterOffsetView(t,o,t)}applyShaderOffsetsNDC(e,t,r,i,a,o){return this._applyCenterOffsetNDC(e,t,i,a),null!=o&&(0,d.C)(o,a),this._applyPolygonOffsetNDC(a,r,i,a),a}_applyPolygonOffsetView(e,t,r,a,o){let s=a.aboveGround?1:-1,n=Math.sign(r);0===n&&(n=s);let l=s*n;if(this.parameters.shaderPolygonOffset<=0)return(0,d.C)(o,e);let c=(0,i.qE)(Math.abs(t.cosAngle),.01,1),f=1-Math.sqrt(1-c*c)/c/a.viewport[2];return(0,d.hs)(o,e,l>0?f:1/f),o}_applyCenterOffsetView(e,t,r){let i="screen"!==this.parameters.centerOffsetUnits;return r!==e&&(0,d.C)(r,e),i&&(r[0]+=t[0],r[1]+=t[1],t[2]&&((0,d.S8)(Q,r),(0,d.jb)(r,r,(0,d.hs)(Q,Q,t[2])))),r}_applyCenterOffsetNDC(e,t,r,i){let a="screen"!==this.parameters.centerOffsetUnits;return i!==e&&(0,d.C)(i,e),a||(i[0]+=t[0]/r.fullWidth*2,i[1]+=t[1]/r.fullHeight*2),i}_applyPolygonOffsetNDC(e,t,r,i){let a=this.parameters.shaderPolygonOffset;if(e!==i&&(0,d.C)(i,e),a){let e=r.aboveGround?1:-1,o=e*Math.sign(t);i[2]-=(o||e)*a}return i}set visible(e){this._visible=e}get visible(){let{color:e,outlineSize:t,outlineColor:r}=this.parameters,i=e[3]>=G.Q||t>=G.Q&&r[3]>=G.Q;return this._visible&&i}createGLMaterial(e){return new q(e)}calculateRelativeScreenBounds(e,t,r=(0,p.vt)()){var i,a,o,s;return i=this.parameters,a=e,o=t,(s=r)[0]=-(i.anchorPosition[0]*a[0])+i.screenOffset[0]*o,s[1]=-(i.anchorPosition[1]*a[1])+i.screenOffset[1]*o,r[2]=r[0]+e[0],r[3]=r[1]+e[1],r}}class q extends C.m8{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(T,e)}}function N(e,t,r){return(0,d.Z0)(r.normal,e,t.viewInverseTransposeMatrix),r.cosAngle=(0,d.Om)(r.normal,ef),r}function k(e,t,r,a,o,s,n,c,d){let f=t-o-a[0]*d[0],u=f+a[0]+2*o,p=r-o-a[1]*d[1],h=p+a[1]+2*o,v=c.distanceFieldBoundingBox;return c.textureIsSignedDistanceField&&null!=v&&(f+=a[0]*v[0],p+=a[1]*v[1],u-=a[0]*(1-v[2]),h-=a[1]*(1-v[3]),f-=s,u+=s,p-=s,h+=s),(0,l.hZ)(et,t,r),(0,l.e$)(ee,e,et,(0,i.kU)(n)),ee[0]>f&&ee[0]<u&&ee[1]>p&&ee[1]<h}let Z=new S.fc,Y=(0,f.vt)(),Q=(0,f.vt)(),K=(0,u.vt)(),X=(0,f.vt)(),J=(0,f.vt)(),ee=(0,c.vt)(),et=(0,c.vt)(),er=(0,o.vt)(),ei=(0,n.vt)(),ea=(0,f.vt)(),eo=(0,f.vt)(),es=(0,u.vt)(),en={normal:(0,f.vt)(),cosAngle:0},el=1,ec=2,ed=(0,c.fA)(0,0),ef=(0,f.fA)(0,0,1);class eu extends C.NV{constructor(){super(...arguments),this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.isDecoration=!1,this.color=u.Un,this.size=c.Un,this.polygonOffset=0,this.anchorPosition=(0,c.fA)(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=u.Un,this.outlineSize=0,this.distanceFieldBoundingBox=(0,u.vt)(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.hasVertexColor=!1,this.hasVertexSize=!1,this.hasVertexRotation=!1,this.hasVertexUVi=!1,this.hasVertexCenterOffset=!1,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.focusAreaStyle=null,this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class ep{constructor(e){this.baseInstanceLayout=j,this.layout=M(e)}elementCount(e){return e.get("position").indices.length}elementCountBaseInstance(e){return e.get("uv0").indices.length}write(e,t,r,i,a){if(null==a)return;let{buffer:o,offset:s}=a,{position:n,normal:l,color:c,size:d,rotation:f,centerOffset:u,groundDistance:p,featureAttribute:v,uvi:g}=o;(0,w.Hk)(r.get("position"),e,n,s),(0,w.p1)(r.get("normal"),t,l,s);let x=r.get("position").indices.length;if(g){let e=r.get("uvi")?.data;if(e&&e.length>=4){let[t,r,i,a]=e;for(let e=0;e<x;++e){let o=s+e;g.setValues(o,t,r,i,a)}}}if(c&&(0,w.tb)(r.get("color"),4,c,s),d&&(0,w.Ue)(r.get("size"),d,s),f&&(0,w.uO)(r.get("rotation"),f,s),u&&(r.get("centerOffset")?(0,w.NC)(r.get("centerOffset"),u,s):(0,w.Hv)(u,s,x)),r.get("groundDistance")?(0,w.uO)(r.get("groundDistance"),p,s):(0,w.Hv)(p,s,x),v&&(r.get("featureAttribute")?(0,w.Ut)(r.get("featureAttribute"),v,s):(0,w.Hv)(v,s,x)),null!=i){let e=r.get("position")?.indices;if(e){let t=e.length,r=o.getField("olidColor",h.XP);(0,w.vx)(i,r,t,s)}}}writeBaseInstance(e,t){let{uv0:r}=t;(0,w.Ue)(e.get("uv0"),r,0)}}function eh(e,t,r){return null==e||null==t.vvSize?{scaleX:r,scaleY:r}:((0,v.VC)(eo,t,e),{scaleX:eo[0]*r,scaleY:eo[1]*r})}function ev(e,t,r,i,a){if(!e.verticalOffset?.screenLength){let i=(0,d.Bw)(t);return a.update(r,i,e.screenSizePerspective,e.screenSizePerspectiveMinPixelReferenceSize,e.screenSizePerspectiveAlignment,null),0}let o=(0,d.Bw)(t),s=e.screenSizePerspectiveAlignment??e.screenSizePerspective,n=(0,y.kE)(i,o,e.verticalOffset,r,s,e.screenSizePerspectiveMinPixelReferenceSize);return a.update(r,o,e.screenSizePerspective,e.screenSizePerspectiveMinPixelReferenceSize,e.screenSizePerspectiveAlignment,null),n}}}]);
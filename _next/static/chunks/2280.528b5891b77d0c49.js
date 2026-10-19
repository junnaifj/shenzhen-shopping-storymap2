"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2280],{2280:(e,t,i)=>{i.d(t,{o:()=>Z}),i(344881);var n=i(587751),r=i(442039),s=i(866733),a=i(217786),l=i(577841),o=i(990616),h=i(928185),c=i(678619),d=i(46476),p=i(619976),u=i(696342),f=i(512515),g=i(432476),_=i(769857),m=i(151424),v=i(688998),P=i(17218),b=i(288193),w=i(377147),D=i(517920),V=i(15982),x=i(342471);class C extends x.Y{constructor(){super(...arguments),this.innerColor=(0,r.fA)(1,1,1),this.innerWidth=1,this.glowColor=(0,r.fA)(1,.5,0),this.glowWidth=8,this.glowFalloff=8,this.globalAlpha=.75,this.globalAlphaContrastBoost=2,this.angleCutoff=(0,V.kU)(6),this.pointDistanceOrigin=(0,r.vt)(),this.pointDistanceTarget=(0,r.vt)(),this.lineVerticalPlaneSegment=(0,s.vt)(),this.intersectsLineSegment=(0,s.vt)(),this.intersectsLineRadius=3,this.heightManifoldTarget=(0,r.vt)(),this.lineStartWorld=(0,r.vt)(),this.lineEndWorld=(0,r.vt)()}}let y=class extends w.w{constructor(){super(...arguments),this.shader=new b.r(l.L,()=>i.e(76572).then(i.bind(i,776572)))}};y=(0,o.Cg)([(0,c.$K)("esri.views.3d.webgl-engine.effects.laserlines.LaserlineTechnique")],y);class E extends C{constructor(){super(...arguments),this.origin=(0,r.vt)()}}let L=class extends w.w{constructor(e,t){super(e,t,(0,v.U)(t.spherical?S:M)),this.shader=new b.r(D.L,()=>i.e(43765).then(i.bind(i,743765)))}};L=(0,o.Cg)([(0,c.$K)("esri.views.3d.webgl-engine.effects.laserlines.LaserlinePathTechnique")],L);let S=(0,P.BP)().vec3f("start").vec3f("end").vec2f("extrude").vec3f("startUp").vec3f("endUp"),M=(0,P.BP)().vec3f("start").vec3f("end").vec2f("extrude");var A=i(288251),R=i(556338),T=i(741580);class U{constructor(e){this._renderCoordsHelper=e,this._origin=(0,r.vt)(),this._dirty=!1,this._count=0}set vertices(e){let t=(0,m.jh)(3*e.length),i=0;for(let n of e)t[i++]=n[0],t[i++]=n[1],t[i++]=n[2];this.buffers=[t]}set buffers(e){if(this._buffers=e,this._buffers.length>0){let e=this._buffers[0],t=3*Math.floor(e.length/3/2);(0,n.hZ)(this._origin,e[t],e[t+1],e[t+2])}else(0,n.hZ)(this._origin,0,0,0);this._dirty=!0}get origin(){return this._origin}draw(e){let t=this._ensureVAO(e);null!=t&&(e.bindVAO(t),e.drawArrays(R.WR.TRIANGLES,0,this._count))}dispose(){null!=this._vao&&this._vao.dispose()}get _layout(){return 1===this._renderCoordsHelper.viewingMode?S:M}_ensureVAO(e){return null==this._buffers?null:(this._vao??=this._createVAO(e,this._buffers),this._ensureVertexData(this._vao,this._buffers),this._vao)}_createVAO(e,t){let i=this._createDataBuffer(t);return this._dirty=!1,new A.Z(e,new T.R(e,(0,v.U)(this._layout),i))}_ensureVertexData(e,t){if(!this._dirty)return;let i=this._createDataBuffer(t);e.buffer()?.setData(i),this._dirty=!1}_createDataBuffer(e){let t=e.reduce((e,t)=>e+I(t),0);this._count=t;let i=this._layout.createBuffer(t),r=this._origin,s=0,a=0,l="startUp"in i?this._setUpVectors.bind(this,i):void 0;for(let t of e){for(let e=0;e<t.length;e+=3){let o=(0,n.hZ)(H,t[e],t[e+1],t[e+2]);0===e?a=this._renderCoordsHelper.getAltitude(o):this._renderCoordsHelper.setAltitude(o,a);let h=s+2*e;l?.(e,h,t,o);let c=(0,n.Re)(H,o,r);if(e<t.length-3){for(let e=0;e<6;e++)i.start.setVec(h+e,c);i.extrude.setValues(h,0,-1),i.extrude.setValues(h+1,1,-1),i.extrude.setValues(h+2,1,1),i.extrude.setValues(h+3,0,-1),i.extrude.setValues(h+4,1,1),i.extrude.setValues(h+5,0,1)}if(e>0)for(let e=-6;e<0;e++)i.end.setVec(h+e,c)}s+=I(t)}return i.buffer}_setUpVectors(e,t,i,n,r){let s=this._renderCoordsHelper.worldUpAtPosition(r,O);if(t<n.length-3)for(let t=0;t<6;t++)e.startUp.setVec(i+t,s);if(t>0)for(let t=-6;t<0;t++)e.endUp.setVec(i+t,s)}}function I(e){return 3*(2*(e.length/3-1))}let O=(0,r.vt)(),H=(0,r.vt)();var N=i(488705);class q extends N.K{constructor(){super(...arguments),this.contrastControlEnabled=!1,this.spherical=!1}}(0,o.Cg)([(0,N.W)()],q.prototype,"contrastControlEnabled",void 0),(0,o.Cg)([(0,N.W)()],q.prototype,"spherical",void 0);class W extends q{constructor(){super(...arguments),this.heightManifoldEnabled=!1,this.pointDistanceEnabled=!1,this.lineVerticalPlaneEnabled=!1,this.intersectsLineEnabled=!1}}(0,o.Cg)([(0,N.W)()],W.prototype,"heightManifoldEnabled",void 0),(0,o.Cg)([(0,N.W)()],W.prototype,"pointDistanceEnabled",void 0),(0,o.Cg)([(0,N.W)()],W.prototype,"lineVerticalPlaneEnabled",void 0),(0,o.Cg)([(0,N.W)()],W.prototype,"intersectsLineEnabled",void 0);var j=i(409609);let z=class extends g.A{get requireGeometryDepth(){return!0}constructor(e){super(e),this.isDecoration=!0,this.produces=f.OG.LASERLINES,this.consumes={required:[f.OG.LASERLINES,"normals"]},this._configuration=new W,this._pathTechniqueConfiguration=new q,this._intersectsLineInfinite=!1,this._pathVerticalPlaneEnabled=!1,this._passParameters=new E,this._blit=new _.G(e.view.stage.renderView.techniques,2)}initialize(){this._passParameters.renderCoordsHelper=this.view.renderCoordsHelper,this._configuration.spherical=1===this.view.state.viewingMode,this._configuration.contrastControlEnabled=this.contrastControlEnabled,this._pathTechniqueConfiguration.spherical=1===this.view.state.viewingMode,this._pathTechniqueConfiguration.contrastControlEnabled=this.contrastControlEnabled}destroy(){this._pathVerticalPlaneData=(0,h.WD)(this._pathVerticalPlaneData)}get heightManifoldEnabled(){return this._configuration.heightManifoldEnabled}set heightManifoldEnabled(e){this._configuration.heightManifoldEnabled!==e&&(this._configuration.heightManifoldEnabled=e,this.requestRender(1))}get heightManifoldTarget(){return this._passParameters.heightManifoldTarget}set heightManifoldTarget(e){(0,n.C)(this._passParameters.heightManifoldTarget,e),this.requestRender(1)}get pointDistanceEnabled(){return this._configuration.pointDistanceEnabled}set pointDistanceEnabled(e){e!==this._configuration.pointDistanceEnabled&&(this._configuration.pointDistanceEnabled=e,this.requestRender(1))}get pointDistanceTarget(){return this._passParameters.pointDistanceTarget}set pointDistanceTarget(e){(0,n.C)(this._passParameters.pointDistanceTarget,e),this.requestRender(1)}get pointDistanceOrigin(){return this._passParameters.pointDistanceOrigin}set pointDistanceOrigin(e){(0,n.C)(this._passParameters.pointDistanceOrigin,e),this.requestRender(1)}get lineVerticalPlaneEnabled(){return this._configuration.lineVerticalPlaneEnabled}set lineVerticalPlaneEnabled(e){e!==this._configuration.lineVerticalPlaneEnabled&&(this._configuration.lineVerticalPlaneEnabled=e,this.requestRender(1))}get lineVerticalPlaneSegment(){return this._passParameters.lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){(0,s.C)(e,this._passParameters.lineVerticalPlaneSegment),this.requestRender(1)}get intersectsLineEnabled(){return this._configuration.intersectsLineEnabled}set intersectsLineEnabled(e){e!==this._configuration.intersectsLineEnabled&&(this._configuration.intersectsLineEnabled=e,this.requestRender(1))}get intersectsLineSegment(){return this._passParameters.intersectsLineSegment}set intersectsLineSegment(e){(0,s.C)(e,this._passParameters.intersectsLineSegment),this.requestRender(1)}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){e!==this._intersectsLineInfinite&&(this._intersectsLineInfinite=e,this.requestRender(1))}get pathVerticalPlaneEnabled(){return this._pathVerticalPlaneEnabled}set pathVerticalPlaneEnabled(e){e!==this._pathVerticalPlaneEnabled&&(this._pathVerticalPlaneEnabled=e,null!=this._pathVerticalPlaneData&&this.requestRender(1))}set pathVerticalPlaneVertices(e){null==this._pathVerticalPlaneData&&(this._pathVerticalPlaneData=new U(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.vertices=e,this.pathVerticalPlaneEnabled&&this.requestRender(1)}set pathVerticalPlaneBuffers(e){null==this._pathVerticalPlaneData&&(this._pathVerticalPlaneData=new U(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.buffers=e,this.pathVerticalPlaneEnabled&&this.requestRender(1)}setParameters(e){(0,j.MB)(this._passParameters,e)&&this.requestRender(1)}precompile(){this.techniques.precompile(y,this._configuration),this.contrastControlEnabled&&this._blit.precompile(),this.pathVerticalPlaneEnabled&&this._pathVerticalPlaneData&&this.techniques.precompile(L,this._pathTechniqueConfiguration)}render(e){let t=e.find(({name:e})=>e===this.produces);if(this.isDecoration&&!this.bindParameters.decorations)return t;let i=this.renderingContext,n=e.find(({name:e})=>"normals"===e);if(this._passParameters.normals=n?.getTexture(),!this.contrastControlEnabled)return i.bindFramebuffer(t.fbo),this._renderLaserLines(),t;this._passParameters.colors=t.getTexture();let r=this.fboCache.acquire(t.fbo.width,t.fbo.height,"laser lines");return i.bindFramebuffer(r.fbo),i.setClearColor(0,0,0,0),i.clear(16640),this._renderLaserLines(),i.unbindTexture(t.getTexture()),this._blit.blend(r,t,this.bindParameters)||this.requestRender(1),r.release(),t}_renderLaserLines(){(this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled)&&this._renderUnified(),this.pathVerticalPlaneEnabled&&this._renderPath()}_renderUnified(){if(!this._updatePassParameters())return;let e=this.techniques.getCompiled(y,this._configuration);if(e){let t=this.renderingContext;t.setDrawBuffers([R.r6]),t.bindTechnique(e,this.bindParameters,this._passParameters),t.screen.draw()}else this.requestRender(1)}_renderPath(){if(null==this._pathVerticalPlaneData)return;let e=this.techniques.get(L,this._pathTechniqueConfiguration);if(e.compiled){let t=this.renderingContext;this._passParameters.origin=this._pathVerticalPlaneData.origin,t.setDrawBuffers([R.r6]),t.bindTechnique(e,this.bindParameters,this._passParameters),this._pathVerticalPlaneData.draw(t)}else this.requestRender(1)}_updatePassParameters(){if(!this.intersectsLineEnabled)return!0;let e=this.bindParameters.camera,t=this._passParameters;if(this._intersectsLineInfinite){if((0,d.$e)((0,u.LV)(t.intersectsLineSegment.origin,t.intersectsLineSegment.vector),B),B.c0=-Number.MAX_VALUE,!(0,p.ig)(e.frustum,B))return!1;(0,d.j1)(B,t.lineStartWorld),(0,d.mO)(B,t.lineEndWorld)}else(0,n.C)(t.lineStartWorld,t.intersectsLineSegment.origin),(0,n.WQ)(t.lineEndWorld,t.intersectsLineSegment.origin,t.intersectsLineSegment.vector);return!0}get test(){}};(0,o.Cg)([(0,c.MZ)({constructOnly:!0})],z.prototype,"contrastControlEnabled",void 0),(0,o.Cg)([(0,c.MZ)()],z.prototype,"isDecoration",void 0),(0,o.Cg)([(0,c.MZ)()],z.prototype,"produces",void 0),(0,o.Cg)([(0,c.MZ)()],z.prototype,"consumes",void 0),z=(0,o.Cg)([(0,c.$K)("esri.views.3d.webgl-engine.effects.laserlines.LaserLineRenderer")],z);let B=(0,d.vt)();class Z extends a.B{constructor(e){super(e),this._angleCutoff=l.d,this._style={},this._heightManifoldTarget=(0,r.vt)(),this._heightManifoldEnabled=!1,this._intersectsLine=(0,s.vt)(),this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._lineVerticalPlaneSegment=null,this._pathVerticalPlaneBuffers=null,this._pointDistanceLine=null,this.applyProperties(e)}get testData(){}createResources(){this._ensureRenderer()}destroyResources(){this._disposeRenderer()}updateVisibility(){this._syncRenderer(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance()}get angleCutoff(){return this._angleCutoff}set angleCutoff(e){this._angleCutoff!==e&&(this._angleCutoff=e,this._syncAngleCutoff())}get style(){return this._style}set style(e){this._style=e,this._syncStyle()}get heightManifoldTarget(){return this._heightManifoldEnabled?this._heightManifoldTarget:null}set heightManifoldTarget(e){null!=e?((0,n.C)(this._heightManifoldTarget,e),this._heightManifoldEnabled=!0):this._heightManifoldEnabled=!1,this._syncRenderer(),this._syncHeightManifold()}set intersectsWorldUpAtLocation(e){if(null==e)return void(this.intersectsLine=null);let t=this.view.renderCoordsHelper.worldUpAtPosition(e,F);this.intersectsLine=(0,s.fA)(e,t),this.intersectsLineInfinite=!0}get intersectsLine(){return this._intersectsLineEnabled?this._intersectsLine:null}set intersectsLine(e){null!=e?((0,s.C)(e,this._intersectsLine),this._intersectsLineEnabled=!0):this._intersectsLineEnabled=!1,this._syncIntersectsLine(),this._syncRenderer()}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){this._intersectsLineInfinite=e,this._syncIntersectsLineInfinite()}get lineVerticalPlaneSegment(){return this._lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){this._lineVerticalPlaneSegment=null!=e?(0,s.C)(e):null,this._syncLineVerticalPlane(),this._syncRenderer()}get pathVerticalPlane(){return this._pathVerticalPlaneBuffers}set pathVerticalPlane(e){this._pathVerticalPlaneBuffers=e,this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncRenderer()}get pointDistanceLine(){return this._pointDistanceLine}set pointDistanceLine(e){this._pointDistanceLine=null!=e?{origin:(0,r.o8)(e.origin),target:e.target?(0,r.o8)(e.target):null}:null,this._syncPointDistance(),this._syncRenderer()}get isDecoration(){return this._isDecoration}set isDecoration(e){this._isDecoration=e,this._renderer&&(this._renderer.isDecoration=e)}_syncRenderer(){this.attached&&this.visible&&(this._intersectsLineEnabled||this._heightManifoldEnabled||null!=this._pointDistanceLine||null!=this._pathVerticalPlaneBuffers)?this._ensureRenderer():this._disposeRenderer()}_ensureRenderer(){null==this._renderer&&(this._renderer=new z({view:this.view,contrastControlEnabled:!0,isDecoration:this.isDecoration}),this._syncStyle(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncIntersectsLineInfinite(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncAngleCutoff())}_syncStyle(){null!=this._renderer&&this._renderer.setParameters(this._style)}_syncAngleCutoff(){this._renderer?.setParameters({angleCutoff:this._angleCutoff})}_syncHeightManifold(){null!=this._renderer&&(this._renderer.heightManifoldEnabled=this._heightManifoldEnabled&&this.visible,this._heightManifoldEnabled&&(this._renderer.heightManifoldTarget=this._heightManifoldTarget))}_syncIntersectsLine(){null!=this._renderer&&(this._renderer.intersectsLineEnabled=this._intersectsLineEnabled&&this.visible,this._intersectsLineEnabled&&(this._renderer.intersectsLineSegment=this._intersectsLine))}_syncIntersectsLineInfinite(){null!=this._renderer&&(this._renderer.intersectsLineInfinite=this._intersectsLineInfinite)}_syncPathVerticalPlane(){null!=this._renderer&&(this._renderer.pathVerticalPlaneEnabled=null!=this._pathVerticalPlaneBuffers&&this.visible,null!=this._pathVerticalPlaneBuffers&&(this._renderer.pathVerticalPlaneBuffers=this._pathVerticalPlaneBuffers))}_syncLineVerticalPlane(){null!=this._renderer&&(this._renderer.lineVerticalPlaneEnabled=null!=this._lineVerticalPlaneSegment&&this.visible,null!=this._lineVerticalPlaneSegment&&(this._renderer.lineVerticalPlaneSegment=this._lineVerticalPlaneSegment))}_syncPointDistance(){if(null==this._renderer)return;let e=this._pointDistanceLine,t=null!=e;this._renderer.pointDistanceEnabled=t&&null!=e.target&&this.visible,t&&(this._renderer.pointDistanceOrigin=e.origin,null!=e.target&&(this._renderer.pointDistanceTarget=e.target))}_disposeRenderer(){null!=this._renderer&&this.view.stage&&(this._renderer.destroy(),this._renderer=null)}forEachMaterial(){}}let F=(0,r.vt)()},217786:(e,t,i)=>{i.d(t,{B:()=>r}),i(344881);var n=i(935445);class r{get isDecoration(){return this._isDecoration}set isDecoration(e){this._isDecoration=e,this.forEachMaterial(t=>t?.setParameters({isDecoration:e}))}constructor(e){this._isDecoration=!1,this._attached=!1,this._resourcesCreated=!1,this._visible=!0,this.view=e.view,this._handle=(0,n.wB)(()=>e.view.ready,e=>{this._resourcesCreated&&(e?this._createResources():this._destroyResources())})}applyProperties(e){let t=!1;for(let i in e)i in this&&("attached"===i?t=!!e[i]:this[i]=e[i]);this.attached=t}destroy(){this.attached=!1,this._handle.remove()}get attached(){return this._attached}set attached(e){e!==this._attached&&this.view.stage&&(this._attached=e,this._attached&&!this._resourcesCreated?this._createResources():!this._attached&&this._resourcesCreated&&this._destroyResources(),this.onAttachedChange(e))}onAttachedChange(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.attached&&this.updateVisibility(e))}_createResources(){this.createResources(),this._resourcesCreated=!0,this.updateVisibility(this.visible)}_destroyResources(){this.destroyResources(),this._resourcesCreated=!1}}},517920:(e,t,i)=>{i.d(t,{L:()=>v,b:()=>g});var n=i(126842),r=i(555936),s=i(698532),a=i(343994),l=i(994191),o=i(398709),h=i(589195),c=i(553457),d=i(759520),p=i(855272),u=i(981014),f=i(378836);function g(e){let t=new f.N5;t.include(l.K,e);let{vertex:i,fragment:r}=t;i.uniforms.add(new u.X("modelView",(e,{camera:t})=>(0,n.Tl)(m,t.viewMatrix,e.origin)),new p.F("proj",({camera:e})=>e.projectionMatrix),new c.m("glowWidth",(e,{camera:t})=>e.glowWidth*t.pixelRatio),new o.E("pixelToNDC",({camera:e})=>(0,s.hZ)(_,2/e.fullViewport[2],2/e.fullViewport[3]))),t.attributes.add("start","vec3"),t.attributes.add("end","vec3"),e.spherical&&(t.attributes.add("startUp","vec3"),t.attributes.add("endUp","vec3")),t.attributes.add("extrude","vec2"),t.varyings.add("uv","vec2"),t.varyings.add("vViewStart","vec3"),t.varyings.add("vViewEnd","vec3"),t.varyings.add("vViewSegmentNormal","vec3"),t.varyings.add("vViewStartNormal","vec3"),t.varyings.add("vViewEndNormal","vec3");let a=!e.spherical;return i.main.add((0,d.H)`
    vec3 pos = mix(start, end, extrude.x);

    vec4 viewPos = modelView * vec4(pos, 1);
    vec4 projPos = proj * viewPos;
    vec2 ndcPos = projPos.xy / projPos.w;

    // in planar we hardcode the up vectors to be Z-up */
    ${(0,d.If)(a,(0,d.H)`vec3 startUp = vec3(0, 0, 1);`)}
    ${(0,d.If)(a,(0,d.H)`vec3 endUp = vec3(0, 0, 1);`)}

    // up vector corresponding to the location of the vertex, selecting either startUp or endUp */
    vec3 up = extrude.y * mix(startUp, endUp, extrude.x);
    vec3 viewUp = (modelView * vec4(up, 0)).xyz;

    vec4 projPosUp = proj * vec4(viewPos.xyz + viewUp, 1);
    vec2 projUp = normalize(projPosUp.xy / projPosUp.w - ndcPos);

    // extrude ndcPos along projUp to the edge of the screen
    vec2 lxy = abs(sign(projUp) - ndcPos);
    ndcPos += length(lxy) * projUp;

    vViewStart = (modelView * vec4(start, 1)).xyz;
    vViewEnd = (modelView * vec4(end, 1)).xyz;

    vec3 viewStartEndDir = vViewEnd - vViewStart;

    vec3 viewStartUp = (modelView * vec4(startUp, 0)).xyz;

    // the normal of the plane that aligns with the segment and the up vector
    vViewSegmentNormal = normalize(cross(viewStartUp, viewStartEndDir));

    // the normal orthogonal to the segment normal and the start up vector
    vViewStartNormal = -normalize(cross(vViewSegmentNormal, viewStartUp));

    // the normal orthogonal to the segment normal and the end up vector
    vec3 viewEndUp = (modelView * vec4(endUp, 0)).xyz;
    vViewEndNormal = normalize(cross(vViewSegmentNormal, viewEndUp));

    // Add enough padding in the X screen space direction for "glow"
    float xPaddingPixels = sign(dot(vViewSegmentNormal, viewPos.xyz)) * (extrude.x * 2.0 - 1.0) * glowWidth;
    ndcPos.x += xPaddingPixels * pixelToNDC.x;

    // uv is used to read back depth to reconstruct the position at the fragment
    uv = ndcPos * 0.5 + 0.5;

    gl_Position = vec4(ndcPos, 0, 1);
  `),r.uniforms.add(new h.U("perScreenPixelRatio",e=>e.camera.perScreenPixelRatio)),r.code.add((0,d.H)`float planeDistance(vec3 planeNormal, vec3 planeOrigin, vec3 pos) {
return dot(planeNormal, pos - planeOrigin);
}
float segmentDistancePixels(vec3 segmentNormal, vec3 startNormal, vec3 endNormal, vec3 pos, vec3 start, vec3 end) {
float distSegmentPlane = planeDistance(segmentNormal, start, pos);
float distStartPlane = planeDistance(startNormal, start, pos);
float distEndPlane = planeDistance(endNormal, end, pos);
float dist = max(max(distStartPlane, distEndPlane), abs(distSegmentPlane));
float width = fwidth(distSegmentPlane);
float maxPixelDistance = length(pos) * perScreenPixelRatio * 2.0;
float pixelDist = dist / min(width, maxPixelDistance);
return abs(pixelDist);
}`),r.main.add((0,d.H)`fragColor = vec4(0.0);
vec3 dEndStart = vViewEnd - vViewStart;
if (dot(dEndStart, dEndStart) < 1e-5) {
return;
}
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
return;
}
float distance = segmentDistancePixels(
vViewSegmentNormal,
vViewStartNormal,
vViewEndNormal,
pos,
vViewStart,
vViewEnd
);
vec4 color = laserlineProfile(distance);
float alpha = (1.0 - smoothstep(0.995 - angleCutoffAdjust, 0.999 - angleCutoffAdjust, abs(dot(normal, vViewSegmentNormal))));
fragColor = laserlineOutput(color * alpha * depthDiscontinuityAlpha);`),t}let _=(0,a.vt)(),m=(0,r.vt)(),v=Object.freeze(Object.defineProperty({__proto__:null,build:g},Symbol.toStringTag,{value:"Module"}))},577841:(e,t,i)=>{i.d(t,{L:()=>U,b:()=>V,d:()=>D});var n=i(15982),r=i(698532),s=i(343994),a=i(587751),l=i(442039),o=i(748194),h=i(332352),c=i(866733),d=i(646324),p=i(994191),u=i(620721),f=i(883107),g=i(865568),_=i(79022),m=i(671165),v=i(589195),P=i(553457),b=i(759520),w=i(378836);let D=(0,n.kU)(6);function V(e){let t=new w.N5;t.include(u.c),t.include(p.K,e);let i=t.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(i.uniforms.add(new P.m("maxPixelDistance",(t,i)=>e.heightManifoldEnabled?2*i.camera.computeScreenPixelSizeAt(t.heightManifoldTarget):2*i.camera.computeScreenPixelSizeAt(t.lineVerticalPlaneSegment.origin))),i.code.add((0,b.H)`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){let e=(e,t)=>(0,a.Z0)(e,[0,0,0],t.camera.viewMatrix);i.uniforms.add(new m.E("heightManifoldOrigin",(t,i)=>((0,a.Z0)(E,t.heightManifoldTarget,i.camera.viewMatrix),e(M,i),(0,a.Re)(M,M,E),(0,a.S8)(L,M),L[3]=(0,a.Bw)(M),L)),new g.d("globalOrigin",t=>e(E,t)),new P.m("cosSphericalAngleThreshold",(e,t)=>1-Math.max(2,(0,a.Io)(t.camera.eye,e.heightManifoldTarget)*t.camera.perRenderPixelRatio)/(0,a.Bw)(e.heightManifoldTarget))),i.code.add((0,b.H)`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else i.code.add((0,b.H)`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(i.uniforms.add(new P.m("maxPixelDistance",(e,t)=>2*t.camera.computeScreenPixelSizeAt(e.pointDistanceTarget))),i.code.add((0,b.H)`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&i.uniforms.add(new v.U("perScreenPixelRatio",e=>e.camera.perScreenPixelRatio)).code.add((0,b.H)`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&i.code.add((0,b.H)`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),i.main.add((0,b.H)`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),e.heightManifoldEnabled){i.uniforms.add(new f.G("angleCutoff",e=>x(e)),new m.E("heightPlane",(e,t)=>C(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,E),t.camera.viewMatrix)));let t=e.spherical?(0,b.H)`normalize(globalOrigin - pos)`:(0,b.H)`heightPlane.xyz`;i.main.add((0,b.H)`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${t})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return e.pointDistanceEnabled&&(i.uniforms.add(new f.G("angleCutoff",e=>x(e)),new m.E("pointDistanceSphere",(e,t)=>{var i,n;return i=e,n=t,(0,a.Z0)(T,i.pointDistanceOrigin,n.camera.viewMatrix),T[3]=(0,a.Io)(i.pointDistanceOrigin,i.pointDistanceTarget),T})),i.main.add((0,b.H)`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),e.lineVerticalPlaneEnabled&&(i.uniforms.add(new f.G("angleCutoff",e=>x(e)),new m.E("lineVerticalPlane",(e,t)=>{var i,n;let r,s,l,o;return i=e,n=t,r=(0,c.sd)(i.lineVerticalPlaneSegment,.5,E),s=i.renderCoordsHelper.worldUpAtPosition(r,S),l=(0,a.S8)(M,i.lineVerticalPlaneSegment.vector),o=(0,a.$A)(E,s,l),(0,a.S8)(o,o),C(i.lineVerticalPlaneSegment.origin,o,n.camera.viewMatrix)}),new _.t("lineVerticalStart",(e,t)=>{var i,n;let r;return i=e,n=t,r=(0,a.C)(E,i.lineVerticalPlaneSegment.origin),i.renderCoordsHelper.setAltitude(r,0),(0,a.Z0)(r,r,n.camera.viewMatrix)}),new _.t("lineVerticalEnd",(e,t)=>{var i,n;let r;return i=e,n=t,r=(0,a.WQ)(E,i.lineVerticalPlaneSegment.origin,i.lineVerticalPlaneSegment.vector),i.renderCoordsHelper.setAltitude(r,0),(0,a.Z0)(r,r,n.camera.viewMatrix)})),i.main.add((0,b.H)`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),e.intersectsLineEnabled&&(i.uniforms.add(new f.G("angleCutoff",e=>x(e)),new _.t("intersectsLineStart",(e,t)=>(0,a.Z0)(E,e.lineStartWorld,t.camera.viewMatrix)),new _.t("intersectsLineEnd",(e,t)=>(0,a.Z0)(E,e.lineEndWorld,t.camera.viewMatrix)),new _.t("intersectsLineDirection",(e,t)=>((0,a.C)(L,e.intersectsLineSegment.vector),L[3]=0,(0,a.S8)(E,(0,o.Z0)(L,L,t.camera.viewMatrix)))),new P.m("intersectsLineRadius",e=>e.intersectsLineRadius)),i.main.add((0,b.H)`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),i.main.add((0,b.H)`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),t}function x(e){return(0,r.hZ)(y,Math.cos(e.angleCutoff),Math.cos(Math.max(0,e.angleCutoff-(0,n.kU)(2))))}function C(e,t,i){return(0,a.Z0)(A,e,i),(0,a.C)(L,t),L[3]=0,(0,o.Z0)(L,L,i),(0,d.O_)(A,L,R)}let y=(0,s.vt)(),E=(0,l.vt)(),L=(0,h.vt)(),S=(0,l.vt)(),M=(0,l.vt)(),A=(0,l.vt)(),R=(0,d.vt)(),T=(0,h.vt)(),U=Object.freeze(Object.defineProperty({__proto__:null,build:V,defaultAngleCutoff:D},Symbol.toStringTag,{value:"Module"}))},994191:(e,t,i)=>{i.d(t,{K:()=>d});var n=i(41781),r=i(18543),s=i(711424),a=i(79022),l=i(553457),o=i(759520),h=i(666374),c=i(231596);function d(e,t){let i=e.fragment;i.include(n.E),e.include(s.Ir),i.include(r.O),i.uniforms.add(new l.m("globalAlpha",e=>e.globalAlpha),new a.t("glowColor",e=>e.glowColor),new l.m("glowWidth",(e,t)=>e.glowWidth*t.camera.pixelRatio),new l.m("glowFalloff",e=>e.glowFalloff),new a.t("innerColor",e=>e.innerColor),new l.m("innerWidth",(e,t)=>e.innerWidth*t.camera.pixelRatio),new h.x("depthMap",e=>e.depth?.attachment),new c.N("normalMap",e=>e.normals)),i.code.add((0,o.H)`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),i.code.add((0,o.H)`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendColorsPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),i.code.add((0,o.H)`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
vec3 normalReconstructed = normalize(cross(dFdx(pos), dFdy(pos)));
vec3 normalFromTexture = normalize(texture(normalMap, uv).xyz * 2.0 - 1.0);
float blendFactor = smoothstep(0.15, 0.2, depthError);
normal = normalize(mix(normalReconstructed, normalFromTexture, blendFactor));
angleCutoffAdjust = mix(0.0, 0.004, blendFactor);
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),t.contrastControlEnabled?i.uniforms.add(new c.N("frameColor",(e,t)=>e.colors),new l.m("globalAlphaContrastBoost",e=>e.globalAlphaContrastBoost)).code.add((0,o.H)`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(frameColor, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`):i.code.add((0,o.H)`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)}}}]);
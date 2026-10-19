"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[82514],{14629:(e,t,i)=>{i.d(t,{d:()=>s});var a=i(759520);function s(e){e.code.add((0,a.H)`void computeCovariance3D(in mat3 rotation, in vec3 scale, out vec3 covarianceA, out vec3 covarianceB) {
mat3 scaleMatrix = mat3(
vec3(scale.x, 0.0, 0.0),
vec3(0.0, scale.y, 0.0),
vec3(0.0, 0.0, scale.z)
);
mat3 scaledRotation = scaleMatrix * rotation;
mat3 covariance3D = transpose(scaledRotation) * scaledRotation;
covarianceA = vec3(covariance3D[0][0], covariance3D[0][1], covariance3D[0][2]);
covarianceB = vec3(covariance3D[1][1], covariance3D[1][2], covariance3D[2][2]);
}
vec3 computeGaussianCovariance2D(vec3 viewSpaceCenter, float focalLength, vec2 tanFov, float[6] cov3D, mat4 view) {
vec4 viewSpacePoint = vec4(viewSpaceCenter, 1);
vec2 clampLimit = 1.3 * tanFov;
vec2 normalized = viewSpacePoint.xy / viewSpacePoint.z;
viewSpacePoint.xy = clamp(normalized, -clampLimit, clampLimit) * viewSpacePoint.z;
float invZ = 1.0 / viewSpacePoint.z;
float invZSquared = invZ * invZ;
mat3 projectionJacobian = mat3(
focalLength * invZ,  0.0,                   -(focalLength * viewSpacePoint.x) * invZSquared,
0.0,                 focalLength * invZ,    -(focalLength * viewSpacePoint.y) * invZSquared,
0.0,                 0.0,                   0.0
);
mat3 worldToView = transpose(mat3(view));
mat3 covarianceProjection = worldToView * projectionJacobian;
mat3 covariance3D = mat3(
cov3D[0], cov3D[1], cov3D[2],
cov3D[1], cov3D[3], cov3D[4],
cov3D[2], cov3D[4], cov3D[5]
);
mat3 covariance2D = transpose(covarianceProjection) * transpose(covariance3D) * covarianceProjection;
const float regularization = 0.3;
covariance2D[0][0] += regularization;
covariance2D[1][1] += regularization;
return vec3(covariance2D[0][0], covariance2D[0][1], covariance2D[1][1]);
}
void computePackedGaussianCovariance3D(uvec4 packedGaussian, out vec3 covarianceA, out vec3 covarianceB) {
vec3 scale = unpackScale(packedGaussian);
vec4 quaternion = unpackQuaternion(packedGaussian);
mat3 rotation = quaternionToRotationMatrix(quaternion);
computeCovariance3D(rotation, scale.xyz, covarianceA, covarianceB);
}`)}},21065:(e,t,i)=>{i.d(t,{J:()=>s});var a=i(759520);function s(e){e.code.add((0,a.H)`mat3 quaternionToRotationMatrix(vec4 q) {
float x2 = q.x + q.x;
float y2 = q.y + q.y;
float z2 = q.z + q.z;
float xx = x2 * q.x;
float yy = y2 * q.y;
float zz = z2 * q.z;
float xy = x2 * q.y;
float xz = x2 * q.z;
float yz = y2 * q.z;
float wx = x2 * q.w;
float wy = y2 * q.w;
float wz = z2 * q.w;
return mat3(
1.0 - (yy + zz), xy - wz, xz + wy,
xy + wz, 1.0 - (xx + zz), yz - wx,
xz - wy, yz + wx, 1.0 - (xx + yy)
);
}`)}},37544:(e,t,i)=>{i.d(t,{B:()=>l,e:()=>o});var a=i(442039),s=i(79022),r=i(759520),n=i(342471);class l extends n.Y{constructor(){super(...arguments),this.tileCameraPosition=(0,a.vt)(),this.cameraDelta=(0,a.vt)()}}function o(e){e.code.add((0,r.H)`float unpackOpacity(uvec4 packedGaussian) {
return float((packedGaussian.w >> 24u) & 0xffu) / 255.0;
}
vec4 unpackColor(uvec4 packedGaussian) {
vec4 color;
color.r = float((packedGaussian.w >> 1u) & 0xfeu);
color.g = float((packedGaussian.w >> 9u) & 0xffu);
color.b = float((packedGaussian.w >> 16u) & 0xfeu);
color.a = float((packedGaussian.w >> 24u) & 0xffu);
return color / 255.0;
}`),e.code.add((0,r.H)`vec3 unpackScale(uvec4 packedGaussian) {
uint sx = (packedGaussian.z >> 10u) & 0xffu;
uint sy = (packedGaussian.z >> 18u) & 0xffu;
uint szLow = (packedGaussian.z >> 26u) & 0x3fu;
uint szHigh = packedGaussian.a & 0x3u;
uint sz = szLow | (szHigh << 6u);
return exp(vec3(sx, sy, sz) / 16.0 - 10.0);
}`),e.code.add((0,r.H)`const uint MASK_9_BITS = 0x1FFu;
const float SQRT_HALF = 0.7071067811865476;
const ivec3 COMPONENT_ORDER[4] = ivec3[4](
ivec3(3, 2, 1),
ivec3(3, 2, 0),
ivec3(3, 1, 0),
ivec3(2, 1, 0)
);
vec4 unpackQuaternion(uvec4 packedGaussian) {
uint packedRotation = packedGaussian.x;
uint largestComponent = packedRotation >> 30u;
vec4 quaternion = vec4(0.0);
float sumSquares = 0.0;
uint bitfield = packedRotation;
for (int j = 0; j < 3; ++j) {
int index = COMPONENT_ORDER[int(largestComponent)][j];
uint magnitude = bitfield & MASK_9_BITS;
uint signBit = (bitfield >> 9u) & 1u;
bitfield = bitfield >> 10u;
float value = SQRT_HALF * float(magnitude) / float(MASK_9_BITS);
quaternion[index] = signBit == 1u ? -value : value;
sumSquares += value * value;
}
quaternion[int(largestComponent)] = sqrt(1.0 - sumSquares);
return quaternion;
}`),e.code.add((0,r.H)`vec3 unpackTileOriginRelativePosition(uvec4 packedGaussian) {
uint packedPositionLow = packedGaussian.y;
uint packedPositionHigh = packedGaussian.z;
uint x = packedPositionLow & 0x3FFFu;
uint y = (packedPositionLow >> 14u) & 0x3FFFu;
uint zLow = (packedPositionLow >> 28u) & 0xFu;
uint zHigh = packedPositionHigh & 0x3FFu;
uint z = zLow | (zHigh << 4u);
return vec3(float(x), float(y), float(z));
}`),e.uniforms.add(new s.t("tileCameraPosition",e=>e.tileCameraPosition),new s.t("cameraDelta",e=>e.cameraDelta)).code.add((0,r.H)`vec3 unpackCameraRelativeGaussianPosition(uvec4 packedHeader, highp vec3 position) {
vec3 tileOrigin = uintBitsToFloat(packedHeader.xyz);
float invPosScale = 1.0 / exp2(float(packedHeader.w & 0xfu));
vec3 delta = tileOrigin.xyz - tileCameraPosition;
vec3 cameraRelativePosition = position * invPosScale + delta * 2.048 - cameraDelta;
return cameraRelativePosition;
}`)}},46077:(e,t,i)=>{i.d(t,{G:()=>D,a:()=>F,b:()=>M});var a=i(698532),s=i(343994),r=i(442039),n=i(230843),l=i(889839),o=i(292291),u=i(239467),c=i(908047),d=i(14629),h=i(830116),p=i(526433),f=i(37544),g=i(21065),m=i(960585),v=i(398709),_=i(883107),x=i(865568),y=i(79022),b=i(553457),w=i(759520),C=i(855272),S=i(282780),P=i(151431),T=i(378836);class D extends f.B{constructor(){super(...arguments),this.clipMinCameraRelative=(0,r.vt)(),this.clipMaxCameraRelative=(0,r.vt)(),this.focalLength=-1,this.minSplatRadius=-1,this.tanFov=(0,s.vt)(),this.origin=(0,r.vt)()}}function M(e){let{clippingEnabled:t,hasSlicePlane:i,receiveShadows:s,spherical:r}=e,D=new T.N5;D.varyings.add("vColor","vec4"),D.varyings.add("conicOpacity","vec4"),D.varyings.add("gaussianLogAlphaCutoff","float"),D.varyings.add("offsetFromCenter","vec2"),R(e)&&D.varyings.add("fragmentPositionCameraRelative","vec3"),D.vertex.uniforms.add(new S.R("splatOrderTexture",e=>e.splatOrder),new S.R("splatFadingTexture",e=>e.splatFading),new S.R("splatAtlasTexture",e=>e.splatAtlas),new b.m("focalLength",e=>e.focalLength),new b.m("minSplatRadius",e=>e.minSplatRadius),new _.G("tanFov",e=>e.tanFov),new v.E("inverseScreenSize",({camera:e})=>(0,a.hZ)(A,1/e.fullWidth,1/e.fullHeight)),new C.F("proj",e=>e.camera.projectionMatrix),new C.F("view",e=>e.camera.viewMatrix),new v.E("nearFar",e=>e.camera.nearFar),new x.d("cameraPosition",e=>e.camera.eye)),t&&(D.vertex.uniforms.add(new y.t("clipMin",e=>e.clipMinCameraRelative),new y.t("clipMax",e=>e.clipMaxCameraRelative)),D.fragment.uniforms.add(new y.t("clipMin",e=>e.clipMinCameraRelative),new y.t("clipMax",e=>e.clipMaxCameraRelative))),D.vertex.include(f.e),D.vertex.include(p.B),D.vertex.include(g.J),D.vertex.include(d.d),D.vertex.include(h.o),D.vertex.include(n.Ig,e),s?(D.fragment.uniforms.add(new x.d("cameraPosition",e=>e.camera.eye)),D.fragment.include(l.kA,e)):D.vertex.include(l.kA,e),D.include(o.n,e),(0,l.a8)(s?D.fragment:D.vertex),(0,l.eU)(s?D.fragment:D.vertex),s&&D.include(c.QH,e),D.outputs.add("fragColor","vec4",0),D.outputs.add("fragDepthColor","vec4",1);let M=(0,P.M)(e.alphaCutoff),F=Math.log(M),G=(0,w.H)`float groundLightAlignment = dot(groundNormal, mainLightDirection);
float additionalAmbientScale = additionalDirectedAmbientLight(groundLightAlignment);
vec3 additionalLight = mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;`,I=(0,w.H)`
    vec3 groundNormal = ${r?(0,w.H)`normalize(cameraRelativePosition + cameraPosition)`:(0,w.H)`vec3(0.0, 0.0, 1.0)`};
    ${G}
    float shadow = ${r?(0,w.H)`lightingGlobalFactor * (1.0 - additionalAmbientScale)`:(0,w.H)`0.0`};
    vColor.rgb = evaluateSceneLighting(groundNormal, vColor.rgb, shadow, 0.0, additionalLight);
  `,z=(0,w.H)`
    vec3 groundNormal = ${r?(0,w.H)`normalize(fragmentPositionCameraRelative + cameraPosition)`:(0,w.H)`vec3(0.0, 0.0, 1.0)`};
    ${G}
    float shadow = readShadow(additionalAmbientScale, fragmentPositionCameraRelative);
    shadedColor = evaluateSceneLighting(groundNormal, vColor.rgb, shadow, 0.0, additionalLight);
  `;return D.vertex.main.add(`
    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));
    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);
    uint pageNum = fetchGaussianPageIndex(gaussianIndex);

    // Unpack color first so very transparent splats can discard before fetching the page header.
    vColor = unpackColor(packedGaussian);

    // Apply per-page fading before the early alpha rejection.
    ${(0,w.If)(e.fadingEnabled,"\n      uint fadingTextureWidth = uint(textureSize(splatFadingTexture, 0).x);\n      uint fadeX = pageNum  % fadingTextureWidth;\n      uint fadeY = pageNum  / fadingTextureWidth;\n      uint opacityModifierByte = texelFetch(splatFadingTexture, ivec2(fadeX , fadeY), 0).r;\n      float opacityModifier = float(opacityModifierByte) / 255.0;\n      vColor.a *= opacityModifier;\n      ")}

    // Set default position outside clip space for early returns.
    gl_Position = ${u.Z};

    if (vColor.a < ${M}) {
      return;
    }

    // Delay the page header fetch until the splat survives the opacity reject.
    vec3 cameraRelativePosition = fetchGaussianCameraRelativePosition(gaussianIndex, packedGaussian);

    ${(0,w.If)(t,"\n      if (cameraRelativePosition.x < clipMin.x || cameraRelativePosition.y < clipMin.y || cameraRelativePosition.z < clipMin.z ||\n        cameraRelativePosition.x > clipMax.x || cameraRelativePosition.y > clipMax.y || cameraRelativePosition.z > clipMax.z) {\n        return;\n      }\n      ")}

    ${(0,w.If)(i,"if (rejectBySlice(cameraRelativePosition)) {\n        return;\n      }")}

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1);

    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {
      return;
    }

    vec3 covarianceA;
    vec3 covarianceB;
    computePackedGaussianCovariance3D(packedGaussian, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec3 covariance2D = computeGaussianCovariance2D(viewPos.xyz, focalLength, tanFov, covariance3D, view);

    // Reject degenerate covariances before inverting them into conic coefficients.
    float determinant = computeGaussianCovarianceDeterminant(covariance2D);
    if (determinant <= 0.) {
      return;
    }

    vec2 eigenvalues = computeGaussianCovarianceEigenvalues(covariance2D);

    // Fold the per-splat opacity into the log cutoff so the vertex-side ellipse
    // bound matches the fragment alpha discard after fading.
    gaussianLogAlphaCutoff = ${F} - log(vColor.a);
    float gaussianEllipseThreshold = computeGaussianEllipseThreshold(gaussianLogAlphaCutoff);
    vec2 axisLengths = computeGaussianAxisLengths(eigenvalues, gaussianEllipseThreshold);
    float maxRadius = max(axisLengths.x, axisLengths.y);

    // Ignore Gaussians with very small contribution, with tolerance based on the quality profile.
    if (rejectGaussianByMinimumRadius(maxRadius, vColor.a, minSplatRadius)) {
      return;
    }

    vec4 projPos = proj * viewPos;
    float invW = 1. / (projPos.w + 1e-7);
    vec3 ndcPos = projPos.xyz * invW;
    vec2 clipSpacePixelScale = 2.0 * inverseScreenSize;

    // Cull splats whose screen-space ellipse cannot touch the viewport.
    if (rejectGaussianByScreenBounds(ndcPos.xy, maxRadius, clipSpacePixelScale)) {
      return;
    }

    offsetFromCenter = computeGaussianQuadOffset(covariance2D, eigenvalues, axisLengths, gl_VertexID);

    ${(0,w.If)(R(e),"float viewSpacePixelScale = -viewPos.z / focalLength;\n      vec3 fragmentViewOffset = vec3(offsetFromCenter * viewSpacePixelScale, 0.0);\n      fragmentPositionCameraRelative = cameraRelativePosition + transpose(mat3(view)) * fragmentViewOffset;")}

    // Store conic coefficients with opacity for fragment-side falloff.
    vec3 conic = computeGaussianConic(covariance2D, determinant);
    conicOpacity = vec4(conic, vColor.a);

    // Handle environment lighting per vertex when no shadow map is active.
    // When shadows are received, defer lighting to the fragment shader for crisp shadow borders.
  ${(0,w.If)(s,"forwardLinearDepth(-viewPos.z);",I)}

    // Place this quad corner in clip space around the projected splat center.
    vec2 quadClipPosition = ndcPos.xy + offsetFromCenter * clipSpacePixelScale - inverseScreenSize;

    gl_Position = vec4(quadClipPosition, ndcPos.z, 1.0);

  `),D.fragment.include(m.x),D.fragment.include(h.o),D.fragment.include(n.Ig,e),D.fragment.main.add(`
    ${(0,w.If)(t,"if (fragmentPositionCameraRelative.x < clipMin.x || fragmentPositionCameraRelative.y < clipMin.y || fragmentPositionCameraRelative.z < clipMin.z ||\n        fragmentPositionCameraRelative.x > clipMax.x || fragmentPositionCameraRelative.y > clipMax.y || fragmentPositionCameraRelative.z > clipMax.z) {\n        discard;\n      }")}
    ${(0,w.If)(i,"if (rejectBySlice(fragmentPositionCameraRelative)) { discard; }")}

    float gaussianExponent = evaluateGaussianExponent(conicOpacity.xyz, offsetFromCenter);

    // A positive exponent indicates alpha > 1, which should not happen.
    // We also early check the opacity-aware alpha cutoff to avoid unnecessary exp().
    if (gaussianExponent > 0.0 || gaussianExponent < gaussianLogAlphaCutoff) {
      discard;
    }

    float gaussianFalloff = exp(gaussianExponent);

    // Cap at 0.99 to avoid blending issues, such as seams between overlapping Gaussians.
    float alpha = min(.99f, conicOpacity.w * gaussianFalloff);

    vec3 shadedColor = vColor.rgb;
  ${(0,w.If)(s,z)}
    fragColor = vec4(shadedColor * alpha, alpha);

    // We simulate first hit based depth using 0.25 as the opacity threshold.
    // This works because we render in front-to-back order,
    // i.e. the first hit that counts completely saturates the alpha channel
    // and further splats do not contribute.
    float depthHit = step(0.25, alpha);
    float normalizedDepth = gl_FragCoord.z;
    fragDepthColor = vec4(encodeNormalizedDepthToRGB(normalizedDepth) * depthHit, depthHit);
  `),D}function R(e){let{clippingEnabled:t,hasSlicePlane:i,receiveShadows:a}=e;return a||i||t}let A=(0,s.vt)(),F=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:D,build:M},Symbol.toStringTag,{value:"Module"}))},151431:(e,t,i)=>{i.d(t,{I:()=>n,M:()=>l});var a=i(990616),s=i(230843),r=i(488705);class n extends s.Hz{constructor(e){super(),this.spherical=e,this.alphaCutoff=1,this.fadingEnabled=!1,this.clippingEnabled=!1,this.receiveShadows=!1,this.hasShadowHighlights=!1,this.output=0,this.hasEmission=!1,this.receiveAmbientOcclusion=!1,this.receiveGlobalIllumination=!1,this.pbrMode=0,this.useCustomDTRExponentForWater=!1,this.useFillLights=!1,this.hasColorTexture=!0}}function l(e){switch(e){case 2:return .005;case 0:return .05;default:return .01}}(0,a.Cg)([(0,r.W)({count:3})],n.prototype,"alphaCutoff",void 0),(0,a.Cg)([(0,r.W)()],n.prototype,"fadingEnabled",void 0),(0,a.Cg)([(0,r.W)()],n.prototype,"clippingEnabled",void 0),(0,a.Cg)([(0,r.W)()],n.prototype,"receiveShadows",void 0),(0,a.Cg)([(0,r.W)()],n.prototype,"hasShadowHighlights",void 0),(0,a.Cg)([(0,r.W)({count:12})],n.prototype,"output",void 0),(0,a.Cg)([(0,r.W)()],n.prototype,"receiveAmbientOcclusion",void 0),(0,a.Cg)([(0,r.W)()],n.prototype,"receiveGlobalIllumination",void 0)},211878:(e,t,i)=>{i.d(t,{G:()=>u,S:()=>d,b:()=>c});var a=i(620721),s=i(960585),r=i(759520),n=i(231596),l=i(342471),o=i(378836);class u extends l.Y{}function c(){let e=new o.N5;e.include(a.c);let t=e.fragment;return t.uniforms.add(new n.N("splatOutputDepth",e=>e.splatDepth)),t.include(s.x),t.main.add((0,r.H)`vec4 splatDepth = texture(splatOutputDepth, uv);
float depth = decodeRGBToNormalizedDepth(splatDepth.xyz);
if(splatDepth.a < 1.0) {
discard;
}
gl_FragDepth = depth;`),e}let d=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:u,build:c},Symbol.toStringTag,{value:"Module"}))},237589:(e,t,i)=>{i.d(t,{G:()=>y,a:()=>C,b:()=>b});var a=i(698532),s=i(343994),r=i(442039),n=i(230843),l=i(239467),o=i(14629),u=i(830116),c=i(526433),d=i(37544),h=i(21065),p=i(398709),f=i(79022),g=i(553457),m=i(759520),v=i(855272),_=i(282780),x=i(378836);class y extends d.B{constructor(){super(...arguments),this.clipMinCameraRelative=(0,r.vt)(),this.clipMaxCameraRelative=(0,r.vt)(),this.minSplatRadius=-1}}function b(e){let{clippingEnabled:t,hasSlicePlane:i}=e,s=new x.N5,{fragment:r,varyings:y,vertex:b}=s;y.add("conic","vec3"),y.add("gaussianLogAlphaCutoff","float"),y.add("offsetFromCenter","vec2"),b.uniforms.add(new _.R("splatOrderTexture",e=>e.splatOrder),new _.R("splatAtlasTexture",e=>e.splatAtlas),new g.m("minSplatRadius",e=>e.minSplatRadius),new p.E("inverseScreenSize",({camera:e})=>(0,a.hZ)(w,1/e.fullWidth,1/e.fullHeight)),new v.F("proj",e=>e.camera.projectionMatrix),new v.F("view",e=>e.camera.viewMatrix),new p.E("nearFar",e=>e.camera.nearFar)),t&&b.uniforms.add(new f.t("clipMin",e=>e.clipMinCameraRelative),new f.t("clipMax",e=>e.clipMaxCameraRelative)),b.include(d.e),b.include(c.B),b.include(h.J),b.include(o.d),b.include(u.o),b.include(n.Ig,e),b.code.add((0,m.H)`float safeClipW(float clipW) {
return abs(clipW) < 1e-7 ? (clipW < 0.0 ? -1e-7 : 1e-7) : clipW;
}`),b.code.add((0,m.H)`vec3 computeProjectivePixelGradient(
vec3 clipGradient,
vec3 clipWGradient,
float clipValue,
float safeW,
float invWSquared,
float halfScreenSize
) {
return (clipGradient * safeW - clipValue * clipWGradient) * invWSquared * halfScreenSize;
}`),b.code.add((0,m.H)`vec3 multiplyCovariance3D(float[6] covariance3D, vec3 value) {
return vec3(
covariance3D[0] * value.x + covariance3D[1] * value.y + covariance3D[2] * value.z,
covariance3D[1] * value.x + covariance3D[3] * value.y + covariance3D[4] * value.z,
covariance3D[2] * value.x + covariance3D[4] * value.y + covariance3D[5] * value.z
);
}`),b.code.add((0,m.H)`vec3 computeProjectiveCovariance2D(vec3 pixelXGradient, vec3 pixelYGradient, float[6] covariance3D, mat4 view) {
mat3 worldToView = transpose(mat3(view));
vec3 axisX = worldToView * pixelXGradient;
vec3 axisY = worldToView * pixelYGradient;
vec3 covarianceAxisX = multiplyCovariance3D(covariance3D, axisX);
vec3 covarianceAxisY = multiplyCovariance3D(covariance3D, axisY);
const float regularization = 0.3;
float covarianceXX = dot(axisX, covarianceAxisX) + regularization;
float covarianceXY = dot(axisX, covarianceAxisY);
float covarianceYY = dot(axisY, covarianceAxisY) + regularization;
return vec3(covarianceXX, covarianceXY, covarianceYY);
}`),b.code.add((0,m.H)`float biasDepth(float linearDepth) {
const float bias = 80.0 * .000015259;
return min(linearDepth + bias, 1.0);
}`);let C=Math.log(.25);return b.main.add(`
    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));
    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);

    float opacity = unpackOpacity(packedGaussian);

    gl_Position = ${l.Z};

    if (opacity < 0.25) {
      return;
    }

    vec3 cameraRelativePosition = fetchGaussianCameraRelativePosition(gaussianIndex, packedGaussian);

    ${(0,m.If)(t,(0,m.H)`if (cameraRelativePosition.x < clipMin.x || cameraRelativePosition.y < clipMin.y || cameraRelativePosition.z < clipMin.z ||
cameraRelativePosition.x > clipMax.x || cameraRelativePosition.y > clipMax.y || cameraRelativePosition.z > clipMax.z) {
return;
}`)}

    ${(0,m.If)(i,(0,m.H)`if (rejectBySlice(cameraRelativePosition)) {
return;
}`)}

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1.0);

    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {
      return;
    }

    vec3 covarianceA;
    vec3 covarianceB;
    computePackedGaussianCovariance3D(packedGaussian, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec4 projPos = proj * viewPos;
    float safeW = safeClipW(projPos.w);
    float invWSquared = 1.0 / (safeW * safeW);
    vec2 halfScreenSize = 0.5 / inverseScreenSize;
    float maxShadowSplatRadius = max(halfScreenSize.x, halfScreenSize.y);

    // Projection matrix columns are the clip-space derivatives with respect to view-space xyz.
    vec3 clipWGradient = vec3(proj[0][3], proj[1][3], proj[2][3]);
    vec3 pixelXGradient = computeProjectivePixelGradient(
      vec3(proj[0][0], proj[1][0], proj[2][0]),
      clipWGradient,
      projPos.x,
      safeW,
      invWSquared,
      halfScreenSize.x
    );
    vec3 pixelYGradient = computeProjectivePixelGradient(
      vec3(proj[0][1], proj[1][1], proj[2][1]),
      clipWGradient,
      projPos.y,
      safeW,
      invWSquared,
      halfScreenSize.y
    );
    vec3 covariance2D = computeProjectiveCovariance2D(pixelXGradient, pixelYGradient, covariance3D, view);

    float determinant = computeGaussianCovarianceDeterminant(covariance2D);
    if (determinant <= 0.0) {
      return;
    }

    vec2 eigenvalues = computeGaussianCovarianceEigenvalues(covariance2D);

    gaussianLogAlphaCutoff = ${C} - log(opacity);
    float gaussianEllipseThreshold = computeGaussianEllipseThreshold(gaussianLogAlphaCutoff);
    vec2 axisLengths = computeGaussianAxisLengths(eigenvalues, gaussianEllipseThreshold);
    float maxRadius = max(axisLengths.x, axisLengths.y);

    // Avoid invalid/extremely large footprints.
    if (maxRadius < 0.0 || maxRadius > maxShadowSplatRadius) {
      return;
    }

    if (rejectGaussianByMinimumRadius(maxRadius, opacity, minSplatRadius)) {
      return;
    }

    vec3 ndcPos = projPos.xyz / safeW;
    vec2 clipSpacePixelScale = 2.0 * inverseScreenSize;

    if (rejectGaussianByScreenBounds(ndcPos.xy, maxRadius, clipSpacePixelScale)) {
      return;
    }

    offsetFromCenter = computeGaussianQuadOffset(covariance2D, eigenvalues, axisLengths, gl_VertexID);
    conic = computeGaussianConic(covariance2D, determinant);
    float linearDepth = (-viewPos.z - nearFar.x) / (nearFar.y - nearFar.x);
    float biasedDepth = biasDepth(linearDepth);

    vec2 clipPos = ndcPos.xy + offsetFromCenter * clipSpacePixelScale - inverseScreenSize;
    gl_Position = vec4(clipPos, biasedDepth * 2.0 - 1.0, 1.0);
  `),r.include(u.o),r.main.add((0,m.H)`float gaussianExponent = evaluateGaussianExponent(conic, offsetFromCenter);
if (gaussianExponent > 0.0 || gaussianExponent < gaussianLogAlphaCutoff) {
discard;
}`),s}let w=(0,s.vt)(),C=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatShadowPassParameters:y,build:b},Symbol.toStringTag,{value:"Module"}))},269379:(e,t,i)=>{i.d(t,{$:()=>y,IB:()=>u,Iy:()=>H,KV:()=>z,N2:()=>b,RH:()=>C,Vl:()=>A,Ws:()=>T,ZD:()=>w,_L:()=>R,bJ:()=>D,e$:()=>M,f6:()=>B,hw:()=>F,pf:()=>I,rs:()=>S,sn:()=>E,we:()=>G});var a=i(502464),s=i(101521),r=i(447939),n=i(15982),l=i(748194),o=i(332352);function u(e){return"r"in e&&"g"in e&&"b"in e}function c(e){return"h"in e&&"s"in e&&"v"in e}function d(e){return"l"in e&&"a"in e&&"b"in e}function h(e){return"l"in e&&"c"in e&&"h"in e}let p=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],f=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]];function g(e,t){let i,a,s=[];if(e[0].length!==t.length)throw Error("dimensions do not match");let r=e.length,n=e[0].length,l=0;for(i=0;i<r;i++){for(l=0,a=0;a<n;a++)l+=e[i][a]*t[a];s.push(l)}return s}function m(e){let t=g(p,[e.r/255,e.g/255,e.b/255].map(e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4));return{x:100*t[0],y:100*t[1],z:100*t[2]}}function v(e){let t=g(f,[e.x/100,e.y/100,e.z/100]).map(e=>Math.min(1,Math.max(e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,0)));return{r:Math.round(255*t[0]),g:Math.round(255*t[1]),b:Math.round(255*t[2])}}function _(e){let t=[e.x/95.047,e.y/100,e.z/108.883].map(e=>e>(6/29)**3?e**(1/3):1/3*(29/6)**2*e+4/29);return{l:116*t[1]-16,a:500*(t[0]-t[1]),b:200*(t[1]-t[2])}}function x(e){let t=e.l,i=[(t+16)/116+e.a/500,(t+16)/116,(t+16)/116-e.b/200].map(e=>e>6/29?e**3:3*(6/29)**2*(e-4/29));return{x:95.047*i[0],y:100*i[1],z:108.883*i[2]}}function y(e){let t,i,a;return u(e)?e:h(e)?v(x((t=e.l,i=e.c,{l:t,a:i*Math.cos(a=e.h),b:i*Math.sin(a)}))):d(e)?v(x(e)):"x"in e&&"y"in e&&"z"in e?v(e):c(e)?function(e){let t,i=(e.h+360)%360/60,a=e.s/100,s=e.v/100*255,r=s*a,n=r*(1-Math.abs(i%2-1));switch(Math.floor(i)){case 0:t={r:r,g:n,b:0};break;case 1:t={r:n,g:r,b:0};break;case 2:t={r:0,g:r,b:n};break;case 3:t={r:0,g:n,b:r};break;case 4:t={r:n,g:0,b:r};break;case 5:case 6:t={r:r,g:0,b:n};break;default:t={r:0,g:0,b:0}}return t.r=Math.round(t.r+s-r),t.g=Math.round(t.g+s-r),t.b=Math.round(t.b+s-r),t}(e):e}function b(e){var t;let i,a,s,r,n,l,o;return c(e)?e:(i=(t=y(e)).r,a=t.g,n=(r=Math.max(i,a,s=t.b))-Math.min(i,a,s),l=r,(o=0===n?0:r===i?(a-s)/n%6:r===a?(s-i)/n+2:(i-a)/n+4)<0&&(o+=6),{h:o*=60,s:(0===n?0:n/l)*100,v:l*=100/255})}function w(e){return d(e)?e:_(m(y(e)))}function C(e){var t;let i,a,s,r;return h(e)?e:(i=(t=_(m(y(e)))).l,a=t.a,{l:i,c:Math.sqrt(a*a+(s=t.b)*s),h:r=(r=Math.atan2(s,a))>0?r:r+2*Math.PI})}function S(e){return P(e).isBright?"light":"dark"}function P(e){let{r:t,g:i,b:s,a:r}=e;return r<1&&(t=Math.round(r*t+255*(1-r)),i=Math.round(r*i+255*(1-r)),s=Math.round(r*s+255*(1-r))),new a.A({r:t,g:i,b:s})}function T(e,t){let{r:i,g:a,b:s}=t?.ignoreAlpha?e:P(e);return .2126*i+.7152*a+.0722*s}function D(e,t=225){return new a.A(T(e,{ignoreAlpha:!0})>t?[0,0,0,e.a]:[255,255,255,e.a])}function M(e,t){let i=w(e);i.l*=1-t;let a=y(i),s=e.clone();return s.setColor(a),s.a=e.a,s}function R(e,t){let i=e.clone();return i.a*=t,i}function A(e,t){let i=b(e);i.s*=t;let a=y(i),s=e.clone();return s.setColor(a),s.a=e.a,s}function F(e,t){return e===t||null!=e&&e.equals(t)}function G(e,t){return e===t||null!=e&&null!=t&&(0,l.aI)(e,t)}function I(e){return(0,o.fA)(e[0],e[1],e[2],e.length>3?e[3]:1)}function z(e){return e[0]??=0,e[1]??=0,e[2]??=0,e}function E(e){return e.length=4,z(e),e[3]??=1,(0,n.qE)(e[3],0,1),e}function B(e,t){let i=e.toUnitRGBA();return i[3]*=t,i}function H(e,t,i={}){if(0===e.length||t<=0)return[];if(1===(e=e.map(e=>"string"==typeof e?new a.A(e):e)).length||1===t){let i=[],a=e[0];for(let e=0;e<t;e++)i.push(a.clone());return i}if(i.shuffle&&(e=(0,s.k4)((0,r.o8)(e),i.seed)),e.length>=t){let i=[],a=(e.length-1)/(t-1);for(let s=0;s<t;s++){let t=Math.round(s*a);i.push(e[t].clone())}return i}return function(e,t,i={}){let r=[],n=e.length-1,l=Math.ceil((t-e.length)/n);e:for(let o=0;o<n;o++){let n=e[o],u=e[o+1];for(let o=1;o<=l;o++){let c=o/(l+1);if(r.push(function(e,t,i,r={}){let n=e.r,l=e.g,o=e.b,u=t.r,c=t.g,d=t.b,h=Math.round(n+(u-n)*i),p=Math.round(l+(c-l)*i),f=Math.round(o+(d-o)*i);if(!r.offset)return new a.A([h,p,f]);let g=(0,s.Mo)(r.seed);return new a.A([k(h,g),k(p,g),k(f,g)])}(n,u,c,i)),r.length+e.length===t)break e}}return[...e.map(e=>e.clone()),...(0,s.k4)(r,i.seed??1)]}(e,t,i)}let k=(e,t)=>Math.min(255,Math.max(0,e+(Math.floor(10*t())-5)))},282514:(e,t,i)=>{i.r(t),i.d(t,{default:()=>eV});var a,s,r=i(990616);i(344881);var n=i(999331),l=i(928185),o=i(23757),u=i(935445),c=i(914850),d=i(678619),h=i(899979),p=i(25824),f=i(980566),g=i(249185),m=i(354435),v=i(759128),_=i(872175),x=i(23359),y=i(157341),b=i(711454),w=i(23295);class C extends w.P{constructor(e,t,i,a,s,r,n,l,o){super(e,0,0,0,t),this.usedMemory=e,this.nodes=t,this.usedTileMemory=i,this.cachedNodes=a,this.cacheTileMemory=s,this.textureAtlasMemory=r,this.orderTextureMemory=n,this.fadingTextureMemory=l,this.sortBufferMemory=o}}var S=i(852676),P=i(86807),T=i(838666),D=i(477010),M=i(252059),R=i(639930),A=i(854460),F=i(101521),G=i(170840),I=i(744359),z=i(458954),E=i(587751),B=i(442039),H=i(489618),k=i(282003);class q extends k.B{constructor(e){super("GaussianSplatSortWorker","sort",{sort:e=>[e.distances.buffer,e.atlasIndices.buffer,e.sortedAtlasIndices.buffer]},e,{strategy:"dedicated"})}sort(e,t){return this.invokeMethod("sort",e,t)}clear(){return this.broadcast({},"clear")}async destroyWorkerAndSelf(){await this.broadcast({},"destroy"),this.destroy()}}var V=i(343994);i(302693);var O=i(975248);i(663748),i(849610);var L=i(542231),j=i(556338);i(342528);var N=i(705594);class W{constructor(e){this.texture=null,this._fadeTextureCapacity=0,this._rctx=e}get usedMemory(){return(this.texture?.usedMemory??0)+(0,G.Qf)(this._fadeBuffer)}ensureCapacity(e){let t=this.texture;if(this._fadeTextureCapacity>=e&&t?.hasWebGLTextureObject)return;let i=Math.max(Math.ceil(e*F.Ji),A.zl),[a,s]=this._evalTextureSize(i),r=a*s,n=this._fadeBuffer,l=new Uint8Array(r);n&&l.set(n.subarray(0,this._fadeTextureCapacity)),this._fadeBuffer=l,this._fadeTextureCapacity=r,this.texture?.dispose();let o=new N.R;o.width=a,o.height=s,o.pixelFormat=36244,o.dataType=j.ld.UNSIGNED_BYTE,o.internalFormat=j.H0.R8UI,o.unpackAlignment=1,o.wrapMode=33071,o.samplingMode=9728,o.isImmutable=!0,this.texture=new L.A(this._rctx,o)}updateTexture(e){this.ensureCapacity(e);let t=this.texture.descriptor.width,i=Math.ceil(e/t);this.texture.updateData(0,0,0,t,i,this._fadeBuffer.subarray(0,t*i))}updateBuffer(e,t){this.ensureCapacity(t+1),this._fadeBuffer&&(this._fadeBuffer[t]=e)}clear(){this._fadeBuffer=void 0,this._fadeTextureCapacity=0,this.texture?.dispose(),this.texture=null}destroy(){this.clear()}_evalTextureSize(e){let t=Math.ceil(Math.sqrt(e)),i=Math.ceil(e/t);return(0,V.fA)(t,i)}}class U{constructor(e){this.texture=null,this._orderTextureCapacity=0,this._rctx=e}get usedMemory(){return(this.texture?.usedMemory??0)+(0,G.Qf)(this._uploadAtlasIndices)}ensureCapacity(e){if(e<=0)return{textureWidth:0,rowCount:0,paddedSize:0};let t=this.texture;if(this._orderTextureCapacity>=e&&t?.hasWebGLTextureObject){let i=t.descriptor.width,a=Math.ceil(e/i);return{textureWidth:i,rowCount:a,paddedSize:i*a}}let i=Math.max(Math.ceil(e*F.Ji),A.T4),[a,s]=this._evalTextureSize(i),r=a*s;this._orderTextureCapacity=r,this.texture?.dispose();let n=new N.R;n.width=a,n.height=s,n.pixelFormat=36244,n.dataType=j.ld.UNSIGNED_INT,n.internalFormat=j.H0.R32UI,n.wrapMode=33071,n.samplingMode=9728,n.isImmutable=!0,this.texture=new L.A(this._rctx,n);let l=Math.ceil(e/a);return{textureWidth:a,rowCount:l,paddedSize:a*l}}setData(e,t){let{textureWidth:i,rowCount:a,paddedSize:s}=this.ensureCapacity(t);if(e.length>=s)return void this.texture.updateData(0,0,0,i,a,e);(!this._uploadAtlasIndices||this._uploadAtlasIndices.length<s)&&(this._uploadAtlasIndices=new Uint32Array(s));let r=this._uploadAtlasIndices;r.set(e.subarray(0,t)),this.texture.updateData(0,0,0,i,a,r)}clear(){this._orderTextureCapacity=0,this._uploadAtlasIndices=void 0,this.texture?.dispose(),this.texture=null}destroy(){this.clear()}_evalTextureSize(e){let t=Math.ceil(Math.sqrt(e)),i=Math.ceil(e/t);return(0,V.fA)(t,i)}}var $=i(865098);class Z{constructor(e,t,i,a){this._splatAtlasTextureHeight=A.i2,this.texture=null,this._rctx=e,this._fboCache=i,this._onCachedTextureEvicted=a,this.pageAllocator=new A.FL,this._cache=t.newCache("gaussian texture cache",e=>{e.dispose(),this._onCachedTextureEvicted()})}get usedMemory(){return this.texture?.usedMemory??0}ensureTextureAtlas(){if(this.texture?.hasWebGLTextureObject)return;this.texture=null;let e=this._cache.pop("splatTextureAtlas");if(e)return void(this.texture=e);let t=new N.R;t.height=this._splatAtlasTextureHeight,t.width=A.DG,t.pixelFormat=36249,t.dataType=j.ld.UNSIGNED_INT,t.internalFormat=j.H0.RGBA32UI,t.samplingMode=9728,t.wrapMode=33071,t.isImmutable=!0,this.texture=new L.A(this._rctx,t),this._updatePageAllocator()}grow(){if(!this.texture)return this.ensureTextureAtlas(),!1;let e=Math.floor(this._splatAtlasTextureHeight*F.Ji);if(e>Math.min((0,$.zy)("esri-mobile")?1048:4096,this._rctx.parameters.maxTextureSize))return!1;let t=new O.HV(this._rctx,this.texture),i=this._fboCache.acquire(A.DG,e,"gaussian splat atlas resize",12);return this._rctx.blitFramebuffer(t,i.fbo,16384,9728,0,0,A.DG,this._splatAtlasTextureHeight,0,0,A.DG,this._splatAtlasTextureHeight),this.texture=i.fbo?.detachColorTexture(),t.dispose(),i.dispose(),this._splatAtlasTextureHeight=e,this._updatePageAllocator(),!0}requestPage(){let e=this.pageAllocator.findFirstFreePage();return null===e&&this.grow()&&(e=this.pageAllocator.findFirstFreePage()),null!==e&&this.pageAllocator.allocate(e),e}freePage(e){this.pageAllocator.free(e)}update(e,t,i){this.ensureTextureAtlas(),this.texture.updateData(0,e,t,A._l,1,i)}_updatePageAllocator(){let e=A.DG*this._splatAtlasTextureHeight/A._l;this.pageAllocator.pageCount!==e&&this.pageAllocator.resize(e)}clear(){this.texture&&(this._cache.put("splatTextureAtlas",this.texture),this.texture=null)}destroy(){this._onCachedTextureEvicted=()=>{},this._cache.destroy(),this.texture?.dispose(),this.texture=null}}var Y=i(327),X=i(183907);class Q{constructor(e,t,i){this._updating=(0,I.v)(!1),this._useDeterministicSort=!1,this._sortBufferMemory=0,this.visibleGaussians=0,this._visibleTileDepthRange=new Y.d,this._previousVisibleTileDepthRangeEye=(0,B.vt)(),this._previousVisibleTileDepthRangeViewForward=(0,B.vt)(),this._previousVisibleTileDepthRangeClippingBox=(0,g.vt)(),this._latestSortedGaussianTilesVersion=0,this._previousVisibleTileDepthRangeTilesVersion=-1,this._previousVisibleTileDepthRangeHasClippingBox=!1,this._bufferCapacity=0,this._requestedLyr3dVisibilityChange=0,this._latestCompletedLyr3dVisibilityChange=0,this._latestUpdatedGaussianTiles=[],this._latestSortedGaussianTiles=[],this._nextCommittedVisibleGaussianTiles=[],this._cameraDirectionNormalized=(0,B.vt)(),this._frameTask=null,this._workerHandle=null,this._sortAbortController=null,this._isSorting=!1,this._pendingSortTask=!1,this._scheduledSortStartTimeout=null,this._lastSortStartTime=(0,z.l5)(-1/0),this._sortInterval=(0,z.l5)(80),this._renderer=e,this._onSortComplete=t,this._orderTexture=new U(this._renderer.renderingContext),this._fadingTexture=new W(this._renderer.renderingContext),this._textureAtlas=new Z(this._renderer.renderingContext,this._renderer.view.resourceController.memoryController,this._renderer.fboCache,i);const{resourceController:a}=this._renderer.view;this._workerHandle=new q((0,H.m)(a)),this._frameTask=a.scheduler.registerTask(X.W6.GAUSSIAN_SPLAT_SORTING)}get textureAtlas(){return this._textureAtlas}get orderTexture(){return this._orderTexture}get fadingTexture(){return this._fadingTexture}get textureAtlasMemory(){return this._textureAtlas.usedMemory}get orderTextureMemory(){return this._orderTexture.usedMemory}get fadingTextureMemory(){return this._fadingTexture.usedMemory}get sortBufferMemory(){return this._sortBufferMemory}get usedMemory(){return this.textureAtlasMemory+this.orderTextureMemory+this.fadingTextureMemory+this.sortBufferMemory}queryVisibleTileDepthRange(e,t){if(0===this.visibleGaussians)return null;let{eye:i,viewForward:a}=e,s=i[0],r=i[1],n=i[2],l=a[0],o=a[1],u=a[2],c=this._visibleTileDepthRange;if(this._previousVisibleTileDepthRangeTilesVersion===this._latestSortedGaussianTilesVersion&&(0,E.t2)(this._previousVisibleTileDepthRangeEye,i)&&(0,E.t2)(this._previousVisibleTileDepthRangeViewForward,a)&&(null==t?!this._previousVisibleTileDepthRangeHasClippingBox:this._previousVisibleTileDepthRangeHasClippingBox&&(0,g.t2)(this._previousVisibleTileDepthRangeClippingBox,t)))return c.near<=c.far?c:null;let d=1/0,h=-1/0,p=this._latestSortedGaussianTiles;for(let e=0;e<p.length;e++){let i=p[e];if(null!=t){let e=i.boundingBox;if(!(0,g.HY)(e,t))continue}let a=l*(i.obbCenterX-s)+o*(i.obbCenterY-r)+u*(i.obbCenterZ-n),c=i.paddedMbsRadius,f=a-c;f<d&&(d=f);let m=a+c;m>h&&(h=m)}let f=d<=h;return f?c.set(d,h):c.set(1/0,-1/0),this._previousVisibleTileDepthRangeTilesVersion=this._latestSortedGaussianTilesVersion,this._previousVisibleTileDepthRangeHasClippingBox=null!=t,(0,E.C)(this._previousVisibleTileDepthRangeEye,i),(0,E.C)(this._previousVisibleTileDepthRangeViewForward,a),null!=t&&(0,g.C)(this._previousVisibleTileDepthRangeClippingBox,t),f?c:null}updateGaussianVisibility(e,t){this._latestUpdatedGaussianTiles=e,this._requestedLyr3dVisibilityChange=t,this.requestSort()}get updating(){return this._updating.value}destroy(){this._sortAbortController=(0,l.DC)(this._sortAbortController),this._pendingSortTask=!1,this._updating.value=!1,null!=this._scheduledSortStartTimeout&&(clearTimeout(this._scheduledSortStartTimeout),this._scheduledSortStartTimeout=null),this._frameTask.remove(),this._workerHandle?.destroyWorkerAndSelf(),this._textureAtlas.destroy(),this._orderTexture.destroy(),this._fadingTexture.destroy()}requestSort(){return this._updating.value=!0,!this._pendingSortTask&&(this._pendingSortTask=!0,this._scheduleSortStart(),!0)}_scheduleSortStart(){if(this._isSorting)return;let e=(0,z.tB)()-this._lastSortStartTime,t=this._sortInterval-e;t<=0?this._startSortIfRequired():null==this._scheduledSortStartTimeout&&(this._scheduledSortStartTimeout=setTimeout(()=>{this._scheduledSortStartTimeout=null,this._pendingSortTask&&!this._isSorting&&this._scheduleSortStart()},t))}_startSortIfRequired(){if(this._isSorting||!this._pendingSortTask)return;let e=new AbortController;this._sortAbortController=e,this._isSorting=!0,this._pendingSortTask=!1,this._lastSortStartTime=(0,z.tB)(),this._sortOnWorker(e.signal).finally(()=>{this._sortAbortController===e&&(this._sortAbortController=null),this._handleSortComplete()})}_handleSortComplete(){this._isSorting=!1,this._pendingSortTask?this._scheduleSortStart():this._updating.value=!1}_clearBuffersAndTextures(){this._atlasIndicesBuffer=void 0,this._sortedAtlasIndicesBuffer=void 0,this._distancesBuffer=void 0,this._bufferCapacity=0,this._sortBufferMemory=0,this._orderTexture.clear(),this._textureAtlas.clear()}_computeExpandedCapacity(e,t){let i=Math.max(1,e);for(;i<t;)i=Math.ceil(i*F.Ji);return i}_ensureSortBufferCapacities(e){if(this._bufferCapacity<e){let t=this._computeExpandedCapacity(this._bufferCapacity,e);this._atlasIndicesBuffer=new Uint32Array(t),this._sortedAtlasIndicesBuffer=new Uint32Array(t),this._distancesBuffer=new Float64Array(t),this._bufferCapacity=t,this._sortBufferMemory=(0,G.Qf)(this._atlasIndicesBuffer,this._sortedAtlasIndicesBuffer,this._distancesBuffer)}}_clearAllBuffersAndTextures(){this._clearBuffersAndTextures(),this._latestSortedGaussianTiles.length=0,this._nextCommittedVisibleGaussianTiles.length=0,this._previousVisibleTileDepthRangeTilesVersion=-1,this._workerHandle?.clear()}async _sortOnWorker(e){try{if(0===this._latestUpdatedGaussianTiles.length)return this.visibleGaussians=0,this._clearAllBuffersAndTextures(),this._latestCompletedLyr3dVisibilityChange=this._requestedLyr3dVisibilityChange,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),void this._renderer.requestRender(1);this._useDeterministicSort&&this._latestUpdatedGaussianTiles.sort((e,t)=>e.obb.centerX-t.obb.centerX||e.obb.centerY-t.obb.centerY||e.obb.centerZ-t.obb.centerZ);let t=this._latestUpdatedGaussianTiles,i=t.length,a=this._requestedLyr3dVisibilityChange,s=0;for(let e=0;e<i;e++)s+=t[e].gaussianCount;this._ensureSortBufferCapacities(s),this._textureAtlas.ensureTextureAtlas();let r=this._renderer.camera;(0,E.S8)(this._cameraDirectionNormalized,r.ray.direction);let n=this._cameraDirectionNormalized[0],l=this._cameraDirectionNormalized[1],o=this._cameraDirectionNormalized[2],u=0,c=this._atlasIndicesBuffer,d=this._distancesBuffer,h=this._renderer.clippingBox,p=this._nextCommittedVisibleGaussianTiles;p.length=0;let f=0,{frustum:m}=r,v=this._renderer.tileCullingRevision,_=m[0],x=m[1],y=m[2],b=m[3],w=m[4],C=m[5];for(let e=0;e<i;e++){let i=t[e],{gaussianAtlasIndices:a,relativePositions:s,obbCenterX:r,obbCenterY:m,obbCenterZ:S,paddedMbsRadius:P}=i,T=i.gaussianCount;if(i.cullingRevision!==v){let e=null==h||(0,g.HY)(i.boundingBox,h);if(e){let t=1.5*P;e=_[0]*r+_[1]*m+_[2]*S+_[3]<t&&x[0]*r+x[1]*m+x[2]*S+x[3]<t&&y[0]*r+y[1]*m+y[2]*S+y[3]<t&&b[0]*r+b[1]*m+b[2]*S+b[3]<t&&w[0]*r+w[1]*m+w[2]*S+w[3]<t&&C[0]*r+C[1]*m+C[2]*S+C[3]<t}i.cullingRevision=v,i.cullingVisible=e}if(!i.cullingVisible)continue;c.set(a,u),p[f++]=i;let D=n*r+l*m+o*S,M=u+T;for(let e=u,t=0;e<M;e++,t+=3){let i=s[t],a=s[t+1],r=s[t+2];d[e]=i*n+a*l+r*o+D}u=M}if(p.length=f,0===u)return this.visibleGaussians=0,this._clearAllBuffersAndTextures(),this._latestCompletedLyr3dVisibilityChange=a,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),void this._renderer.requestRender(1);let S={distances:this._distancesBuffer,atlasIndices:this._atlasIndicesBuffer,sortedAtlasIndices:this._sortedAtlasIndicesBuffer,numGaussians:u,preciseSort:this._useDeterministicSort},P=await this._workerHandle?.sort(S,e);if(e.aborted)return;P&&(this._distancesBuffer=P.distances,this._atlasIndicesBuffer=P.atlasIndices,this._sortedAtlasIndicesBuffer=P.sortedAtlasIndices);let T=async e=>{this._orderTexture.setData(this._sortedAtlasIndicesBuffer,u);let t=this._latestSortedGaussianTiles;this._latestSortedGaussianTiles=p,this._nextCommittedVisibleGaussianTiles=t,this._latestSortedGaussianTilesVersion++,this._latestCompletedLyr3dVisibilityChange=a,this.visibleGaussians=u,this._onSortComplete(this._latestSortedGaussianTiles,this._latestCompletedLyr3dVisibilityChange),this._renderer.requestRender(1),e.madeProgress()};await this._frameTask.schedule(T,e)}catch(e){if((0,o.zf)(e))return}}set useDeterministicSort(e){this._useDeterministicSort=e}}class K{static{this.fadeInEase=e=>e*(2-e)}static{this.fadeOutEase=e=>e*e}static{this.inverseFadeInEase=e=>1-Math.sqrt(1-e)}static{this.inverseFadeOutEase=e=>Math.sqrt(1-e)}static{this.minimumFadeDuration=(0,z.l5)(80)}static{this.resetFadeDurationInterval=(0,z.l5)(1e3)}constructor(e){this.layerView=e,this._numFadingTiles=(0,I.v)(0),this._tmpFullyFadedOutTiles=[],this._previousNumFadingTiles=0,this._lastStoppedFading=(0,z.l5)(0),this._currentFadeDuration=this.baseFadeDuration}get numFadingTiles(){return this._numFadingTiles.value}fadeTile(e,t,i){let a=this._getTargetOpacity(t);if(e.fadeDirection=t,!this.fadingEnabled)return void this._instantTileFading(e,a);let s=e.opacityModifier;if(s!==a){let a=this._getFadeProgressFromOpacity(s,t);this._startTileFading(e,a,i)}else this._stopTileFading(e)}updateAllTileFading(e){let t=this._tmpFullyFadedOutTiles;t.length=0,this.layerView.tileHandles.forEach(i=>{this._updateTileFading(i,e)&&t.push(i)}),t.length>0&&(this.layerView.notifyTileObbsChanged(t),0===this._numFadingTiles.value&&this.layerView.updateGaussians()),this._numFadingTiles.value>0&&this.layerView.view.stage?.renderView.requestRender(2)}onFadeDurationChanged(e){0===e&&this.numFadingTiles>0&&this._instantlyFullyFadeAllTiles()}isTileFadingOut(e){return null!=e.fadeProgress&&1===e.fadeDirection}onTileDiscarded(e){null!=e.fadeProgress&&(this._numFadingTiles.value--,0===this._numFadingTiles.value&&(this._lastStoppedFading=(0,z.l5)(performance.now())))}updateFadeDuration(){if(this.numFadingTiles&&this.numFadingTiles>=this._previousNumFadingTiles){let e=.95*this._currentFadeDuration;this._currentFadeDuration=(0,z.l5)(Math.max(e,K.minimumFadeDuration))}else 0===this.numFadingTiles&&performance.now()-this._lastStoppedFading>K.resetFadeDurationInterval&&(this._currentFadeDuration=this.baseFadeDuration);return this._previousNumFadingTiles=this.numFadingTiles,this._currentFadeDuration}get updating(){return this._numFadingTiles.value>0}get baseFadeDuration(){return this.layerView.view.qualitySettings.fadeDuration}get fadingEnabled(){return 0!==this.baseFadeDuration}_startTileFading(e,t,i){null==e.fadeProgress&&this._numFadingTiles.value++,e.fadeDuration=i,e.fadeProgress=t}_stopTileFading(e){null!=e.fadeProgress&&(1===e.fadeDirection&&this._onTileFullyFadedOut(e),this._numFadingTiles.value--,0===this._numFadingTiles.value&&(this._lastStoppedFading=(0,z.l5)(performance.now())),e.fadeDuration=null,e.fadeProgress=null)}_updateTileFading(e,t){let{fadeProgress:i,fadeDirection:a}=e;if(null==i)return!1;let s=this._fadeDirectionToSign(a),r=e.fadeDuration,n=this._getTargetOpacity(a),l=Math.min(i+t/Math.abs(r||1),1),o=s*(1-(0===a?K.fadeInEase:K.fadeOutEase)(l)),u=1===l;if(e.opacityModifier=u?n:n-o,u){let t=1===a;return this._stopTileFading(e),this._updateOpacityModifier(e),t}return e.fadeProgress=l,this._updateOpacityModifier(e),!1}_updateOpacityModifier(e){let t=255*e.opacityModifier;for(let i=0;i<e.pageIds.length;i++){let a=e.pageIds[i];this.layerView.data.fadingTexture.updateBuffer(t,a)}}_instantTileFading(e,t){e.fadeDuration=null,e.fadeProgress=null,e.opacityModifier=t,this._updateOpacityModifier(e),1===e.fadeDirection&&this._onTileFullyFadedOut(e)}_instantlyFullyFadeAllTiles(){let e=this._tmpFullyFadedOutTiles;e.length=0,this.layerView.tileHandles.forEach(t=>{if(null!=t.fadeProgress){let i=1===t.fadeDirection;this._instantTileFading(t,this._getTargetOpacity(t.fadeDirection)),i&&e.push(t)}}),e.length>0&&(this.layerView.updateGaussians(),this.layerView.notifyTileObbsChanged(e)),this._numFadingTiles.value=0}_onTileFullyFadedOut(e){e.lifecycleState=0,this.layerView.moveTileToCache(e)}_fadeDirectionToSign(e){return 0===e?1:-1}_getTargetOpacity(e){return+(0===e)}_getFadeProgressFromOpacity(e,t){let i=Math.max(0,Math.min(e,1));return 0===t?K.inverseFadeInEase(i):K.inverseFadeOutEase(i)}}var J=i(748194),ee=i(268584),et=i(619146),ei=i(646324),ea=i(696342),es=i(415585),er=i(137791),en=i(99890);class el{constructor(e){this.layerView=e,this.type=0,this.slicePlaneEnabled=!1,this.isGround=!1,this._ellipsoidLocalRayOrigin=(0,B.vt)(),this._ellipsoidLocalRayDir=(0,B.vt)(),this.intersectionNormal=(0,B.vt)(),this.intersectionRayDir=(0,B.vt)(),this.intersectionPlane=(0,ei.vt)(),this.layerViewUid=e.uid;const t=e.view.viewingMode,i=(e.useEsriCrs?e.fullExtentInLocalViewSpatialReference:e.layer.fullExtent?(0,ee.project)(e.layer.fullExtent,e.view.renderSpatialReference):void 0)??e.view.extent,a=(0,et.VY)(i);this._bvh=(0,er.J)(t,a)}destroy(){this._bvh.destroy()}addTile(e){this._bvh.addTile(e)}removeTile(e){this._bvh.removeTile(e)}intersect(e,t,i,a,s,r){let{intersectionRayDir:n,intersectionPlane:l,layerViewUid:o,intersectionNormal:u}=this,c=(0,ea.Cr)(i,a);(0,E.Re)(n,a,i);let d=1/(0,E.Bw)(n);(0,E.hs)(n,n,d),(0,E.ze)(u,n),(0,J.hZ)(l,n[0],n[1],n[2],-(0,E.Om)(n,i));let h=new eu,p=new eu,f=e.options.store,m=0===f,v=2===f,_=1===f||v,x=v?[]:null,y=(e,t,i,a,s,r,n,l)=>{let c=e.point??(e.point=(0,B.vt)());c[0]=i,c[1]=a,c[2]=s,e.dist=t,e.normal=u;let d=e.outwardDirection??(e.outwardDirection=(0,B.vt)()),h=r*r+n*n+l*l;if(h>0){let e=1/Math.sqrt(h);d[0]=r*e,d[1]=n*e,d[2]=l*e}else d[0]=u[0],d[1]=u[1],d[2]=u[2];return e.layerViewUid=o,e},b=i[0],w=i[1],C=i[2],S=n[0],P=n[1],T=n[2],D=this.layerView.clippingBox,M=e=>{let{relativePositions:s,packedRotations:r,packedOpacityScaledScales:n,gaussianCount:l,obb:o,maxSplatMbsRadiusSquared:u}=e,c=o.centerX,f=o.centerY,g=o.centerZ,M=-1,R=D[0],A=D[1],F=D[2],G=D[3],I=D[4],z=D[5];for(let e=0,o=0;e<l;e++,o+=3){let l=s[o]+c,D=s[o+1]+f,E=s[o+2]+g;if(l<R||D<A||E<F||l>G||D>I||E>z)continue;let B=l-b,H=D-w,k=E-C,q=B*S+H*P+k*T;if(q<0&&q*q>u)continue;let V=q<0?0:q;if(B*B+H*H+k*k-V*V>u||m&&null!=h.dist&&(M<0&&(M=Math.sqrt(u)),Math.max(q-M,0)*d>=h.dist))continue;let O=this._intersectGaussianEllipsoid(B,H,k,S,P,T,r[e],n[e]);if(O<0)continue;let L=O*d;if(null!=t&&!t(i,a,L))continue;let j=null==h.dist||L<h.dist,N=_&&(null==p.dist||L>p.dist);if(!j&&!N&&!v)continue;let W=S*O,U=P*O,$=T*O,Z=b+W,Y=w+U,X=C+$,Q=W-B,K=U-H,J=$-k;if(j&&y(h,L,Z,Y,X,Q,K,J),N&&y(p,L,Z,Y,X,Q,K,J),v){let e=new eu;x.push(y(e,L,Z,Y,X,Q,K,J))}}},R=e=>{let{relativePositions:s,packedRotations:r,packedOpacityScaledScales:n,gaussianCount:l,obb:o,maxSplatMbsRadiusSquared:u}=e,c=o.centerX,f=o.centerY,g=o.centerZ,D=-1,M=b-c,R=w-f,A=C-g;for(let e=0,o=0;e<l;e++,o+=3){let l=s[o]-M,c=s[o+1]-R,f=s[o+2]-A,g=l*S+c*P+f*T;if(g<0&&g*g>u)continue;let F=g<0?0:g;if(l*l+c*c+f*f-F*F>u||m&&null!=h.dist&&(D<0&&(D=Math.sqrt(u)),Math.max(g-D,0)*d>=h.dist))continue;let G=this._intersectGaussianEllipsoid(l,c,f,S,P,T,r[e],n[e]);if(G<0)continue;let I=G*d;if(null!=t&&!t(i,a,I))continue;let z=null==h.dist||I<h.dist,E=_&&(null==p.dist||I>p.dist);if(!z&&!E&&!v)continue;let B=S*G,H=P*G,k=T*G,q=b+B,V=w+H,O=C+k,L=B-l,j=H-c,N=k-f;if(z&&y(h,I,q,V,O,L,j,N),E&&y(p,I,q,V,O,L,j,N),v){let e=new eu;x.push(y(e,I,q,V,O,L,j,N))}}},A=(e,t)=>{let{min:i,max:a}=e.obb.signedDistanceRangePlane(l);if(a<0)return;let s=i*d;if(!(m&&null!=h.dist&&h.dist<s)){if(null!=h.dist&&null!=p.dist){let e=a*d;if(h.dist<s&&p.dist>e)return}t?M(e):R(e)}};this._bvh.forEachTileIntersectingRay(i,a,null!=D?e=>{let t=e.boundingBox;(0,g.HY)(t,D)&&A(e,!(0,g.gR)(D,t))}:e=>{A(e,!1)},r);let F=(e,t)=>{let{layerViewUid:i}=t,a=new es.bo(t.point,t.outwardDirection,i);e.set(0,a,t.dist,t.dist,t.normal)};if(eo(h)){let t=e.results.min;(null==t.distance||h.dist<t.distance)&&F(t,h)}if(eo(p)&&_){let t=e.results.max;(null==t.distance||p.dist>t.distance)&&F(t,p)}if(v&&x?.length)for(let t of x){let i=new en.i(c);F(i,t),e.results.all.push(i)}}_intersectGaussianEllipsoid(e,t,i,a,s,r,n,l){let o,u,c,d,h=1023&n,p=n>>>10&1023,f=n>>>20&1023,g=(h&ec)*ed*(1-2*(h>>>9&1)),m=(p&ec)*ed*(1-2*(p>>>9&1)),v=(f&ec)*ed*(1-2*(f>>>9&1)),_=Math.sqrt(Math.max(0,1-(g*g+m*m+v*v)));switch(n>>>30){case 0:o=_,u=v,c=m,d=g;break;case 1:o=v,u=_,c=m,d=g;break;case 2:o=v,u=m,c=_,d=g;break;default:o=v,u=m,c=g,d=_}let x=this._ellipsoidLocalRayOrigin;x[0]=-e,x[1]=-t,x[2]=-i,(0,E.fw)(x,x,-o,-u,-c,d);let y=this._ellipsoidLocalRayDir;y[0]=a,y[1]=s,y[2]=r,(0,E.fw)(y,y,-o,-u,-c,d);let b=ep[255&l],w=ep[l>>>8&255],C=ep[l>>>16],S=x[0]*b,P=x[1]*w,T=x[2]*C,D=S*S+P*P+T*T;if(D<=1)return 0;let M=y[0]*b,R=y[1]*w,A=y[2]*C,F=M*M+R*R+A*A,G=S*M+P*R+T*A;if(G>0)return eh;let I=G*G-F*(D-1);return I<0?eh:(-G-Math.sqrt(I))/F}getElevationRange(e){return this._bvh.getElevationRangeIntersectingSphere(e)??new D.H(0,0)}}function eo(e){return null!=e.dist&&null!=e.point}class eu{constructor(){this.point=null,this.dist=null,this.normal=null,this.outwardDirection=null,this.layerViewUid=""}}let ec=511,ed=Math.SQRT1_2/511,eh=-1,ep=(()=>{let e=new Float64Array(256);for(let t=0;t<e.length;t++)e[t]=Math.exp(10-t/16)/3;return e})();class ef{constructor(e,t,i,a,s,r,n,l,o,u){this.handle=e,this.obb=t,this.gaussianAtlasIndices=i,this.pageIds=a,this.relativePositions=s,this.packedRotations=r,this.packedOpacityScaledScales=n,this.gaussianCount=l,this.maxSplatMbsRadiusSquared=o,this.elevationRange=u,this.bvhIntersectionGeneration=0,this.lifecycleState=0,this.cullingRevision=-1,this.cullingVisible=!1,this.fadeDirection=0,this.opacityModifier=0,this.usedMemory=(0,G.Qf)(this.gaussianAtlasIndices,this.pageIds,this.relativePositions,this.packedRotations,this.packedOpacityScaledScales);const c=(0,B.vt)();t.getCenter(c),this.obbCenterX=c[0],this.obbCenterY=c[1],this.obbCenterZ=c[2];const d=t.radius??-1;this._mbsRadius=d,this._mbsRadiusSquared=d<0?-1:d*d;const h=t.halfSize;this._obbShortestHalfsize=h?Math.min(h[0],h[1],h[2]):0;const p=(0,g.vt)();t.toAaBoundingBox(p),this.boundingBox=p;const f=d>=0?d:.5*(0,g._F)(p);this.paddedMbsRadius=f+Math.sqrt(Math.max(0,o))}boundingVolumeIntersectsRay(e,t){if(!this.obb)return!0;let{obbCenterX:i,obbCenterY:a,obbCenterZ:s}=this,r=i-e[0],n=a-e[1],l=s-e[2],o=r*t[0]+n*t[1]+l*t[2];return(this._mbsRadiusSquared<0||r*r+n*n+l*l-o*o<=this._mbsRadiusSquared)&&this.obb.intersectRay(e,t)}boundingVolumeIntersectsSphere(e){let t=this._mbsRadius;if(t<0)return!0;let i=e.center,a=e.radius,s=t+a,r=this.obbCenterX-i[0];if(r>s)return!1;let n=this.obbCenterY-i[1];if(n>s)return!1;let l=this.obbCenterZ-i[2];if(l>s)return!1;let o=r*r+n*n+l*l;return!(o>s*s)&&(o<=(this._obbShortestHalfsize+a)**2||Math.sqrt(o)+t<=a||(this.obb?.intersectSphere(e)??!0))}}var eg=i(698532),em=i(512515),ev=i(520828),e_=i(432476),ex=i(46077),ey=i(940421),eb=i(288193),ew=i(377147),eC=i(278477);let eS=class extends ew.w{constructor(){super(...arguments),this.shader=new eb.r(ey.S,()=>i.e(56747).then(i.bind(i,456747)))}initializePipeline(){return(0,eC.Ey)({colorWrite:eC.kn,depthTest:null,depthWrite:eC.Uy})}};eS=(0,r.Cg)([(0,d.$K)("esri.views.3d.webgl-engine.shaders.GaussianSplatCompositionTechnique")],eS);var eP=i(488705),eT=i(527498);class eD extends eT.Tt{constructor(){super(...arguments),this.hasEmission=!1}}(0,r.Cg)([(0,eP.W)()],eD.prototype,"hasEmission",void 0);var eM=i(211878);let eR=class extends ew.w{constructor(){super(...arguments),this.shader=new eb.r(eM.S,()=>i.e(54232).then(i.bind(i,254232)))}initializePipeline(){return(0,eC.Ey)({colorWrite:null,depthTest:{func:515},depthWrite:eC.Uy})}};eR=(0,r.Cg)([(0,d.$K)("esri.views.3d.webgl-engine.shaders.GaussianSplatDepthCompositionTechnique")],eR);let eA=class extends ew.w{constructor(){super(...arguments),this.shader=new eb.r(ex.a,()=>i.e(87351).then(i.bind(i,687351)))}initializePipeline(){return(0,eC.Ey)({blending:(0,eC.p3)(773,773,1,1,32774,32774),depthTest:{func:515},colorWrite:eC.kn})}};eA=(0,r.Cg)([(0,d.$K)("esri.views.3d.webgl-engine.shaders.GaussianSplatTechnique")],eA);var eF=i(151431);let eG=class extends e_.A{static{a=this}constructor(e){super(e),this.produces=em.OG.GAUSSIAN_SPLAT,this._slicePlaneEnabled=!1,this.layerView=null,this._passParameters=new ex.G,this._compositionPassParameters=new ey.G,this._depthCompositionPassParameters=new eM.G,this._compositionConfiguration=new eD,this._clipBox=(0,g.vt)(),this._previousCameraDirection=(0,B.vt)(),this._previousSortRequestCameraDirection=(0,B.vt)(),this._tileCullingRevision=0,this._sortRequestDirectionEpsilon=.01,this._directionChangeEpsilon=.001,this._configuration=new eF.I(e.view.state.isGlobal),(0,g.hZ)(this._clipBox,g.sI)}async initialize(){this.addHandles([(0,u.wB)(()=>this.view.state.camera,()=>this._onCameraChange()),(0,u.wB)(()=>2===this.view.state.mode,()=>this.requestRender(1))])}precompile(){this._updateConfigurations(),this._compositionConfiguration.useFloatBlend=this.bindParameters.useFloatBlend.value,this._compositionConfiguration.hasEmission=this.bindParameters.hasOpaqueEmission,this.techniques.precompile(eA,this._configuration),this.techniques.precompile(eS,this._compositionConfiguration),this.techniques.precompile(eR)}render(e){let t=e.find(({name:e})=>e===this.produces);if(this._updateConfigurations(),this._handleFading(),!this._data.visibleGaussians||!this._data.orderTexture.texture||!this._data.textureAtlas.texture)return t;let i=t.getAttachment(j.yI);this._compositionConfiguration.useFloatBlend=this.bindParameters.useFloatBlend.value,this._compositionConfiguration.hasEmission=null!=i;let{fullWidth:a,fullHeight:s}=this.bindParameters.camera;this._prepareParameters(s,a);let r=this.renderingContext,n=this.fboCache,l=n.acquire(a,s,"gaussian color output"),o=t.getAttachment(j.nI);l.attachDepth(o);let u=this.techniques.get(eA,this._configuration);this._renderGaussianColorAndDepth(l,u);let c=n.acquire(a,s,this.produces);this._depthCompositionPassParameters.splatDepth=l.getTexture(j.yI),c.attachDepth(t.getAttachment(j.nI)),r.bindFramebuffer(c.fbo);let d=this.techniques.get(eR);r.bindTechnique(d,this.bindParameters,this._depthCompositionPassParameters),r.screen.draw(),this._compositionPassParameters.color=t.getTexture(),this._compositionPassParameters.splatColor=l.getTexture(),i?(c.acquireColor(j.yI,8,"emissive"),this._compositionPassParameters.emission=t.getTexture(j.yI)):this._compositionPassParameters.emission=null,r.bindFramebuffer(c.fbo);let h=this.techniques.get(eS,this._compositionConfiguration);return r.bindTechnique(h,this.bindParameters,this._compositionPassParameters),r.screen.draw(),l.release(),c}get slicePlaneEnabled(){return this._slicePlaneEnabled}set slicePlaneEnabled(e){this._slicePlaneEnabled!==e&&(this._slicePlaneEnabled=e,this.requestRender(1))}set clippingBox(e){let t=e||g.sI;this._hasSameClipBox(t)||((0,g.hZ)(this._clipBox,t),this._tileCullingRevision=(0,ev.b$)(this._tileCullingRevision,1),this._data.requestSort(),this.requestRender(1))}get clippingBox(){return this._clippingEnabled?this._clipBox:null}get tileCullingRevision(){return this._tileCullingRevision}get _clippingEnabled(){return!(0,g.aI)(this._clipBox,g.sI,(e,t)=>e===t)}get _isIdle(){return 2===this.view.state.mode}get _data(){return this.layerView.data}get _fadeHelper(){return this.layerView.fadeHelper}_updateConfigurations(){let{idleMinimumOpacity:e,nonIdleMinimumOpacity:t}=this.view.qualitySettings.gaussianSplat;this._configuration.alphaCutoff=this._isIdle?e:t,this._configuration.fadingEnabled=this._fadeHelper.fadingEnabled,this._configuration.receiveShadows=this.bindParameters.shadowMap.ready,this._configuration.hasShadowHighlights=this._configuration.receiveShadows&&this.bindParameters.hasShadowHighlights,this._configuration.clippingEnabled=this._clippingEnabled,this._configuration.hasSlicePlane=this._slicePlaneEnabled&&null!=this.bindParameters.slicePlane}_onCameraChange(){this._tileCullingRevision=(0,ev.b$)(this._tileCullingRevision,1);let e=this.view.state.camera.ray.direction;!this._directionChanged(e)||((0,E.C)(this._previousCameraDirection,e),this._shouldRequestSort(e)&&this._data.requestSort()&&(0,E.C)(this._previousSortRequestCameraDirection,e))}_directionChanged(e){return Math.abs(e[0]-this._previousCameraDirection[0])>this._directionChangeEpsilon||Math.abs(e[1]-this._previousCameraDirection[1])>this._directionChangeEpsilon||Math.abs(e[2]-this._previousCameraDirection[2])>this._directionChangeEpsilon}_shouldRequestSort(e){return Math.abs(e[0]-this._previousSortRequestCameraDirection[0])>this._sortRequestDirectionEpsilon||Math.abs(e[1]-this._previousSortRequestCameraDirection[1])>this._sortRequestDirectionEpsilon||Math.abs(e[2]-this._previousSortRequestCameraDirection[2])>this._sortRequestDirectionEpsilon}_prepareParameters(e,t){this._passParameters.splatOrder=this._data.orderTexture.texture,this._passParameters.splatFading=this._data.fadingTexture.texture,this._passParameters.splatAtlas=this._data.textureAtlas.texture;let i=Math.tan(.5*this.camera.fovY);(0,eg.hZ)(this._passParameters.tanFov,i/e*t,i),this._passParameters.focalLength=e/(2*i);let a=this.view.qualitySettings.gaussianSplat,s=this._isIdle?a.idleMinimumSplatPixelRadius:a.nonIdleMinimumSplatPixelRadius;this._passParameters.minSplatRadius=s*Math.sqrt(t*e)/Math.sqrt(2073600),(0,E.C)(this._passParameters.origin,this.bindParameters.camera.eye),this._prepareHighPrecisionCameraPosition(),this._updateSlicePlaneLocalOrigin(),this._updateClipUniforms()}_updateClipUniforms(){let[e,t,i,a,s,r]=this.clippingBox||g.sI,[n,l,o]=this.camera.eye,{clipMinCameraRelative:u,clipMaxCameraRelative:c}=this._passParameters;(0,E.hZ)(u,e-n,t-l,i-o),(0,E.hZ)(c,a-n,s-l,r-o)}_updateSlicePlaneLocalOrigin(){this._passParameters.slicePlaneLocalOrigin=this.camera.eye}_hasSameClipBox(e){return(0,g.aI)(this._clipBox,e,(e,t)=>e===t)}_renderGaussianColorAndDepth(e,t){let i=this.renderingContext;e.acquireColor(j.yI,5,"gaussian depth output"),i.bindFramebuffer(e.fbo),i.setClearColor(0,0,0,0),i.clear(16384),this.renderingContext.bindTechnique(t,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(j.WR.TRIANGLE_STRIP,0,4,this._data.visibleGaussians)}_prepareHighPrecisionCameraPosition(){(0,E.hs)(this._passParameters.tileCameraPosition,this.camera.eye,1/a.tileSize),(0,E.RI)(this._passParameters.tileCameraPosition,this._passParameters.tileCameraPosition),(0,E.hs)(this._passParameters.cameraDelta,this._passParameters.tileCameraPosition,a.tileSize),(0,E.Re)(this._passParameters.cameraDelta,this.camera.eye,this._passParameters.cameraDelta)}_handleFading(){if(0===this._fadeHelper.numFadingTiles)return void(this._previousFrameStart=null);this._previousFrameStart??=this.view.stage.renderer.renderContext.time;let e=this.view.stage?.renderer.renderContext.time-this._previousFrameStart;this._fadeHelper.updateAllTileFading(e),this._previousFrameStart=this.view.stage.renderer.renderContext.time,this._data.fadingTexture.updateTexture(this._data.textureAtlas.pageAllocator.pageCount)}static{this.tileSize=2.048}};(0,r.Cg)([(0,d.MZ)()],eG.prototype,"produces",void 0),(0,r.Cg)([(0,d.MZ)({constructOnly:!0})],eG.prototype,"layerView",void 0),eG=a=(0,r.Cg)([(0,d.$K)("esri.views.3d.webgl-engine.lib.GaussianSplatRenderNode")],eG);var eI=i(237589);let ez=class extends ew.w{constructor(){super(...arguments),this.shader=new eb.r(eI.a,()=>i.e(96019).then(i.bind(i,196019)))}initializePipeline(){return(0,eC.Ey)({colorWrite:null,depthTest:{func:515},depthWrite:eC.Uy})}};ez=(0,r.Cg)([(0,d.$K)("esri.views.3d.webgl-engine.shaders.GaussianSplatShadowTechnique")],ez);let eE=class extends e_.A{constructor(e){super(e),this.produces=em.OG.SHADOW_CASTERS,this.layerView=null,this._passParameters=new eI.G,this._cameraPosition=(0,B.vt)(),this._configuration=new eF.I(e.view.state.isGlobal)}render(){let e=this.bindRenderTarget();return this._render(),e}queryDepthRange(e){return this.layerView.suspended?null:this._data.queryVisibleTileDepthRange(e,this.layerView.clippingBox)}get _data(){return this.layerView.data}get _clippingEnabled(){return null!=this.layerView.clippingBox}get _isIdle(){return 2===this.view.state.mode}_render(){let e=this._data;if(this.layerView.suspended||0===e.visibleGaussians||!e.orderTexture.texture||!e.textureAtlas.texture)return;this._updateShadowConfigurations();let t=this.techniques.getCompiled(ez,this._configuration);t?(this._prepareShadowParameters(this.bindParameters.camera),this.renderingContext.bindTechnique(t,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(j.WR.TRIANGLE_STRIP,0,4,e.visibleGaussians)):this.requestRender(1)}_updateShadowConfigurations(){this._configuration.clippingEnabled=this._clippingEnabled,this._configuration.hasSlicePlane=this.layerView.slicePlaneEnabled&&null!=this.bindParameters.slicePlane,this._configuration.output=this.bindParameters.output}_prepareShadowParameters(e){let t=this._data;this._passParameters.splatOrder=t.orderTexture.texture,this._passParameters.splatAtlas=t.textureAtlas.texture;let{fullHeight:i,fullWidth:a}=e,s=this.view.qualitySettings.gaussianSplat,r=this._isIdle?s.idleMinimumSplatPixelRadius:s.nonIdleMinimumSplatPixelRadius;this._passParameters.minSplatRadius=r*Math.sqrt(a*i)/Math.sqrt(2073600),this._updateShadowCameraPosition(e),this._prepareShadowHighPrecisionCameraPosition(),this._passParameters.slicePlaneLocalOrigin=this._cameraPosition,this._updateShadowClipUniforms()}_updateShadowClipUniforms(){let[e,t,i,a,s,r]=this.layerView.clippingBox||g.sI,[n,l,o]=this._cameraPosition,{clipMinCameraRelative:u,clipMaxCameraRelative:c}=this._passParameters;(0,E.hZ)(u,e-n,t-l,i-o),(0,E.hZ)(c,a-n,s-l,r-o)}_prepareShadowHighPrecisionCameraPosition(){(0,E.hs)(this._passParameters.tileCameraPosition,this._cameraPosition,1/eG.tileSize),(0,E.RI)(this._passParameters.tileCameraPosition,this._passParameters.tileCameraPosition),(0,E.hs)(this._passParameters.cameraDelta,this._passParameters.tileCameraPosition,eG.tileSize),(0,E.Re)(this._passParameters.cameraDelta,this._cameraPosition,this._passParameters.cameraDelta)}_updateShadowCameraPosition(e){let t=e.viewInverseTransposeMatrix;(0,E.hZ)(this._cameraPosition,t[3],t[7],t[11])}};(0,r.Cg)([(0,d.MZ)()],eE.prototype,"produces",void 0),(0,r.Cg)([(0,d.MZ)({constructOnly:!0})],eE.prototype,"layerView",void 0),eE=(0,r.Cg)([(0,d.$K)("esri.views.3d.webgl-engine.lib.GaussianSplatShadowRenderNode")],eE);var eB=i(950487),eH=i(451627);let ek=(()=>{let e=new Int16Array(256);e[0]=-255;for(let t=1;t<e.length;t++)e[t]=Math.round(16*Math.log(t/255));return e})(),eq=class extends(0,S.w)(eB.A){static{s=this}static{this.createRenderableBatchSize=64}constructor(e){super(e),this.type="gaussian-splat-3d",this.ignoresMemoryFactor=!1,this._tileHandles=new Map,this._pageBuffer=new Uint32Array(A.q4),this._tmpTilesWithChangedVisibility=[],this._currentLyr3dVisibilityChange=0,this._tileFadeInsAwaitingInitialSort=new Map,this._tileFadeOutsAwaitingInitialSort=new Map,this._fadeDurationPerVisibilityChange=new Map,this._tmpSortedTileHandles=new Set,this._createRenderableAbortController=new AbortController,this._initializationController=null,this._wasmLayerId=-1,this._metersPerVCSUnit=1,this._usedTileMemory=0,this._cacheTileMemory=0,this._useEsriCrs=!1,this.fullExtentInLocalViewSpatialReference=null,this._suspendedHandle=null,this._conversionBuffer=new ArrayBuffer(4),this._u32View=new Uint32Array(this._conversionBuffer),this._f32View=new Float32Array(this._conversionBuffer);const t=e.view.resourceController;this._memCache=t.memoryController.newCache(`GaussianSplat-${this.uid}`,e=>this._deleteTile(e)),this._frameTask=t.scheduler.registerTask(X.W6.GAUSSIAN_SPLAT_TEXTURE_ATLAS)}get _clippingBox(){if(!this.view?.clippingArea)return null;let e=(0,g.vt)();return(0,M.I)(this.view.clippingArea,e,this.view.renderSpatialReference)?e:null}get clippingBox(){return this._renderNode?.clippingBox??null}initialize(){if(!this._canProjectWithoutEngine())throw(0,eH.lQ)("layer",this.layer.spatialReference.wkid,this.view.renderSpatialReference?.wkid);this._initializationController=new AbortController;let e=(0,P.Bk)(this,this._initializationController.signal).then(e=>{(0,o.Te)(this._initializationController.signal),this._wasmLayerId=e,this._renderNode=new eG({view:this.view,layerView:this}),this.data=new Q(this._renderNode,(e,t)=>this._onSortComplete(e,t),()=>this._freeInvisibleTiles()),this._shadowRenderNode=new eE({view:this.view,layerView:this}),this.fadeHelper=new K(this),this._intersectionHandler=new el(this),this.view.sceneIntersectionHelper.addIntersectionHandler(this._intersectionHandler),this._elevationProvider=new T.e({view:this.view,layerElevationSource:this,intersectionHandler:this._intersectionHandler}),this.view.elevationProvider.register(2,this._elevationProvider),this.addHandles([(0,u.wB)(()=>this.layer.elevationInfo,e=>this._elevationInfoChanged(e)),(0,u.wB)(()=>this.slicePlaneEnabled,e=>this._slicePlaneEnabledChanged(e),u.Vh)]),this._suspendedHandle=(0,u.wB)(()=>this.suspended,e=>this._wasm?.setEnabled(this,!e),u.Vh),this.addHandles([(0,u.wB)(()=>this._clippingBox,e=>this._renderNode.clippingBox=e,u.Vh)]),this.setMaximumGaussianCount(this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians),this._initializationController=null});this.addHandles([(0,u.wB)(()=>this.view.qualitySettings.fadeDuration,e=>{let t=this.data;t&&(this.fadeHelper.onFadeDurationChanged(e),t.fadingTexture.updateTexture(t.textureAtlas.pageAllocator.pageCount))}),(0,u.wB)(()=>this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians,e=>this.setMaximumGaussianCount(e*this.view.quality)),(0,u.wB)(()=>this.view.quality,e=>this.setMaximumGaussianCount(this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians*e))]),this.addResolvingPromise(e)}get wasmLayerId(){return this._wasmLayerId}get metersPerVCSUnit(){return this._metersPerVCSUnit}get tileHandles(){return this._tileHandles}get _wasm(){return(0,P.pw)(this.view)}get usedMemory(){return this._usedTileMemory+(this.data?.usedMemory??0)}get cachedMemory(){return this._cacheTileMemory}get unloadedMemory(){return 0}get useEsriCrs(){return this._useEsriCrs}get elevationProvider(){return this._elevationProvider}get elevationOffset(){return(0,y.M7)(this.layer.elevationInfo)}get elevationRange(){let e=this.fullExtent;return e?.zmin&&e?.zmax?new D.H(e.zmin,e.zmax):null}getElevationRange(e){return this._intersectionHandler.getElevationRange(e)}get fullExtent(){return this.layer.fullExtent}get visibleAtCurrentScale(){return(0,eH.E5)(this.layer.effectiveScaleRange,this.view.scale)}isUpdating(){let e=this._wasm;return!(this._wasmLayerId<0||null==e)&&(e.isUpdating(this._wasmLayerId)||this.data.updating||this.fadeHelper.updating)}updatingFlagChanged(){this.notifyChange("updating")}async createRenderable(e){if(this.destroyed||this.destroying)throw Error("IntegratedMesh3DTilesLayerView3D: createRenderable called after destroy");let{meshData:t}=e;if(!(0,x.KH)(t))throw Error("meshData not valid");let i=t.desc.prims[0],a=i.vertexCount;if(0===a)return n.A.getLogger("esri.views.3d.layers.GaussianSplatLayerView3D").warnOnce("encountered tile with zero Gaussians"),()=>({memUsageBytes:0,numGaussians:0});let s=i.atrbs[0].view,r=i.atrbs[0].view.byteCount,l=i.atrbs[0].view.byteOffset,o=null;if("U32"!==s.type)throw Error("unexpected meshData.data format");o=new Uint32Array(t.data.buffer,l,r/4);let u=this.extractHeader(o),c=2.048*u.tileOrigin.x,d=2.048*u.tileOrigin.y,f=2.048*u.tileOrigin.z,g=t.desc;if(null==g.obb)throw Error("meshData.desc.obb undefined");let m=g.obb.quaternion,v=new R.ab(g.obb.center,g.obb.halfSize,(0,h.fA)(...m)),_=this.view.state.isGlobal,y=_?(0,p.tO)(this.view.spatialReference).radius:0,b={handle:e.handle,bufferView:o,totalGaussians:a,packedHeader:u.packedHeader,tileOrigin:{x:c,y:d,z:f},invPosScale:u.invPosScale,obb:v,origin:{x:v.centerX,y:v.centerY,z:v.centerZ},isGlobal:_,ellipsoidRadius:y},w=await this._frameTask.scheduleGenerator(e=>this._createRenderableTask(b,e),this._createRenderableAbortController.signal);return()=>w}*_createRenderableTask(e,t){let{handle:i,bufferView:a,totalGaussians:r,packedHeader:n,tileOrigin:l,invPosScale:o,obb:u,origin:c,isGlobal:d,ellipsoidRadius:h}=e,p=l.x,f=l.y,g=l.z,m=c.x,v=c.y,_=c.z,x=new Uint32Array(r),y=new Float32Array(3*r),b=new Uint32Array(r),w=new Uint32Array(r),C=[],S=Math.ceil(r/A.$F);for(let e=0;e<S;e++){let i=this.data.textureAtlas.requestPage();if(null===i&&(this._freeInvisibleTiles(),i=this.data.textureAtlas.requestPage()),null===i)throw Error("ran out of gaussian splat memory");C.push(i);let s=Math.min(r-e*A.$F,A.$F),l=e*A.$F,o=A._l*i;for(let e=0;e<s;e++)x[l+e]=o+e;let u=e*A.Fc;this._pageBuffer.set(a.subarray(u,u+s*A.yn)),this._pageBuffer.set(n,A.Fc);let c=i*A._l,d=c%A.DG,h=Math.floor(c/A.DG);this.data.textureAtlas.update(d,h,this._pageBuffer),t.madeProgress()&&(t=yield)}let P=1/0,T=-1/0,M=1/0,R=-1/0,F=0,G=-1,I=0;for(let e=0;e<r;e++){let i=e*A.yn,r=a[i],n=a[i+1],l=a[i+2],u=a[i+3],c=16383&n,h=n>>>14&16383,x=n>>>28&15|(1023&l)<<4,C=ek[u>>>24],S=(l>>>10&255)+C,D=(l>>>18&255)+C,z=(l>>>26&63|(3&u)<<6)+C,E=S>0?S:0,B=D>0?D:0,H=z>0?z:0,k=E|B<<8|H<<16,q=Math.max(E,B,H),V=c*o+p,O=h*o+f,L=x*o+g;if(y[F]=V-m,y[F+1]=O-v,y[F+2]=L-_,d){let e=V*V+O*O+L*L;M=Math.min(M,e),R=Math.max(R,e)}else P=Math.min(P,L),T=Math.max(T,L);b[e]=r,w[e]=k,q>G&&(G=q),F+=3,++I===s.createRenderableBatchSize&&(I=0,t.madeProgress()&&(t=yield))}I>0&&t.madeProgress(),d&&(P=Math.sqrt(M)-h,T=Math.sqrt(R)-h);let z=this._extractGaussianSplatMbsRadiusSquared(G),{fullExtent:E}=this.layer;E?.hasZ&&E.zmax&&E.zmin&&(P=Math.max(P,E.zmin),T=Math.min(T,E.zmax));let B=new ef(i,u,x,C,y,b,w,r,z,new D.H(P,T));return this._memCache.put(`${B.handle}`,B),this._tileHandles.set(i,B),this._cacheTileMemory+=B.usedMemory,{memUsageBytes:B.usedMemory,numGaussians:r}}_extractGaussianSplatMbsRadiusSquared(e){return 9*Math.exp(e/8-20)}freeRenderable(e){this._tileFadeInsAwaitingInitialSort.delete(e),this._tileFadeOutsAwaitingInitialSort.delete(e);let t=this.data?.textureAtlas,i=!1,a=this._tileHandles.get(e);a&&(0!==a.lifecycleState?(i=!0,this.fadeHelper.onTileDiscarded(a),this._usedTileMemory-=a.usedMemory,this._intersectionHandler.removeTile(a)):this._cacheTileMemory-=a.usedMemory,t&&a.pageIds.forEach(e=>t.freePage(e)),this.freeObject(a),this._tileHandles.delete(e)),i&&this.updateGaussians()}freeObject(e){this._memCache.pop(`${e.handle}`)}notifyTileObbsChanged(e){this._elevationProvider&&this._elevationProvider.notifyObjectsChangedFunctional(t=>{for(let i of e)t(i.obb)})}setRenderableVisibility(e,t,i){let a=this._currentLyr3dVisibilityChange+1,s=this.fadeHelper.updateFadeDuration();this._fadeDurationPerVisibilityChange.set(a,s);let r=!1;for(let n=0;n<i;n++){let i=this._tileHandles.get(e[n]);if(!i)continue;let l=t[n]?this._prepareTileFadeIn(i,a,s):this._prepareTileFadeOut(i,a);r||=l}r?(this._currentLyr3dVisibilityChange=a,this.updateGaussians()):this._fadeDurationPerVisibilityChange.delete(a)}_prepareTileFadeIn(e,t,i){let a=this._tileFadeOutsAwaitingInitialSort.delete(e.handle);return 2===e.lifecycleState?(this.fadeHelper.fadeTile(e,0,i),!1):this._tileFadeInsAwaitingInitialSort.get(e.handle)!==t?(0===e.lifecycleState&&this._popTileFromCache(e),e.lifecycleState=1,this._tileFadeInsAwaitingInitialSort.set(e.handle,t),!0):a}_prepareTileFadeOut(e,t){let i=this._tileFadeInsAwaitingInitialSort.delete(e.handle);return i&&1===e.lifecycleState&&(this.moveTileToCache(e),e.lifecycleState=0),2!==e.lifecycleState?i:this._tileFadeOutsAwaitingInitialSort.get(e.handle)!==t?(this._tileFadeOutsAwaitingInitialSort.set(e.handle,t),!0):i}_onSortComplete(e,t){let i=this._tmpTilesWithChangedVisibility;i.length=0;let a=this._tmpSortedTileHandles;a.clear();for(let t=0;t<e.length;t++){let i=e[t];a.add(i.handle)}this._triggerFadeIns(t,a,i);let s=this._triggerFadeOuts(t,i);a.clear(),i.length>0&&this.notifyTileObbsChanged(i),s&&this.updateGaussians(),this._cleanupVisibilityChangeFadeDurations(t)}_triggerFadeIns(e,t,i){for(let[a,s]of this._tileFadeInsAwaitingInitialSort){if(s>e||!t.has(a))continue;let r=this._tileHandles.get(a);if(!r){this._tileFadeInsAwaitingInitialSort.delete(a);continue}let n=this._getFadeDurationForPendingVisibilityChange(s),l=0===r.lifecycleState;2!==r.lifecycleState&&(r.lifecycleState=2,l&&this._popTileFromCache(r),i.push(r)),this.fadeHelper.fadeTile(r,0,n),this._tileFadeInsAwaitingInitialSort.delete(a)}}_triggerFadeOuts(e,t){let i=!1;for(let[a,s]of this._tileFadeOutsAwaitingInitialSort){if(s>e)continue;let r=this._tileHandles.get(a);if(r){let e=2===r.lifecycleState,a=this._getFadeDurationForPendingVisibilityChange(s);this.fadeHelper.fadeTile(r,1,a),e&&0===r.lifecycleState&&(t.push(r),i=!0)}this._tileFadeOutsAwaitingInitialSort.delete(a)}return i}_getFadeDurationForPendingVisibilityChange(e){return this._fadeDurationPerVisibilityChange.get(e)??this.fadeHelper.baseFadeDuration}_cleanupVisibilityChangeFadeDurations(e){if(0!==this._fadeDurationPerVisibilityChange.size)for(let t of this._fadeDurationPerVisibilityChange.keys())t<=e&&this._fadeDurationPerVisibilityChange.delete(t)}_popTileFromCache(e){this._usedTileMemory+=e.usedMemory,this._cacheTileMemory-=e.usedMemory,this._intersectionHandler.addTile(e),this._memCache.pop((0,x.wS)(e.handle))}moveTileToCache(e){this._usedTileMemory-=e.usedMemory,this._cacheTileMemory+=e.usedMemory,this._intersectionHandler.removeTile(e),this._memCache.put((0,x.wS)(e.handle),e)}destroy(){this._initializationController=(0,l.DC)(this._initializationController),this._createRenderableAbortController.abort(),(0,P.r8)(this),this._suspendedHandle&&(this._suspendedHandle=(0,l.xt)(this._suspendedHandle)),this._intersectionHandler&&(this.view.sceneIntersectionHelper.removeIntersectionHandler(this._intersectionHandler),this._intersectionHandler=null),this._elevationProvider&&this.view.elevationProvider&&(this._elevationProvider.notifyObjectsChangedFunctional(e=>{for(let t of this._tileHandles.values())e(t.obb)}),this.view.elevationProvider.unregister(this._elevationProvider),this._elevationProvider=null),this._frameTask.remove(),this._shadowRenderNode=(0,l.pR)(this._shadowRenderNode),this._renderNode=(0,l.pR)(this._renderNode),this._memCache.destroy(),this.data=(0,l.pR)(this.data)}_canProjectWithoutEngine(){if(1===this.view.state.viewingMode||(0,v.r1)(this.view.renderSpatialReference)||(0,v.K8)(this.view.renderSpatialReference))return!0;if(this.layer.esriCrsSpatialReference&&(0,v.aI)(this.layer.esriCrsSpatialReference,this.view.renderSpatialReference)){if(115700===this.layer.esriCrsSpatialReference.vcsWkid)return!1;let e=(0,x.dJ)(this.layer.esriCrsSpatialReference);if(!e){let t=this.layer.esriCrsSpatialReference,i="meters";!(0,v.EA)(t)&&t.wkid&&-1!==t.wkid&&(i=(0,c.LA)(_.A.units[_.A[t.wkid]])),i&&(e=new f.A({heightModel:"gravity-related-height",heightUnit:i}))}let t=this.view.heightModelInfo;return this._useEsriCrs=0===(0,m.$U)(e,t,!1),this._useEsriCrs&&(e&&(this._metersPerVCSUnit=(0,c.oU)(1,e.heightUnit,"meters")),this.fullExtentInLocalViewSpatialReference=this.layer.esriCrsFullExtent),this._useEsriCrs}return!1}_elevationInfoChanged(e){if(e?.offset)if(this._useEsriCrs){let t=(0,b.Ao)(e?.unit)/this._metersPerVCSUnit,i=e?.offset??0;this._wasm?.setLayerOffset(this,i*t)}else this._wasm?.setLayerOffset(this,(0,y.M7)(e));else this._wasm?.setLayerOffset(this,0)}_slicePlaneEnabledChanged(e){this._renderNode&&(this._renderNode.slicePlaneEnabled=e),this._intersectionHandler&&(this._intersectionHandler.slicePlaneEnabled=e)}updateGaussians(){let e=[];for(let t of this._tileHandles.values())0!==t.lifecycleState&&e.push(t);this.data.updateGaussianVisibility(e,this._currentLyr3dVisibilityChange),this.notifyChange("updating")}setMaximumGaussianCount(e){this._wasm?.setMaximumGaussianSplatCount(e)}_freeInvisibleTiles(){for(let e of this._tileHandles.values())0===e.lifecycleState&&this._deleteTile(e)}extractHeader(e){let t=e.length-4,i=this.reinterpretU32AsFloat(e[t]),a=this.reinterpretU32AsFloat(e[t+1]),s=this.reinterpretU32AsFloat(e[t+2]),r=1/(1<<(255&e[t+3]));return{packedHeader:e.subarray(t,t+4),tileOrigin:{x:i,y:a,z:s},invPosScale:r}}_deleteTile(e){this._wasm?.onRenderableEvicted(this,e.handle,e.usedMemory),this.freeRenderable(e.handle)}reinterpretU32AsFloat(e){return this._u32View[0]=e,this._f32View[0]}get performanceInfo(){let e=0,t=0;this._tileHandles.forEach(i=>{0===i.lifecycleState?t++:e++});let i=this.data?.textureAtlasMemory??0,a=this.data?.orderTextureMemory??0,s=this.data?.fadingTextureMemory??0,r=this.data?.sortBufferMemory??0;return new C(this.usedMemory,e,this._usedTileMemory,t,this._cacheTileMemory,i,a,s,r)}get test(){}};(0,r.Cg)([(0,d.MZ)()],eq.prototype,"layer",void 0),(0,r.Cg)([(0,d.MZ)({readOnly:!0})],eq.prototype,"_clippingBox",null),(0,r.Cg)([(0,d.MZ)()],eq.prototype,"elevationOffset",null),(0,r.Cg)([(0,d.MZ)({readOnly:!0})],eq.prototype,"visibleAtCurrentScale",null),(0,r.Cg)([(0,d.MZ)()],eq.prototype,"fullExtentInLocalViewSpatialReference",void 0);let eV=eq=s=(0,r.Cg)([(0,d.$K)("esri.views.3d.layers.GaussianSplatLayerView3D")],eq)},526433:(e,t,i)=>{i.d(t,{B:()=>r});var a=i(854460),s=i(759520);function r(e){e.code.add((0,s.H)`
    uint fetchOrderedGaussianIndex(uint instanceID) {
      uint orderTextureWidth = uint(textureSize(splatOrderTexture, 0).x);
      uint x = instanceID % orderTextureWidth;
      uint y = instanceID / orderTextureWidth;

      return texelFetch(splatOrderTexture, ivec2(x, y), 0).r;
    }

    uvec4 fetchPackedGaussian(uint gaussianIndex) {
      uint gaussianIndexX = gaussianIndex & ${n}u;
      uint gaussianIndexY = gaussianIndex >> ${l}u;

      return texelFetch(splatAtlasTexture, ivec2(gaussianIndexX, gaussianIndexY), 0);
    }

    uvec4 fetchPackedGaussianHeader(uint gaussianIndex) {
      uint headerIndex = gaussianIndex | ${o}u;
      uint headerIndexX = headerIndex & ${n}u;
      uint headerIndexY = headerIndex >> ${l}u;

      return texelFetch(splatAtlasTexture, ivec2(headerIndexX, headerIndexY), 0);
    }

    vec3 fetchGaussianCameraRelativePosition(uint gaussianIndex, uvec4 packedGaussian) {
      uvec4 packedHeader = fetchPackedGaussianHeader(gaussianIndex);
      vec3 tileOriginRelativePosition = unpackTileOriginRelativePosition(packedGaussian);

      return unpackCameraRelativeGaussianPosition(packedHeader, tileOriginRelativePosition);
    }

    uint fetchGaussianPageIndex(uint gaussianIndex) {
      return gaussianIndex >> ${u}u;
    }
  `)}let n=""+(a.DG-1),l=`${Math.log2(a.DG)}`,o=""+(a._l-1),u=`${Math.log2(a._l)}`},730438:(e,t,i)=>{i.d(t,{B:()=>u,GP:()=>l,qg:()=>c});var a=i(380014),s=i(648573);let r={ar:[".",","],bg:[",","\xa0"],bs:[",","."],ca:[",","."],cs:[",","\xa0"],da:[",","."],de:[",","."],"de-ch":[".","’"],el:[",","."],en:[".",","],"en-au":[".",","],es:[",","."],"es-mx":[".",","],et:[",","\xa0"],fi:[",","\xa0"],fr:[","," "],"fr-ch":[","," "],he:[".",","],hi:[".",",","#,##,##0.###"],hr:[",","."],hu:[",","\xa0"],id:[",","."],it:[",","."],"it-ch":[".","’"],ja:[".",","],ko:[".",","],lt:[",","\xa0"],lv:[",","\xa0"],mk:[",","."],nb:[",","\xa0"],nl:[",","."],no:[",","\xa0"],pl:[",","\xa0"],pt:[",","."],"pt-pt":[",","\xa0"],ro:[",","."],ru:[",","\xa0"],sk:[",","\xa0"],sl:[",","."],sr:[",","."],sv:[",","\xa0"],th:[".",","],tr:[",","."],uk:[",","\xa0"],vi:[",","."],zh:[".",","]};function n(e=(0,s.JK)()){let t=(e=e.toLowerCase())in r;if(!t){let i=e.split("-");i.length>1&&i[0]in r&&(e=i[0],t=!0),t||(e="en")}let[i,a,l="#,##0.###"]=r[e];return{decimal:i,group:a,pattern:l}}function l(e,t){let i=n((t={...t}).locale);t.customs=i;let a=t.pattern||i.pattern;return isNaN(e)||Math.abs(e)===1/0?null:function(e,t,i){let a=(i=i||{}).customs.group,s=i.customs.decimal,r=t.split(";"),n=r[0];if((t=r[+(e<0)]||"-"+n).includes("%"))e*=100;else if(t.includes("‰"))e*=1e3;else{if(t.includes("\xa4"))throw Error("currency notation not supported");if(t.includes("E"))throw Error("exponential notation not supported")}let l=n.match(o);if(!l)throw Error("unable to find a number expression in pattern: "+t);return!1===i.fractional&&(i.places=0),t.replace(o,function(e,t,i){!0===(i=i||{}).places&&(i.places=0),i.places===1/0&&(i.places=6);let a=t.split("."),s="string"==typeof i.places&&i.places.indexOf(","),r=i.places;s?r=i.places.slice(s+1):+r>=0||(r=(a[1]||[]).length),i.round<0||(e=Number(e.toFixed(Number(r))));let n=String(Math.abs(e)).split("."),l=n[1]||"";if(a[1]||i.places){s&&(i.places=i.places.slice(0,Math.max(0,s)));let e=void 0!==i.places?i.places:a[1]&&a[1].lastIndexOf("0")+1;+e>l.length&&(n[1]=l.padEnd(Number(e),"0")),+r<l.length&&(n[1]=l.slice(0,Math.max(0,Number(r))))}else n[1]&&n.pop();let o=a[0].replace(",",""),u=o.indexOf("0");-1!==u&&((u=o.length-u)>n[0].length&&(n[0]=n[0].padStart(u,"0")),o.includes("#")||(n[0]=n[0].slice(-u)));let c,d,h=a[0].lastIndexOf(",");if(-1!==h){c=a[0].length-h-1;let e=a[0].slice(0,h);-1!==(h=e.lastIndexOf(","))&&(d=e.length-h-1)}let p=[];for(let e=n[0];e;){let t=e.length-c;p.push(t>0?e.slice(Math.max(0,t)):e),e=t>0?e.slice(0,t):"",d&&(c=d,d=void 0)}return n[0]=p.reverse().join(i.group||","),n.join(i.decimal||".")}(e,l[0],{decimal:s,group:a,places:i.places,round:i.round}))}(e,a,t)}let o=/[#0,]*[#0](?:\.0*#*)?/;function u(e){let t=n((e=e||{}).locale),i=e.pattern||t.pattern,s=t.group,r=t.decimal,l=1;if(i.includes("%"))l/=100;else if(i.includes("‰"))l/=1e3;else if(i.includes("\xa4"))throw Error("currency notation not supported");let u=i.split(";");return 1===u.length&&u.push("-"+u[0]),{regexp:h(u,t=>(t="(?:"+(0,a.Cj)(t,".")+")").replace(o,t=>{var i;let a,n,o,u={signed:!1,separator:e.strict?s:[s,""],fractional:e.fractional,decimal:r,exponent:!1},c=t.split("."),p=e.places;1===c.length&&1!==l&&(c[1]="###"),1===c.length||0===p?u.fractional=!1:(void 0===p&&(p=e.pattern?c[1].lastIndexOf("0")+1:1/0),p&&null==e.fractional&&(u.fractional=!0),!e.places&&+p<c[1].length&&(p+=","+c[1].length),u.places=p);let f=c[0].split(",");return f.length>1&&(u.groupSize=f.pop().length,f.length>1&&(u.groupSize2=f.pop().length)),"("+("places"in(i=(i=u)||{})||(i.places=1/0),"string"!=typeof i.decimal&&(i.decimal="."),"fractional"in i&&!String(i.places).startsWith("0")||(i.fractional=[!0,!1]),"exponent"in i||(i.exponent=[!0,!1]),"eSigned"in i||(i.eSigned=[!0,!1]),a=d(i),o=a+(n=h(i.fractional,e=>{let t="";return e&&0!==i.places&&(t="\\"+i.decimal,i.places===1/0?t="(?:"+t+"\\d+)?":t+="\\d{"+i.places+"}"),t},!0)),n&&(o="(?:(?:"+o+")|(?:"+n+"))"),o+h(i.exponent,e=>e?"([eE]"+d({signed:i.eSigned})+")":""))+")"}),!0).replaceAll(/[\xa0 ]/g,"[\\s\\xa0]"),group:s,decimal:r,factor:l}}function c(e,t){let i=u(t),a=RegExp("^"+i.regexp+"$").exec(e);if(!a)return NaN;let s=a[1];if(!a[1]){if(!a[2])return NaN;s=a[2],i.factor*=-1}return Number(s=s.replaceAll(RegExp("["+i.group+"\\s\\xa0]","g"),"").replace(i.decimal,"."))*i.factor}function d(e){return"signed"in(e=e||{})||(e.signed=[!0,!1]),"separator"in e?"groupSize"in e||(e.groupSize=3):e.separator="",h(e.signed,e=>e?"[-+]":"",!0)+h(e.separator,t=>{if(!t)return"(?:\\d+)";" "===(t=(0,a.Cj)(t))?t="\\s":"\xa0"===t&&(t="\\s\\xa0");let i=e.groupSize,s=e.groupSize2;if(s){let e="(?:0|[1-9]\\d{0,"+(s-1)+"}(?:["+t+"]\\d{"+s+"})*["+t+"]\\d{"+i+"})";return i-s>0?"(?:"+e+"|(?:0|[1-9]\\d{0,"+(i-1)+"}))":e}return"(?:0|[1-9]\\d{0,"+(i-1)+"}(?:["+t+"]\\d{"+i+"})*)"},!0)}let h=(e,t,i)=>{if(!Array.isArray(e))return t(e);let a=[];for(let i=0;i<e.length;i++)a.push(t(e[i]));return p(a.join("|"),!!i)},p=(e,t)=>"("+(t?"?:":"")+e+")"},830116:(e,t,i)=>{i.d(t,{o:()=>s});var a=i(759520);function s(e){e.code.add((0,a.H)`float computeGaussianCovarianceDeterminant(vec3 covariance2D) {
return covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y;
}
vec2 computeGaussianCovarianceEigenvalues(vec3 covariance2D) {
float mid = 0.5 * (covariance2D.x + covariance2D.z);
float radius = length(vec2((covariance2D.x - covariance2D.z) * 0.5, covariance2D.y));
return vec2(mid + radius, mid - radius);
}
vec2 computeGaussianAxisLengths(vec2 eigenvalues, float gaussianEllipseThreshold) {
return ceil(sqrt(eigenvalues * gaussianEllipseThreshold));
}
float computeGaussianEllipseThreshold(float gaussianLogAlphaCutoff) {
return max(0.0, -2.0 * gaussianLogAlphaCutoff);
}
bool rejectGaussianByMinimumRadius(float maxRadius, float opacity, float minSplatRadius) {
return minSplatRadius > 0.0 && maxRadius * opacity < minSplatRadius;
}
bool rejectGaussianByScreenBounds(vec2 ndcPosition, float maxRadius, vec2 clipSpacePixelScale) {
vec2 radiusNDC = maxRadius * clipSpacePixelScale;
return any(greaterThan(abs(ndcPosition) - radiusNDC, vec2(1.0)));
}
vec2 computeGaussianMajorAxisDirection(vec3 covariance2D, float majorEigenvalue) {
return normalize(vec2(covariance2D.y, majorEigenvalue - covariance2D.x));
}
vec2 computeGaussianUnitQuadCorner(int vertexID) {
return vec2((vertexID << 1) & 2, vertexID & 2) - 1.0;
}
vec2 computeGaussianQuadOffset(vec3 covariance2D, vec2 eigenvalues, vec2 axisLengths, int vertexID) {
vec2 majorAxisDirection = computeGaussianMajorAxisDirection(covariance2D, eigenvalues.x);
vec2 majorAxis = axisLengths.x * majorAxisDirection;
vec2 minorAxis = axisLengths.y * vec2(majorAxisDirection.y, -majorAxisDirection.x);
vec2 corner = computeGaussianUnitQuadCorner(vertexID);
return corner.x * majorAxis + corner.y * minorAxis;
}
vec3 computeGaussianConic(vec3 covariance2D, float determinant) {
return vec3(covariance2D.z, -covariance2D.y, covariance2D.x) * (1.0 / determinant);
}
float evaluateGaussianExponent(vec3 conic, vec2 offsetFromCenter) {
float x = offsetFromCenter.x;
float y = offsetFromCenter.y;
return -0.5 * dot(conic, vec3(x * x, 2.0 * x * y, y * y));
}`)}},854460:(e,t,i)=>{i.d(t,{$F:()=>r,DG:()=>a,FL:()=>h,Fc:()=>c,T4:()=>d,_l:()=>n,i2:()=>s,q4:()=>u,yn:()=>o,zl:()=>l});let a=4096,s=64,r=1023,n=1024,l=256,o=4,u=4096,c=4092,d=262144;class h{constructor(e=l){this._pageCount=e;const t=Math.ceil(e/32);this._bitset=new Uint32Array(t)}get pageCount(){return this._pageCount}isAllocated(e){return!!(this._bitset[e/32|0]&1<<e%32)}allocate(e){this._bitset[e/32|0]|=1<<e%32}free(e){this._bitset[e/32|0]&=~(1<<e%32)}findFirstFreePage(){for(let e=0;e<this._bitset.length;e++)if(0xffffffff!==this._bitset[e])for(let t=0;t<32;t++){let i=32*e+t;if(i>=this._pageCount)break;if(!(this._bitset[e]&1<<t))return i}return null}resize(e){this._pageCount=e;let t=Math.ceil(e/32),i=this._bitset.length;if(t!==i){let e=new Uint32Array(t),a=Math.min(i,t);e.set(this._bitset.subarray(0,a)),this._bitset=e}this._clearExcessBits(this._bitset,e)}_clearExcessBits(e,t){let i=Math.floor((t-1)/32),a=(t-1)%32;t>0&&a<31&&(e[i]&=(1<<a+1)-1),i+1<e.length&&e.fill(0,i+1)}}},865098:(e,t,i)=>{i.d(t,{zy:()=>s}),i(269379),i(621370);var a=i(344881);function s(e){return(0,a.A)(e)}i(730438),i(653040),i(598528)},940421:(e,t,i)=>{i.d(t,{G:()=>u,S:()=>d,b:()=>c});var a=i(620721),s=i(127291),r=i(759520),n=i(231596),l=i(342471),o=i(378836);class u extends l.Y{}function c(e){let t=new o.N5;t.include(a.c);let{hasEmission:i}=e,l=t.fragment;return i&&l.include(s.R,e),l.uniforms.add(new n.N("colorTexture",e=>e.color),new n.N("splatOutputColor",e=>e.splatColor)),i&&l.uniforms.add(new n.N("emissionTexture",e=>e.emission)),t.outputs.add("fragColor","vec4",0),i&&t.outputs.add("fragEmission","vec4",1),t.fragment.main.add((0,r.H)`
      vec4 color = texture(colorTexture, uv);
      vec4 splatColor = texture(splatOutputColor, uv);

      fragColor = splatColor + color * (1.0 - splatColor.a);
      ${(0,r.If)(i,(0,r.H)`
          vec4 emission = texture(emissionTexture, uv);
          float srcAlpha = splatColor.a;

          if (srcAlpha == 0.0) {
            fragEmission = emission;
            return;
          }

          vec3 oitDimming = emissionDimming(splatColor.rgb, 1.0 - srcAlpha);
          float opaqueSuppression = smoothstep(0.95, 1.0, srcAlpha);
          vec3 dimming = mix(oitDimming, vec3(0.0), opaqueSuppression);

          fragEmission = vec4(emission.rgb * dimming, emission.a);
        `)}
    `),t}let d=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:u,build:c},Symbol.toStringTag,{value:"Module"}))},960585:(e,t,i)=>{i.d(t,{x:()=>s});var a=i(759520);function s(e){e.code.add((0,a.H)`vec3 encodeNormalizedDepthToRGB(float normalizedDepth) {
float depth24 = normalizedDepth * 16777215.0;
float high = floor(depth24 / 65536.0);
depth24 -= high * 65536.0;
float mid = floor(depth24 / 256.0);
float low = depth24 - mid * 256.0;
return vec3(high, mid, low) / 255.0;
}`),e.code.add((0,a.H)`float decodeRGBToNormalizedDepth(vec3 rgb) {
rgb *= 255.0;
float depth = rgb.r * 65536.0 + rgb.g * 256.0 + rgb.b;
depth /= 16777215.0;
return depth;
}`)}}}]);
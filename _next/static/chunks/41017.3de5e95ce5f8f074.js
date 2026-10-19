"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[41017],{44924:(e,a,o)=>{o.d(a,{c:()=>s,f:()=>c});var i=o(759520);function r(e){e.code.add((0,i.H)`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG) {
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),e.code.add((0,i.H)`float integratedRadiance(float cosTheta2, float roughness) {
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),e.code.add((0,i.H)`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness) {
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var n=o(229192),l=o(525695);function s(e,a){e.include(n.C),e.include(l.p),1!==a.pbrMode&&2!==a.pbrMode&&5!==a.pbrMode&&6!==a.pbrMode||(e.code.add((0,i.H)`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),e.code.add((0,i.H)`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`),e.code.add((0,i.H)`struct PBRShadingInfo
{
float NdotV;
float NdotL;
float LdotH;
float NdotUP;
float RdotUP;
float NdotAmbDir;
float NdotH_Horizon;
float NdotH;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
vec3 reflectedView;
float averageAmbientRadiance;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),e.code.add((0,i.H)`void calculateCommonInputs(out PBRShadingInfo inputs, vec3 normal, vec3 viewDirection, vec3 upDirection, vec3 albedo) {
vec3 h = normalize(mainLightDirection - viewDirection);
inputs.NdotV = clamp(abs(dot(normal, -viewDirection)), 0.001, 1.0);
inputs.NdotUP = clamp(dot(normal, upDirection), -1.0, 1.0);
inputs.reflectedView = normalize(reflect(-viewDirection, normal));
inputs.RdotUP = clamp(dot(inputs.reflectedView, upDirection), -1.0, 1.0);
inputs.albedoLinear = linearizeGamma(albedo);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
}`)),1!==a.pbrMode&&2!==a.pbrMode||(e.include(r),e.code.add((0,i.H)`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotUP);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotUP, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),e.code.add((0,i.H)`void calculatePBRInputs(out PBRShadingInfo inputs, vec3 normal, vec3 viewDirection, vec3 upDirection, vec3 albedo, vec3 mrr) {
calculateCommonInputs(inputs, normal, viewDirection, upDirection, albedo);
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);
inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);
}`)),5!==a.pbrMode&&6!==a.pbrMode||e.code.add((0,i.H)`const vec3 fresnelReflectionSimplified = vec3(0.04);
void calculateSimplifiedInputs(out PBRShadingInfo inputs, vec3 normal, vec3 viewDirection, vec3 upDirection, vec3 albedo) {
calculateCommonInputs(inputs, normal, viewDirection, upDirection, albedo);
float lightness = 0.3 * inputs.albedoLinear[0] + 0.5 * inputs.albedoLinear[1] + 0.2 * inputs.albedoLinear[2];
inputs.f0 = (0.85 * lightness + 0.15) * fresnelReflectionSimplified;
inputs.f90 =  vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
}`)}function c(e,a){e.include(l.p),e.code.add((0,i.H)`
    struct PBRShadingWater {
      float NdotL;   // cos angle between normal and light direction
      float NdotV;   // cos angle between normal and view direction
      float NdotH;   // cos angle between normal and half vector
      float VdotH;   // cos angle between view direction and half vector
      float LdotH;   // cos angle between light direction and half vector
      float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${a.useCustomDTRExponentForWater?"2.2":"2.0"};
  `),e.code.add((0,i.H)`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),e.code.add((0,i.H)`float normalDistributionWater(float NdotH, float roughness) {
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),e.code.add((0,i.H)`float geometricOcclusionKelemen(float LoH) {
return 0.25 / (LoH * LoH);
}`),e.code.add((0,i.H)`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max) {
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze) * strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}`)}},58571:(e,a,o)=>{o.d(a,{m:()=>r});var i=o(597728);class r extends i.n{constructor(e,a,o,i){super(e,"mat4",1,(o,r,n)=>o.setUniformMatrices4fv(e,a(r,n),i),o)}}},104599:(e,a,o)=>{o.d(a,{Bt:()=>s,Jr:()=>n,SY:()=>c,mb:()=>l});var i=o(587751),r=o(442039);function n({normalTexture:e,metallicRoughnessTexture:a,metallicFactor:o,roughnessFactor:l,emissiveTexture:s,emissiveFactor:c,occlusionTexture:d}){return null==e&&null==a&&null==s&&(null==c||(0,i.t2)(c,r.uY))&&null==d&&(null==l||1===l)&&(null==o||1===o)}let l=(0,r.CN)(1,1,.5),s=(0,r.CN)(0,.6,.2),c=(0,r.CN)(0,1,.2)},112939:(e,a,o)=>{o.d(a,{S:()=>m,b:()=>h});var i=o(620721),r=o(41781),n=o(239874),l=o(553457),s=o(759520),c=o(168025),d=o(231596),u=o(378836);function h(){let e=new u.N5,a=e.fragment;return e.include(i.c),a.include(r.E),a.uniforms.add(new d.N("depthMap",e=>e.depthTexture),new c.o("tex",e=>e.colorTexture),new n.t("blurSize",e=>e.blurSize),new l.m("projScale",(e,a)=>{let o=a.camera.distance;return o>5e4?Math.max(0,e.projScale-(o-5e4)):e.projScale})),a.code.add((0,s.H)`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${s.H.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),a.main.add((0,s.H)`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${s.H.int(4)}; r <= ${s.H.int(4)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),e}let m=Object.freeze(Object.defineProperty({__proto__:null,build:h},Symbol.toStringTag,{value:"Module"}))},144143:(e,a,o)=>{o.d(a,{W:()=>l});var i=o(597728);class r extends i.n{constructor(e,a,o,i){super(e,"float",0,(a,r)=>a.setUniform1fv(e,o(r),i),a)}}var n=o(759520);function l(e,a){e.uniforms.add(new r("shR",9,({lighting:e})=>e.sh.r),new r("shG",9,({lighting:e})=>e.sh.g),new r("shB",9,({lighting:e})=>e.sh.b)),e.code.add((0,n.H)`vec3 calculateAmbientIrradiance(vec3 normal) {
vec3 ambientLight = 0.282095 * vec3(shR[0], shG[0], shB[0]);
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
vec4 lightingAmbientSH_R1 = vec4(shR[1], shR[2], shR[3], shR[4]);
vec4 lightingAmbientSH_G1 = vec4(shG[1], shG[2], shG[3], shG[4]);
vec4 lightingAmbientSH_B1 = vec4(shB[1], shB[2], shB[3], shB[4]);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
vec4 lightingAmbientSH_R2 = vec4(shR[5], shR[6], shR[7], shR[8]);
vec4 lightingAmbientSH_G2 = vec4(shG[5], shG[6], shG[7], shG[8]);
vec4 lightingAmbientSH_B2 = vec4(shB[5], shB[6], shB[7], shB[8]);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight;
}`),1!==a.pbrMode&&2!==a.pbrMode||e.code.add((0,n.H)`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance()
{
vec3 ambientLight = 1.2 * (0.282095 * vec3(shR[0], shG[0], shB[0])) - 0.2;
return ambientLight *= skyTransmittance;
}`)}},174886:(e,a,o)=>{o.d(a,{B:()=>g});var i=o(756223),r=o(723799),n=o(555936),l=o(587751),s=o(442039),c=o(252268),d=o(125320),u=o(865568),h=o(759520),m=o(593317),p=o(981014),f=o(962484);o(342471).Y;let v=(0,r.vt)();function g(e,a){let{hasModelTransformation:o,instancedDoublePrecision:r,instanced:s,output:g,hasVertexTangents:b}=a;o&&(e.vertex.uniforms.add(new p.X("model",e=>e.modelTransformation??n.zK)),e.vertex.uniforms.add(new m.k("normalLocalOriginFromModel",e=>((0,i.Ge)(v,e.modelTransformation??n.zK),v)))),s&&r&&(e.attributes.add("instanceModelOriginHi","vec3"),e.attributes.add("instanceModelOriginLo","vec3"),e.attributes.add("instanceModel","mat3"),e.attributes.add("instanceModelNormal","mat3"));let y=e.vertex;r&&(y.include(c.u),y.uniforms.add(new u.d("viewOriginHi",e=>(0,f.Zo)((0,l.hZ)(x,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),x)),new u.d("viewOriginLo",e=>(0,f.jA)((0,l.hZ)(x,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),x)))),y.code.add((0,h.H)`
    vec3 getVertexInLocalOriginSpace() {
      return ${o?r?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":r?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${r?(0,h.H)`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),y.code.add((0,h.H)`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${o?r?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":r?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),4===g&&((0,d.S7)(y),y.code.add((0,h.H)`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${o?r?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":r?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),b&&y.code.add((0,h.H)`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${o?r?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":r?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}let x=(0,s.vt)()},182315:(e,a,o)=>{o.d(a,{MU:()=>c,O1:()=>d,QM:()=>u,Sx:()=>s,q2:()=>l});var i=o(723799),r=o(759520),n=o(593317);function l(e,a){a.hasColorTextureTransform?(e.varyings.add("colorUV","vec2"),e.vertex.uniforms.add(new n.k("colorTextureTransformMatrix",e=>e.colorTextureTransformMatrix??i.zK)).code.add((0,r.H)`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add((0,r.H)`void forwardColorUV(){}`)}function s(e,a){a.hasNormalTextureTransform&&0!==a.textureCoordinateType?(e.varyings.add("normalUV","vec2"),e.vertex.uniforms.add(new n.k("normalTextureTransformMatrix",e=>e.normalTextureTransformMatrix??i.zK)).code.add((0,r.H)`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add((0,r.H)`void forwardNormalUV(){}`)}function c(e,a){a.hasEmissionTextureTransform&&0!==a.textureCoordinateType?(e.varyings.add("emissiveUV","vec2"),e.vertex.uniforms.add(new n.k("emissiveTextureTransformMatrix",e=>e.emissiveTextureTransformMatrix??i.zK)).code.add((0,r.H)`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add((0,r.H)`void forwardEmissiveUV(){}`)}function d(e,a){a.hasOcclusionTextureTransform&&0!==a.textureCoordinateType?(e.varyings.add("occlusionUV","vec2"),e.vertex.uniforms.add(new n.k("occlusionTextureTransformMatrix",e=>e.occlusionTextureTransformMatrix??i.zK)).code.add((0,r.H)`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add((0,r.H)`void forwardOcclusionUV(){}`)}function u(e,a){a.hasMetallicRoughnessTextureTransform&&0!==a.textureCoordinateType?(e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.uniforms.add(new n.k("metallicRoughnessTextureTransformMatrix",e=>e.metallicRoughnessTextureTransformMatrix??i.zK)).code.add((0,r.H)`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add((0,r.H)`void forwardMetallicRoughnessUV(){}`)}},183691:(e,a,o)=>{o.d(a,{R:()=>r});var i=o(759520);function r(e){e.code.add((0,i.H)`
    vec3 quantizeGlobalIlluminationColor(vec3 color) {
      vec3 clampedColor = clamp(color, vec3(0.0), vec3(1.0));
      return floor(clampedColor * ${i.H.float(255)} + 0.5) * ${i.H.float(.00392156862745098)};
    }
  `)}},186296:(e,a,o)=>{o.d(a,{_:()=>d});var i=o(217298),r=o(461651),n=o(79022),l=o(759520),s=o(168025),c=o(231596);function d(e,a){let o=a.pbrMode,d=e.fragment;if(2!==o&&0!==o&&1!==o)return void d.code.add((0,l.H)`void applyPBRFactors() {}`);if(0===o)return void d.code.add((0,l.H)`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(2===o)return void d.code.add((0,l.H)`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);let{hasMetallicRoughnessTexture:u,hasMetallicRoughnessTextureTransform:h,hasOcclusionTexture:m,hasOcclusionTextureTransform:p,bindType:f}=a;(u||m)&&e.include(i.r,a),d.code.add((0,l.H)`vec3 mrr;
float occlusion;`),u&&d.uniforms.add(1===f?new c.N("texMetallicRoughness",e=>e.textureMetallicRoughness):new s.o("texMetallicRoughness",e=>e.textureMetallicRoughness)),m&&d.uniforms.add(1===f?new c.N("texOcclusion",e=>e.textureOcclusion):new s.o("texOcclusion",e=>e.textureOcclusion)),d.uniforms.add(1===f?new n.t("mrrFactors",e=>e.mrrFactors):new r.W("mrrFactors",e=>e.mrrFactors)),d.code.add((0,l.H)`
    ${(0,l.If)(u,(0,l.H)`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${(0,l.If)(m,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${m?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${(0,l.If)(u,`applyMetallicRoughness(${h?"metallicRoughnessUV":"vuv0"});`)}
      ${(0,l.If)(m,`applyOcclusion(${p?"occlusionUV":"vuv0"});`)}
    }
  `)}(o(104599),o(342471)).Y},191470:(e,a,o)=>{o.d(a,{N:()=>r});var i=o(597728);class r extends i.n{constructor(e,a){super(e,"sampler2DShadow",0,(o,i)=>o.bindTexture(e,a(i)))}}},218368:(e,a,o)=>{o.d(a,{O:()=>d});var i=o(41781),r=o(398709),n=o(589195),l=o(759520),s=o(855272),c=o(666374);function d(e,a){let o=e.fragment;o.include(i.E),o.uniforms.add(new r.E("nearFar",e=>e.camera.nearFar),new c.x("depthMap",e=>e.depth?.attachment),new s.F("proj",e=>e.camera.projectionMatrix),new n.U("invResolutionHeight",e=>1/e.camera.height),new s.F("reprojectionMatrix",e=>e.reprojection.matrix)).code.add((0,l.H)`
  vec2 reprojectionCoordinate(vec3 projectionCoordinate) {
    vec4 clipDepthCoordinate = proj * vec4(0.0, 0.0, -projectionCoordinate.z, 1.0);
    vec4 reprojectedCoordinate = reprojectionMatrix * vec4(
      clipDepthCoordinate.w * (projectionCoordinate.xy * 2.0 - 1.0),
      clipDepthCoordinate.z,
      clipDepthCoordinate.w
    );
    reprojectedCoordinate.xy /= reprojectedCoordinate.w;
    return reprojectedCoordinate.xy * 0.5 + 0.5;
  }

  vec4 applyProjectionMat(mat4 projectionMat, vec3 viewPosition) {
    vec4 projectedCoordinate =  projectionMat * vec4(viewPosition, 1.0);
    projectedCoordinate.xy /= projectedCoordinate.w;
    projectedCoordinate.xy = projectedCoordinate.xy*0.5 + 0.5;
    return projectedCoordinate;
  }

  float rayMarchScreenReachFromWorldReach(vec3 startPosition, vec3 rayDirection, float rayMarchWorldReach) {
    float rayDistanceWorld = max(0.0, rayMarchWorldReach);

    // Stop rays towards camera at near plane
    if (rayDirection.z > 0.0) {
      float distanceToNearPlane = (-nearFar[0] - startPosition.z) / rayDirection.z;
      rayDistanceWorld = min(rayDistanceWorld, max(0.0, distanceToNearPlane));
    }

    vec2 projectedCoordStart = applyProjectionMat(proj, startPosition).xy;
    vec2 projectedCoordEnd = applyProjectionMat(proj, startPosition + rayDirection * rayDistanceWorld).xy;
    vec2 projectedCoordOffset = projectedCoordEnd - projectedCoordStart;

    return ${a.useProjectedRayLength?"length(projectedCoordOffset)":"abs(projectedCoordOffset.y)"};
  }

  vec3 screenSpaceIntersectionWithLimits(
    vec3 rayDirection,
    vec3 startPosition,
    vec3 viewDirection,
    vec3 normal,
    float rayStepOffset,
    float rayMarchMaxReach,
    float rayMarchMaxSteps
  ) {
    vec3 viewPosition = startPosition;

    // Project the start position to the screen
    vec4 projectedCoordStart = applyProjectionMat(proj, viewPosition);
    vec3 homogeneousStart = viewPosition / projectedCoordStart.w;
    float inverseWStart = 1.0 / projectedCoordStart.w;

    // Advance the position in the ray direction
    viewPosition += rayDirection;

    vec4 projectedCoordVanishingPoint = applyProjectionMat(proj, rayDirection);

    // Project the advanced position to the screen
    vec4 projectedCoordEnd = applyProjectionMat(proj, viewPosition);
    vec3  homogeneousEnd = viewPosition / projectedCoordEnd.w;
    float inverseWEnd = 1.0 / projectedCoordEnd.w;

    // Calculate the ray direction in screen space
    vec2 projectedCoordDirection = (projectedCoordEnd.xy - projectedCoordStart.xy);
    vec2 vanishingPointScreenOffset = (projectedCoordVanishingPoint.xy - projectedCoordStart.xy);

    float rayMarchDistance = ${a.useProjectedRayLength?"length(vanishingPointScreenOffset.xy)":"abs(vanishingPointScreenOffset.y)"};
    float clampedRayMarchDistance = min(rayMarchDistance, rayMarchMaxReach);

    float projectedCoordDirectionLength = length(projectedCoordDirection);

    // normalize the projection direction depending on maximum steps
    // this determines how blocky the ray march looks
    vec2 projectedStep = clampedRayMarchDistance * projectedCoordDirection / (rayMarchMaxSteps * projectedCoordDirectionLength);

    // Normalize the homogeneous camera space coordinates
    vec3 homogeneousStep = clampedRayMarchDistance * (homogeneousEnd - homogeneousStart) / (rayMarchMaxSteps * projectedCoordDirectionLength);
    float inverseWStep = clampedRayMarchDistance * (inverseWEnd - inverseWStart) / (rayMarchMaxSteps * projectedCoordDirectionLength);

    // initialize the variables for ray marching
    vec2 projectedPosition = projectedCoordStart.xy;
    vec3 homogeneousPosition = homogeneousStart;
    float inverseW = inverseWStart;
    float rayStartZ = -startPosition.z; // estimated ray start depth value
    float rayEndZ = -startPosition.z;   // estimated ray end depth value
    float previousEstimatedZ = -startPosition.z;
    float rayDepthDelta = 0.0;
    float estimatedDepthDifference;
    float sampledDepth;

    if (dot(normal, rayDirection) < 0.0 || dot(-viewDirection, normal) < 0.0) {
      return vec3(projectedPosition, 0.0);
    }

    float previousEstimatedDepthDifference = 0.0;

    projectedPosition = clamp(
      projectedPosition + rayStepOffset * projectedStep,
      vec2(0.0),
      vec2(0.999)
    );
    homogeneousPosition.z += rayStepOffset * homogeneousStep.z;
    inverseW += rayStepOffset * inverseWStep;

    int rayMarchMaxStepsInt = int(rayMarchMaxSteps);
    for(int stepIndex = 0; stepIndex < rayMarchMaxStepsInt - 1; ++stepIndex) {
      sampledDepth = -linearDepthFromTexture(depthMap, projectedPosition); // get linear depth from the depth buffer

      // Estimate depth of the marching ray
      rayStartZ = previousEstimatedZ;
      estimatedDepthDifference = -rayStartZ - sampledDepth;
      rayEndZ = (homogeneousStep.z * 0.5 + homogeneousPosition.z) / (inverseWStep * 0.5 + inverseW);
      rayDepthDelta = rayEndZ - rayStartZ;
      previousEstimatedZ = rayEndZ;

      if(-rayEndZ > nearFar[1] || -rayEndZ < nearFar[0] || projectedPosition.y < 0.0  || projectedPosition.y > 1.0 ) {
        return vec3(projectedPosition, 0.);
      }

      // If we detect a hit - return the intersection point, two conditions:
      //  - estimatedDepthDifference > 0.0 - sampled point depth is in front of estimated depth
      //  - if difference between estimatedDepthDifference and rayDepthDelta is not too large
      //  - if difference between estimatedDepthDifference and 0.025/abs(inverseW) is not too large
      //  - if the sampled depth is not behind far plane or in front of near plane

      if(estimatedDepthDifference < 0.025 / abs(inverseW) + abs(rayDepthDelta) &&
        estimatedDepthDifference > 0.0 &&
        sampledDepth > nearFar[0] &&
        sampledDepth < nearFar[1] &&
        abs(projectedPosition.y - projectedCoordStart.y) > invResolutionHeight) {
        float hitInterpolationWeight = estimatedDepthDifference / (estimatedDepthDifference - previousEstimatedDepthDifference);
        vec2 refinedProjectedPosition = mix(projectedPosition - projectedStep, projectedPosition, 1.0 - hitInterpolationWeight);
        if (abs(refinedProjectedPosition.y - projectedCoordStart.y) > invResolutionHeight) {
          return vec3(refinedProjectedPosition, sampledDepth);
        }
        else {
          return vec3(projectedPosition, sampledDepth);
        }
      }

      ${(0,l.If)(!a.clampRayToScreen,"if (projectedPosition.x <= 0.0  || projectedPosition.x >= 1.0) {\n        return vec3(projectedPosition, 0.0);\n      }")}

      // Continue with ray marching
      projectedPosition = projectedPosition + projectedStep;
      homogeneousPosition.z += homogeneousStep.z;
      inverseW += inverseWStep;
      previousEstimatedDepthDifference = estimatedDepthDifference;

      ${(0,l.If)(a.clampRayToScreen,"projectedPosition = clamp(projectedPosition, vec2(0.0), vec2(0.999));")}
    }
    return vec3(projectedPosition, 0.0);
  }

  vec3 screenSpaceIntersection(vec3 rayDirection, vec3 startPosition, vec3 viewDirection, vec3 normal, float rayStepOffset) {
    return screenSpaceIntersectionWithLimits(
      rayDirection,
      startPosition,
      viewDirection,
      normal,
      rayStepOffset,
      ${l.H.float(a.rayMarchMaxReach)},
      ${l.H.float(a.rayMarchMaxSteps)}
    );
  }
  `)}},256982:(e,a,o)=>{o.d(a,{w:()=>l});var i=o(990616),r=o(488705);class n extends r.K{constructor(){super(...arguments),this.receiveShadows=!0}}function l(e,a){return e.receiveShadows&&null!=a.shadowHighlight?.getTexture()}(0,i.Cg)([(0,r.W)()],n.prototype,"receiveShadows",void 0)},274730:(e,a,o)=>{o.d(a,{D:()=>V,b:()=>L});var i=o(423241),r=o(737198),n=o(230843),l=o(91584),s=o(614572),c=o(174886),d=o(218934),u=o(534481),h=o(316755),m=o(482359),p=o(592085),f=o(411977),v=o(916145),g=o(366189),x=o(818086),b=o(546447),y=o(889839),w=o(581826),M=o(568759),S=o(44924),C=o(186296),T=o(908047),I=o(182315),_=o(736280),D=o(508275),z=o(607691),F=o(125320),H=o(79022),P=o(671165),j=o(553457),W=o(759520),O=o(231596),R=o(827137),N=o(409609),G=o(546574),E=o(378836),B=o(823405);function L(e){let a=new E.N5,{attributes:o,vertex:L,fragment:V,varyings:A}=a,{output:U,normalType:k,offsetBackfaces:$,spherical:q,snowCover:Z,pbrMode:Y,textureAlphaPremultiplied:J,instancedDoublePrecision:K,hasVertexColors:X,hasVertexTangents:Q,hasColorTexture:ee,hasNormalTexture:et,hasNormalTextureTransform:ea,hasColorTextureTransform:eo}=e;if((0,F.NB)(L,e),o.add("position","vec3"),L.inputs.add("position",()=>"position"),A.add("vpos","vec3",{invariant:!0}),a.include(_.A,e),a.include(c.B,e),a.include(v.Ge,e),a.include(I.q2,e),!(0,r._o)(U))return a.include(g.E,e),a;a.include(I.Sx,e),a.include(I.MU,e),a.include(I.O1,e),a.include(I.QM,e),(0,F.yu)(L,e),a.include(u.Y,e),a.include(l.d);let ei=0===k||1===k;return ei&&$&&a.include(i.M),a.include(x.J,e),a.include(f.Mh,e),a.include(s.v,e),A.add("vPositionLocal","vec3"),a.include(m.U,e),a.include(h.K,e),a.include(p.c,e),L.uniforms.add(new P.E("externalColor",e=>e.externalColor,{supportsNaN:!0})),A.add("vcolorExt","vec4"),L.include(d.WD),L.include(d.oF),a.include(K?T.QH:T.LA,e),L.main.add((0,W.H)`
    forwardVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${(0,W.If)(ei,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${(0,W.If)(Q,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${(0,W.If)(ei&&$,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${W.H.int(N.Um.ignore)} && vcolorExt.a < ${W.H.float(B.Q)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),V.include(y.kA,e),V.include(b.n,e),a.include(D.S,e),V.include(n.HQ,e),a.include(G.D,e),(0,F.yu)(V,e),V.uniforms.add(L.uniforms.get("localOrigin"),new H.t("ambient",e=>e.ambient),new H.t("diffuse",e=>e.diffuse),new j.m("opacity",e=>e.opacity),new j.m("layerOpacity",e=>e.layerOpacity)),ee&&V.uniforms.add(new O.N("tex",e=>e.texture)),a.include(C._,e),V.include(S.c,e),V.include(z.N),a.include(M.r,e),V.include(R.b,e),(0,y.a8)(V),(0,y.eU)(V),(0,w.O4)(V),V.main.add((0,W.H)`
    discardBySlice(vpos);
    ${ee?(0,W.H)`
            vec4 texColor = texture(tex, ${eo?"colorUV":"vuv0"});
            ${(0,W.If)(J,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:(0,W.H)`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${2===k?(0,W.H)`vec3 normal = screenDerivativeNormal(vPositionLocal);`:(0,W.H)`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${(0,W.If)(X,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${(0,W.If)(X,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${et?`mat3 tangentSpace = computeTangentSpace(${Q?"normal":"normal, vpos, vuv0"});
           vec3 shadingNormal = computeTextureNormal(tangentSpace, ${ea?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${q?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${(0,W.If)(Z,(0,W.H)`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${1===Y||2===Y?(0,W.H)`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${(0,W.If)(Z,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:(0,W.H)`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${(0,W.If)(Z,", snow")});
  `),a}let V=Object.freeze(Object.defineProperty({__proto__:null,build:L},Symbol.toStringTag,{value:"Module"}))},280654:(e,a,o)=>{o.d(a,{Ui:()=>m,Qm:()=>f});var i=o(101521),r=o(667499),n=o(17218),l=o(892893),s=o(688998),c=o(741580);class d{constructor(e,a,o){this.elementSize=a.stride,this._buffer=new c.R(e,(0,s.U)(a,1)),this.resize(o)}destroy(){this._buffer.dispose()}get capacity(){return this._capacity}get array(){return this._array}get buffer(){return this._buffer}get usedMemory(){return this._array.byteLength+this._buffer.usedMemory}copyRange(e,a,o,i=0){let r=new Uint8Array(this.array,e*this.elementSize,(a-e)*this.elementSize);new Uint8Array(o.array,i*this.elementSize).set(r)}transferAll(){this._buffer.setData(this._array)}transferRange(e,a){let o=e*this.elementSize,i=a*this.elementSize;this._buffer.setSubData(new Uint8Array(this._array),o,o,i)}resize(e){let a=e*this.elementSize,o=new ArrayBuffer(a);this._array&&(e>=this._capacity?new Uint8Array(o).set(new Uint8Array(this._array)):new Uint8Array(o).set(new Uint8Array(this._array).subarray(0,e*this.elementSize))),this._array=o,this._buffer.setSize(a),this._capacity=e}}var u=o(707454);class h{constructor(e){this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelOriginHi=e.instanceModelOriginHi,this.modelOriginLo=e.instanceModelOriginLo,this.featureAttribute=e.getField("instanceFeatureAttribute",r.Eq),this.color=e.getField("instanceColor",r.XP),this.olidColor=e.getField("instanceOlidColor",r.XP)}}class m{constructor(e,a){this._rctx=e,this._layout=a,this._headIndex=0,this._tailIndex=0,this._firstIndex=null,this._captureFirstIndex=!0,this._updating=!1,this._prevHeadIndex=0,this._resized=!1,this._capacity=1}destroy(){this._buffer&&this._buffer.destroy()}get buffer(){return this._buffer.buffer}get view(){return this._view}get capacity(){return this._capacity}get size(){let e=this._headIndex,a=this._tailIndex;return e>=a?e-a:e+this._capacity-a}get isEmpty(){return this._headIndex===this._tailIndex}get isFull(){return this._tailIndex===(this._headIndex+1)%this._capacity}get headIndex(){return this._headIndex}get tailIndex(){return this._tailIndex}get firstIndex(){return this._firstIndex}get usedMemory(){return this._buffer?.usedMemory??0}reset(){this._headIndex=0,this._tailIndex=0,this._firstIndex=null}startUpdateCycle(){this._captureFirstIndex=!0}beginUpdate(){(0,l.vA)(!this._updating,"already updating"),this._updating=!0,this._prevHeadIndex=this._headIndex}endUpdate(){(0,l.vA)(this._updating,"not updating"),this.size<i.$U*this.capacity&&this._shrink(),this._resized?(this._buffer.transferAll(),this._resized=!1):this._transferRange(this._prevHeadIndex,this._headIndex),this._updating=!1}allocateHead(){(0,l.vA)(this._updating,"not updating"),this.isFull&&this._grow();let e=this.headIndex;return this._captureFirstIndex&&(this._firstIndex=e,this._captureFirstIndex=!1),this._incrementHead(),(0,l.vA)(this._headIndex!==this._tailIndex,"invalid pointers"),e}freeTail(){(0,l.vA)(this._updating,"not updating"),(0,l.vA)(this.size>0,"invalid size");let e=this._tailIndex===this._firstIndex;this._incrementTail(),e&&(this._firstIndex=this._tailIndex)}_grow(){let e=Math.max(u.h9,Math.floor(this._capacity*i.Ji));this._resize(e)}_shrink(){let e=Math.max(u.h9,Math.floor(this._capacity*i.He));this._resize(e)}_resize(e){if((0,l.vA)(this._updating,"not updating"),e===this._capacity)return;let a=new d(this._rctx,this._layout,e);if(this._buffer){this._firstIndex&&(this._firstIndex=(this._firstIndex+this._capacity-this._tailIndex)%this._capacity);let e=this.size,o=this._compactInstances(a);(0,l.vA)(o===e,"invalid compaction"),this._buffer.destroy(),this._tailIndex=0,this._headIndex=o,this._prevHeadIndex=0}this._resized=!0,this._capacity=e,this._buffer=a,this._view=new h(this._layout.createView(this._buffer.array))}_compactInstances(e){let a=this._headIndex,o=this._tailIndex;return o<a?(this._buffer.copyRange(o,a,e),a-o):o>a?(this._buffer.copyRange(o,this._capacity,e),a>0&&this._buffer.copyRange(0,a,e,this._capacity-o),a+(this._capacity-o)):0}_incrementHead(e=1){this._headIndex=(this._headIndex+e)%this._capacity}_incrementTail(e=1){this._tailIndex=(this._tailIndex+e)%this._capacity}_transferRange(e,a){e<a?this._buffer.transferRange(e,a):e>a&&(a>0&&this._buffer.transferRange(0,a),this._buffer.transferRange(e,this._capacity))}}let p=(0,n.BP)().vec3f("instanceModelOriginHi").vec3f("instanceModelOriginLo").mat3f("instanceModel").mat3f("instanceModelNormal");function f(e){return(0,u.BH)(p.clone(),e)}},293626:(e,a,o)=>{o.d(a,{VP:()=>h,iC:()=>p,Li:()=>m});var i=o(442039),r=o(913911),n=o(759520),l=o(117007),s=o(597728);class c extends s.n{constructor(e,a,o,i){super(e,"mat4",2,(o,r,n,l)=>o.setUniformMatrices4fv(e,a(r,n,l),i),o)}}var d=o(58571),u=o(342471);class h extends u.Y{constructor(){super(...arguments),this.origin=(0,i.vt)()}}function m(e){e.uniforms.add(new d.m("shadowMapMatrix",(e,a)=>a.shadowMap.getShadowMapMatrices(e.origin),4)),e.include(f)}function p(e){e.uniforms.add(new c("shadowMapMatrix",(e,a)=>a.shadowMap.getShadowMapMatrices(e.origin),4)),e.include(f)}function f(e){e.uniforms.add(new r.I("cascadeDistances",e=>e.shadowMap.cascadeDistances),new l.W("numCascades",e=>e.shadowMap.numCascades)),e.code.add(v)}let v=(0,n.H)`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 : _linearDepth < cascadeDistances[2] ? 1 : _linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
mat4 shadowMatrix = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
vec3 lvpos = lightSpacePosition(_worldPos, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`},315296:(e,a,o)=>{o.d(a,{V:()=>l});var i=o(41781),r=o(398709),n=o(759520);function l(e){e.include(i.E),e.uniforms.add(new r.E("zProjectionMapLastFrame",e=>(0,i.l)(e.reprojection.lastFrameCamera))),e.code.add((0,n.H)`float linearDepthFromTextureLastFrame(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv), zProjectionMapLastFrame);
}`)}},316755:(e,a,o)=>{o.d(a,{K:()=>s});var i=o(218934),r=o(759520),n=o(86613),l=o(409609);function s(e,a){e.varyings.add("colorMixMode","int"),e.varyings.add("opacityMixMode","int"),e.vertex.uniforms.add(new n.c("symbolColorMixMode",e=>l.Um[e.colorMixMode])),a.hasSymbolColors?(e.vertex.include(i.WD),e.vertex.include(i.Y1),e.vertex.include(i.ML),e.attributes.add("symbolColor","vec4"),e.vertex.code.add((0,r.H)`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${"symbolColor"}));
    }
  `)):e.vertex.code.add((0,r.H)`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),e.vertex.code.add((0,r.H)`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${r.H.int(l.Um.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${r.H.int(l.Um.ignore)} : symbolColorMixMode;
    }
  `)}},366189:(e,a,o)=>{o.d(a,{E:()=>x});var i=o(712833),r=o(230843),n=o(91584),l=o(534481),s=o(619363),c=o(482359),d=o(411977),u=o(494500),h=o(516784),m=o(736280),p=o(508275),f=o(125320),v=o(759520),g=o(231596);function x(e,a){let{vertex:o,fragment:x,varyings:b}=e,{hasColorTexture:y,alphaDiscardMode:w}=a,M=y&&1!==w,{output:S,normalType:C,hasColorTextureTransform:T}=a;switch(S){case 3:(0,f.NB)(o,a),e.include(n.d),x.include(r.HQ,a),e.include(c.U,a),M&&x.uniforms.add(new g.N("tex",e=>e.texture)),o.main.add((0,v.H)`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(p.S,a),x.main.add((0,v.H)`
        discardBySlice(vpos);
        ${(0,v.If)(M,(0,v.H)`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case 5:case 6:case 7:case 8:case 11:(0,f.NB)(o,a),e.include(n.d),e.include(c.U,a),e.include(m.A,a),e.include(u.L,a),x.include(r.HQ,a),e.include(s.g,a),(0,i.xJ)(e),b.add("depth","float",{invariant:!0}),M&&x.uniforms.add(new g.N("tex",e=>e.texture)),o.main.add((0,v.H)`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(p.S,a),x.main.add((0,v.H)`
        discardBySlice(vpos);
        ${(0,v.If)(M,(0,v.H)`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
               discardOrAdjustAlpha(texColor);`)}
        ${11===S?(0,v.H)`outputObjectAndLayerIdColor();`:(0,v.H)`outputDepth(depth);`}`);break;case 4:(0,f.NB)(o,a),e.include(n.d),e.include(l.Y,a),e.include(d.Mh,a),e.include(c.U,a),e.include(m.A,a),M&&x.uniforms.add(new g.N("tex",e=>e.texture)),2===C&&b.add("vPositionView","vec3",{invariant:!0}),o.main.add((0,v.H)`
        vpos = getVertexInLocalOriginSpace();
        ${0===C||1===C?(0,v.H)`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:(0,v.H)`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),x.include(r.HQ,a),e.include(p.S,a),x.main.add((0,v.H)`
        discardBySlice(vpos);
        ${(0,v.If)(M,(0,v.H)`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${2===C?(0,v.H)`vec3 normal = screenDerivativeNormal(vPositionView);`:(0,v.H)`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break;case 10:(0,f.NB)(o,a),e.include(n.d),e.include(c.U,a),e.include(m.A,a),M&&x.uniforms.add(new g.N("tex",e=>e.texture)),o.main.add((0,v.H)`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),x.include(r.HQ,a),e.include(p.S,a),e.include(h.Q,a),x.main.add((0,v.H)`
        discardBySlice(vpos);
        ${(0,v.If)(M,(0,v.H)`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}},411977:(e,a,o)=>{o.d(a,{Mh:()=>d,Zo:()=>u,gy:()=>h});var i=o(723799),r=o(332352),n=o(534481),l=o(600033),s=o(759520),c=o(593317);function d(e,a){let{vertex:o,varyings:i}=e;switch(a.normalType){case 0:case 1:e.include(n.Y,a),i.add("vNormalWorld","vec3"),i.add("vNormalView","vec3"),o.uniforms.add(new c.k("transformNormalViewFromGlobal",e=>e.transformNormalViewFromGlobal)),o.code.add((0,s.H)`void forwardNormal() {
vNormalWorld = normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case 2:e.vertex.code.add((0,s.H)`void forwardNormal() {}`);break;default:a.normalType;case 3:}}class u extends l.dO{constructor(){super(...arguments),this.transformNormalViewFromGlobal=(0,i.vt)()}}class h extends l.EM{constructor(){super(...arguments),this.toMapSpace=(0,r.vt)()}}},423241:(e,a,o)=>{o.d(a,{M:()=>r});var i=o(759520);function r(e){e.vertex.code.add((0,i.H)`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},424013:(e,a,o)=>{o.d(a,{n:()=>H,s:()=>F});var i=o(990616),r=o(15982),n=o(928185),l=o(935445),s=o(458954),c=o(678619),d=o(698532),u=o(512515),h=o(432476),m=o(952638),p=o(427560),f=o(288193),v=o(377147),g=o(112939),x=o(278477);let b=class extends v.w{constructor(){super(...arguments),this.shader=new f.r(g.S,()=>o.e(87904).then(o.bind(o,687904)))}initializePipeline(){return(0,x.Ey)({colorWrite:x.kn})}};b=(0,i.Cg)([(0,c.$K)("esri.views.3d.webgl-engine.effects.ssao.SSAOBlurTechnique")],b);var y=o(343994),w=o(342471);class M extends w.Y{constructor(){super(...arguments),this.projScale=1}}class S extends M{constructor(){super(...arguments),this.intensity=1}}class C extends w.Y{}class T extends C{constructor(){super(...arguments),this.blurSize=(0,y.vt)()}}let I=class extends v.w{constructor(){super(...arguments),this.shader=new f.r(p.S,()=>o.e(92831).then(o.bind(o,392831)))}initializePipeline(){return(0,x.Ey)({colorWrite:x.kn})}};I=(0,i.Cg)([(0,c.$K)("esri.views.3d.webgl-engine.effects.ssao.SSAOTechnique")],I);var _=o(556338),D=o(542231),z=o(705594);let F=2,H=class extends h.A{constructor(e){super(e),this.consumes={required:["normals"]},this.produces=u.OG.AMBIENT_ILLUMINATION,this._enableTime=(0,s.l5)(0),this._passParameters=new S,this._drawParameters=new T}initialize(){let e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),e=>e.charCodeAt(0)),a=new z.R(32);a.wrapMode=33071,a.pixelFormat=6407,a.wrapMode=10497,a.hasMipmap=!0,this._passParameters.noiseTexture=new D.A(this.renderingContext,a,e),this.addHandles((0,l.wB)(()=>this.view.stage.renderer.hasAmbientIllumination,()=>this._enableTime=(0,s.l5)(0)))}destroy(){this._passParameters.noiseTexture=(0,n.WD)(this._passParameters.noiseTexture)}render(e){let a=e.find(({name:e})=>"normals"===e),o=a?.getTexture(),i=a?.getTexture(_.nI);if(!o||!i)return;let n=this.techniques.getCompiled(I),l=this.techniques.getCompiled(b);if(!n||!l)return this._enableTime=(0,s.l5)(performance.now()),void this.requestRender(1);0===this._enableTime&&(this._enableTime=(0,s.l5)(performance.now()));let c=this.renderingContext,h=this.view.qualitySettings.fadeDuration,f=this.bindParameters,v=f.camera,g=v.relativeElevation,x=(0,r.qE)((m.b-g)/(m.b-m.O),0,1),y=h>0?Math.min(h,performance.now()-this._enableTime)/h:1;this._passParameters.normalTexture=o,this._passParameters.depthTexture=i,this._passParameters.projScale=1/v.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*P/(0,p.g)(v)**6*(y*x);let w=v.fullViewport[2],M=v.fullViewport[3],S=this.fboCache.acquire(w,M,"ssao input",2);c.bindFramebuffer(S.fbo),c.setViewport(0,0,w,M),c.bindTechnique(n,f,this._passParameters,this._drawParameters),c.screen.draw();let C=Math.round(w/F),T=Math.round(M/F),D=this.fboCache.acquire(C,T,"ssao blur",0);c.bindFramebuffer(D.fbo),this._drawParameters.colorTexture=S.getTexture(),(0,d.hZ)(this._drawParameters.blurSize,0,F/M),c.bindTechnique(l,f,this._passParameters,this._drawParameters),c.setViewport(0,0,C,T),c.screen.draw(),S.release();let z=this.fboCache.acquire(C,T,u.OG.AMBIENT_ILLUMINATION,0);return c.bindFramebuffer(z.fbo),c.setViewport(0,0,w,M),c.setClearColor(1,1,1,0),c.clear(16384),this._drawParameters.colorTexture=D.getTexture(),(0,d.hZ)(this._drawParameters.blurSize,F/w,0),c.bindTechnique(l,f,this._passParameters,this._drawParameters),c.setViewport(0,0,C,T),c.screen.draw(),c.setViewport4fv(v.fullViewport),D.release(),y<1&&this.requestRender(2),z}};(0,i.Cg)([(0,c.MZ)()],H.prototype,"consumes",void 0),(0,i.Cg)([(0,c.MZ)()],H.prototype,"produces",void 0),H=(0,i.Cg)([(0,c.$K)("esri.views.3d.webgl-engine.effects.ssao.SSAO")],H);let P=.5},427560:(e,a,o)=>{o.d(a,{S:()=>y,b:()=>g,g:()=>x});var i=o(698532),r=o(343994),n=o(620721),l=o(41781),s=o(229192),c=o(711424),d=o(398709),u=o(883107),h=o(589195),m=o(553457),p=o(759520),f=o(231596),v=o(378836);function g(){let e=new v.N5,a=e.fragment;return e.include(n.c),e.include(c.Ir),a.include(l.E),a.include(s.C),a.uniforms.add(new h.U("radius",e=>x(e.camera))).code.add((0,p.H)`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),a.code.add((0,p.H)`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),e.outputs.add("fragOcclusion","float"),a.uniforms.add(new f.N("normalMap",e=>e.normalTexture),new f.N("depthMap",e=>e.depthTexture),new m.m("projScale",e=>e.projScale),new f.N("rnm",e=>e.noiseTexture),new u.G("rnmScale",(e,a)=>(0,i.hZ)(b,a.camera.fullWidth/e.noiseTexture.descriptor.width,a.camera.fullHeight/e.noiseTexture.descriptor.height)),new m.m("intensity",e=>e.intensity),new d.E("screenSize",e=>(0,i.hZ)(b,e.camera.fullWidth,e.camera.fullHeight))).main.add((0,p.H)`
    float depth = depthFromTexture(depthMap, uv);

    // Early out if depth is out of range, such as in the sky
    if (depth >= 1.0 || depth <= 0.0) {
      fragOcclusion = 1.0;
      return;
    }

    // get the normal of current fragment
    ivec2 iuv = ivec2(uv * vec2(textureSize(normalMap, 0)));
    vec4 norm4 = texelFetch(normalMap, iuv, 0);
    if(norm4.a != 1.0) {
      fragOcclusion = 1.0;
      return;
    }
    vec3 norm = normalize(norm4.xyz * 2.0 - 1.0);

    float currentPixelDepth = linearizeDepth(depth);
    vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

    float sum = 0.0;
    vec3 tapPixelPos;

    vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

    // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
    // bug or deviation from CE somewhere else?
    float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

    for(int i = 0; i < ${p.H.int(16)}; ++i) {
      vec2 unitOffset = reflect(sphere[i], fres).xy;
      vec2 offset = vec2(-unitOffset * radius * ps);

      // don't use current or very nearby samples
      if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
        continue;
      }

      vec2 tc = vec2(gl_FragCoord.xy + offset);
      if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
      vec2 tcTap = tc / screenSize;
      float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

      tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

      sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
    }

    // output the result
    float A = max(1.0 - sum * intensity / float(${p.H.int(16)}), 0.0);

    // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
    A = (pow(A, 0.2) + 1.2 * pow(A, 4.0)) * INV_GAMMA;

    fragOcclusion = A;
  `),e}function x(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}let b=(0,r.vt)(),y=Object.freeze(Object.defineProperty({__proto__:null,build:g,getRadius:x},Symbol.toStringTag,{value:"Module"}))},458141:(e,a,o)=>{o.d(a,{G:()=>y,a:()=>S,b:()=>w});var i=o(343994),r=o(620721),n=o(41781),l=o(683496),s=o(711424),c=o(314009),d=o(239874),u=o(553457),h=o(759520),m=o(168025),p=o(231596),f=o(183691),v=o(760594),g=o(527498),x=o(342471),b=o(378836);class y extends x.Y{constructor(){super(...arguments),this.blurSize=(0,i.vt)()}}function w(){let e=new b.N5,a=e.fragment;return e.include(r.c),e.include(s.Ir),e.include(l.Q),a.include(n.E),a.include(v.t,M),a.include(f.R),a.uniforms.add(new c.o("hasEmission",e=>e.hasEmission),new p.N("depthMap",e=>e.depthTexture),new p.N("normalMap",e=>e.normalTexture),new m.o("globalIlluminationTexture",e=>e.texture),new m.o("globalIlluminationWeightTexture",e=>e.weightTexture),new d.t("blurSize",e=>e.blurSize),new u.m("scaleGlobalIllumination",e=>e.scaleGlobalIllumination),new u.m("projScale",(e,a)=>{let o=a.camera.distance;return o>5e4?Math.max(0,e.projScale-(o-5e4)):e.projScale})),a.code.add((0,h.H)`
    void accumulateBlurSample(
      vec2 sampleUv,
      float sampleOffset,
      float centerDepth,
      vec3 centerNormal,
      float depthSharpness,
      bool skipOcclusionBlur,
      inout float emissionWeightSum,
      inout vec3 emissionSum,
      inout float occlusionWeightSum,
      inout float occlusionSum,
      float centerOcclusionBlendWeight
    ) {
      vec4 sampleGlobalIllumination = texture(globalIlluminationTexture, sampleUv);
      vec3 sampleNormal = texture(normalMap, sampleUv).rgb;
      float sampleDepth = linearDepthFromTexture(depthMap, sampleUv);

      float depthDelta = sampleDepth - centerDepth;
      bool isScaledGlobalIllumination = scaleGlobalIllumination < 1.0;
      float normalSimilarityWeight = globalIlluminationNormalSimilarityWeight(sampleNormal, centerNormal);
      float depthNormalCorrection = globalIlluminationDepthNormalCorrection(sampleNormal);
      vec3 emission = sampleGlobalIllumination.rgb;
      float emissionSpatialWeightMultiplier = isScaledGlobalIllumination ? ${h.H.float(400)} : 1.0;

      float emissionWeight = exp(
        -sampleOffset * sampleOffset * ${h.H.float(1/24.5)} * ${h.H.float(.1)} * emissionSpatialWeightMultiplier
        - depthDelta * depthDelta * depthSharpness * depthNormalCorrection
      );
      emissionWeight *= normalSimilarityWeight;
      emissionWeightSum += emissionWeight;
      emissionSum += emissionWeight * emission;

      if (skipOcclusionBlur) {
        return;
      }

      float occlusionSpatialKernelScale = centerOcclusionBlendWeight > ${h.H.float(.03)}
        ? ${h.H.float(.08)}
        : ${h.H.float(1.5)};
      float occlusionWeight = exp(-sampleOffset * sampleOffset * occlusionSpatialKernelScale - depthDelta * depthDelta * depthSharpness);
      occlusionWeight *= normalSimilarityWeight;
      occlusionWeightSum += occlusionWeight;
      occlusionSum += occlusionWeight * sampleGlobalIllumination.a;
    }
  `),a.main.add((0,h.H)`
    vec3 emissionSum = vec3(0.0);
    float emissionWeightSum = 0.0;

    vec4 centerGlobalIllumination = texture(globalIlluminationTexture, uv);
    float centerOcclusionBlendWeight = texture(globalIlluminationWeightTexture, uv).r;
    bool isScaledGlobalIllumination = scaleGlobalIllumination < 1.0;
    bool shouldReuseCenterOcclusion = isScaledGlobalIllumination && centerOcclusionBlendWeight <= ${h.H.float(.03)};
    bool shouldSkipLowQualityBlur = !hasEmission && shouldReuseCenterOcclusion;
    if (shouldSkipLowQualityBlur) {
      fragColor = vec4(
        quantizeGlobalIlluminationColor(centerGlobalIllumination.rgb),
        centerGlobalIllumination.a
      );
      return;
    }

    float centerDepth = linearDepthFromTexture(depthMap, uv);
    vec3 centerNormal = texture(normalMap, uv).rgb;
    float occlusionSum = 0.0;
    float occlusionWeightSum = 0.0;

    float depthSharpness = globalIlluminationDepthSharpness(projScale, centerDepth);
    for (int sampleOffset = -${h.H.int(4)}; sampleOffset <= ${h.H.int(4)}; ++sampleOffset) {
      float sampleOffsetFloat = float(sampleOffset);
      vec2 sampleUv = uv + sampleOffsetFloat * blurSize;
      accumulateBlurSample(
        sampleUv,
        sampleOffsetFloat,
        centerDepth,
        centerNormal,
        depthSharpness,
        shouldReuseCenterOcclusion,
        emissionWeightSum,
        emissionSum,
        occlusionWeightSum,
        occlusionSum,
        centerOcclusionBlendWeight
      );
    }

    float occlusion = shouldReuseCenterOcclusion ? centerGlobalIllumination.a : occlusionSum / occlusionWeightSum;
    vec3 blurredEmission = (emissionSum / emissionWeightSum).rgb;

    // heuristic dithering of the colors to remove banding, color shifts and wrong color accumulation
    float dither = ditherNoise(vec4(blurredEmission, occlusion)) - 1./32768.0;
    blurredEmission += isScaledGlobalIllumination ? 0.85 * dither : dither;

    fragColor = vec4(quantizeGlobalIlluminationColor(blurredEmission), occlusion);
  `),e}let M=new g.Tt;M.useFloatBlend=!1;let S=Object.freeze(Object.defineProperty({__proto__:null,GlobalIlluminationBlurDrawParameters:y,build:w},Symbol.toStringTag,{value:"Module"}))},494500:(e,a,o)=>{o.d(a,{L:()=>r});var i=o(759520);function r(e,a){switch(a.output){case 5:case 6:case 7:case 8:e.fragment.code.add((0,i.H)`float _calculateFragDepth(const in float depth) {
const float slope_scale = 2.0;
const float bias = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + slope_scale * m + bias;
}
void outputDepth(float _linearDepth){
float fragDepth = _calculateFragDepth(_linearDepth);
gl_FragDepth = fragDepth;
}`);break;case 9:e.fragment.code.add((0,i.H)`void outputDepth(float _linearDepth){
gl_FragDepth = _linearDepth;
}`)}}},508275:(e,a,o)=>{o.d(a,{H:()=>s,S:()=>l});var i=o(983816),r=o(553457),n=o(748979);function l(e,a){c(e,a,new r.m("textureAlphaCutoff",e=>e.textureAlphaCutoff))}function s(e,a){c(e,a,new i.J("textureAlphaCutoff",e=>e.textureAlphaCutoff))}function c(e,a,o){let i=e.fragment;switch(i.code.add("void discardOrAdjustAlpha(inout vec4 color) {"),a.alphaDiscardMode){case 1:i.code.add("color.a = 1.0;");break;case 0:i.include(n.Q),i.code.add("if (color.a < alphaCutoff) discard;");break;case 3:i.uniforms.add(o).code.add("if (color.a < textureAlphaCutoff) discard;");break;case 2:i.uniforms.add(o).code.add("\n        if (color.a < textureAlphaCutoff) discard;\n        color.a = 1.0;\n      ");break;case 4:break;default:a.alphaDiscardMode}i.code.add("}")}},534481:(e,a,o)=>{o.d(a,{Y:()=>r});var i=o(759520);function r(e,a){switch(e.fragment.code.add((0,i.H)`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`),a.normalType){case 1:e.attributes.add("normalCompressed","vec2"),e.vertex.code.add((0,i.H)`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:e.attributes.add("normal","vec3"),e.vertex.code.add((0,i.H)`vec3 normalModel() {
return normal;
}`);break;default:a.normalType;case 2:case 3:}}},541017:(e,a,o)=>{o.d(a,{$U:()=>S});var i=o(587751),r=o(442039),n=o(737198),l=o(95016),s=o(264368),c=o(925775),d=o(607037),u=o(662258),h=o(94072),m=o(409609),p=o(588496),f=o(940822),v=o(990616),g=o(678619),x=o(288193),b=o(703610);let y=class extends p.R5{constructor(){super(...arguments),this.shader=new x.r(b.R,()=>o.e(96712).then(o.bind(o,196712)))}};y=(0,v.Cg)([(0,g.$K)("esri.views.3d.webgl-engine.shaders.RealisticTreeTechnique")],y);var w=o(256982),M=o(823405);class S extends s.i{constructor(e,a){super(e,T),this.materialType="default",this.supportsEdges=!0,this.intersectDraped=void 0,this.produces=new Map([[2,e=>(0,n.uw)(e)&&!this.transparent],[4,e=>(0,n.uw)(e)&&this.transparent&&this.parameters.writeDepth],[8,e=>(0,n.uw)(e)&&this.transparent&&!this.parameters.writeDepth]]),this._layout=(0,p.bP)(this.parameters),this._configuration=new f.n(a.spherical)}isVisibleForOutput(e){return 5!==e&&7!==e&&6!==e||this.parameters.castShadows}get visible(){let{layerOpacity:e,colorMixMode:a,opacity:o,externalColor:i}=this.parameters;return e*("replace"===a?1:o)*("ignore"===a||isNaN(i[3])?1:i[3])>=M.Q}get _hasEmissiveBase(){return!!this.parameters.emissiveTextureId||!(0,i.t2)(this.parameters.emissiveBaseColor,r.uY)}get emissions(){return this.parameters.emissiveStrength>0&&(0===this.parameters.emissiveSource&&this._hasEmissiveBase||1===this.parameters.emissiveSource)?this.transparent?2:1:0}updateConfiguration(e){super.updateConfiguration(e);let{parameters:a,_configuration:o}=this;o.hasNormalTexture=a.hasNormalTexture,o.hasColorTexture=a.hasColorTexture,o.hasMetallicRoughnessTexture=a.hasMetallicRoughnessTexture,o.hasOcclusionTexture=a.hasOcclusionTexture;let{treeRendering:i,doubleSided:r,doubleSidedType:l}=a;o.hasVertexTangents=!i&&a.hasVertexTangents,o.instanced=a.instanced,o.instancedDoublePrecision=a.instancedDoublePrecision,o.hasVVColor=!!a.vvColor,o.hasVVSize=!!a.vvSize,o.hasVerticalOffset=null!=a.verticalOffset,o.hasScreenSizePerspective=null!=a.screenSizePerspective,o.hasSlicePlane=a.hasSlicePlane,o.alphaDiscardMode=a.textureAlphaMode,o.normalType=i?0:a.normalType,o.transparent=this.transparent,o.enableOITOffset=e.enableOITOffset,o.writeDepth=a.writeDepth,o.customDepthTest=a.customDepthTest??0,o.hasOccludees=e.hasOccludees,o.cullFace=a.hasSlicePlane?0:a.cullFace,o.hasModelTransformation=!i&&null!=a.modelTransformation,o.hasVertexColors=a.hasVertexColors,o.hasSymbolColors=a.hasSymbolColors,o.doubleSidedMode=i?2:r&&"normal"===l?1:r&&"winding-order"===l?2:0,o.instancedFeatureAttribute=a.instancedFeatureAttribute,o.instancedColor=a.instancedColor,(0,n._o)(e.output)?(o.receiveShadows=a.receiveShadows,o.hasShadowHighlights=(0,w.w)(o,e),o.receiveAmbientOcclusion=a.receiveAmbientOcclusion&&null!=e.ssao,o.receiveGlobalIllumination=a.receiveAmbientOcclusion&&e.globalIlluminationEnabled):o.receiveShadows=o.hasShadowHighlights=o.receiveAmbientOcclusion=!1,o.textureAlphaPremultiplied=!!a.textureAlphaPremultiplied,o.pbrMode=a.usePBR?a.isSchematic?2:1:0,o.emissionSource=a.emissionSource,o.offsetBackfaces=!(!this.transparent||!a.offsetTransparentBackfaces),o.snowCover=e.snowCover>0,o.hasColorTextureTransform=!!a.colorTextureTransformMatrix,o.hasNormalTextureTransform=!!a.normalTextureTransformMatrix,o.hasEmissionTextureTransform=!!a.emissiveTextureTransformMatrix,o.hasOcclusionTextureTransform=!!a.occlusionTextureTransformMatrix,o.hasMetallicRoughnessTextureTransform=!!a.metallicRoughnessTextureTransformMatrix}intersect(e,a,o,r,n,l){if(null!=this.parameters.verticalOffset){let e=o.camera;(0,i.hZ)(H,a[12],a[13],a[14]);let l=null;switch(o.viewingMode){case 1:l=(0,i.S8)(z,H);break;case 2:l=(0,i.C)(z,D)}let s=(0,i.Re)(P,H,e.eye),c=(0,i.Bw)(s),d=(0,i.hs)(s,s,1/c),u=null;this.parameters.screenSizePerspective&&(u=(0,i.Om)(l,d));let h=(0,m.kE)(e,c,this.parameters.verticalOffset,u??0,this.parameters.screenSizePerspective,null);(0,i.hs)(l,l,h),(0,i.ei)(F,l,o.transform.inverseRotation),r=(0,i.Re)(I,r,F),n=(0,i.Re)(_,n,F)}l=(0,h.b)(l,this._configuration,r,n),(0,c.Uy)(e,o,r,n,(0,d.ou)(o.verticalOffset),l)}createGLMaterial(e){return new C(e)}createBufferWriter(){return new u.Z(this._layout)}get transparent(){return function(e){let{drivenOpacity:a,opacity:o,externalColor:i,layerOpacity:r,texture:n,textureId:l,textureAlphaMode:s,colorMixMode:c}=e,d=i[3];return a||o<1&&"replace"!==c||d<1&&"ignore"!==c||r<1||(null!=n||null!=l)&&1!==s&&2!==s&&"replace"!==c}(this.parameters)}}class C extends l.m8{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){this._material.setParameters({receiveShadows:e.shadowMap.enabled});let a=this._material.parameters;this.updateTexture(a.textureId);let o=e.camera.viewInverseTransposeMatrix;return(0,i.hZ)(a.origin,o[3],o[7],o[11]),this._material.setParameters(this.textureBindParameters),this.getTechnique(a.treeRendering?y:p.R5,e)}}class T extends p.uD{constructor(){super(...arguments),this.treeRendering=!1,this.useIndexing=!1,this.hasVertexTangents=!1}get hasNormalTexture(){return!this.treeRendering&&!!this.normalTextureId}get hasColorTexture(){return!!this.textureId}get hasMetallicRoughnessTexture(){return!this.treeRendering&&!!this.metallicRoughnessTextureId}get hasOcclusionTexture(){return!this.treeRendering&&!!this.occlusionTextureId}get emissiveStrength(){return this.emissiveStrengthFromSymbol*this.emissiveStrengthKHR}get emissionSource(){return null!=this.emissiveTextureId&&0===this.emissiveSource?3:0===this.emissiveSource?2:1}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||3===this.emissionSource||this.hasOcclusionTexture}}let I=(0,r.vt)(),_=(0,r.vt)(),D=(0,r.fA)(0,0,1),z=(0,r.vt)(),F=(0,r.vt)(),H=(0,r.vt)(),P=(0,r.vt)()},546447:(e,a,o)=>{o.d(a,{n:()=>l});var i=o(759520),r=o(666374),n=o(424013);function l(e,a){a.receiveAmbientOcclusion?(e.uniforms.add(new r.x("ssaoTex",e=>e.ssao?.getTexture())),e.constants.add("blurSizePixelsInverse","float",1/n.s),e.code.add((0,i.H)`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):e.code.add((0,i.H)`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}},568759:(e,a,o)=>{o.d(a,{r:()=>r});var i=o(759520);function r(e,a){let o=e.fragment;switch(o.code.add((0,i.H)`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),a.doubleSidedMode){case 0:o.code.add((0,i.H)`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case 1:o.code.add((0,i.H)`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case 2:o.code.add((0,i.H)`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:a.doubleSidedMode;case 3:}}},581826:(e,a,o)=>{o.d(a,{Gc:()=>n,O4:()=>l,Vt:()=>s});var i=o(865568),r=o(759520);function n(e){e.uniforms.add(new i.d("mainLightDirection",e=>e.lighting.mainLight.direction))}function l(e){e.uniforms.add(new i.d("mainLightIntensity",e=>e.lighting.mainLight.intensity))}function s(e){n(e),l(e),e.code.add((0,r.H)`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}},588496:(e,a,o)=>{o.d(a,{Au:()=>T,R5:()=>C,V:()=>S,bP:()=>I,uD:()=>M});var i=o(990616),r=o(678619),n=o(442039),l=o(332352),s=o(688998),c=o(17218),d=o(411977),u=o(288193),h=o(377147),m=o(878166),p=o(338237),f=o(415824),v=o(280654),g=o(104599),x=o(366255),b=o(274730),y=o(278477),w=o(823405);class M extends d.Zo{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=g.mb,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=2,this.instanced=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.instanceColorEncodesAlphaIgnore=!1,this.emissiveStrengthFromSymbol=0,this.emissiveStrengthKHR=1,this.emissiveSource=1,this.emissiveBaseColor=n.uY,this.instancedDoublePrecision=!1,this.normalType=0,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.ambient=(0,n.CN)(.2,.2,.2),this.diffuse=(0,n.CN)(.8,.8,.8),this.externalColor=(0,l.fA)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,n.vt)(),this.hasSlicePlane=!1,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.modelTransformation=null,this.drivenOpacity=!1,this.writeDepth=!0,this.customDepthTest=0,this.textureAlphaMode=0,this.textureAlphaCutoff=w.Q,this.textureAlphaPremultiplied=!1,this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.isDecoration=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class S extends d.gy{constructor(){super(...arguments),this.origin=(0,n.vt)(),this.slicePlaneLocalOrigin=this.origin}}let C=class extends h.w{constructor(e,a){let i=(0,s.U)(I(a));a.instanced&&a.instancedDoublePrecision&&(i=i.concat((0,s.U)((0,v.Qm)(a)))),super(e,a,i),this.shader=new u.r(b.D,()=>o.e(78096).then(o.bind(o,578096))),this.ignoreUnused=!0}_makePipeline(e,a){let{output:o,transparent:i,cullFace:r,customDepthTest:n,hasOccludees:l}=e;return(0,y.Ey)({blending:i?(0,p.Yf)(o,!1,e.emissionDimmingPass):null,culling:T(e)?(0,y.Xt)(r):null,depthTest:(0,p.mt)(o,function(e){switch(e){case 1:return 515;case 0:case 3:return 513;case 2:return 516}}(n)),depthWrite:(0,p.z5)(e),colorWrite:y.kn,stencilWrite:l?f.v0:null,stencilTest:l?a?f.Ax:f.cP:null,polygonOffset:(0,x.s)(e)})}initializePipeline(e){return this._occludeePipelineState=this._makePipeline(e,!0),this._makePipeline(e,!1)}getPipeline(e,a,o){return o?this._occludeePipelineState:super.getPipeline(e,a,o)}};function T(e){return 0!==e.cullFace||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}function I(e){let a=(0,c.BP)().vec3f("position");return 1===e.normalType?a.vec2i16("normalCompressed",{glNormalized:!0}):a.vec3f("normal"),e.hasVertexTangents&&a.vec4f("tangent"),e.hasTextures&&a.vec2f16("uv0"),e.hasVertexColors&&a.vec4u8("color",{glNormalized:!0}),e.hasSymbolColors&&a.vec4u8("symbolColor"),!e.instanced&&(0,m.E)()&&a.vec4u8("olidColor"),a}C=(0,i.Cg)([(0,r.$K)("esri.views.3d.webgl-engine.shaders.DefaultMaterialTechnique")],C)},614572:(e,a,o)=>{o.d(a,{v:()=>n});var i=o(218934),r=o(759520);function n(e,a){a.instancedColor?(e.attributes.add("instanceColor","vec4"),e.vertex.include(i.WD),e.vertex.include(i.Y1),e.vertex.include(i.ML),e.vertex.code.add((0,r.H)`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${"instanceColor"}));
      }
    `)):e.vertex.code.add((0,r.H)`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}},683496:(e,a,o)=>{o.d(a,{Q:()=>r});var i=o(759520);function r(e){e.fragment.code.add((0,i.H)`
    float globalIlluminationNormalSimilarityWeight(vec3 sampleNormal, vec3 centerNormal) {
      return clamp(1.0 - ${i.H.float(15.3)} * length(sampleNormal - centerNormal), 0.0, 1.0);
    }

    float globalIlluminationDepthNormalCorrection(vec3 encodedNormal) {
      vec3 decodedNormal = normalize(encodedNormal * 2.0 - 1.0);
      return pow(max((1.0 - abs(decodedNormal.x)) * (1.0 - abs(decodedNormal.y)), 0.01), ${i.H.float(5)});
    }

    float globalIlluminationDepthSharpness(float projScale, float depth) {
      return ${i.H.float(-.05)} * projScale / depth;
    }

    float globalIlluminationDepthSharpness(float projScale, float depth, vec3 encodedNormal) {
      return globalIlluminationDepthSharpness(projScale, depth) * globalIlluminationDepthNormalCorrection(encodedNormal);
    }
  `)}},703610:(e,a,o)=>{o.d(a,{R:()=>E,b:()=>G});var i=o(423241),r=o(737198),n=o(230843),l=o(91584),s=o(614572),c=o(174886),d=o(218934),u=o(534481),h=o(316755),m=o(482359),p=o(592085),f=o(916145),v=o(366189),g=o(546447),x=o(889839),b=o(581826),y=o(44924),w=o(186296),M=o(908047),S=o(182315),C=o(736280),T=o(508275),I=o(607691),_=o(125320),D=o(79022),z=o(671165),F=o(553457),H=o(759520),P=o(231596),j=o(827137),W=o(409609),O=o(748979),R=o(546574),N=o(378836);function G(e){let a=new N.N5,{attributes:o,vertex:G,fragment:E,varyings:B}=a,{output:L,offsetBackfaces:V,pbrMode:A,snowCover:U,spherical:k}=e;if((0,_.NB)(G,e),o.add("position","vec3"),G.inputs.add("position",()=>"position"),B.add("vpos","vec3",{invariant:!0}),a.include(C.A,e),a.include(c.B,e),a.include(f.Ge,e),a.include(S.q2,e),!(0,r._o)(L))return a.include(v.E,e),a;a.include(S.MU,e),(0,_.yu)(a.vertex,e),a.include(u.Y,e),a.include(l.d),V&&a.include(i.M),B.add("vNormalWorld","vec3"),B.add("localvpos","vec3",{invariant:!0}),a.include(m.U,e),a.include(h.K,e),a.include(s.v,e),a.include(p.c,e),G.include(d.WD),G.include(d.oF),G.uniforms.add(new z.E("externalColor",e=>e.externalColor,{supportsNaN:!0})),B.add("vcolorExt","vec4"),a.include(e.instancedDoublePrecision?M.QH:M.LA,e),G.include(O.Q),G.main.add((0,H.H)`
    forwardVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${H.H.int(W.Um.ignore)} && vcolorExt.a < alphaCutoff;
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardTextureCoordinates();
    forwardColorUV();
    forwardEmissiveUV();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${(0,H.If)(V,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
  `);let{hasColorTexture:$,hasColorTextureTransform:q}=e;return E.include(x.kA,e),E.include(g.n,e),a.include(T.S,e),E.include(n.HQ,e),a.include(R.D,e),(0,_.yu)(E,e),(0,b.Gc)(E),(0,x.a8)(E),(0,x.eU)(E),E.uniforms.add(G.uniforms.get("localOrigin"),G.uniforms.get("view"),new D.t("ambient",e=>e.ambient),new D.t("diffuse",e=>e.diffuse),new F.m("opacity",e=>e.opacity),new F.m("layerOpacity",e=>e.layerOpacity)),$&&E.uniforms.add(new P.N("tex",e=>e.texture)),a.include(w._,e),E.include(y.c,e),E.include(I.N),E.include(j.b,e),(0,b.O4)(E),E.main.add((0,H.H)`
      discardBySlice(vpos);
      vec4 texColor = ${$?`texture(tex, ${q?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${(0,H.If)($,`${(0,H.If)(e.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}
        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${e.hasVertexColors?(0,H.H)`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:(0,H.H)`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${k?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};

      ${(0,H.If)(U,"vec3 faceNormal = screenDerivativeNormal(vpos);\n         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);\n         albedo = mix(albedo, vec3(1), snow);")}

      ${(0,H.H)`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${1===A||2===A?(0,H.H)`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${(0,H.If)(U,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:(0,H.H)`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${(0,H.If)(U,", 1.0")});`),a}let E=Object.freeze(Object.defineProperty({__proto__:null,build:G},Symbol.toStringTag,{value:"Module"}))},707454:(e,a,o)=>{o.d(a,{BH:()=>S,e7:()=>w,h9:()=>D});var i=o(990616),r=o(195887),n=o(101521),l=o(871052),s=o(678619),c=o(756223),d=o(723799),u=o(126842),h=o(555936),m=o(587751),p=o(442039),f=o(667499),v=o(477113),g=o(17218),x=o(878166),b=o(892893);class y{constructor(e){this.localTransform=e.localTransform,this.globalTransform=e.globalTransform,this.modelOrigin=e.modelOrigin,this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelScaleFactors=e.modelScaleFactors,this.boundingSphere=e.boundingSphere,this.featureAttribute=e.getField("instanceFeatureAttribute",f.Eq),this.color=e.getField("instanceColor",f.XP),this.olidColor=e.getField("instanceOlidColor",f.XP),this.state=e.getField("state",f.SL),this.lodLevel=e.getField("lodLevel",f.SL)}}let w=class extends r.A{constructor(e,a){super(e),this.events=new l.bk,this._capacity=0,this._size=0,this._next=0,this._highlightOptionsMap=new Map,this._highlightOptionsMapPrev=new Map,this._layout=function(e){return S(M.clone(),e).u8("state").u8("lodLevel")}(a),this._capacity=D,this._buffer=this._layout.createBuffer(this._capacity),this._view=new y(this._buffer)}get capacity(){return this._capacity}get size(){return this._size}get view(){return this._view}addInstance(){this._size+1>this._capacity&&this._grow();let e=this._findSlot();return this._view.state.set(e,1),this._size++,this.events.emit("instances-changed"),e}removeInstance(e){let a=this._view.state;(0,b.vA)(e>=0&&e<this._capacity&&!!(1&a.get(e)),"invalid instance handle"),this._getStateFlag(e,18)?this._setStateFlags(e,32):this.freeInstance(e),this.events.emit("instances-changed")}freeInstance(e){let a=this._view.state;(0,b.vA)(e>=0&&e<this._capacity&&!!(1&a.get(e)),"invalid instance handle"),a.set(e,0),this._size--}setLocalTransform(e,a,o=!0){this._view.localTransform.setMat(e,a),o&&this.updateModelTransform(e)}getLocalTransform(e,a){this._view.localTransform.getMat(e,a)}setGlobalTransform(e,a,o=!0){this._view.globalTransform.setMat(e,a),o&&this.updateModelTransform(e)}getGlobalTransform(e,a){this._view.globalTransform.getMat(e,a)}updateModelTransform(e){let a=this._view;a.localTransform.getMat(e,I),a.globalTransform.getMat(e,_);let o=(0,u.lw)(_,_,I);(0,m.hZ)(C,o[12],o[13],o[14]),a.modelOrigin.setVec(e,C),(0,c.z0)(T,o),a.model.setMat(e,T);let i=(0,v.wp)(C,o);i.sort(),a.modelScaleFactors.set(e,0,i[1]),a.modelScaleFactors.set(e,1,i[2]),(0,c.B8)(T,T),(0,c.mg)(T,T),a.modelNormal.setMat(e,T),this._setStateFlags(e,64),this.events.emit("instance-transform-changed",{index:e})}getModelTransform(e,a){let o=this._view;o.model.getMat(e,T),o.modelOrigin.getVec(e,C),a[0]=T[0],a[1]=T[1],a[2]=T[2],a[3]=0,a[4]=T[3],a[5]=T[4],a[6]=T[5],a[7]=0,a[8]=T[6],a[9]=T[7],a[10]=T[8],a[11]=0,a[12]=C[0],a[13]=C[1],a[14]=C[2],a[15]=1}applyShaderTransformation(e,a){null!=this.shaderTransformation&&this.shaderTransformation.applyTransform(this,e,a)}getCombinedModelTransform(e,a){return this.getModelTransform(e,a),null!=this.shaderTransformation&&this.shaderTransformation.applyTransform(this,e,a),a}getCombinedLocalTransform(e,a){this._view.localTransform.getMat(e,a),null!=this.shaderTransformation&&this.shaderTransformation.applyTransform(this,e,a)}getCombinedMaxScaleFactor(e){let a=this._view.modelScaleFactors.get(e,1);return null!=this.shaderTransformation&&(this.shaderTransformation.scaleFactor(C,this,e),a*=Math.max(C[0],C[1],C[2])),a}getCombinedMedianScaleFactor(e){var a,o;let i=this._view.modelScaleFactors.get(e,0);return null!=this.shaderTransformation&&(this.shaderTransformation.scaleFactor(C,this,e),i*=(a=C[0],o=C[1],Math.max(Math.min(a,o),Math.min(Math.max(a,o),C[2])))),i}getModel(e,a){this._view.model.getMat(e,a)}setFeatureAttribute(e,a){this._view.featureAttribute?.setVec(e,a)}getFeatureAttribute(e,a){this._view.featureAttribute?.getVec(e,a)}setColor(e,a){this._view.color?.setVec(e,a)}setObjectAndLayerIdColor(e,a){this._view.olidColor?.setVec(e,a)}setVisible(e,a){a!==this.getVisible(e)&&(this._setStateFlag(e,4,a),this.events.emit("instance-visibility-changed",{index:e}))}getVisible(e){return this._getStateFlag(e,4)}setHighlight(e,a){let{_highlightOptionsMap:o}=this,i=o.get(e);a?a!==i&&(o.set(e,a),this._setStateFlag(e,8,!0),this.events.emit("instance-highlight-changed")):i&&(o.delete(e),this._setStateFlag(e,8,!1),this.events.emit("instance-highlight-changed"))}get highlightOptionsMap(){return this._highlightOptionsMap}getHighlightStateFlag(e){return this._getStateFlag(e,8)}geHighlightOptionsPrev(e){let a=this._highlightOptionsMapPrev.get(e)??null;return this._highlightOptionsMapPrev.delete(e),a}getHighlightName(e){let a=this.highlightOptionsMap.get(e)??null;return a?this._highlightOptionsMapPrev.set(e,a):this._highlightOptionsMapPrev.delete(e),a}getState(e){return this._view.state.get(e)}getLodLevel(e){return this._view.lodLevel.get(e)}countFlags(e){let a=0;for(let o=0;o<this._capacity;++o)this.getState(o)&e&&++a;return a}_setStateFlags(e,a){let o=this._view.state;a=o.get(e)|a,o.set(e,a)}_clearStateFlags(e,a){let o=this._view.state;a=o.get(e)&~a,o.set(e,a)}_setStateFlag(e,a,o){o?this._setStateFlags(e,a):this._clearStateFlags(e,a)}_getStateFlag(e,a){return!!(this._view.state.get(e)&a)}_grow(){this._capacity=Math.max(D,Math.floor(this._capacity*n.Ji)),this._buffer=this._layout.createBuffer(this._capacity).copyFrom(this._buffer),this._view=new y(this._buffer)}_findSlot(){let e=this._view.state,a=this._next;for(;1&e.get(a);)a=a+1===this._capacity?0:a+1;return this._next=a+1===this._capacity?0:a+1,a}};(0,i.Cg)([(0,s.MZ)({constructOnly:!0})],w.prototype,"shaderTransformation",void 0),(0,i.Cg)([(0,s.MZ)()],w.prototype,"_size",void 0),(0,i.Cg)([(0,s.MZ)({readOnly:!0})],w.prototype,"size",null),w=(0,i.Cg)([(0,s.$K)("esri.views.3d.webgl-engine.lib.lodRendering.InstanceData")],w);let M=(0,g.BP)().mat4f64("localTransform").mat4f64("globalTransform").vec4f64("boundingSphere").vec3f64("modelOrigin").mat3f("instanceModel").mat3f("instanceModelNormal").vec2f("modelScaleFactors");function S(e,a){return a.instancedFeatureAttribute&&e.vec4f("instanceFeatureAttribute"),a.instancedColor&&e.vec4u8("instanceColor"),(0,x.E)()&&e.vec4u8("instanceOlidColor"),e}let C=(0,p.vt)(),T=(0,d.vt)(),I=(0,h.vt)(),_=(0,h.vt)(),D=64},731197:(e,a,o)=>{o.d(a,{t:()=>r});var i=o(759520);function r(e){e.code.add((0,i.H)`float readShadowMapUVZ(vec3 uvzShadow, sampler2DShadow _shadowMap) {
return texture(_shadowMap, uvzShadow);
}`)}},770193:(e,a,o)=>{o.d(a,{G:()=>f,a:()=>g,b:()=>v});var i=o(620721),r=o(41781),n=o(683496),l=o(711424),s=o(553457),c=o(759520),d=o(168025),u=o(231596),h=o(183691),m=o(342471),p=o(378836);class f extends m.Y{}function v(){let e=new p.N5,a=e.fragment;return e.include(i.c),e.include(l.Ir),e.include(n.Q),a.include(r.E),a.include(h.R),a.uniforms.add(new u.N("depthMap",e=>e.depthTexture),new u.N("normalMap",e=>e.normalTexture),new d.o("tex",e=>e.colorTexture),new d.o("globalIlluminationWeightTexture",e=>e.weightTexture),new s.m("projScale",(e,a)=>{let o=a.camera.distance;return o>5e4?Math.max(0,e.projScale-(o-5e4)):e.projScale})),a.code.add((0,c.H)`
    float computeDepthWeight(float sampleDepth, float centerDepth, float depthSharpness) {
      float depthDelta = abs(sampleDepth - centerDepth);
      return exp(-0.08 - depthDelta * depthDelta * depthSharpness);
    }

    vec3 normalFromTexture(sampler2D normalTexture, vec2 uv) {
      ivec2 normalTextureSize = textureSize(normalTexture, 0);
      ivec2 normalTexel = clamp(ivec2(uv * vec2(normalTextureSize)), ivec2(0), normalTextureSize - ivec2(1));
      return texelFetch(normalTexture, normalTexel, 0).xyz;
    }

    void sampleJointBilateralUpscale(vec2 sampleUv, out vec4 upscaledColor, out float upscaledWeight) {
      float centerDepth = linearDepthFromTexture(depthMap, sampleUv);
      vec3 centerNormal = normalFromTexture(normalMap, sampleUv);
      float depthSharpness = ${c.H.float(100)} * globalIlluminationDepthSharpness(projScale, centerDepth, centerNormal);

      vec2 lowResTextureSize = vec2(textureSize(tex, 0));
      vec2 texelPosition = sampleUv * lowResTextureSize - 0.5;
      vec2 texelBase = floor(texelPosition);
      vec2 bilinearWeightsFraction = fract(texelPosition);

      vec2 uv00 = (texelBase + vec2(0.5, 0.5)) / lowResTextureSize;
      vec2 uv10 = (texelBase + vec2(1.5, 0.5)) / lowResTextureSize;
      vec2 uv01 = (texelBase + vec2(0.5, 1.5)) / lowResTextureSize;
      vec2 uv11 = (texelBase + vec2(1.5, 1.5)) / lowResTextureSize;

      vec4 color00 = texture(tex, uv00);
      vec4 color10 = texture(tex, uv10);
      vec4 color01 = texture(tex, uv01);
      vec4 color11 = texture(tex, uv11);
      float weight00 = texture(globalIlluminationWeightTexture, uv00).r;
      float weight10 = texture(globalIlluminationWeightTexture, uv10).r;
      float weight01 = texture(globalIlluminationWeightTexture, uv01).r;
      float weight11 = texture(globalIlluminationWeightTexture, uv11).r;

      float depth00 = linearDepthFromTexture(depthMap, uv00);
      float depth10 = linearDepthFromTexture(depthMap, uv10);
      float depth01 = linearDepthFromTexture(depthMap, uv01);
      float depth11 = linearDepthFromTexture(depthMap, uv11);

      vec3 normal00 = normalFromTexture(normalMap, uv00);
      vec3 normal10 = normalFromTexture(normalMap, uv10);
      vec3 normal01 = normalFromTexture(normalMap, uv01);
      vec3 normal11 = normalFromTexture(normalMap, uv11);

      float bilinearWeight00 = (1.0 - bilinearWeightsFraction.x) * (1.0 - bilinearWeightsFraction.y);
      float bilinearWeight10 = bilinearWeightsFraction.x * (1.0 - bilinearWeightsFraction.y);
      float bilinearWeight01 = (1.0 - bilinearWeightsFraction.x) * bilinearWeightsFraction.y;
      float bilinearWeight11 = bilinearWeightsFraction.x * bilinearWeightsFraction.y;

      float jointBilateralWeight00 = bilinearWeight00 * computeDepthWeight(depth00, centerDepth, depthSharpness) * globalIlluminationNormalSimilarityWeight(normal00, centerNormal);
      float jointBilateralWeight10 = bilinearWeight10 * computeDepthWeight(depth10, centerDepth, depthSharpness) * globalIlluminationNormalSimilarityWeight(normal10, centerNormal);
      float jointBilateralWeight01 = bilinearWeight01 * computeDepthWeight(depth01, centerDepth, depthSharpness) * globalIlluminationNormalSimilarityWeight(normal01, centerNormal);
      float jointBilateralWeight11 = bilinearWeight11 * computeDepthWeight(depth11, centerDepth, depthSharpness) * globalIlluminationNormalSimilarityWeight(normal11, centerNormal);
      float jointBilateralWeightSum = jointBilateralWeight00 + jointBilateralWeight10 + jointBilateralWeight01 + jointBilateralWeight11;

      if (jointBilateralWeightSum < 0.0001) {
        // Fall back to the nearest low-resolution texel when all bilateral weights collapse.
        vec2 nearestUv = (floor(texelPosition + 0.5) + vec2(0.5)) / lowResTextureSize;
        upscaledColor = texture(tex, nearestUv);
        upscaledWeight = texture(globalIlluminationWeightTexture, nearestUv).r;
        return;
      }

      upscaledColor = (
        color00 * jointBilateralWeight00 +
        color10 * jointBilateralWeight10 +
        color01 * jointBilateralWeight01 +
        color11 * jointBilateralWeight11
      ) / jointBilateralWeightSum;

      upscaledWeight = (
        weight00 * jointBilateralWeight00 +
        weight10 * jointBilateralWeight10 +
        weight01 * jointBilateralWeight01 +
        weight11 * jointBilateralWeight11
      ) / jointBilateralWeightSum;
    }
  `),e.outputs.add("fragColor","vec4",0),e.outputs.add("fragWeight","float",1),a.main.add((0,c.H)`sampleJointBilateralUpscale(uv, fragColor, fragWeight);
fragColor.rgb = quantizeGlobalIlluminationColor(fragColor.rgb);`),e}let g=Object.freeze(Object.defineProperty({__proto__:null,GlobalIlluminationUpscaleDrawParameters:f,build:v},Symbol.toStringTag,{value:"Module"}))},818086:(e,a,o)=>{o.d(a,{J:()=>m,o:()=>p});var i=o(723799),r=o(343994),n=o(217298),l=o(239874),s=o(883107),c=o(759520),d=o(593317),u=o(168025),h=o(231596);function m(e,a){return f(e,a)}function p(e,a){return f(e,a)}function f(e,a){let o=e.fragment,{hasVertexTangents:m,doubleSidedMode:p,hasNormalTexture:f,textureCoordinateType:v,bindType:g,hasNormalTextureTransform:x}=a;m?(e.attributes.add("tangent","vec4"),e.varyings.add("vTangent","vec4"),2===p?o.code.add((0,c.H)`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):o.code.add((0,c.H)`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):o.code.add((0,c.H)`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),f&&0!==v&&(e.include(n.r,a),o.uniforms.add(1===g?new h.N("normalTexture",e=>e.textureNormal):new u.o("normalTexture",e=>e.textureNormal)),x&&(o.uniforms.add(1===g?new s.G("scale",e=>e.scale??r.Un):new l.t("scale",e=>e.scale??r.Un)),o.uniforms.add(new d.k("normalTextureTransformMatrix",e=>e.normalTextureTransformMatrix??i.zK))),o.code.add((0,c.H)`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),x&&o.code.add((0,c.H)`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),o.code.add((0,c.H)`return tangentSpace * rawNormal;
}`))}},827137:(e,a,o)=>{o.d(a,{b:()=>n});var i=o(589195),r=o(759520);function n(e,a){a.snowCover&&(e.uniforms.add(new i.U("snowCover",e=>e.snowCover)).code.add((0,r.H)`float getSnow(vec3 normal, vec3 groundNormal) {
return smoothstep(0.5, 0.55, dot(normal, groundNormal)) * snowCover;
}
float getRealisticTreeSnow(vec3 faceNormal, vec3 shadingNormal, vec3 groundNormal) {
float snow = min(1.0, smoothstep(0.5, 0.55, dot(faceNormal, groundNormal)) +
smoothstep(0.5, 0.55, dot(-faceNormal, groundNormal)) +
smoothstep(0.0, 0.1, dot(shadingNormal, groundNormal)));
return snow * snowCover;
}`),e.code.add((0,r.H)`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}`))}},841419:(e,a,o)=>{o.d(a,{Z:()=>C,s:()=>S});var i=o(990616),r=o(928185),n=o(935445),l=o(678619),s=o(698532),c=o(512515),d=o(432476),u=o(843138),h=o(458141),m=o(288193),p=o(377147),f=o(278477);let v=class extends p.w{constructor(){super(...arguments),this.shader=new m.r(h.a,()=>o.e(32056).then(o.bind(o,632056)))}initializePipeline(){return(0,f.Ey)({colorWrite:f.kn})}};v=(0,i.Cg)([(0,l.$K)("esri.views.3d.webgl-engine.effects.globalIllumination.GlobalIlluminationBlurTechnique")],v);let g=class extends p.w{constructor(){super(...arguments),this.shader=new m.r(u.a,()=>o.e(13223).then(o.bind(o,913223)))}initializePipeline(){return(0,f.Ey)({colorWrite:f.kn})}};g=(0,i.Cg)([(0,l.$K)("esri.views.3d.webgl-engine.effects.globalIllumination.GlobalIlluminationTechnique")],g);var x=o(488705);class b extends x.K{constructor(){super(...arguments),this.hasColor=!0,this.hasEmission=!1,this.rayMarchMaxReach=u.d,this.rayMarchMaxSteps=u.b,this.useProjectedRayLength=!0,this.clampRayToScreen=!1}}(0,i.Cg)([(0,x.W)()],b.prototype,"hasColor",void 0),(0,i.Cg)([(0,x.W)()],b.prototype,"hasEmission",void 0);var y=o(770193);let w=class extends p.w{constructor(){super(...arguments),this.shader=new m.r(y.a,()=>o.e(68082).then(o.bind(o,68082)))}initializePipeline(){return(0,f.Ey)({colorWrite:f.kn})}};w=(0,i.Cg)([(0,l.$K)("esri.views.3d.webgl-engine.effects.globalIllumination.GlobalIlluminationUpscaleTechnique")],w);var M=o(556338);let S=1,C=class extends d.A{constructor(e){super(e),this.consumes={required:["normals"]},this.produces=c.OG.AMBIENT_ILLUMINATION,this._passParameters=new u.G,this._drawParameters=new h.G,this._drawParametersUpscale=new y.G,this._maxFrames=256,this._lowQualityResolutionScale=.25,this._configuration=new b,this._globalIllumination=null,this._isGlobalIlluminationUpdate=!1,this._resetBuffer=!1}initialize(){this.addHandles((0,n.wB)(()=>this.view.stage.renderer.hasGlobalIllumination,()=>{this._resetAccumulatedFrames(),this._requestRender()},n.pc))}destroy(){this._globalIllumination=(0,r.Gz)(this._globalIllumination)}resetAccumulatedFrames(){this._isGlobalIlluminationUpdate||this._resetAccumulatedFrames()}render(e){if(this._passParameters.accumulatedFrames>=this._maxFrames)return this._globalIllumination?.retain(),this._globalIllumination;let a=e.find(({name:e})=>"normals"===e),o=a?.getTexture(),i=a?.getTexture(M.nI),r=this._mode;if(!o||!i)return this._emptyOutput;if(0===r)return this._resetBuffer=!1,this._emptyOutput;if(!this._canRender)return this._resetBuffer=!1,this._requestRender(),this._emptyOutput;let n=this.bindParameters;this._configuration.hasEmission=!!n.reprojection.lastFrameEmission;let l=this.techniques.getCompiled(g,this._configuration),d=this.techniques.getCompiled(v),u=1===r,h=u?this._lowQualityResolutionScale:1,m=u?this.techniques.getCompiled(w):null;if(!l||!d||u&&!m)return this._requestRender(),this._emptyOutput;let p=this.renderingContext,{camera:f}=n;this._passParameters.normalTexture=o,this._passParameters.depthTexture=i,this._passParameters.projScale=1/f.computeScreenPixelSizeAtDist(1),this._passParameters.scaleGlobalIllumination=h;let{fullWidth:x,fullHeight:b}=f,y=Math.max(1,Math.floor(x*h)),C=Math.max(1,Math.floor(b*h)),T=this.fboCache.acquire(y,C,"global illumination input").acquireColor(M.yI,0);p.bindFramebuffer(T.fbo),p.setViewport(0,0,y,C),p.bindTechnique(l,n,this._passParameters,this._drawParameters),p.screen.draw();let I=T.obtainAttachment(M.yI),_=Math.max(1,Math.round(y/S)),D=Math.max(1,Math.round(C/S)),z=this.fboCache.acquire(_,D,"global illumination blur horizontal");p.bindFramebuffer(z.fbo),this._drawParameters.texture=T.getTexture(),this._drawParameters.weightTexture=I.attachment,(0,s.hZ)(this._drawParameters.blurSize,0,S/C),p.bindTechnique(d,n,this._passParameters,this._drawParameters),p.setViewport(0,0,_,D),p.screen.draw(),T.release();let F=u?"global illumination blur vertical":c.OG.AMBIENT_ILLUMINATION,H=this.fboCache.acquire(_,D,F);p.bindFramebuffer(H.fbo),p.setViewport(0,0,_,D),p.setClearColor(1,1,1,0),p.clear(16384),this._drawParameters.texture=z.getTexture(),this._drawParameters.weightTexture=I.attachment,(0,s.hZ)(this._drawParameters.blurSize,S/_,0),p.bindTechnique(d,n,this._passParameters,this._drawParameters),p.setViewport(0,0,_,D),p.screen.draw(),z.release(),H.attachColor(I,M.yI),I.release();let P=H;return m&&(P=this.fboCache.acquire(x,b,c.OG.AMBIENT_ILLUMINATION).acquireColor(M.yI,0),p.bindFramebuffer(P.fbo),p.setViewport(0,0,x,b),p.setClearColor(1,1,1,0),p.clear(16384),this._drawParametersUpscale.colorTexture=H.getTexture(),this._drawParametersUpscale.weightTexture=H.getTexture(M.yI),p.bindTechnique(m,n,this._passParameters,this._drawParametersUpscale),p.screen.draw(),H.release()),p.setViewport4fv(f.fullViewport),this._passParameters.temporalSampleFrame=(this._passParameters.temporalSampleFrame+1)%64,++this._passParameters.accumulatedFrames,this._cacheGlobalIllumination(P),this._passParameters.accumulatedFrames<this._maxFrames&&this._requestRender(),P}_requestRender(){this._isGlobalIlluminationUpdate=!0,this.requestRender(1),this._isGlobalIlluminationUpdate=!1}_cacheGlobalIllumination(e){this._globalIllumination!==e&&(this._globalIllumination=(0,r.Gz)(this._globalIllumination),this._globalIllumination=e,this._globalIllumination.retain())}get _emptyOutput(){let e=this.renderingContext,{fullWidth:a,fullHeight:o}=this.bindParameters.camera,i=this.fboCache.acquire(a,o,c.OG.AMBIENT_ILLUMINATION).acquireColor(M.yI,0);return e.bindFramebuffer(i.fbo),e.setViewport(0,0,a,o),e.clearBuffer(0,[0,0,0,1]),e.clearBuffer(1,[0,0,0,0]),i}get _canRender(){let{reprojection:e,hasEmission:a,globalIllumination:o}=this.bindParameters;return!(!e.lastFrameColor||a&&!e.lastFrameEmission||!e.lastFrameDepth||!o||this._resetBuffer)}get _mode(){let{hasGlobalIlluminationHighQuality:e,hasGlobalIllumination:a}=this.view.stage.renderer;return e?2:+!!a}_resetAccumulatedFrames(){this._passParameters.accumulatedFrames=0,this._globalIllumination=(0,r.Gz)(this._globalIllumination)}get test(){let e=this;return{passParameters:this._passParameters,configuration:this._configuration,get maxFrames(){return e._maxFrames},set maxFrames(t){e._maxFrames=t},get lowQualityResolutionScale(){return e._lowQualityResolutionScale},set lowQualityResolutionScale(t){e._lowQualityResolutionScale=t},get mode(){return e._mode},restartAccumulation:()=>{this._resetAccumulatedFrames(),this._passParameters.temporalSampleFrame=0,this._resetBuffer=!0,this._requestRender()}}}};(0,i.Cg)([(0,l.MZ)()],C.prototype,"consumes",void 0),(0,i.Cg)([(0,l.MZ)()],C.prototype,"produces",void 0),C=(0,i.Cg)([(0,l.$K)("esri.views.3d.webgl-engine.effects.globalIllumination.GlobalIllumination")],C)},843138:(e,a,o)=>{o.d(a,{G:()=>I,a:()=>D,b:()=>T,c:()=>_,d:()=>M,e:()=>b,f:()=>C,g:()=>w,h:()=>S,i:()=>y});var i=o(620721),r=o(315296),n=o(229192),l=o(581826),s=o(218368),c=o(711424),d=o(553457),u=o(759520),h=o(855272),m=o(666374),p=o(231596),f=o(183691),v=o(556338),g=o(342471),x=o(378836);let b=.15,y=25,w=.15,M=.5,S=1,C=1,T=16;class I extends g.Y{constructor(){super(...arguments),this.projScale=1,this.scaleGlobalIllumination=1,this.accumulatedFrames=0,this.temporalSampleFrame=0,this.rayMarchMinReach=w,this.rayMarchMaxReach=M,this.rayMarchWorldReach=y,this.rayMarchMinReachEmissionWeight=S,this.rayMarchMaxReachEmissionWeight=C,this.rayMarchMaxSteps=T,this.colorBleedWeight=b}}function _(e){let a=new x.N5,o=a.fragment;return a.include(i.c),a.include(c.Ir),(0,l.Gc)(o),o.include(r.V),o.include(n.C),o.include(f.R),a.include(s.O,e),o.uniforms.add(new p.N("normalMap",e=>e.normalTexture),new p.N("depthMap",e=>e.depthTexture),new m.x("lastFrameColorTexture",e=>e.reprojection.lastFrameColor?.getTexture()),new m.x("lastFrameDepthTexture",e=>e.reprojection.lastFrameDepth?.attachment),new m.x("lastFrameGlobalIlluminationTexture",e=>e.globalIllumination?.getTexture()),new m.x("lastFrameGlobalIlluminationWeightTexture",e=>e.globalIllumination?.getTexture(v.yI)),new h.F("reprojectionViewMatrix",e=>e.reprojection.viewMatrix),new h.F("view",e=>e.camera.viewMatrix),new d.m("accumulatedFrames",e=>e.accumulatedFrames),new d.m("temporalSampleFrame",e=>e.temporalSampleFrame),new d.m("scaleGlobalIllumination",e=>e.scaleGlobalIllumination)),o.uniforms.add(new d.m("rayMarchMinReach",e=>e.rayMarchMinReach),new d.m("rayMarchMaxReach",e=>e.rayMarchMaxReach),new d.m("rayMarchWorldReach",e=>e.rayMarchWorldReach),new d.m("rayMarchMinReachEmissionWeight",e=>e.rayMarchMinReachEmissionWeight),new d.m("rayMarchMaxReachEmissionWeight",e=>e.rayMarchMaxReachEmissionWeight),new d.m("rayMarchMaxSteps",e=>e.rayMarchMaxSteps),new d.m("colorBleedWeight",e=>e.colorBleedWeight)),e.hasEmission&&o.uniforms.add(new m.x("lastFrameEmissionTexture",e=>e.reprojection.lastFrameEmission?.attachment)),o.code.add((0,u.H)`
    float computeIdleColorBlendWeight(float accumulatedFrames) {
      float idleColorBlendProgress = clamp(
        accumulatedFrames / ${u.H.float(40)},
        0.0,
        1.0
      );
      return mix(
        ${u.H.float(.012)},
        ${u.H.float(.008)},
        idleColorBlendProgress
      );
    }

    float computeIdleOcclusionBlendWeight(float accumulatedFrames) {
      float idleOcclusionBlendProgress = clamp(
        accumulatedFrames / ${u.H.float(60)},
        0.0,
        1.0
      );
      return mix(
        ${u.H.float(.095)},
        ${u.H.float(.008)},
        pow(idleOcclusionBlendProgress, ${u.H.float(2)})
      );
    }

    bool isEdgeDepth(float centerDepth, vec2 sampleUv) {
      vec2 texelSize = 1.0 / vec2(textureSize(depthMap, 0));
      float depthLeft = linearizeDepth(depthFromTexture(depthMap, sampleUv + vec2(-texelSize.x, 0.0)));
      float depthRight = linearizeDepth(depthFromTexture(depthMap, sampleUv + vec2(texelSize.x, 0.0)));
      float depthUp = linearizeDepth(depthFromTexture(depthMap, sampleUv + vec2(0.0, texelSize.y)));
      float depthDown = linearizeDepth(depthFromTexture(depthMap, sampleUv + vec2(0.0, -texelSize.y)));

      float maxDifference = max(max(abs(centerDepth - depthLeft), abs(centerDepth - depthRight)), max(abs(centerDepth - depthUp), abs(centerDepth - depthDown)));

      return abs(maxDifference / centerDepth) > 0.01;
    }

    vec3 sampleCosineHemisphere(vec2 u) {
      float phi = 6.28318530718 * u.x;
      float radius = sqrt(u.y);
      float x = radius * cos(phi);
      float y = radius * sin(phi);
      float z = sqrt(max(0.0, 1.0 - u.y));

      return vec3(x, y, z);
    }

    mat3 basisFromNormal(vec3 n) {
      vec3 up = abs(n.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
      vec3 tangent = normalize(cross(up, n));
      vec3 bitangent = cross(n, tangent);

      return mat3(tangent, bitangent, n);
    }

    float blueNoiseDitherValue(vec2 pixel, float frame, vec2 axis, float phase) {
      float scroll = 5.588238 * mod(frame, 512.0);
      vec2 p = pixel + vec2(scroll);
      vec2 rotated = vec2(
        axis.x * p.x + axis.y * p.y,
        -axis.y * p.x + axis.x * p.y
      );

      return fract(52.9829189 * fract(0.06711056 * rotated.x + 0.00583715 * rotated.y + phase));
    }

    vec4 blueNoiseDither(vec2 pixel, float frame) {
      vec4 value = vec4(
        blueNoiseDitherValue(pixel, frame, vec2(0.9659258, 0.25881904), 0.0),
        blueNoiseDitherValue(pixel, frame, vec2(0.70710677, 0.70710677), 0.17),
        blueNoiseDitherValue(pixel, frame, vec2(0.25881904, 0.9659258), 0.37),
        blueNoiseDitherValue(pixel, frame, vec2(1.0, 0.0), 0.61)
      );

      return value * 2.0 - 1.0;
    }
  `),a.outputs.add("fragGlobalIllumination","vec4",0),a.outputs.add("fragWeight","float",1),o.main.add((0,u.H)`
    float depth = depthFromTexture(depthMap, uv);

    // Early out if depth is out of range, such as in the sky
    if (depth >= 1.0 || depth <= 0.0) {
      fragGlobalIllumination = vec4(0.0, 0.0, 0.0, 1.0);
      fragWeight = 0.0;
      return;
    }

    // Get the normal of current fragment
    ivec2 iuv = ivec2(uv * vec2(textureSize(normalMap, 0)));
    vec4 normal4 = texelFetch(normalMap, iuv, 0);
    if (normal4.a != 1.0) {
      fragGlobalIllumination = vec4(0.0, 0.0, 0.0, 1.0);
      fragWeight = 0.0;
      return;
    }
    vec3 normal = normalize(normal4.xyz * 2.0 - 1.0);

    // Reconstruct view space position of current fragment
    float currentPixelDepth = linearizeDepth(depth);
    vec3 currentPixelPos = reconstructPosition(uv * vec2(textureSize(normalMap, 0)), currentPixelDepth);
    vec4 viewPos = vec4(currentPixelPos, 1.0);

    // Reproject current view position to last frame
    vec4 reprojectedViewPos = reprojectionViewMatrix * viewPos;
    vec4 reprojectedCoordinate = applyProjectionMat(proj, reprojectedViewPos.xyz);

    // Read last frame reprojected depth and GI history
    float lastFrameDepthViewPos = -linearDepthFromTextureLastFrame(lastFrameDepthTexture, reprojectedCoordinate.xy);
    vec4 lastFrameGlobalIllumination = texture(lastFrameGlobalIlluminationTexture, reprojectedCoordinate.xy);
    float historyOcclusionBlendWeight = texture(lastFrameGlobalIlluminationWeightTexture, reprojectedCoordinate.xy).r;

    int steps;
    float occlusionBlendWeight = 1.0;
    float colorBlendWeight = 1.0;
    float idleColorBlendWeight = computeIdleColorBlendWeight(accumulatedFrames);
    float idleOcclusionBlendWeight = computeIdleOcclusionBlendWeight(accumulatedFrames);
    float reprojectionDepthMismatch = abs((lastFrameDepthViewPos + reprojectedViewPos.z) / max(lastFrameDepthViewPos, reprojectedViewPos.z));
    bool hasReprojectionMismatch = reprojectionDepthMismatch > ${u.H.float(.01)};
    bool isScaledGlobalIllumination = scaleGlobalIllumination < 1.0;
    bool isLowQualityEdgePixel = isScaledGlobalIllumination && isEdgeDepth(currentPixelDepth, uv);
    bool resetColorHistory = false;

    // Heuristic to determine blending weights and number of steps for occlusion and color
    if (hasReprojectionMismatch) {
      if (isLowQualityEdgePixel) {
        steps = 1;
        occlusionBlendWeight = ${u.H.float(.008)};
        resetColorHistory = true;
      } else {
        steps = 6;
        occlusionBlendWeight = 1.0;
        resetColorHistory = true;
      }
    } else {
      steps = 1;
      if (historyOcclusionBlendWeight > ${u.H.float(.5)}) {
        occlusionBlendWeight = ${u.H.float(.1)};
        colorBlendWeight = ${u.H.float(.008)};
      } else if (historyOcclusionBlendWeight > ${u.H.float(.02)}) {
        occlusionBlendWeight = historyOcclusionBlendWeight - 0.05;
        colorBlendWeight = ${u.H.float(.008)};
      } else {
        occlusionBlendWeight = isScaledGlobalIllumination ? ${u.H.float(.008)} : idleOcclusionBlendWeight;
        colorBlendWeight = isScaledGlobalIllumination ? ${u.H.float(.002)} : idleColorBlendWeight;
      }
    }

    vec4 randomDirectionSample;
    mat3 normalBasis = basisFromNormal(normal);
    int temporalSampleStride = min(64 / steps, 6);
    float temporalFrameOffset = mod(temporalSampleFrame, float(64 / steps));

    // For each ray determine if it hits geometry and accumulate occlusion or color
    float stepSize = 1.0 / float(steps);
    for (int i = 0; i < steps; ++i) {
      float sampleIndex = float(i * temporalSampleStride + int(temporalFrameOffset));
      randomDirectionSample = blueNoiseDither(floor(gl_FragCoord.xy), sampleIndex);
      vec2 hemisphereSample = randomDirectionSample.rg * 0.5 + 0.5;
      float offsetSample = randomDirectionSample.a * 0.5 + 0.5;
      vec3 rayDirection = normalBasis * sampleCosineHemisphere(hemisphereSample);
      float rayMarchScreenReach = rayMarchScreenReachFromWorldReach(viewPos.xyz, rayDirection, rayMarchWorldReach);
      rayMarchScreenReach = clamp(rayMarchScreenReach, rayMarchMinReach, rayMarchMaxReach);
      vec3 hit = screenSpaceIntersectionWithLimits(
        rayDirection,
        viewPos.xyz,
        normalize(viewPos.xyz),
        normal,
        offsetSample,
        rayMarchScreenReach,
        rayMarchMaxSteps
      );

      if (hit.z > 0.0) {
        ${(0,u.If)(e.hasColor,(0,u.H)`
          // Emission and color bleed - Reproject the current receiver and sampled hit to estimate bounced color
          vec3 receiverColor = texture(lastFrameColorTexture, reprojectedCoordinate.xy).rgb;

          vec2 hitReprojectedCoordinate = reprojectionCoordinate(hit);
          vec3 sourceColor = texture(lastFrameColorTexture, hitReprojectedCoordinate).rgb;
          vec3 sourceColorLinear = linearizeGamma(sourceColor);
          vec3 sourceEmission = ${(0,u.If)(e.hasEmission,"texture(lastFrameEmissionTexture, hitReprojectedCoordinate).xyz","vec3(0.0)")};

          float emissionWeight = mix(
            rayMarchMinReachEmissionWeight,
            rayMarchMaxReachEmissionWeight,
            (rayMarchScreenReach - rayMarchMinReach) / max(rayMarchMaxReach - rayMarchMinReach, 0.00001)
          );
          fragGlobalIllumination.rgb += ((sourceColorLinear * colorBleedWeight) + sourceEmission * emissionWeight) * stepSize;
          `)}
      } else {
        // Occlusion - heuristic modulating sky intensity based on angle to main light
        vec4 viewMainLightDirection = view * vec4(mainLightDirection, 0.0);
        float skyModulation = pow(max(dot(rayDirection, viewMainLightDirection.xyz), 0.0), 3.0) * 5.5;
        float skyFacingWeight = clamp(3.5 * dot(viewMainLightDirection.xyz, normal), 0.0, 1.0);
        skyModulation = mix(1.0, skyModulation * 0.2 + 0.8, skyFacingWeight);
        fragGlobalIllumination.a += skyModulation * stepSize;
      }
    }

    // Rendering trick add noise to reduce accumulation artifacts
    float accumulationDither = occlusionBlendWeight < 1.0
      ? randomDirectionSample.b * ${u.H.float(.0039)}
      : 0.0;

    ${(0,u.If)(e.hasColor,(0,u.H)`
      // Accumulate color
      vec3 lastFrameColor = lastFrameGlobalIllumination.rgb;
      float colorDitherScale = isScaledGlobalIllumination ? ${u.H.float(.25)} : 1.0;
      fragGlobalIllumination.rgb = resetColorHistory
        ? vec3(0.0)
        : mix(lastFrameColor + accumulationDither * colorDitherScale, fragGlobalIllumination.rgb, colorBlendWeight);
      `,(0,u.H)`
      fragGlobalIllumination.rgb = vec3(0.0);
      `)}
    fragGlobalIllumination.rgb = quantizeGlobalIlluminationColor(fragGlobalIllumination.rgb);

    // Accumulate occlusion
    fragGlobalIllumination.a = mix(lastFrameGlobalIllumination.a + accumulationDither, fragGlobalIllumination.a, occlusionBlendWeight);

    fragWeight = occlusionBlendWeight;
  `),a}let D=Object.freeze(Object.defineProperty({__proto__:null,GlobalIlluminationPassParameters:I,build:_,defaultColorBleedWeight:b,defaultRayMarchMaxReach:M,defaultRayMarchMaxReachEmissionWeight:C,defaultRayMarchMaxSteps:T,defaultRayMarchMinReach:w,defaultRayMarchMinReachEmissionWeight:S,defaultRayMarchWorldReach:y},Symbol.toStringTag,{value:"Module"}))},889839:(e,a,o)=>{o.d(a,{kA:()=>w,a8:()=>b,eU:()=>y});var i=o(144143),r=o(546447),n=o(229192),l=o(581826),s=o(44924),c=o(525695),d=o(314009),u=o(759520),h=o(666374),m=o(841419);function p(e,a){a.receiveGlobalIllumination?(e.uniforms.add(new d.o("hasGlobalIlluminationTexture",e=>null!=e.globalIllumination),new h.x("globalIlluminationTexture",e=>e.globalIllumination?.getTexture())),e.constants.add("blurSizePixelsInverse","float",1/m.s),e.code.add((0,u.H)`vec3 readGlobalIlluminationOcclusionInverse() {
if (!hasGlobalIlluminationTexture) {
return vec3(1.0);
}
ivec2 texel = ivec2(gl_FragCoord.xy * blurSizePixelsInverse);
return vec3(texelFetch(globalIlluminationTexture, texel, 0).a);
}
vec3 readGlobalIlluminationOcclusion() {
return 1.0 - readGlobalIlluminationOcclusionInverse();
}
vec4 readGlobalIlluminationEmissionInverse() {
if (!hasGlobalIlluminationTexture) {
return vec4(1.0);
}
ivec2 texel = ivec2(gl_FragCoord.xy * blurSizePixelsInverse);
return 1.0 - vec4(texelFetch(globalIlluminationTexture, texel, 0).rgb, 0.0);
}
vec4 readGlobalIlluminationEmission() {
return max((1.0 - readGlobalIlluminationEmissionInverse() - 0.01) / 0.99, 0.0);
}`)):e.code.add((0,u.H)`vec3 readGlobalIlluminationOcclusionInverse() { return vec3(1.0); }
vec3 readGlobalIlluminationOcclusion() { return vec3(0.0); }
vec4 readGlobalIlluminationEmissionInverse() { return vec4(1.0); }
vec4 readGlobalIlluminationEmission() { return vec4(0.0); }`)}var f=o(589195),v=o(787131);function g(e){e.code.add((0,u.H)`float mapChannel(float x, vec2 p) {
if((x < p.x) && (p.x == 0.0) || !(x < p.x) && (p.x == 1.0)) {
return 0.0;
}
float result = (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
return max(result, 0.0);
}`),e.code.add((0,u.H)`vec3 blackLevelSoftCompression(vec3 color, float averageAmbientRadiance) {
vec2 p = vec2(0.02, 0.0075) * averageAmbientRadiance;
return vec3(mapChannel(color.x, p), mapChannel(color.y, p), mapChannel(color.z, p));
}`)}var x=o(921782);function b(e){e.constants.add("ambientBoostFactor","float",v.uH)}function y(e){e.uniforms.add(new f.U("lightingGlobalFactor",e=>e.lighting.globalFactor))}function w(e,a){let{pbrMode:o,spherical:h,hasColorTexture:m,receiveGlobalIllumination:v}=a;e.include(n.C),e.include(p,a),e.include(r.n,a),0!==o&&e.include(s.c,a),e.include(i.W,a),e.include(c.p),e.include(x.b,a);let w=!(2===o&&!m);w&&e.include(g),b(e),y(e),(0,l.Gc)(e),e.code.add((0,u.H)`
    float additionalDirectedAmbientLight(float lightAlignment) {
      return smoothstep(0.0, 1.0, clamp(lightAlignment * 2.5, 0.0, 1.0));
    }

    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float lightAlignment = dot(${h?(0,u.H)`normalize(vPosWorld)`:(0,u.H)`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(lightAlignment * 2.5, 0.0, 1.0));
    }
  `),(0,l.O4)(e),e.code.add((0,u.H)`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`);let M=v?"globalIlluminationOcclusion":"ssao",S=v?.75:1,C=v?1.5:1;switch(o){case 0:case 4:case 3:e.include(l.Vt),e.code.add((0,u.H)`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight) {
vec3 mainLighting = applyShading(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld) * (1.0 - ssao);
vec3 albedoLinear = linearizeGamma(albedo);
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return delinearizeGamma(outColor);
}`);break;case 1:case 2:{let o=v?.35:.2;e.code.add((0,u.H)`
        const float fillLightIntensity = 0.25;
        const float horizonLightDiffusion = 0.4;
        const float additionalAmbientIrradianceFactor = 0.02;
        const float groundReflectance = ${u.H.float(o)};

        vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
                                      vec3 viewDirection, vec3 upDirection, vec3 mrr, float additionalAmbientIrradiance) {
          PBRShadingInfo inputs;
          calculatePBRInputs(inputs, normal, viewDirection, upDirection, albedo, mrr);

          ${(0,u.If)(v,(0,u.H)`vec3 globalIlluminationOcclusion = min(1.2 * readGlobalIlluminationOcclusion(), 1.0);`)}
      `),a.useFillLights?e.uniforms.add(new d.o("hasFillLights",e=>e.enableFillLights)):e.constants.add("hasFillLights","bool",!1),e.code.add((0,u.H)`
        vec3 ambientDir = vec3(5.0 * upDirection[1] - upDirection[0] * upDirection[2], - 5.0 * upDirection[0] - upDirection[2] * upDirection[1], upDirection[1] * upDirection[1] + upDirection[0] * upDirection[0]);
        ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));

        inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;

        // Calculate the irradiance components: sun, fill lights and the sky.
        vec3 mainLightIrradianceComponent = ${u.H.float(S)} * inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
        vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
        // calculate ambient irradiance for localView and additionalLight for globalView
        vec3 ambientLightIrradianceComponent = ${u.H.float(C)} * calculateAmbientIrradiance(normal) * (1.0 - ${M}) + additionalLight;

        // Assemble the overall irradiance of the sky that illuminates the surface
        inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
        // Assemble the overall irradiance of the ground that illuminates the surface. for this we use the simple model that changes only the sky irradiance by the groundReflectance
        inputs.groundIrradianceToSurface = groundReflectance * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
      `),e.uniforms.add(new f.U("lightingSpecularStrength",e=>e.lighting.mainLight.specularStrength),new f.U("lightingEnvironmentStrength",e=>e.lighting.mainLight.environmentStrength)).code.add((0,u.H)`
        vec3 horizonRingDir = inputs.RdotUP * upDirection - inputs.reflectedView;
        vec3 horizonRingH = normalize(horizonRingDir - viewDirection);
        inputs.NdotH_Horizon = dot(normal, horizonRingH);

        vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
        vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;

        // calculateAmbientRadiance for localView and additionalLight for global view
        vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance() * (1.0 - ${M}) + additionalLight;
        float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotUP + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));

        // Assemble the overall radiance of the sky that illuminates the surface
        inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;

        // Assemble the overall radiance of the ground that illuminates the surface. for this we use the simple model that changes only the sky radiance by the groundReflectance
        inputs.groundRadianceToSurface = 0.5 * groundReflectance * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;

        // Calculate average ambient radiance - This is used in the gamut mapping process to determine the black level for compression
        inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + groundReflectance);
      `),e.code.add((0,u.H)`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent;

        ${(0,u.If)(v,(0,u.H)`
        vec3 globalIlluminationEmission = 2.25 * (0.75 * inputs.albedoLinear + 0.25) * readGlobalIlluminationEmission().rgb;
        outColorLinear += globalIlluminationEmission;`)}

      ${w?(0,u.H)`vec3 adjustedOutColorLinear = blackLevelSoftCompression(outColorLinear, inputs.averageAmbientRadiance);`:(0,u.H)`vec3 adjustedOutColorLinear = max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance);`}

        return delinearizeGamma(adjustedOutColorLinear);
      }
    `);break}case 5:case 6:{let a=v?.35:.5,o=v?.75:1,i=v?1.5:1;(0,l.Gc)(e),(0,l.O4)(e),e.code.add((0,u.H)`
      const float roughnessTerrain = 0.5;
      const float specularityTerrain = ${u.H.float(a)};

      vec3 evaluatePBRSimplifiedLighting(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDirection, vec3 upDirection) {
        PBRShadingInfo inputs;
        calculateSimplifiedInputs(inputs, normal, viewDirection, upDirection, albedo);

        ${(0,u.If)(v,(0,u.H)`vec3 globalIlluminationOcclusion = min(1.2 * readGlobalIlluminationOcclusion(), 1.0);`)}

        vec3 mainLightIrradianceComponent = ${u.H.float(o)} * (1.0 - shadow) * inputs.NdotL * mainLightIntensity;
        vec3 ambientLightIrradianceComponent = ${u.H.float(i)} * calculateAmbientIrradiance(normal) * (1.0 - ${M}) + additionalLight;
        vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;

        vec3 indirectDiffuse = ((1.0 - inputs.NdotUP) * mainLightIrradianceComponent + (1.0 + inputs.NdotUP ) * ambientSky) * 0.5;
        vec3 outDiffColor = inputs.albedoLinear * (1.0 - inputs.f0) * indirectDiffuse / PI;

        vec3 mainLightRadianceComponent = normalDistribution(inputs.NdotH, roughnessTerrain) * mainLightIntensity;
        vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, inputs.NdotV);
        vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
        vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;

        vec3 outColorLinear = outDiffColor + specularComponent;

        ${(0,u.If)(v,(0,u.H)`
        vec3 globalIlluminationEmission = 2.25 * (0.75 * inputs.albedoLinear + 0.25) * readGlobalIlluminationEmission().rgb;
        outColorLinear += globalIlluminationEmission;`)}

        return delinearizeGamma(outColorLinear);
      }
      `)}}}},908047:(e,a,o)=>{o.d(a,{LA:()=>g,QH:()=>v,QR:()=>f,wu:()=>b});var i=o(442039),r=o(730347),n=o(737198),l=o(759520);function s(e,a){let o=(0,n._o)(a.output)&&a.receiveShadows;o&&(0,r.o)(e,!0),e.vertex.code.add((0,l.H)`
    void forwardLinearDepthToReadShadowMap() { ${(0,l.If)(o,"forwardLinearDepth(gl_Position.w);")} }
  `)}var c=o(293626),d=o(731197),u=o(589195),h=o(666374),m=o(191470),p=o(342471);class f extends p.Y{constructor(){super(...arguments),this.origin=(0,i.vt)()}}function v(e,a){a.receiveShadows&&e.fragment.include(c.Li),x(e,a)}function g(e,a){a.receiveShadows&&e.fragment.include(c.iC),x(e,a)}function x(e,a){var o;e.fragment.uniforms.add(new u.U("lightingGlobalFactor",e=>e.lighting.globalFactor));let{hasShadowHighlights:i,receiveShadows:r,spherical:n}=a;e.include(s,a),r&&(o=e.fragment,b(o,i),o.code.add((0,l.H)`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap, 0));
return readShadowMaps(uvzShadow);
}`)),e.fragment.code.add((0,l.H)`
    float readShadow(float additionalAmbientScale, vec3 vpos) {
      return ${r?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":(0,l.If)(n,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};
    }
  `)}function b(e,a){e.include(d.t),e.uniforms.add(new m.N("shadowMap",({shadowMap:e})=>e.getOutput(5)??e.getOutput(7))),a&&e.uniforms.add(new h.x("shadowHighlight",({shadowHighlight:e})=>e?.getTexture())),e.code.add((0,l.H)`
    float readShadowMaps(const in vec3 uvzShadow) {
      if (uvzShadow.z < 0.0) {
        return 0.0;
      }

      float shadow1 = readShadowMapUVZ(uvzShadow, shadowMap);
      ${(0,l.If)(a,"float shadow2 = texelFetch(shadowHighlight, ivec2(gl_FragCoord.xy), 0).r;\n         return shadow1 > shadow2 ? shadow1 : shadow2;","return shadow1;")}
    }
  `)}},921782:(e,a,o)=>{o.d(a,{b:()=>r});var i=o(759520);function r(e){e.code.add((0,i.H)`vec3 tonemapACES(vec3 x) {
return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}`),e.code.add((0,i.H)`vec3 tonemapKhronosNeutral(vec3 color) {
const float startCompression = 0.76;
const float desaturation = 0.15;
float peak = max(color.r, max(color.g, color.b));
if (peak < startCompression) {
return color;
}
float d = 1.0 - startCompression;
float newPeak = 1.0 - d * d / (peak + d - startCompression);
color *= newPeak / peak;
float g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0 );
return mix(color, vec3(newPeak), g);
}`)}},940822:(e,a,o)=>{o.d(a,{n:()=>l});var i=o(990616),r=o(488705),n=o(698270);class l extends n.L{constructor(e){super(),this.spherical=e,this.alphaDiscardMode=1,this.doubleSidedMode=0,this.pbrMode=0,this.cullFace=0,this.normalType=0,this.customDepthTest=0,this.emissionSource=0,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.instanced=!1,this.instancedDoublePrecision=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.receiveShadows=!1,this.hasShadowHighlights=!1,this.receiveAmbientOcclusion=!1,this.receiveGlobalIllumination=!1,this.textureAlphaPremultiplied=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.writeDepth=!0,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1,this.useCustomDTRExponentForWater=!1,this.useFillLights=!0,this.draped=!1}get textureCoordinateType(){return+!!this.hasTextures}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||3===this.emissionSource||this.hasOcclusionTexture}get hasVVInstancing(){return this.instanced}get discardInvisibleFragments(){return this.transparent}}(0,i.Cg)([(0,r.W)({count:4})],l.prototype,"alphaDiscardMode",void 0),(0,i.Cg)([(0,r.W)({count:3})],l.prototype,"doubleSidedMode",void 0),(0,i.Cg)([(0,r.W)({count:7})],l.prototype,"pbrMode",void 0),(0,i.Cg)([(0,r.W)({count:3})],l.prototype,"cullFace",void 0),(0,i.Cg)([(0,r.W)({count:3})],l.prototype,"normalType",void 0),(0,i.Cg)([(0,r.W)({count:3})],l.prototype,"customDepthTest",void 0),(0,i.Cg)([(0,r.W)({count:8})],l.prototype,"emissionSource",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasVertexColors",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasSymbolColors",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasVerticalOffset",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasColorTexture",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasMetallicRoughnessTexture",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasOcclusionTexture",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasNormalTexture",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasScreenSizePerspective",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasVertexTangents",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasOccludees",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"instanced",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"instancedDoublePrecision",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasModelTransformation",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"offsetBackfaces",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasVVSize",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasVVColor",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"receiveShadows",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasShadowHighlights",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"receiveAmbientOcclusion",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"receiveGlobalIllumination",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"textureAlphaPremultiplied",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"instancedFeatureAttribute",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"instancedColor",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"writeDepth",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"snowCover",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasColorTextureTransform",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasEmissionTextureTransform",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasNormalTextureTransform",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasOcclusionTextureTransform",void 0),(0,i.Cg)([(0,r.W)()],l.prototype,"hasMetallicRoughnessTextureTransform",void 0)},952638:(e,a,o)=>{o.d(a,{O:()=>i,b:()=>r});let i=3e5,r=5e5}}]);
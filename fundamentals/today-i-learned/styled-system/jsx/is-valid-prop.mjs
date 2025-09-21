import { splitProps } from '../helpers.mjs';
// src/index.ts
var userGeneratedStr = "css"
var userGenerated = userGeneratedStr.split(",");
var cssPropertiesStr = "";
var allCssProperties = cssPropertiesStr.split(",").concat(userGenerated);
var properties = new Map(allCssProperties.map((prop) => [prop, true]));
var cssPropertySelectorRegex = /&|@/;
var isCssProperty = /* @__PURE__ */ ((prop) => {
  return properties.has(prop) || prop.startsWith("--") || cssPropertySelectorRegex.test(prop);
});
export {
  allCssProperties,
  isCssProperty
};
export const splitCssProps = (props) =>  splitProps(props, isCssProperty)
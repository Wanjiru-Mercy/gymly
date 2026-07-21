// @digitalpersona/devices does `import 'WebSdk'` as a side-effect-only
// import (a compiled artifact of a TypeScript ambient module reference).
// It carries no bindings — the code that follows references the global
// `WebSdk` object directly, which comes from the vendored <script> tag in
// index.html (public/vendor/digitalpersona-websdk.js), not from this
// import. This stub just satisfies the bundler's module resolution.
export {};

import{c as t,d as e,b as n,D as $,o as r,E as s,p as o,F as a,l as c,A as f,y as i,G as m,j as p,e as d,g as l,h as u,k as g,f as h,i as x}from"./chunk.82446879.js";import{v as j,w}from"./chunk.f5a3f321.js";import"./chunk.e8a2e241.js";import{a as y}from"./chunk.4b4ee497.js";import"./chunk.b01e898f.js";import{a as C}from"./chunk.fb378401.js";import{a as k}from"./chunk.94a6e723.js";function v(t){let e;return{c(){e=h("侧边栏")},l(t){e=x(t,"侧边栏")},m(t,n){c(t,e,n)},d(t){t&&p(e)}}}function L(t){let e;return{c(){e=h("头部")},l(t){e=x(t,"头部")},m(t,n){c(t,e,n)},d(t){t&&p(e)}}}function b(t){let e;return{c(){e=h("内容")},l(t){e=x(t,"内容")},m(t,n){c(t,e,n)},d(t){t&&p(e)}}}function F(t){let e;return{c(){e=h("脚部")},l(t){e=x(t,"脚部")},m(t,n){c(t,e,n)},d(t){t&&p(e)}}}function H(t){let e,n,d;const l=new w.Header({props:{$$slots:{default:[L]},$$scope:{ctx:t}}}),u=new w.Content({props:{height:"300px",$$slots:{default:[b]},$$scope:{ctx:t}}}),g=new w.Footer({props:{$$slots:{default:[F]},$$scope:{ctx:t}}});return{c(){$(l.$$.fragment),e=r(),$(u.$$.fragment),n=r(),$(g.$$.fragment)},l(t){s(l.$$.fragment,t),e=o(t),s(u.$$.fragment,t),n=o(t),s(g.$$.fragment,t)},m(t,$){a(l,t,$),c(t,e,$),a(u,t,$),c(t,n,$),a(g,t,$),d=!0},p(t,e){const n={};2&e&&(n.$$scope={dirty:e,ctx:t}),l.$set(n);const $={};2&e&&($.$$scope={dirty:e,ctx:t}),u.$set($);const r={};2&e&&(r.$$scope={dirty:e,ctx:t}),g.$set(r)},i(t){d||(f(l.$$.fragment,t),f(u.$$.fragment,t),f(g.$$.fragment,t),d=!0)},o(t){i(l.$$.fragment,t),i(u.$$.fragment,t),i(g.$$.fragment,t),d=!1},d(t){m(l,t),t&&p(e),m(u,t),t&&p(n),m(g,t)}}}function S(t){let e,n;const d=new w.Sider({props:{width:"100px",$$slots:{default:[v]},$$scope:{ctx:t}}}),l=new j({props:{$$slots:{default:[H]},$$scope:{ctx:t}}});return{c(){$(d.$$.fragment),e=r(),$(l.$$.fragment)},l(t){s(d.$$.fragment,t),e=o(t),s(l.$$.fragment,t)},m(t,$){a(d,t,$),c(t,e,$),a(l,t,$),n=!0},p(t,e){const n={};2&e&&(n.$$scope={dirty:e,ctx:t}),d.$set(n);const $={};2&e&&($.$$scope={dirty:e,ctx:t}),l.$set($)},i(t){n||(f(d.$$.fragment,t),f(l.$$.fragment,t),n=!0)},o(t){i(d.$$.fragment,t),i(l.$$.fragment,t),n=!1},d(t){m(d,t),t&&p(e),m(l,t)}}}function D(t){let e,n;const r=new j({props:{$$slots:{default:[S]},$$scope:{ctx:t}}});return{c(){e=d("div"),$(r.$$.fragment),this.h()},l(t){e=l(t,"DIV",{slot:!0});var n=u(e);s(r.$$.fragment,n),n.forEach(p),this.h()},h(){g(e,"slot","preview")},m(t,$){c(t,e,$),a(r,e,null),n=!0},p(t,e){const n={};2&e&&(n.$$scope={dirty:e,ctx:t}),r.$set(n)},i(t){n||(f(r.$$.fragment,t),n=!0)},o(t){i(r.$$.fragment,t),n=!1},d(t){t&&p(e),m(r)}}}function E(t){let e,n,d;const l=new y({props:{title:"Layout",subtitle:"布局"}}),u=new C({props:{code:'<script>\n  import { Layout, Children } from \'svelma-pro\';\n<\/script>\n\n<Layout>\n  <Children.Sider width="100px">\n    侧边栏\n  </Children.Sider>\n  <Layout>\n    <Children.Header>\n      头部\n    </Children.Header>\n    <Children.Content height="300px">\n      内容\n    </Children.Content>\n    <Children.Footer>\n      脚部\n    </Children.Footer>\n  </Layout>\n</Layout>\n',$$slots:{preview:[D]},$$scope:{ctx:t}}}),g=new k({props:{jsdoc:t[0]}});return{c(){$(l.$$.fragment),e=r(),$(u.$$.fragment),n=r(),$(g.$$.fragment)},l(t){s(l.$$.fragment,t),e=o(t),s(u.$$.fragment,t),n=o(t),s(g.$$.fragment,t)},m(t,$){a(l,t,$),c(t,e,$),a(u,t,$),c(t,n,$),a(g,t,$),d=!0},p(t,[e]){const n={};2&e&&(n.$$scope={dirty:e,ctx:t}),u.$set(n);const $={};1&e&&($.jsdoc=t[0]),g.$set($)},i(t){d||(f(l.$$.fragment,t),f(u.$$.fragment,t),f(g.$$.fragment,t),d=!0)},o(t){i(l.$$.fragment,t),i(u.$$.fragment,t),i(g.$$.fragment,t),d=!1},d(t){m(l,t),t&&p(e),m(u,t),t&&p(n),m(g,t)}}}async function A(t,e){const n=await this.fetch("components/layout.json");return{jsdoc:await n.json()}}function G(t,e,n){let{jsdoc:$}=e;return t.$set=(t=>{"jsdoc"in t&&n(0,$=t.jsdoc)}),[$]}export default class extends t{constructor(t){super(),e(this,t,G,E,n,{jsdoc:0})}}export{A as preload};
//# sourceMappingURL=layout.ab177a2a.js.map
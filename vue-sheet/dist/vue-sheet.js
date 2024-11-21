import { ref as y, computed as u, onMounted as _, onBeforeUnmount as k, watch as S, openBlock as i, createElementBlock as c, Fragment as b, renderSlot as p, createCommentVNode as h, createBlock as x, Teleport as E, createElementVNode as r, normalizeClass as $, normalizeStyle as B, unref as I, pushScopeId as C, popScopeId as W } from "vue";
const O = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, l] of o)
    t[n] = l;
  return t;
}, g = (e) => (C("data-v-1431d556"), e = e(), W(), e), M = /* @__PURE__ */ g(() => /* @__PURE__ */ r("span", { style: { cursor: "pointer" } }, " Open ", -1)), T = /* @__PURE__ */ g(() => /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-x"
}, [
  /* @__PURE__ */ r("path", { d: "M18 6 6 18" }),
  /* @__PURE__ */ r("path", { d: "m6 6 12 12" })
], -1)), j = { class: "slide-panel-content" }, z = {
  __name: "Sheet",
  props: {
    position: {
      type: String,
      default: "right",
      validator: (e) => ["left", "right", "top", "bottom"].includes(e) ? !0 : (console.error(`Invalid position: "${e}".`), !1)
    },
    width: {
      type: String,
      default: "500px",
      validator: (e) => {
        const o = ["%", "px", "em", "rem", "vw", "vh"];
        return o.some((t) => e.endsWith(t)) ? !0 : (console.error(`Invalid width: "${e}". Allowed endings are ${o.join(", ")}.`), !1);
      }
    },
    height: {
      type: String,
      default: "500px",
      validator: (e) => {
        const o = ["%", "px", "em", "rem", "vw", "vh"];
        return o.some((t) => e.endsWith(t)) ? !0 : (console.error(`Invalid width: "${e}". Allowed endings are ${o.join(", ")}.`), !1);
      }
    },
    maxWidth: { type: String, default: "90%", validator: (e) => e.endsWith("%") },
    maxHeight: { type: String, default: "90%", validator: (e) => e.endsWith("%") },
    open: { type: Boolean, default: !1 },
    closeOnEscape: { type: Boolean, default: !0 },
    noTrigger: { type: Boolean, default: !1 }
  },
  emits: ["update:open"],
  setup(e, { emit: o }) {
    const t = e, n = y(!1), l = `sheet-label-${Math.random().toString(36).substring(7)}`, m = `sheet-desc-${Math.random().toString(36).substring(7)}`, v = u(() => ["top", "bottom"].includes(t.position)), f = u(() => v.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), w = () => {
      window.addEventListener("keydown", d), n.value = !0, o("update:open", !0);
    }, a = () => {
      window.removeEventListener("keydown", d), n.value = !1, o("update:open", !1);
    }, d = (s) => {
      (s.key === "Escape" || s.key === "Esc") && closeOnEscape && a();
    };
    return _(() => {
      n.value = open;
    }), k(() => {
      window.removeEventListener("keydown", d);
    }), S(() => open, (s) => {
      n.value = s;
    }), (s, H) => (i(), c(b, null, [
      e.noTrigger ? h("", !0) : (i(), c("div", {
        key: 0,
        onClick: w
      }, [
        p(s.$slots, "trigger", {}, () => [
          M
        ], !0)
      ])),
      (i(), x(E, { to: "body" }, [
        n.value ? (i(), c("div", {
          key: 0,
          class: "overlay",
          onClick: a
        })) : h("", !0),
        r("div", {
          class: $(["slide-panel", e.position, { open: n.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: B(I(f)),
          "aria-labelledby": l,
          "aria-describedby": m
        }, [
          r("button", {
            class: "close-btn",
            onClick: a,
            "aria-label": "Close"
          }, [
            p(s.$slots, "close", {}, () => [
              T
            ], !0)
          ]),
          r("div", j, [
            p(s.$slots, "default", {}, void 0, !0)
          ])
        ], 6)
      ]))
    ], 64));
  }
}, A = /* @__PURE__ */ O(z, [["__scopeId", "data-v-1431d556"]]);
export {
  A as Sheet
};

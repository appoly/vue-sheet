import { ref as f, computed as y, onMounted as M, onBeforeUnmount as $, watch as B, openBlock as l, createElementBlock as u, Fragment as E, renderSlot as h, createElementVNode as o, createCommentVNode as g, createBlock as _, Teleport as z, normalizeClass as I, normalizeStyle as W, nextTick as O } from "vue";
const j = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [c, r] of a)
    e[c] = r;
  return e;
}, H = ["aria-expanded"], T = { class: "sheet-buttons" }, L = { class: "sheet-content" }, V = {
  __name: "Sheet",
  props: {
    position: {
      type: String,
      default: "right",
      validator: (t) => ["left", "right", "top", "bottom"].includes(t) ? !0 : (console.error(`Invalid position: "${t}".`), !1)
    },
    width: {
      type: String,
      default: "500px",
      validator: (t) => {
        const a = ["%", "px", "em", "rem", "vw", "vh"];
        return a.some((e) => t.endsWith(e)) ? !0 : (console.error(`Invalid width: "${t}". Allowed endings are ${a.join(", ")}.`), !1);
      }
    },
    height: {
      type: String,
      default: "500px",
      validator: (t) => {
        const a = ["%", "px", "em", "rem", "vw", "vh"];
        return a.some((e) => t.endsWith(e)) ? !0 : (console.error(`Invalid width: "${t}". Allowed endings are ${a.join(", ")}.`), !1);
      }
    },
    maxWidth: { type: String, default: "90%", validator: (t) => t.endsWith("%") },
    maxHeight: { type: String, default: "90%", validator: (t) => t.endsWith("%") },
    open: { type: Boolean, default: !1 },
    closeOnEscape: { type: Boolean, default: !0 },
    noTrigger: { type: Boolean, default: !1 },
    expandable: { type: Boolean, default: !1 },
    expandDefault: { type: Boolean, default: !1 },
    canClose: {
      type: Function,
      default: () => () => !0
    }
  },
  emits: ["update:open"],
  setup(t, { emit: a }) {
    const e = t, c = a, r = f(!1), i = f(!1), d = f(e.expandable ? e.expandDefault : !1), k = `sheet-label-${Math.random().toString(36).substring(7)}`, x = `sheet-desc-${Math.random().toString(36).substring(7)}`, w = `sheet-${Math.random().toString(36).substring(7)}`, b = y(() => ["top", "bottom"].includes(e.position)), S = y(() => b.value ? { height: e.expandable && d.value ? "100vh" : e.height, maxHeight: e.maxHeight } : { width: e.expandable && d.value ? "100vw" : e.width, maxWidth: e.maxWidth }), p = () => {
      r.value = !0, window.addEventListener("keydown", m), O(() => {
        i.value = !0, c("update:open", !0);
      });
    }, v = async () => {
      await e.canClose() && (window.removeEventListener("keydown", m), i.value = !1, c("update:open", !1));
    }, m = (n) => {
      (n.key === "Escape" || n.key === "Esc") && e.closeOnEscape && v();
    }, C = () => {
      e.expandable && (d.value = !d.value);
    };
    return M(() => {
      e.open && p();
    }), $(() => {
      window.removeEventListener("keydown", m);
    }), B(() => e.open, (n) => {
      n && !i.value ? p() : !n && i.value && v();
    }), (n, s) => (l(), u(E, null, [
      t.noTrigger ? g("", !0) : (l(), u("div", {
        key: 0,
        onClick: p,
        onMouseover: s[0] || (s[0] = (A) => r.value = !0)
      }, [
        h(n.$slots, "trigger", {}, () => [
          o("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": w,
            "aria-expanded": i.value,
            onClick: p
          }, " Open ", 8, H)
        ], !0)
      ], 32)),
      (l(), _(z, { to: "body" }, [
        i.value ? (l(), u("div", {
          key: 0,
          class: "overlay",
          onClick: v
        })) : g("", !0),
        r.value ? (l(), u("div", {
          key: 1,
          id: w,
          class: I(["sheet", t.position, { open: i.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: W(S.value),
          "aria-labelledby": k,
          "aria-describedby": x
        }, [
          o("div", T, [
            t.expandable ? (l(), u("button", {
              key: 0,
              class: "icon-btn",
              onClick: C,
              "aria-label": "Expand"
            }, [
              d.value ? h(n.$slots, "minimize", { key: 1 }, () => [
                s[2] || (s[2] = o("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  class: "lucide lucide-minimize"
                }, [
                  o("path", { d: "M8 3v3a2 2 0 0 1-2 2H3" }),
                  o("path", { d: "M21 8h-3a2 2 0 0 1-2-2V3" }),
                  o("path", { d: "M3 16h3a2 2 0 0 1 2 2v3" }),
                  o("path", { d: "M16 21v-3a2 2 0 0 1 2-2h3" })
                ], -1))
              ], !0) : h(n.$slots, "maximize", { key: 0 }, () => [
                s[1] || (s[1] = o("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  class: "lucide lucide-maximize"
                }, [
                  o("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }),
                  o("path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }),
                  o("path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }),
                  o("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" })
                ], -1))
              ], !0)
            ])) : g("", !0),
            o("button", {
              class: "icon-btn",
              onClick: v,
              "aria-label": "Close"
            }, [
              h(n.$slots, "close", {}, () => [
                s[3] || (s[3] = o("svg", {
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
                  o("path", { d: "M18 6 6 18" }),
                  o("path", { d: "m6 6 12 12" })
                ], -1))
              ], !0)
            ])
          ]),
          o("div", L, [
            h(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)) : g("", !0)
      ]))
    ], 64));
  }
}, F = /* @__PURE__ */ j(V, [["__scopeId", "data-v-ad7ec866"]]);
export {
  F as Sheet
};

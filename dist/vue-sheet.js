import { ref as g, computed as w, onMounted as B, onBeforeUnmount as M, watch as $, openBlock as l, createElementBlock as u, Fragment as E, renderSlot as c, createElementVNode as o, createCommentVNode as m, createBlock as O, Teleport as _, normalizeClass as z, normalizeStyle as H, nextTick as I } from "vue";
const W = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [h, d] of i)
    e[h] = d;
  return e;
}, j = ["aria-expanded"], T = { class: "sheet-buttons" }, L = { class: "sheet-content" }, V = {
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
        const i = ["%", "px", "em", "rem", "vw", "vh"];
        return i.some((e) => t.endsWith(e)) ? !0 : (console.error(
          `Invalid width: "${t}". Allowed endings are ${i.join(
            ", "
          )}.`
        ), !1);
      }
    },
    height: {
      type: String,
      default: "500px",
      validator: (t) => {
        const i = ["%", "px", "em", "rem", "vw", "vh"];
        return i.some((e) => t.endsWith(e)) ? !0 : (console.error(
          `Invalid width: "${t}". Allowed endings are ${i.join(
            ", "
          )}.`
        ), !1);
      }
    },
    maxWidth: {
      type: String,
      default: "90%",
      validator: (t) => t.endsWith("%")
    },
    maxHeight: {
      type: String,
      default: "90%",
      validator: (t) => t.endsWith("%")
    },
    open: { type: Boolean, default: !1 },
    closeOnEscape: { type: Boolean, default: !0 },
    noTrigger: { type: Boolean, default: !1 },
    expandable: { type: Boolean, default: !1 },
    expandDefault: { type: Boolean, default: !1 },
    canClose: {
      type: Function,
      default: () => () => !0
    },
    disableOutsideScroll: { type: Boolean, default: !1 }
  },
  emits: ["update:open"],
  setup(t, { emit: i }) {
    const e = t, h = i, d = g(!1), a = g(!1), r = g(e.expandable ? e.expandDefault : !1), b = `sheet-label-${Math.random().toString(36).substring(7)}`, x = `sheet-desc-${Math.random().toString(36).substring(7)}`, y = `sheet-${Math.random().toString(36).substring(7)}`, k = w(
      () => ["top", "bottom"].includes(e.position)
    ), S = w(() => k.value ? { height: e.expandable && r.value ? "100vh" : e.height, maxHeight: e.maxHeight } : { width: e.expandable && r.value ? "100vw" : e.width, maxWidth: e.maxWidth }), p = () => {
      d.value = !0, window.addEventListener("keydown", f), e.disableOutsideScroll && (document.body.style.overflow = "hidden", document.body.style.position = "fixed", document.body.style.maxHeight = "100vh"), I(() => {
        a.value = !0, h("update:open", !0);
      });
    }, v = async () => {
      await e.canClose() && (window.removeEventListener("keydown", f), e.disableOutsideScroll && (document.body.style.overflow = "", document.body.style.position = "", document.body.style.maxHeight = ""), a.value = !1, h("update:open", !1));
    }, f = (n) => {
      (n.key === "Escape" || n.key === "Esc") && e.closeOnEscape && v();
    }, C = () => {
      e.expandable && (r.value = !r.value);
    };
    return B(() => {
      e.open && p();
    }), M(() => {
      window.removeEventListener("keydown", f);
    }), $(
      () => e.open,
      (n) => {
        n && !a.value ? p() : !n && a.value && v();
      }
    ), (n, s) => (l(), u(E, null, [
      t.noTrigger ? m("", !0) : (l(), u("div", {
        key: 0,
        onClick: p,
        onMouseover: s[0] || (s[0] = (A) => d.value = !0)
      }, [
        c(n.$slots, "trigger", {}, () => [
          o("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": y,
            "aria-expanded": a.value,
            onClick: p
          }, " Open ", 8, j)
        ], !0)
      ], 32)),
      (l(), O(_, { to: "body" }, [
        a.value ? (l(), u("div", {
          key: 0,
          class: "overlay",
          onClick: v
        })) : m("", !0),
        d.value ? (l(), u("div", {
          key: 1,
          id: y,
          class: z(["sheet", t.position, { open: a.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: H(S.value),
          "aria-labelledby": b,
          "aria-describedby": x
        }, [
          o("div", T, [
            t.expandable ? (l(), u("button", {
              key: 0,
              class: "icon-btn",
              onClick: C,
              "aria-label": "Expand"
            }, [
              r.value ? c(n.$slots, "minimize", { key: 1 }, () => [
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
              ], !0) : c(n.$slots, "maximize", { key: 0 }, () => [
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
            ])) : m("", !0),
            o("button", {
              class: "icon-btn",
              onClick: v,
              "aria-label": "Close"
            }, [
              c(n.$slots, "close", {}, () => [
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
            c(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)) : m("", !0)
      ]))
    ], 64));
  }
}, F = /* @__PURE__ */ W(V, [["__scopeId", "data-v-2816572a"]]);
export {
  F as Sheet
};

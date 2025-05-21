import { ref as g, computed as y, onMounted as B, onBeforeUnmount as M, watch as $, openBlock as l, createElementBlock as u, Fragment as E, renderSlot as c, createElementVNode as o, createCommentVNode as f, createBlock as O, Teleport as _, normalizeClass as z, normalizeStyle as I, nextTick as W } from "vue";
const j = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [h, d] of a)
    e[h] = d;
  return e;
}, H = ["aria-expanded"], L = { class: "sheet-buttons" }, T = { class: "sheet-content" }, V = {
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
        return a.some((e) => t.endsWith(e)) ? !0 : (console.error(
          `Invalid width: "${t}". Allowed endings are ${a.join(
            ", "
          )}.`
        ), !1);
      }
    },
    height: {
      type: String,
      default: "500px",
      validator: (t) => {
        const a = ["%", "px", "em", "rem", "vw", "vh"];
        return a.some((e) => t.endsWith(e)) ? !0 : (console.error(
          `Invalid width: "${t}". Allowed endings are ${a.join(
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
  setup(t, { emit: a }) {
    const e = t, h = a, d = g(!1), i = g(!1), r = g(e.expandable ? e.expandDefault : !1), b = `sheet-label-${Math.random().toString(36).substring(7)}`, k = `sheet-desc-${Math.random().toString(36).substring(7)}`, w = `sheet-${Math.random().toString(36).substring(7)}`, x = y(
      () => ["top", "bottom"].includes(e.position)
    ), S = y(() => x.value ? { height: e.expandable && r.value ? "100vh" : e.height, maxHeight: e.maxHeight } : { width: e.expandable && r.value ? "100vw" : e.width, maxWidth: e.maxWidth }), p = () => {
      d.value = !0, window.addEventListener("keydown", m), e.disableOutsideScroll && document.body.classList.add("sheet-open"), W(() => {
        i.value = !0, h("update:open", !0);
      });
    }, v = async () => {
      await e.canClose() && (window.removeEventListener("keydown", m), e.disableOutsideScroll && document.body.classList.remove("sheet-open"), i.value = !1, h("update:open", !1));
    }, m = (n) => {
      (n.key === "Escape" || n.key === "Esc") && e.closeOnEscape && v();
    }, C = () => {
      e.expandable && (r.value = !r.value);
    };
    return B(() => {
      e.open && p();
    }), M(() => {
      window.removeEventListener("keydown", m);
    }), $(
      () => e.open,
      (n) => {
        n && !i.value ? p() : !n && i.value && v();
      }
    ), (n, s) => (l(), u(E, null, [
      t.noTrigger ? f("", !0) : (l(), u("div", {
        key: 0,
        onClick: p,
        onMouseover: s[0] || (s[0] = (A) => d.value = !0)
      }, [
        c(n.$slots, "trigger", {}, () => [
          o("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": w,
            "aria-expanded": i.value,
            onClick: p
          }, " Open ", 8, H)
        ], !0)
      ], 32)),
      (l(), O(_, { to: "body" }, [
        i.value ? (l(), u("div", {
          key: 0,
          class: "overlay",
          onClick: v
        })) : f("", !0),
        d.value ? (l(), u("div", {
          key: 1,
          id: w,
          class: z(["sheet", t.position, { open: i.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: I(S.value),
          "aria-labelledby": b,
          "aria-describedby": k
        }, [
          o("div", L, [
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
            ])) : f("", !0),
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
          o("div", T, [
            c(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)) : f("", !0)
      ]))
    ], 64));
  }
}, F = /* @__PURE__ */ j(V, [["__scopeId", "data-v-e01f7da9"]]);
export {
  F as Sheet
};

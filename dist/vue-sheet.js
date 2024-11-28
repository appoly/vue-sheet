import { ref as g, computed as y, onMounted as S, onBeforeUnmount as C, watch as _, openBlock as a, createElementBlock as p, Fragment as $, renderSlot as f, createElementVNode as r, createCommentVNode as m, createBlock as E, Teleport as B, normalizeClass as I, normalizeStyle as W, nextTick as M } from "vue";
const O = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [l, i] of n)
    t[l] = i;
  return t;
}, T = { class: "sheet-content" }, j = {
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
        const n = ["%", "px", "em", "rem", "vw", "vh"];
        return n.some((t) => e.endsWith(t)) ? !0 : (console.error(`Invalid width: "${e}". Allowed endings are ${n.join(", ")}.`), !1);
      }
    },
    height: {
      type: String,
      default: "500px",
      validator: (e) => {
        const n = ["%", "px", "em", "rem", "vw", "vh"];
        return n.some((t) => e.endsWith(t)) ? !0 : (console.error(`Invalid width: "${e}". Allowed endings are ${n.join(", ")}.`), !1);
      }
    },
    maxWidth: { type: String, default: "90%", validator: (e) => e.endsWith("%") },
    maxHeight: { type: String, default: "90%", validator: (e) => e.endsWith("%") },
    open: { type: Boolean, default: !1 },
    closeOnEscape: { type: Boolean, default: !0 },
    noTrigger: { type: Boolean, default: !1 },
    canClose: {
      type: Function,
      default: () => () => !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: n }) {
    const t = e, l = n, i = g(!1), s = g(!1), w = `sheet-label-${Math.random().toString(36).substring(7)}`, k = `sheet-desc-${Math.random().toString(36).substring(7)}`, v = `sheet-${Math.random().toString(36).substring(7)}`, b = y(() => ["top", "bottom"].includes(t.position)), x = y(() => b.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), d = () => {
      i.value = !0, window.addEventListener("keydown", h), M(() => {
        s.value = !0, l("update:open", !0);
      });
    }, u = async () => {
      await t.canClose() && (window.removeEventListener("keydown", h), s.value = !1, l("update:open", !1));
    }, h = (o) => {
      (o.key === "Escape" || o.key === "Esc") && t.closeOnEscape && u();
    };
    return S(() => {
      t.open && d();
    }), C(() => {
      window.removeEventListener("keydown", h);
    }), _(() => t.open, (o) => {
      o && !s.value ? d() : !o && s.value && u();
    }), (o, c) => (a(), p($, null, [
      e.noTrigger ? m("", !0) : (a(), p("div", {
        key: 0,
        onClick: d,
        onMouseover: c[0] || (c[0] = (z) => i.value = !0)
      }, [
        f(o.$slots, "trigger", {}, () => [
          r("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": v,
            "aria-expanded": "false",
            onClick: d
          }, " Open ")
        ], !0)
      ], 32)),
      (a(), E(B, { to: "body" }, [
        s.value ? (a(), p("div", {
          key: 0,
          class: "overlay",
          onClick: u
        })) : m("", !0),
        i.value ? (a(), p("div", {
          key: 1,
          id: v,
          class: I(["sheet", e.position, { open: s.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: W(x.value),
          "aria-labelledby": w,
          "aria-describedby": k
        }, [
          r("button", {
            class: "close-btn",
            onClick: u,
            "aria-label": "Close"
          }, [
            f(o.$slots, "close", {}, () => [
              c[1] || (c[1] = r("svg", {
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
                r("path", { d: "M18 6 6 18" }),
                r("path", { d: "m6 6 12 12" })
              ], -1))
            ], !0)
          ]),
          r("div", T, [
            f(o.$slots, "default", {}, void 0, !0)
          ])
        ], 6)) : m("", !0)
      ]))
    ], 64));
  }
}, L = /* @__PURE__ */ O(j, [["__scopeId", "data-v-7f59a145"]]);
export {
  L as Sheet
};

import { ref as f, computed as y, onMounted as S, onBeforeUnmount as _, watch as $, openBlock as a, createElementBlock as u, Fragment as E, renderSlot as m, createElementVNode as r, createCommentVNode as v, createBlock as B, Teleport as C, normalizeClass as I, normalizeStyle as W } from "vue";
const M = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [l, s] of o)
    t[l] = s;
  return t;
}, O = { class: "sheet-content" }, T = {
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
    const t = e, l = o, s = f(!1), i = f(!1), w = `sheet-label-${Math.random().toString(36).substring(7)}`, k = `sheet-desc-${Math.random().toString(36).substring(7)}`, g = `sheet-${Math.random().toString(36).substring(7)}`, b = y(() => ["top", "bottom"].includes(t.position)), x = y(() => b.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), c = () => {
      s.value = !0, window.addEventListener("keydown", h), i.value = !0, l("update:open", !0);
    }, p = () => {
      window.removeEventListener("keydown", h), i.value = !1, l("update:open", !1);
    }, h = (n) => {
      (n.key === "Escape" || n.key === "Esc") && t.closeOnEscape && p();
    };
    return S(() => {
      t.open && c();
    }), _(() => {
      window.removeEventListener("keydown", h);
    }), $(() => open, (n) => {
      i.value = n;
    }), (n, d) => (a(), u(E, null, [
      e.noTrigger ? v("", !0) : (a(), u("div", {
        key: 0,
        onClick: c,
        onMouseover: d[0] || (d[0] = (j) => s.value = !0)
      }, [
        m(n.$slots, "trigger", {}, () => [
          r("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": g,
            "aria-expanded": "false",
            onClick: c
          }, " Open ")
        ], !0)
      ], 32)),
      (a(), B(C, { to: "body" }, [
        i.value ? (a(), u("div", {
          key: 0,
          class: "overlay",
          onClick: p
        })) : v("", !0),
        s.value ? (a(), u("div", {
          key: 1,
          id: g,
          class: I(["sheet", e.position, { open: i.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: W(x.value),
          "aria-labelledby": w,
          "aria-describedby": k
        }, [
          r("button", {
            class: "close-btn",
            onClick: p,
            "aria-label": "Close"
          }, [
            m(n.$slots, "close", {}, () => [
              d[1] || (d[1] = r("svg", {
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
          r("div", O, [
            m(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)) : v("", !0)
      ]))
    ], 64));
  }
}, H = /* @__PURE__ */ M(T, [["__scopeId", "data-v-911e42c1"]]);
export {
  H as Sheet
};

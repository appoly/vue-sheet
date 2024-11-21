import { ref as k, computed as m, onMounted as b, onBeforeUnmount as x, watch as S, openBlock as a, createElementBlock as u, Fragment as _, renderSlot as p, createElementVNode as s, createCommentVNode as g, createBlock as E, Teleport as $, normalizeClass as B, normalizeStyle as C } from "vue";
const W = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [i, r] of o)
    t[i] = r;
  return t;
}, I = { class: "sheet-content" }, O = {
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
    const t = e, i = o, r = k(!1), f = `sheet-label-${Math.random().toString(36).substring(7)}`, v = `sheet-desc-${Math.random().toString(36).substring(7)}`, w = m(() => ["top", "bottom"].includes(t.position)), y = m(() => w.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), l = () => {
      window.addEventListener("keydown", c), r.value = !0, i("update:open", !0);
    }, d = () => {
      window.removeEventListener("keydown", c), r.value = !1, i("update:open", !1);
    }, c = (n) => {
      (n.key === "Escape" || n.key === "Esc") && t.closeOnEscape && d();
    };
    return b(() => {
      t.open && l();
    }), x(() => {
      window.removeEventListener("keydown", c);
    }), S(() => open, (n) => {
      r.value = n;
    }), (n, h) => (a(), u(_, null, [
      e.noTrigger ? g("", !0) : (a(), u("div", {
        key: 0,
        onClick: l
      }, [
        p(n.$slots, "trigger", {}, () => [
          s("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": "sheet",
            "aria-expanded": "false",
            onClick: l
          }, " Open ")
        ], !0)
      ])),
      (a(), E($, { to: "body" }, [
        r.value ? (a(), u("div", {
          key: 0,
          class: "overlay",
          onClick: d
        })) : g("", !0),
        s("div", {
          id: "sheet",
          class: B(["sheet", e.position, { open: r.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: C(y.value),
          "aria-labelledby": f,
          "aria-describedby": v
        }, [
          s("button", {
            class: "close-btn",
            onClick: d,
            "aria-label": "Close"
          }, [
            p(n.$slots, "close", {}, () => [
              h[0] || (h[0] = s("svg", {
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
                s("path", { d: "M18 6 6 18" }),
                s("path", { d: "m6 6 12 12" })
              ], -1))
            ], !0)
          ]),
          s("div", I, [
            p(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)
      ]))
    ], 64));
  }
}, T = /* @__PURE__ */ W(O, [["__scopeId", "data-v-05d1c092"]]);
export {
  T as Sheet
};

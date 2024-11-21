import { ref as k, computed as m, onMounted as b, onBeforeUnmount as x, watch as S, openBlock as a, createElementBlock as c, Fragment as _, renderSlot as u, createElementVNode as s, createCommentVNode as g, createBlock as E, Teleport as $, normalizeClass as B, normalizeStyle as C } from "vue";
const W = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [i, n] of o)
    t[i] = n;
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
    const t = e, i = o, n = k(!1), v = `sheet-label-${Math.random().toString(36).substring(7)}`, f = `sheet-desc-${Math.random().toString(36).substring(7)}`, w = m(() => ["top", "bottom"].includes(t.position)), y = m(() => w.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), p = () => {
      window.addEventListener("keydown", d), n.value = !0, i("update:open", !0);
    }, l = () => {
      window.removeEventListener("keydown", d), n.value = !1, i("update:open", !1);
    }, d = (r) => {
      (r.key === "Escape" || r.key === "Esc") && closeOnEscape && l();
    };
    return b(() => {
      n.value = open;
    }), x(() => {
      window.removeEventListener("keydown", d);
    }), S(() => open, (r) => {
      n.value = r;
    }), (r, h) => (a(), c(_, null, [
      e.noTrigger ? g("", !0) : (a(), c("div", {
        key: 0,
        onClick: p
      }, [
        u(r.$slots, "trigger", {}, () => [
          s("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": "sheet",
            "aria-expanded": "false",
            onClick: p
          }, " Open ")
        ], !0)
      ])),
      (a(), E($, { to: "body" }, [
        n.value ? (a(), c("div", {
          key: 0,
          class: "overlay",
          onClick: l
        })) : g("", !0),
        s("div", {
          id: "sheet",
          class: B(["sheet", e.position, { open: n.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: C(y.value),
          "aria-labelledby": v,
          "aria-describedby": f
        }, [
          s("button", {
            class: "close-btn",
            onClick: l,
            "aria-label": "Close"
          }, [
            u(r.$slots, "close", {}, () => [
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
            u(r.$slots, "default", {}, void 0, !0)
          ])
        ], 6)
      ]))
    ], 64));
  }
}, T = /* @__PURE__ */ W(O, [["__scopeId", "data-v-3004d935"]]);
export {
  T as Sheet
};

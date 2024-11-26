import { ref as f, computed as y, onMounted as S, onBeforeUnmount as _, watch as $, openBlock as i, createElementBlock as c, Fragment as E, renderSlot as m, createElementVNode as r, createCommentVNode as g, createBlock as B, Teleport as C, normalizeClass as I, normalizeStyle as W, nextTick as M } from "vue";
const O = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [a, s] of o)
    t[a] = s;
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
    const t = e, a = o, s = f(!1), l = f(!1), w = `sheet-label-${Math.random().toString(36).substring(7)}`, k = `sheet-desc-${Math.random().toString(36).substring(7)}`, v = `sheet-${Math.random().toString(36).substring(7)}`, b = y(() => ["top", "bottom"].includes(t.position)), x = y(() => b.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), d = () => {
      s.value = !0, window.addEventListener("keydown", h), M(() => {
        l.value = !0, a("update:open", !0);
      });
    }, p = () => {
      window.removeEventListener("keydown", h), l.value = !1, a("update:open", !1);
    }, h = (n) => {
      (n.key === "Escape" || n.key === "Esc") && t.closeOnEscape && p();
    };
    return S(() => {
      t.open && d();
    }), _(() => {
      window.removeEventListener("keydown", h);
    }), $(() => t.open, (n) => {
      n && d();
    }), (n, u) => (i(), c(E, null, [
      e.noTrigger ? g("", !0) : (i(), c("div", {
        key: 0,
        onClick: d,
        onMouseover: u[0] || (u[0] = (z) => s.value = !0)
      }, [
        m(n.$slots, "trigger", {}, () => [
          r("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": v,
            "aria-expanded": "false",
            onClick: d
          }, " Open ")
        ], !0)
      ], 32)),
      (i(), B(C, { to: "body" }, [
        l.value ? (i(), c("div", {
          key: 0,
          class: "overlay",
          onClick: p
        })) : g("", !0),
        s.value ? (i(), c("div", {
          key: 1,
          id: v,
          class: I(["sheet", e.position, { open: l.value }]),
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
              u[1] || (u[1] = r("svg", {
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
            m(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)) : g("", !0)
      ]))
    ], 64));
  }
}, L = /* @__PURE__ */ O(j, [["__scopeId", "data-v-e2386242"]]);
export {
  L as Sheet
};

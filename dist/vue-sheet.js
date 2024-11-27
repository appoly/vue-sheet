import { ref as v, computed as y, onMounted as S, onBeforeUnmount as C, watch as _, openBlock as i, createElementBlock as c, Fragment as $, renderSlot as m, createElementVNode as s, createCommentVNode as f, createBlock as E, Teleport as B, normalizeClass as I, normalizeStyle as W, nextTick as M } from "vue";
const O = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [a, r] of o)
    t[a] = r;
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
    noTrigger: { type: Boolean, default: !1 },
    canClose: {
      type: Function,
      default: () => () => !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: o }) {
    const t = e, a = o, r = v(!1), l = v(!1), w = `sheet-label-${Math.random().toString(36).substring(7)}`, k = `sheet-desc-${Math.random().toString(36).substring(7)}`, g = `sheet-${Math.random().toString(36).substring(7)}`, b = y(() => ["top", "bottom"].includes(t.position)), x = y(() => b.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), d = () => {
      r.value = !0, window.addEventListener("keydown", h), M(() => {
        l.value = !0, a("update:open", !0);
      });
    }, p = async () => {
      await t.canClose() && (window.removeEventListener("keydown", h), l.value = !1, a("update:open", !1));
    }, h = (n) => {
      (n.key === "Escape" || n.key === "Esc") && t.closeOnEscape && p();
    };
    return S(() => {
      t.open && d();
    }), C(() => {
      window.removeEventListener("keydown", h);
    }), _(() => t.open, (n) => {
      n && d();
    }), (n, u) => (i(), c($, null, [
      e.noTrigger ? f("", !0) : (i(), c("div", {
        key: 0,
        onClick: d,
        onMouseover: u[0] || (u[0] = (z) => r.value = !0)
      }, [
        m(n.$slots, "trigger", {}, () => [
          s("button", {
            type: "button",
            class: "open-btn",
            "aria-controls": g,
            "aria-expanded": "false",
            onClick: d
          }, " Open ")
        ], !0)
      ], 32)),
      (i(), E(B, { to: "body" }, [
        l.value ? (i(), c("div", {
          key: 0,
          class: "overlay",
          onClick: p
        })) : f("", !0),
        r.value ? (i(), c("div", {
          key: 1,
          id: g,
          class: I(["sheet", e.position, { open: l.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: W(x.value),
          "aria-labelledby": w,
          "aria-describedby": k
        }, [
          s("button", {
            class: "close-btn",
            onClick: p,
            "aria-label": "Close"
          }, [
            m(n.$slots, "close", {}, () => [
              u[1] || (u[1] = s("svg", {
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
          s("div", T, [
            m(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)) : f("", !0)
      ]))
    ], 64));
  }
}, L = /* @__PURE__ */ O(j, [["__scopeId", "data-v-ade457ae"]]);
export {
  L as Sheet
};

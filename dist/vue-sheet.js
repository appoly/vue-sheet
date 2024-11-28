import { ref as v, computed as y, onMounted as S, onBeforeUnmount as C, watch as _, openBlock as i, createElementBlock as p, Fragment as $, renderSlot as m, createElementVNode as s, createCommentVNode as f, createBlock as E, Teleport as B, normalizeClass as I, normalizeStyle as W, nextTick as M } from "vue";
const O = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [l, r] of o)
    t[l] = r;
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
    const t = e, l = o, r = v(!1), a = v(!1), w = `sheet-label-${Math.random().toString(36).substring(7)}`, b = `sheet-desc-${Math.random().toString(36).substring(7)}`, g = `sheet-${Math.random().toString(36).substring(7)}`, k = y(() => ["top", "bottom"].includes(t.position)), x = y(() => k.value ? { height: t.height, maxHeight: t.maxHeight } : { width: t.width, maxWidth: t.maxWidth }), d = () => {
      r.value = !0, window.addEventListener("keydown", h), M(() => {
        a.value = !0, l("update:open", !0);
      });
    }, u = async () => {
      await t.canClose() && (window.removeEventListener("keydown", h), a.value = !1, l("update:open", !1));
    }, h = (n) => {
      (n.key === "Escape" || n.key === "Esc") && t.closeOnEscape && u();
    };
    return S(() => {
      t.open && d();
    }), C(() => {
      window.removeEventListener("keydown", h);
    }), _(() => t.open, (n) => {
      n ? d() : u();
    }), (n, c) => (i(), p($, null, [
      e.noTrigger ? f("", !0) : (i(), p("div", {
        key: 0,
        onClick: d,
        onMouseover: c[0] || (c[0] = (z) => r.value = !0)
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
        a.value ? (i(), p("div", {
          key: 0,
          class: "overlay",
          onClick: u
        })) : f("", !0),
        r.value ? (i(), p("div", {
          key: 1,
          id: g,
          class: I(["sheet", e.position, { open: a.value }]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          style: W(x.value),
          "aria-labelledby": w,
          "aria-describedby": b
        }, [
          s("button", {
            class: "close-btn",
            onClick: u,
            "aria-label": "Close"
          }, [
            m(n.$slots, "close", {}, () => [
              c[1] || (c[1] = s("svg", {
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
}, L = /* @__PURE__ */ O(j, [["__scopeId", "data-v-d1d50be7"]]);
export {
  L as Sheet
};

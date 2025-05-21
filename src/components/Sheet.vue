<script setup>
import {
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";

// Props
const props = defineProps({
    position: {
        type: String,
        default: "right",
        validator: (value) => {
            if (!["left", "right", "top", "bottom"].includes(value)) {
                console.error(`Invalid position: "${value}".`);
                return false;
            }
            return true;
        },
    },
    width: {
        type: String,
        default: "500px",
        validator: (value) => {
            const endings = ["%", "px", "em", "rem", "vw", "vh"];

            if (!endings.some((ending) => value.endsWith(ending))) {
                console.error(
                    `Invalid width: "${value}". Allowed endings are ${endings.join(
                        ", "
                    )}.`
                );
                return false;
            }
            return true;
        },
    },
    height: {
        type: String,
        default: "500px",
        validator: (value) => {
            const endings = ["%", "px", "em", "rem", "vw", "vh"];

            if (!endings.some((ending) => value.endsWith(ending))) {
                console.error(
                    `Invalid width: "${value}". Allowed endings are ${endings.join(
                        ", "
                    )}.`
                );
                return false;
            }
            return true;
        },
    },
    maxWidth: {
        type: String,
        default: "90%",
        validator: (value) => value.endsWith("%"),
    },
    maxHeight: {
        type: String,
        default: "90%",
        validator: (value) => value.endsWith("%"),
    },
    open: { type: Boolean, default: false },
    closeOnEscape: { type: Boolean, default: true },
    noTrigger: { type: Boolean, default: false },
    expandable: { type: Boolean, default: false },
    expandDefault: { type: Boolean, default: false },
    canClose: {
        type: Function,
        default: () => () => true,
    },
    disableOutsideScroll: { type: Boolean, default: false },
});

// Emits
const emit = defineEmits(["update:open"]);

// State
const initiated = ref(false);
const isOpen = ref(false);
const isExpanded = ref(props.expandable ? props.expandDefault : false);
const labelId = `sheet-label-${Math.random().toString(36).substring(7)}`;
const descId = `sheet-desc-${Math.random().toString(36).substring(7)}`;
const sheetId = `sheet-${Math.random().toString(36).substring(7)}`;

// Computed
const isTopOrBottom = computed(() =>
    ["top", "bottom"].includes(props.position)
);
const sizeStyles = computed(() => {
    if (isTopOrBottom.value) {
        const height = props.expandable
            ? isExpanded.value
                ? `100vh`
                : props.height
            : props.height;
        return { height: height, maxHeight: props.maxHeight };
    }
    const width = props.expandable
        ? isExpanded.value
            ? `100vw`
            : props.width
        : props.width;
    return { width: width, maxWidth: props.maxWidth };
});

// Methods
const openSheet = () => {
    // this is here incase the trigger is not being used (props.noTrigger)
    initiated.value = true;

    window.addEventListener("keydown", handleEsc);

    if (props.disableOutsideScroll) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.maxHeight = "100vh";
    }

    nextTick(() => {
        isOpen.value = true;
        emit("update:open", true);
    });
};

const closeSheet = async () => {
    const shouldClose = await props.canClose();
    if (shouldClose) {
        window.removeEventListener("keydown", handleEsc);

        if (props.disableOutsideScroll) {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.maxHeight = "";
        }

        isOpen.value = false;
        emit("update:open", false);
    }
};

const handleEsc = (event) => {
    if (
        (event.key === "Escape" || event.key === "Esc") &&
        props.closeOnEscape
    ) {
        closeSheet();
    }
};

const toggleExpand = () => {
    if (props.expandable) {
        isExpanded.value = !isExpanded.value;
    }
};

// Lifecycle Hooks
onMounted(() => {
    if (props.open) {
        openSheet();
    }
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleEsc);
});

// Watchers
watch(
    () => props.open,
    (newValue) => {
        if (newValue && !isOpen.value) {
            openSheet();
        } else if (!newValue && isOpen.value) {
            closeSheet();
        }
    }
);
</script>

<template>
    <div @click="openSheet" @mouseover="initiated = true" v-if="!noTrigger">
        <slot name="trigger">
            <button
                type="button"
                class="open-btn"
                :aria-controls="sheetId"
                :aria-expanded="isOpen"
                @click="openSheet"
            >
                Open
            </button>
        </slot>
    </div>
    <Teleport to="body">
        <div v-if="isOpen" class="overlay" @click="closeSheet"></div>

        <div
            v-if="initiated"
            :id="sheetId"
            :class="['sheet', position, { open: isOpen }]"
            role="dialog"
            aria-modal="true"
            tabindex="-1"
            :style="sizeStyles"
            :aria-labelledby="labelId"
            :aria-describedby="descId"
        >
            <div class="sheet-buttons">
                <button
                    class="icon-btn"
                    v-if="expandable"
                    @click="toggleExpand"
                    aria-label="Expand"
                >
                    <slot name="maximize" v-if="!isExpanded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-maximize"
                        >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                        </svg>
                    </slot>
                    <slot name="minimize" v-else>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-minimize"
                        >
                            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                        </svg>
                    </slot>
                </button>
                <button class="icon-btn" @click="closeSheet" aria-label="Close">
                    <slot name="close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-x"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </slot>
                </button>
            </div>

            <div class="sheet-content">
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
/* General Styles */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: opacity 0.3s ease;
}

.sheet {
    position: fixed;
    background: white;
    z-index: 1000;
    overflow-y: auto;
    transition: transform 0.3s ease;
    box-shadow: none;

    &-content {
        padding: 1rem;
    }
}

/* Sheet Positions */
.sheet.left {
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    transform: translateX(-100%);
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.06);
}

.sheet.right {
    top: 0;
    right: 0;
    height: 100%;
    width: 300px;
    transform: translateX(100%);
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.06);
}

.sheet.top {
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    transform: translateY(-100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.sheet.bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    transform: translateY(100%);
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
}

/* Open States */
.sheet.open.left {
    transform: translateX(0);
}

.sheet.open.right {
    transform: translateX(0);
}

.sheet.open.top {
    transform: translateY(0);
}

.sheet.open.bottom {
    transform: translateY(0);
}

/* Close Button */
.icon-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
}

.sheet-buttons {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 0.5rem;
    margin-left: auto;
}

/* Open Button */
.open-btn {
    background-color: #1a1a1a;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #333333;
    }
}
</style>

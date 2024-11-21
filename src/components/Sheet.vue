<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

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
        type: String, default: "500px", validator: (value) => {
            const endings = ['%', 'px', 'em', 'rem', 'vw', 'vh'];

            if (!endings.some((ending) => value.endsWith(ending))) {
                console.error(`Invalid width: "${value}". Allowed endings are ${endings.join(", ")}.`);
                return false;
            }
            return true;
        }
    },
    height: {
        type: String, default: "500px", validator: (value) => {
            const endings = ['%', 'px', 'em', 'rem', 'vw', 'vh'];

            if (!endings.some((ending) => value.endsWith(ending))) {
                console.error(`Invalid width: "${value}". Allowed endings are ${endings.join(", ")}.`);
                return false;
            }
            return true;
        }
    },
    maxWidth: { type: String, default: "90%", validator: (value) => value.endsWith("%") },
    maxHeight: { type: String, default: "90%", validator: (value) => value.endsWith("%") },
    open: { type: Boolean, default: false },
    closeOnEscape: { type: Boolean, default: true },
    noTrigger: { type: Boolean, default: false },
});



// Emits
const emit = defineEmits(["update:open"]);

// State
const isOpen = ref(false);
const labelId = `sheet-label-${Math.random().toString(36).substring(7)}`;
const descId = `sheet-desc-${Math.random().toString(36).substring(7)}`;

// Computed
const isTopOrBottom = computed(() => ["top", "bottom"].includes(props.position));
const sizeStyles = computed(() => {
    if (isTopOrBottom.value) {
        return { height: props.height, maxHeight: props.maxHeight };
    }
    return { width: props.width, maxWidth: props.maxWidth };
});

// Methods
const openSheet = () => {
    window.addEventListener("keydown", handleEsc);
    isOpen.value = true;
    emit("update:open", true);
};

const closeSheet = () => {
    window.removeEventListener("keydown", handleEsc);
    isOpen.value = false;
    emit("update:open", false);
};

const handleEsc = (event) => {
    if ((event.key === "Escape" || event.key === "Esc") && props.closeOnEscape) {
        closeSheet();
    }
};

// Lifecycle Hooks
onMounted(() => {
    if(props.open) {
        openSheet();
    }
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleEsc);
});

// Watchers
watch(() => open, (newValue) => {
    isOpen.value = newValue;
});
</script>

<template>
    <div @click="openSheet" v-if="!noTrigger">
        <slot name="trigger">
            <button type="button" class="open-btn" aria-controls="sheet" aria-expanded="false" @click="openSheet">
                Open
            </button>
        </slot>
    </div>
    <Teleport to="body">
        <!-- Background Overlay -->
        <div v-if="isOpen" class="overlay" @click="closeSheet"></div>

        <!-- Slide Sheet -->
        <div id="sheet" :class="['sheet', position, { 'open': isOpen }]" role="dialog" aria-modal="true" tabindex="-1"
            :style="sizeStyles" :aria-labelledby="labelId" :aria-describedby="descId">
            <button class="close-btn" @click="closeSheet" aria-label="Close">
                <slot name="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-x">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </slot>
            </button>

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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

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
}

.sheet.right {
    top: 0;
    right: 0;
    height: 100%;
    width: 300px;
    transform: translateX(100%);
}

.sheet.top {
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    transform: translateY(-100%);
}

.sheet.bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    transform: translateY(100%);
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
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
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
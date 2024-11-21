# Vue Sheet

A flexible, accessible, and customizable Sheet component for Vue 3. Insipired by [Shadcn](https://ui.shadcn.com/).

## Features

- Multiple positioning options (left, right, top, bottom)
- Customizable width and height
- Easy to use with v-model/prop binding
- Escape key support
- Customizable trigger and close buttons

## Installation

```bash
npm install @appoly/vue-sheet
# or
yarn add @appoly/vue-sheet
```

## Usage

```vue
<template>
  <Sheet v-model:open="isOpen" position="right">
    <template #trigger>
      <button>Open Panel</button>
    </template>
    
    <div>
      <!-- Your panel content here -->
      Panel content
    </div>
  </Sheet>
</template>

<script setup>
import { ref } from 'vue'
import { Sheet } from '@appoly/vue-sheet'

const isOpen = ref(false)
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `String` | `"right"` | Panel slide direction (left/right/top/bottom) |
| `width` | `String` | `"500px"` | Width of panel (when left/right) |
| `height` | `String` | `"500px"` | Height of panel (when top/bottom) |
| `maxWidth` | `String` | `"90%"` | Maximum width of panel |
| `maxHeight` | `String` | `"90%"` | Maximum height of panel |
| `open` | `Boolean` | `false` | Control panel open state |
| `closeOnEscape` | `Boolean` | `true` | Close panel when Escape is pressed |
| `noTrigger` | `Boolean` | `false` | Disable default trigger |

## Slots

- `trigger`: Custom trigger element
- `close`: Custom close button
- Default slot: Panel content
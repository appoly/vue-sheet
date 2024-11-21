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
  <Sheet v-model:open="isOpen" @update:open="isOpen = $event" position="right">
    <template #trigger>
      <button>Open Sheet</button>
    </template>
    
    <div>
      <!-- Your sheet content here -->
      Sheet content
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
| `position` | `String` | `"right"` | Sheet slide direction (left/right/top/bottom) |
| `width` | `String` | `"500px"` | Width of sheet (when left/right) |
| `height` | `String` | `"500px"` | Height of sheet (when top/bottom) |
| `maxWidth` | `String` | `"90%"` | Maximum width of sheet |
| `maxHeight` | `String` | `"90%"` | Maximum height of sheet |
| `open` | `Boolean` | `false` | Control sheet open state |
| `closeOnEscape` | `Boolean` | `true` | Close sheet when Escape is pressed |
| `noTrigger` | `Boolean` | `false` | Disable default trigger |

## Slots

- `trigger`: Custom trigger element
- `close`: Custom close button
- Default slot: Sheet content

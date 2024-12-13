# Vue Sheet

A flexible, accessible, and customizable Sheet component for Vue 3. Inspired by [Shadcn](https://ui.shadcn.com/).

## Features

- Multiple positioning options (left, right, top, bottom)
- Customizable width and height
- Easy to use with v-model/prop binding
- Escape key support
- Customizable trigger and close buttons

## Dependencies

- Vue 3.x

## Installation

```bash
npm install @appoly/vue-sheet
# or
yarn add @appoly/vue-sheet
```

## Usage

Basic Usage
```vue
<template>
  <Sheet 
    v-model:open="isOpen"
    @update:open="isOpen = $event"
    position="right"
    :can-close="canClose"
  >
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
import '@appoly/vue-sheet/dist/style.css'

const isOpen = ref(false)
const canClose = () => {
  return confirm('Are you sure you want to close the sheet?')
}
</script>
```

[Try it out on StackBlitz](https://stackblitz.com/edit/vue-sheet-basic?file=src%2FApp.vue)

Expandable
```vue
<template>
  <Sheet
    position="left"
    expandable
    :expand-default="true"
  >
    <template #trigger>
      <button>Open Sheet</button>
    </template>
    
    <div>
      <!-- Your sheet content here -->
      Sheet content
    </div>
  </Sheet>
</template>
```
[Try it out on StackBlitz](https://stackblitz.com/edit/vue-sheet-basic-zmh3ukfn?file=src%2FApp.vue)

Custom Buttons
```vue
<template>
  <Sheet 
    position="bottom"
  >
    <template #trigger>
      <button>Open Sheet</button>
    </template>
    
    <template #maximize>
      <button>Maximize</button>
    </template>
    
    <template #minimize>
      <button>Minimize</button>
    </template>
    
    <template #close>
      <button>Close</button>
    </template>
    
    <div>
      <!-- Your sheet content here -->
      Sheet content
    </div>
  </Sheet>
</template>
```
[Try it out on StackBlitz](https://stackblitz.com/edit/vue-sheet-basic-br4j7zo3?file=src%2FApp.vue)

## Props

| Prop | Type | Default | Description | Allowed Values |
|------|------|---------|-------------|----------------|
| position | String | "right" | Sheet slide direction | "left", "right", "top", "bottom" |
| width | String | "500px" | Width of sheet (when left/right) | CSS width values (px, %, em, rem, vw, vh) |
| height | String | "500px" | Height of sheet (when top/bottom) | CSS height values (px, %, em, rem, vw, vh) |
| maxWidth | String | "90%" | Maximum width of sheet | Percentage values |
| maxHeight | String | "90%" | Maximum height of sheet | Percentage values |
| open | Boolean | false | Control sheet open state | true/false |
| closeOnEscape | Boolean | true | Close sheet when Escape is pressed | true/false |
| noTrigger | Boolean | false | Disable default trigger | true/false |
| canClose | Function | () => true | Custom function to determine if the sheet can be closed | Function returning boolean |
| expandable | Boolean | false | Allow the sheet to be expanded | true/false |
| expandDefault | Boolean | false | Default expand state (true means expanded) | true/false |

## Slots

- `trigger`: Custom trigger element
- `close`: Custom close button
- `maximize`: Custom maximize button
- `minimize`: Custom minimize button
- Default slot: Sheet content
<script setup lang="ts">
defineProps<{
	modelValue: boolean
}>()

</script>

<template>
	<div :class="modelValue ? 'selected radio' : 'not-selected radio'" class="radio">
	</div>
</template>

<style scoped>
.radio {
	width: 20px;
	height: 20px;
	border-radius: 30%;
	border: 1px solid white;
	transition: all 0.4s;
}

.radio:hover {
	cursor: pointer;
	background:  var(--color-highlight);
}

.selected {
	background:  var(--color-highlight);
}

.not-selected {
	background: var(v-background-soft);
}
</style>


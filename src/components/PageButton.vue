<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
	maxPage: number,
	'modelValue': number
}>();

const emit = defineEmits<{
	(e: 'update:model-value', pageNumber: number): number,
}>();

const nextPage = () => {
	if (props.modelValue >= props.maxPage) {
		return;
	}
	emit('update:model-value', props.modelValue + 1);
}

const prevPage = () => {
	if (props.modelValue > 0) {
		emit('update:model-value', props.modelValue - 1);
	}
}

</script>

<template>
	<div class="root">
		<button
		@click="prevPage"
		>
			Previous
		</button>
		<span class="progress"> {{ modelValue }} / {{ maxPage }} </span>
		<button data-testid="next-button" @click="nextPage">
			Next
		</button>
	</div>
</template>

<style scoped>
.root {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
button {
	font-weight: 600;
	background-color: white;
	border: 5px solid white;
	box-shadow: 1px 2px 2px #554f4f;
	border-radius: 10%;
	transition: all 0.2s;
}

button:hover {
	background-color: var(--color-highlight);
	border: 5px solid var(--color-highlight);
	box-shadow: 1px 2px 2px #554f4f;
	color: white;
	cursor: pointer;
}
</style>


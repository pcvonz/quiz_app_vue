<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref, watchEffect } from 'vue';

const props = defineProps<{
	limit: number
}>();

const emit = defineEmits<{
	(e: 'limitReached'): void
}>();

const currentTime = ref<number>(props.limit);

	onMounted(() => {
		setInterval(() => {
		currentTime.value -= .1;
		}, 100);
	});

watchEffect(() => {
	if (currentTime.value <= 0) {
		emit('limitReached');
	}
});

const timerDisplay = computed(() => {
		if ( currentTime.value < 0 ) {
			return "Time over";
		}
		return currentTime.value.toFixed(0);
});

const getTimerBarWidth = () => {
	return (currentTime.value / props.limit)  * 100;
}

</script>

<template>
	<div class="timer-wrapper">
		<div :style="`width: ${getTimerBarWidth()}%`" class="timer-bar"> </div>
		<h1 class="timer-text"> {{ timerDisplay }} </h1>
	</div>
</template>

<style scoped>
.timer-wrapper {
	position: relaive;
	background-color: var(--color-background-soft);
}
.timer-bar {
	transition: all 1s;
	background-color: var(--color-highlight);
	height: 100%;
}
.timer-text {
	position: absolute;

	width: 100%;
	text-align: center;
	top: 0;
	left: 0;
}
</style>



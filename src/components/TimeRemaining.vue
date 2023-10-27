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
		currentTime.value -= 1;
		}, 1000);
	});

watchEffect(() => {
	if (currentTime.value === 0) {
		emit('limitReached');
	}
});

const timerDisplay = computed(() => {
		if ( currentTime.value < 0 ) {
			return "Time over";
		}
		return currentTime.value;
});

</script>

<template>
	<h1> {{ timerDisplay }} </h1>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>



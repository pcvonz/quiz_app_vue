<script setup lang="ts">
	import { ref } from "vue";

	const value = ref<boolean>(false);

const onClick = () => {
	value.value = !value.value;
}

</script>

<template>
	<div :class="value ? 'selected radio' : 'not-selected radio'" @click="onClick" class="radio">
	</div>
</template>

<style scoped>
.radio {
	width: 20px;
	height: 20px;
	border-radius: 30%;
		border: 1px solid gray;
}
	.selected {
		background: linear-gradient(blue, 10%, pink);
		transition: all 1s;
	}

	.not-selected {
		background: linear-gradient(blue, 100%, pink);
		transition: all 1s;
	}
</style>


<script setup lang="ts">

	const emit = defineEmits<{
		(e: 'answer', answer: string): void
	}>();


	defineProps<{
		userAnswer: string | undefined,
		questionNumber: number,
		question: string,
		possibleAnswers: string[],
		answer: string 
	}>();

</script>

<template>
	<div class="question">
		<h1 class="question-title"> {{ question }} 
			<div class="correct-indicator" v-if="userAnswer">
				{{ userAnswer !== answer ? "❌" : "✅︎" }}
			</div>
		</h1>
		<div v-for="answer in possibleAnswers">
			<button @click="emit('answer', answer)"> 
				{{ answer }} 
			</button>
		</div>
	</div>
</template>

<style scoped>
.question-title {
	position: relative;
}
.correct-indicator {
	width: 0;
	position: absolute;
	right: 0;
	top: 0;
}
</style>


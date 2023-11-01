<script setup lang="ts">
	import Radio from "./Radio.vue";

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
	<div>
		<div class="question">
			<h1 data-testid="question-title" class="question-title"> {{ question }} 
				<div data-testid="correct-indicator" class="correct-indicator" v-if="userAnswer">
					{{ userAnswer !== answer ? "❌" : "✅︎" }}
				</div>
			</h1>
			<div class="option" v-for="answer in possibleAnswers">
				{{ answer }}
				<Radio 
						:data-testid="`answer-${answer}`"
						@click="emit('answer', answer)"
						:model-value="userAnswer === answer"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.question-title {
	position: relative;
}

.question {
	max-width: 20rem;
}

.option div {
	margin-left: 1rem;
}

.option {
	display: flex;
	justify-content: end;
}

.correct-indicator {
	width: 0;
	position: absolute;
	right: 0;
	top: 0;
}
</style>


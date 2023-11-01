<script setup lang="ts">
	import { computed } from "vue";
import Radio from "./Radio.vue";

	const emit = defineEmits<{
		(e: 'answer', answer: string): void
	}>();


	const props = defineProps<{
		userAnswer: string | undefined,
		questionNumber: number,
		question: string,
		possibleAnswers: string[],
		answer: string 
	}>();

const userAnswerClass = computed(() => {
	if (!props.userAnswer) {
		return;
	}
	return props.userAnswer === props.answer ? 'correct' : 'incorrect';
});

</script>

<template>
	<div>
		<div :class="`question ${userAnswerClass}`">
				<div data-testid="correct-indicator" class="correct-indicator" v-if="userAnswer">
					{{ userAnswer !== answer ? "❌" : "✅︎" }}
				</div>

			<h1 data-testid="question-title" class="question-title"> {{ question }} </h1>
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
.question {
	position: relative;
	background-color: var(--color-background-soft);
	margin-bottom: 1rem;
	padding: 1rem;
	border-radius: 1%;
	max-width: 20rem;
	transition: all 0.2s;
}

.correct {
	background-color: var(--color-correct);
}

.incorrect {
	background-color: var(--color-incorrect);
}

.option div {
	margin-left: 1rem;
}

.option {
	display: flex;
	align-items: center;
	justify-content: end;
}

.correct-indicator {
	width: 1.3rem;
	position: absolute;
	right: 0;
	top: 0;
}
</style>


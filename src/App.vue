<script setup lang="ts">
import { ref } from 'vue';
import QuestionComponent from './components/QuestionComponent.vue'
import TimeRemaining from './components/TimeRemaining.vue';
import { computed } from '@vue/reactivity';

const questions = ref<Array<{
	userAnswer: string | undefined,
	correctAnswer: string,
	question: string,
	possibleAnswers: string[]
}>>([ 
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is c?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is c?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is c?",
		userAnswer: undefined
	} ]);

const answerQuestion = (questionNumber: number, answer: string) => {
	questions.value[questionNumber].userAnswer = answer;
}
const limitReached = ref(false);

const progress = computed(() => {
	const totalQuestions = Object.keys(questions.value).length;
	const answeredQuestions = Object.values(questions.value).filter(question => question.userAnswer !== undefined).length;

	return `${answeredQuestions} / ${totalQuestions}`
});

const isQuizFinished = computed(() => {
	const totalQuestions = Object.keys(questions.value).length;
	const answeredQuestions = Object.values(questions.value).filter(question => question.userAnswer !== undefined).length;
	return ( totalQuestions === answeredQuestions ) || limitReached.value;
});

const score = computed(() => Object.values(questions.value).reduce((accum, value) => {
	if ( value.userAnswer === value.correctAnswer ) {
		return accum + 1;
	}
	return accum;
}, 0));

const onLimitReached = () => {
	limitReached.value = true;

}
</script>

<template>
	<div class="questions">
		<TimeRemaining 
			 v-if="!isQuizFinished"
					@limit-reached="onLimitReached"
					:limit="30"
					/>
		<div v-if="isQuizFinished">
			Your score is {{ score }} out of {{ questions.length }}
		</div>

		<template v-else v-for="( question, index ) in questions">
			<QuestionComponent
					@answer="(answer: string) => answerQuestion(index, answer)"
					:userAnswer="questions[index].userAnswer"
					:question-number="index"
					:question="question.question"
					:possibleAnswers='question.possibleAnswers'
					:answer="question.correctAnswer"
					/>
		</template>
		<div>
		</div>
		{{ progress }}
	</div>
</template>

<style scoped>
.questions {
	display: grid;
}
</style>

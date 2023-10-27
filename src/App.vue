<script setup lang="ts">
import { ref } from 'vue';
import QuestionComponent from './components/QuestionComponent.vue'
import TimeRemaining from './components/TimeRemaining.vue';
import { computed } from '@vue/reactivity';

const questions = ref<Record<number, {
	userAnswer: string | undefined,
	correctAnswer: string,
	question: string,
	possibleAnswers: string[]
}>>({ 
	0: {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is c?",
		userAnswer: undefined
	},
	1: {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is c?",
		userAnswer: undefined
	},
	2: {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is c?",
		userAnswer: undefined
	}
});

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
	<div v-if="isQuizFinished">
		Your score is {{ score }} 
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
	<TimeRemaining 
			@limit-reached="onLimitReached"
			:limit="30"
			/>
	<div>
	{{ progress }}
	</div>
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

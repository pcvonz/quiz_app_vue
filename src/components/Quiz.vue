<script setup lang="ts">
import { ref } from 'vue';
import QuestionComponent from './QuestionComponent.vue'
import TimeRemaining from './TimeRemaining.vue';
import PageButton from "./PageButton.vue";
import { computed } from '@vue/reactivity';

const page = ref(0);

const props = defineProps<{
	questions: Array<{
		userAnswer: string | undefined,
		correctAnswer: string,
		question: string,
		possibleAnswers: string[]
	}>,
	maxNumberToRender: number
}>();

const questions = ref([...props.questions]);

const answerQuestion = (questionNumber: number, answer: string) => {
	questions.value[questionNumber].userAnswer = answer;
	console.log(questions.value);
}
const limitReached = ref(false);

const progress = computed(() => {
	const totalQuestions = questions.value.length;
	const answeredQuestions = questions.value.filter(question => question.userAnswer !== undefined).length;

	return `${answeredQuestions} / ${totalQuestions}`
});

const isQuizFinished = computed(() => {
	const totalQuestions = questions.value.length;
	const answeredQuestions = questions.value.filter(question => question.userAnswer !== undefined).length;
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


const getQuestionIndex = (index: number, page: number) => {
	if (page === 0) {
		return index - 1;
	}
	const currentIndex = (page * props.maxNumberToRender) + ( index - 1)
	return currentIndex;
}

const getMaxPage = () => {
  let numQuestions = questions.value.length;
	let max = props.maxNumberToRender;
	let pageCount = 0;
	while (numQuestions > 0) {
		numQuestions -= max;
		pageCount += 1;
	}
	return pageCount - 1;
}

</script>

<template>
	<div class="questions">
		<TimeRemaining 
			 class="timeRemaining"
			 v-if="!isQuizFinished"
					@limit-reached="onLimitReached()"
					:limit="30"
					/>

		<div class="quiz-over-wrapper" v-if="isQuizFinished">
			<div class="quiz-over">
				Your score is {{ score }} out of {{ questions.length }}
			</div>
		</div>

		<div class="question" v-else>
			<template  v-for="index in maxNumberToRender">
				<QuestionComponent
						v-if="questions[getQuestionIndex(index, page)]"
						@answer="(answer: string) => answerQuestion(index, answer)"
						:userAnswer="questions[getQuestionIndex(index, page)].userAnswer"
						:question-number="index"
						:question="questions[getQuestionIndex(index, page)].question"
						:possibleAnswers='questions[getQuestionIndex(index, page)].possibleAnswers'
						:answer="questions[getQuestionIndex(index, page)].correctAnswer"
					/>
			</template>
		</div>

		<PageButton 
					class="pageButton"
					:maxPage="getMaxPage()"
					@prevPage="(pageNumber: number) => page = pageNumber" 
					@nextPage="(pageNumber: number) => page = pageNumber" 
		/>
	</div>
</template>

<style scoped>
.quiz-over-wrapper {
	display: flex;
	align-items: center;
	font-style: 600;;
	font-size: 2rem;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--color-background);
	opacity: 0.8;
}
.questions {
	height: 100%;
	display: grid;
	grid-template-rows: 60px 1fr 60px;
	grid-template-areas: 
		"time-remaining time-remaining time-remaining"
		"question question question"
		"page-button page-button page-button";
}

.question {
	grid-area: question;
	height: 100%;
	padding: 1rem;
	display: flex;
}

.timeRemaining {
	grid-area: time-remaining;
}

.pageButton {
	background-color: var(--color-background-soft);
	padding: 1rem;
	grid-area: page-button;
}
</style>


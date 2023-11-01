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
}
const limitReached = ref(false);

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
					:limit="60"
					/>

		<Transition name="slide-fade">
			<div class="quiz-over-wrapper" v-if="isQuizFinished">
				<div class="quiz-over">
					Your score is {{ score }} out of {{ questions.length }}
				</div>
			</div>
		</Transition>

		<div class="question" v-if="!isQuizFinished">
			<TransitionGroup name="quiz" tag="div">
				<div v-for="index in maxNumberToRender"
							:key="getQuestionIndex(index, page)"
					>
					<QuestionComponent
							v-if="questions[getQuestionIndex(index, page)]"
							@answer="(answer: string) => answerQuestion(getQuestionIndex(index, page), answer)"
							:userAnswer="questions[getQuestionIndex(index, page)].userAnswer"
							:question-number="index"
							:question="questions[getQuestionIndex(index, page)].question"
							:possibleAnswers='questions[getQuestionIndex(index, page)].possibleAnswers'
							:answer="questions[getQuestionIndex(index, page)].correctAnswer"
							/>
				</div>
			</TransitionGroup>
		</div>

		<PageButton 
					class="pageButton"
					:maxPage="getMaxPage()"
					v-model="page"
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
	background: var(--color-background);
	grid-template-rows: 37px 1fr 60px;
	grid-template-columns: 1fr;
	grid-template-areas: 
		"time-remaining time-remaining time-remaining"
		"question question question"
		"page-button page-button page-button";
}

@media (min-width: 1024px) {
	.questions {
	grid-template-columns: 1fr;
		border: 5px solid var(--color-background);
	}
}

.question {
	grid-area: question;
	height: 100%;
	padding: 1rem;
	display: flex;
	justify-content: center;
}

.timeRemaining {
	grid-area: time-remaining;
}

.pageButton {
	background-color: var(--color-background-soft);
	padding: 1rem;
	grid-area: page-button;
}

.quiz-move,
.quiz-enter-active,
.quiz-leave-active {
  transition: all .5s ease;
	top: 0;
}
.quiz-enter-from,
.quiz-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
.quiz-leave-active {
  position: absolute;
}

.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0, 0.0, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>


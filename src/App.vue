<script setup lang="ts">
import Quiz from "./components/Quiz.vue";
const questions = [
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 0?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 1?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 2?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 3?",
		userAnswer: undefined
	}, 
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 4?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 5?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 6?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["a", "b", "c"],
		correctAnswer: "c",
		question: "Which one is 7?",
		userAnswer: undefined
	}
	]
</script>

<template>
	<Quiz
			:questions="questions"
			:maxNumberToRender="4"
			/>

</template>

<style scoped>
</style>

<script setup lang="ts">
import Quiz from "./components/Quiz.vue";
const questions = [
	 {
		possibleAnswers: ["Crooked Rain Crooked Rain", "Slanted & Enchanted", "Brighten the corners"],
		correctAnswer: "Slanted & Enchanted",
		question: "What was Pavement's first album?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["Pocket Calculator", "Computer World", "My Computer"],
		correctAnswer: "My Computer",
		question: "Which is not a song by Kraftwerk?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["Stephen Malkmus", "Bob", "Steve West"],
		correctAnswer: "Stephen Malkmus",
		question: "Who is the lead singer of Pavement?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["Pixies", "The Pixies", "Fight Club"],
		correctAnswer: "Pixies",
		question: "Who wrote the song 'Where is My Mind'?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["Frank Black", "Stephen Malkmus", "Falk Grieffenhagen"],
		correctAnswer: "Frank Black",
		question: "Who is the leader singer of Pixies?",
		userAnswer: undefined
	},
	 {
		possibleAnswers: ["Power Plant", "Windmill", "Calculator", "Craft Work"],
		correctAnswer: "Power Plant",
		question: "What does Kraftwerk mean?",
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

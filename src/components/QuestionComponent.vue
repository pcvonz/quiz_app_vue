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
	<h1> {{ question }} </h1>
	<div v-for="answer in possibleAnswers">
		<div @click="emit('answer', answer)"> 
			{{ answer }} 
		</div>
	</div>
	<div v-if="userAnswer && userAnswer !== answer">
		That's the wrong answer
	</div>
	<div v-else-if="userAnswer && userAnswer === answer">
		That's the correct answer!
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


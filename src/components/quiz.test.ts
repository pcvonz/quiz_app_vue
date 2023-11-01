import { expect, test, describe} from 'vitest';
import { mount } from '@vue/test-utils'
import Quiz from "./Quiz.vue";

const generateMockQuestions = (num: number) => {
	const questions = [];
	for (let i = 0; i < num; i ++) {
		questions.push(
			{
				possibleAnswers: ["a", "b", "c"],
				correctAnswer: "c",
				question: `${i}`,
				userAnswer: undefined
			}
		);
	}
	return questions;
}

describe("Page Button", () => {
	test.each([
		[0, '0'],
		[1, '1'],
		[2, '2'],
		[3, '3'],
		[4, '4'],
		[5, '5']
	])('Navigates to correct page for %d clicks', async (numClicks, expectedText) => {
		const wrapper = mount(Quiz, {
			props: {
				questions: generateMockQuestions(8) ,
				maxNumberToRender: 1 
			}
		})	
		const nextButton = wrapper.find("[data-testid=next-button]");
		for (let i = 0; i < numClicks; i++) {
			await nextButton.trigger('click');
		}
		const progress = wrapper.find("[data-testid=question-title]");
		expect(progress.text()).toBe(expectedText);
	});
	test.each([
		[8, 3, '0 / 2'],
		[8, 2, '0 / 3'],
		[8, 4, '0 / 1'],
		[8, 5, '0 / 1'],
		[8, 8, '0 / 0'],
		[8, 1, '0 / 7']
	])('calculated correct page count for %d questions and %d questions for page', (numQuestions, maxNumberToRender, expectedText) => {
		const wrapper = mount(Quiz, {
			props: {
				questions: generateMockQuestions(numQuestions) ,
				maxNumberToRender: maxNumberToRender
			}
		})	
		const progress = wrapper.find(".progress");
		expect(progress.text()).toBe(expectedText);
	});
});

describe("QuestionComponent", () => {
	test('Shows correct answer when correct answer click', async () => {
		const wrapper = mount(Quiz, {
			props: {
				questions: generateMockQuestions(8) ,
				maxNumberToRender: 1 
			}
		});
		const correctAnswer = wrapper.find("[data-testid=answer-c]");
		await	correctAnswer.trigger('click');
		const indicator = wrapper.find("[data-testid=correct-indicator]");

		expect(indicator.text()).toBe("✅︎");
	});
	test('Shows incorrect answer when incorrect answer click', async () => {
		const wrapper = mount(Quiz, {
			props: {
				questions: generateMockQuestions(8) ,
				maxNumberToRender: 1 
			}
		});
		const correctAnswer = wrapper.find("[data-testid=answer-a]");
		await	correctAnswer.trigger('click');
		const indicator = wrapper.find("[data-testid=correct-indicator]");

		expect(indicator.text()).toBe("❌");
	});
});

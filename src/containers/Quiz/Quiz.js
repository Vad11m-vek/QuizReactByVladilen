import React, { Component } from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActivQuiz/ActivQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
	state = {
		results: {},//{[id]: success error}
		isFinihed: false,
		activQuestion: 0,
		answerState: null,//{[id], success or err}
		quiz: [
			{
				question: 'Какого цвета небо?',
				rightAnswerId: 2,
				id: 1,
				answers: [
					{ text: 'Grey', id: 1 },
					{ text: 'Blue', id: 2 },
					{ text: 'Gold', id: 3 },
					{ text: 'Black', id: 4 },
				]
			},
			{
				question: 'Какого цвета туча?',
				rightAnswerId: 1,
				id: 2,
				answers: [
					{ text: 'Grey', id: 1 },
					{ text: 'Blue', id: 2 },
					{ text: 'Gold', id: 3 },
					{ text: 'Black', id: 4 },
				]
			},
			{
				question: 'Какого цвета небо?1',
				rightAnswerId: 2,
				id: 3,
				answers: [
					{ text: 'Grey', id: 1 },
					{ text: 'Blue', id: 2 },
					{ text: 'Gold', id: 3 },
					{ text: 'Black', id: 4 },
				]
			},
		],
	}
	onAnswerClickHandler = (answerId) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return
			}
		}
		const question = this.state.quiz[this.state.activQuestion]
		const results = this.state.results
		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
			}
			this.setState({
				answerState: { [answerId]: 'success' },
				results
			})
			const timeout = window.setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinihed: true,
					})





				} else {
					this.setState({
						activQuestion: this.state.activQuestion + 1,
						answerState: null,
					})
				}

				window.clearTimeout(timeout)
			}, 1000)

		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: { [answerId]: 'error' },
				results,
			})
		}

	}
	isQuizFinished() {
		return (this.state.activQuestion + 1) === this.state.quiz.length
	}
	retryHandler = () => {
		this.setState({
			activQuestion: 0,
			answerState: null,
			isFinihed: false,
			results: {},
		})
	}
	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1> Ответьте на все вопросы</h1>
					{
						this.state.isFinihed
							? <FinishedQuiz
								results={this.state.results}
								quiz={this.state.quiz}
								onRetry={this.retryHandler}
							/>
							:
							<ActiveQuiz
								answers={this.state.quiz[this.state.activQuestion].answers}
								question={this.state.quiz[this.state.activQuestion].question}
								onAnswerClick={this.onAnswerClickHandler}
								quizLength={this.state.quiz.length}
								answerNumber={this.state.activQuestion + 1}
								state={this.state.answerState}
							/>
					}

				</div>
			</div>
		)
	}
}
export default Quiz;
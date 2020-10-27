<template>
  <div class="container-app">
    <div class="container-quiz">
      <div class="header-quiz">
        <img style="width: 30%;" src="./assets/tandem-logo.png" />
      </div>
      <div class="step-progress" :style="{ width: progress + '%' }"></div>
      <div
        class="box"
        v-for="(question, index) in questions.slice(a, b)"
        :key="index"
        v-show="quiz"
      >
        <div class="box-question">
          <div v-if="b === 1">
            <h2 class="round-color">Welcome to Round 1!</h2>
            <h4>Your current score is: {{ average }}</h4>
            <br />
          </div>
          <div v-if="b === 10">
            <h2 class="round-color">Welcome to Round 2!</h2>
            <h4>Your current score is: {{ average }}</h4>
            <br />
          </div>
          <div v-if="b === 21">
            <h2 class="round-color">Round 3 - Final Question!</h2>
            <h4>Your current score is: {{ average }}</h4>
            <br />
          </div>
          <h2>Question {{ b }}/{{ questions.length }}</h2>
          <p>{{ question.question }}</p>
        </div>
        <div class="box-answer">
          <ul>
            <li
              v-for="(answer, index) in question.answer"
              :key="index"
              class="li"
              @click="selectAnswer(answer, index)"
              :class="correct ? check(answer) : ''"
            >
              {{ answer.answerOption }}
              <div
                class="fas fa-check"
                v-if="correct ? answer.correct : ''"
              ></div>
              <div
                class="fas fa-times"
                v-if="correct ? !answer.correct : ''"
              ></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="box-score" v-if="score_show">
        <h2>Congratulations!</h2>
        <h2>Your final score is:</h2>
        <h2>{{ average }}</h2>
        <div class="btn-restart">
          <button @click="restartQuiz">
            Play Again <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      <div class="footer-quiz">
        <div v-if="progress <= 99" class="box-button">
          <button
            @click="skipQuestion()"
            :style="next ? 'background-color: rgb(254, 235, 79' : ''"
          >
            Skip
          </button>
          <button
            @click="nextQuestion()"
            :style="!next ? 'background-color: rgb(254, 235, 79' : ''"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questions from "./data/data.js";
export default {
  data() {
    return {
      questions: questions,
      a: 0,
      b: 1,
      next: true,
      score_show: false,
      quiz: true,
      score: 0,
      correct: false,
      progress: 0,
    };
  },
  name: "App",
  components: {},
  computed: {
    average() {
      return (this.score / this.questions.length).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
      });
    },
  },
  methods: {
    selectAnswer(e) {
      this.correct = true;
      this.next = false;
      if (e.correct) {
        this.score++;
      }
    },
    check(status) {
      if (status.correct) {
        return "correct";
      } else {
        return "incorrect";
      }
    },
    //Next Question
    nextQuestion() {
      if (this.next) {
        return;
      }
      this.progress = this.progress + 100 / this.questions.length;
      if (this.questions.length - 1 == this.a) {
        this.score_show = true;
        this.quiz = false;
      } else {
        this.a++;
        this.b++;
        this.correct = false;
        this.next = true;
      }
    },
    //Skip Question
    skipQuestion() {
      if (!this.next) {
        return;
      }
      this.progress = this.progress + 100 / this.questions.length;
      if (this.questions.length - 1 == this.a) {
        this.score_show = true;
        this.quiz = false;
      } else {
        this.a++;
        this.b++;
      }
    },
    // Resets Quiz
    restartQuiz() {
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>

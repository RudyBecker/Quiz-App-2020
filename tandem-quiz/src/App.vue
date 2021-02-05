<template>
  <div class="container-app">
    <div class="container-quiz">
      <div class="header-quiz">
        <img style="width: 30%;" src="./assets/Trivia.png" />
      </div>
      <!-- Dynamically Display Progress through the Game -->
      <div class="step-progress" :style="{ width: progress + '%' }"></div>
      <!-- Cycle through each question option screen -->
      <div
        class="box"
        v-for="(question, index) in questions.slice(a, b)"
        :key="index"
        v-show="quiz"
      >
        <!-- Dynamically Render Rounds (1st , 2nd, Final Round) -->
        <div class="box-question">
          <div v-if="b === 1">
            <h2 class="round-color">Welcome to Round 1!</h2>
            <div v-if="hide_score">
              <h4>Your current score is: {{ averageFirst }}</h4>
            </div>
            <br />
          </div>
          <div v-if="b === 10">
            <h2 class="round-color">Welcome to Round 2!</h2>
            <div v-if="hide_score">
              <h4>Your current score is: {{ averageSecond }}</h4>
            </div>
            <br />
          </div>
          <div v-if="b === 21">
            <h2 class="round-color">Round 3 - Final Question!</h2>
            <div v-if="hide_score">
              <h4>Your current score is: {{ averageFinal }}</h4>
            </div>
            <br />
          </div>
          <h2>Question {{ b }}/{{ questions.length }}</h2>
          <p>{{ question.question }}</p>
        </div>
        <!-- Display Answer Choices upon click check if correct, if correct add to score data variable -->
        <div class="box-answer">
          <ul>
            <!-- Loop through JSON Array of Objects that show questions and answers -->
            <li
              v-for="(answer, index) in question.answer"
              :key="index"
              class="li"
              @click="selectAnswer(answer, index)"
              :class="correct ? check(answer) : ''"
            >
              {{ answer.answerOption }}
              <!-- Ternary to show check mark or X mark on correct or incorrect answers -->
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
      <!-- Final Window to Show Score -->
      <div class="box-score" v-if="score_show">
        <h2>Congratulations!</h2>
        <h2>Your final score is:</h2>
        <h1>{{ average }}</h1>
        <h2>Coded by Rudy Becker</h2>
        <div class="btn-restart">
          <button @click="restartQuiz">
            Play Again <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      <div class="footer-quiz">
        <div v-if="progress <= 99" class="box-button">
          <!-- If Skip go to next question -->
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
// Import of Questions stored in Array of Objects
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
      hide_score: true,
    };
  },
  name: "App",
  computed: {
    // Score Calculations for each Round
    averageFinal() {
      return (this.score / 20).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
      });
    },
    averageSecond() {
      return (this.score / 9).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
      });
    },
    averageFirst() {
      return (this.score / 1).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
      });
    },
    average() {
      return (this.score / this.questions.length).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
      });
    },
  },
  methods: {
    // Check answer if correct increase running score value
    selectAnswer(e) {
      this.correct = true;
      this.next = false;
      this.hide_score = false;
      if (e.correct) {
        this.score++;
      }
    },
    // return CSS on Correct and Incorrect buttons
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
        this.hide_score = true;
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

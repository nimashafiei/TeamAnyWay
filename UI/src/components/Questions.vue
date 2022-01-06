<template>
  <div>
    <step-progress
      v-if="page > 1"
      :steps="mySteps"
      :current-step="page - 2"
      icon-class="fa fa-check"
      active-color="#12174b"
    ></step-progress>

    <div v-if="page == 1">
      <div class="s-header">
        <h4>Test: Are you an introvert or an extrovert?</h4>
      </div>
      <p class="s-p">
         So do you consider yourself more of an introvert or an extrovert? Take this test, put together with input from psychoanalyst Sandrine Dury, and find out
      </p>
      <a @click="page++" class="btn2 btn"><span>Start</span></a>
    </div>


    <template v-for="(item,k) in questions" >
        <div v-bind:key="k" v-if="page == (k+2)">
            <hr/>
            <div class="s-header">
                <h6>{{item.query}}</h6>
            </div>
            <p class="s-p">
                <ul class="radios">
                    <li><div><div><input v-model="item.answer" value="1" type="radio" :name="'answer-'+k">  </div><div class="item-s"> {{item.options[0].text}} </div></div></li>
                    <li><div><div><input v-model="item.answer" value="2" type="radio" :name="'answer-'+k">  </div><div class="item-s"> {{item.options[1].text}} </div></div></li>
                    <li><div><div><input v-model="item.answer" value="3" type="radio" :name="'answer-'+k">  </div><div class="item-s"> {{item.options[2].text}} </div></div></li>
                    <li><div><div><input v-model="item.answer" value="4" type="radio" :name="'answer-'+k">  </div><div class="item-s"> {{item.options[3].text}} </div></div></li>
                </ul>
            </p>
            <a @click="next(item)" class="btn2 btn"><span>Next</span></a>
        </div>
    </template>

    <div v-if="page == questions.length + 2">
      <div class="s-header">
        <h4>Are you an ...</h4>
      </div>
      <p class="s-p">
       Are you an introvert or an extrovert?
      </p>

    <div style="text-align:center">
    <table     style=" margin: 0 auto;">
          <tr>
            <th>Introvert</th>
            <th>Extrovert</th>
          </tr>
          <tr>
            <td>{{introvert}} %</td>
            <td>{{extrovert}} %</td>
          </tr>
        </table>
    
    </div>
      
     
     <p style="text-align:center">
          <img width="250" src="../assets/result.jpg" />
     </p>
      <a @click="reset()" class="btn2 btn"><span>Reset</span></a>
    </div>
    
  </div>
</template>

<script>
import StepProgress from "vue-step-progress";
import "vue-step-progress/dist/main.css";
import axios from "axios";
export default {
  components: {
    "step-progress": StepProgress,
  },

  mounted() {
    this.loadData();
  },

  data() {
    return {
      page: 1,
      mySteps: [],
      questions: [],
      introvert: 0,
      extrovert: 0,
    };
  },

  methods: {
    reset() {
      this.page = 1;
      this.loadData();
    },
    async loadData() {
      await axios
        .get("http://localhost:3000/test/questions/1")
        .then((response) => {
          this.questions = response.data.questions;
          this.mySteps = response.data.questions.map((item, index) => {
            return "QUSETION " + (index + 1);
          });
        })
        .catch(() => {
          alert("Not found service");
        });
    },
    async next(item) {
      if (item.answer != null) {
        this.page++;
        if (this.questions.length + 2 == this.page) {
          const form_data = {
            answers: this.questions,
          };
          await axios
            .post("http://localhost:3000/test/", form_data)
            .then((response) => {
              this.introvert = response.data.introvert;
              this.extrovert = response.data.extrovert;
            })
            .catch(() => {
              alert("Not found service");
            });
        }
      }
    },
  },
};
</script>


<style >
.item-s {
  font-size: 16px !important;
  margin-left: 8px;
}

.radios li > div {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.radios li {
  margin-bottom: 12px;
}
table,
th,
td {
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
}
</style>

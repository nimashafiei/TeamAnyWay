<template>

  <section class="section-1">

    <div class="s-title">
      <h6>An introvert or an extrovert?</h6>
    </div>

    <div class="grid-section-1">

      <div class="section-1-item-1">
        <div style="padding:40px">
          <Questions></Questions>
        </div>
        
      </div>
      <div class="section-1-item-2">
        <div class="after-slider-grid2">
        </div>
      </div>
      
      
    </div>
  </section>

</template>


<script>
import Questions from "./Questions.vue";

export default {
  name: "App",
  components: {
   Questions
  },
};
</script>

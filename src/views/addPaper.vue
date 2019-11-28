<template>
  <div class="add-paper">
    <c-header :title="isEdite ? '编辑选择题' : '新建选择题'"></c-header>
    <choice-question v-if="pageType === 1"></choice-question>
  </div>
</template>
<script>
import choiceQuestion from "../components/choiceQuestion";
export default {
  components: {
    choiceQuestion
  },
  computed: {
    pageType() {
      return +this.$route.query.id;
    },
    isEdite() {
      return this.$route.query.isEdite;
    }
  }
};
</script>
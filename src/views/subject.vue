<template>
  <div class="subject">
    <div class="item">
      <button class="button">新 建</button>
      <div class="table">
        <table>
          <tr>
            <th>ID</th>
            <th>题目类型</th>
            <th>适用人群</th>
            <th>科目</th>
            <th>操作</th>
          </tr>
          <tr class="emptydata" v-if="subjectList.length == 0">
            <td colspan="5">暂无数据</td>
          </tr>
          <tr v-for="(subject,index) in subjectList" :key="`subject-${index}`">
            <td>{{index}}</td>
            <td>{{subject.subjectTypeId}}</td>
            <td>{{subject.userTypeId}}</td>
            <td>{{subject.subjectText}}</td>
            <td>
              <button class="option" @click="edit">编 辑</button>
              <button class="option">删 除</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.subject {
  display: flex;
  .button {
    padding: 5px;
    align-items: flex-start;
    background-color: #1890ff;
    border-radius: 5px 5px;
    color: #fff;
    width: 63.81px;
    height: 32px;
    border: 0;
  }
}
.item,
.table,
table {
  width: 100%;
}
.table {
  padding: 20px 0px 0px;
  th {
    background-color: #fafafa;
    padding: 16px;
    border-bottom: 1px solid #e8e8e8;
  }
  tr {
    border-bottom: 1px solid #e8e8e8;
  }
  td {
    padding: 16px;
  }
  .option {
    color: #1890ff;
    border: 0;
  }
  .emptydata {
    text-align: center;
    font-size: 15px;
    border-bottom: 0 solid;
  }
}
</style>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("subject", ["subjectList"])
  },
  methods: {
    ...mapActions("subject", [
      "_queryAllSubject",
      "_createSubject",
      "_editeSubject"
    ])
  },
  created() {
    this._queryAllSubject();
  }
};
</script>>
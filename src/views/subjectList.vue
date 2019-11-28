<template>
  <div class="subject-title">
    <a-button type="primary" @click="handleNew">新建</a-button>
    <div class="subject-title-list">
      <a-table
        :scroll="{ y: 240 }"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        :rowKey="record => record.id"
        @change="handleTableChange"
        :locale="{ emptyText: '暂无数据' }"
      >
        <template slot="action" slot-scope="text, scope">
          <a-button @click="handlerEdite(scope.id)" type="link" size="small">编辑</a-button>
          <a-button @click="handlerDelete(scope.id)" type="link" size="small">删除</a-button>
        </template>
      </a-table>
    </div>
    <div class="subject-creat">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isVisible: false,
      pagination: {},
      loading: false,
      isEdite: false,
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          width: "5%"
        },
        {
          title: "题目类型",
          dataIndex: "subjectType",
          width: "15%"
        },
        {
          title: "适用用户",
          dataIndex: "userType",
          width: "15%"
        },
        {
          title: "科目",
          dataIndex: "subjectSubject",
          width: "17%"
        },
        {
          title: "题干",
          dataIndex: "subjectTitle",
          width: "30%"
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "18%",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  computed: {
    ...mapState("subjectType", {
      data: "subjectList"
    })
  },
  methods: {
    ...mapActions("subjectType", ["_queryAllSubject"]),
    ...mapActions("choiceQuestion", ["_deleteSubjectById"]),
    handleNew() {
      this.$router.push({
        name: "addPaper",
        query: { isEdite: false, id: this.$route.query.id }
      });
    },
    handleTableChange(pagination) {
      console.log(pagination);
    },
    handlerEdite(id) {
      this.$router.push({
        name: "addPaper",
        query: { isEdite: true, id: this.$route.query.id, subjectId: id }
      });
    },
    async handlerDelete(id) {
      const res = await this._deleteSubjectById({ id });
      if (this.httpStateCheck(res)) {
        this.$message.success("操作成功！");
        this.fetch();
      }
    },
    async fetch(page) {
      this.loading = true;
      const res = await this._queryAllSubject(page);
      if (this.httpStateCheck(res)) {
        this.loading = false;
      }
    }
  },
  created() {
    this.fetch(this.pagination);
  }
};
</script>
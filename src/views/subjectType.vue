<template>
  <div class="subject-title">
    <a-button type="primary" @click="handleNew">新建题目类型</a-button>
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
    <subjectTypeCreate ref="subjectTypeCreate" :isEdite="isEdite"/>
  </div>
</template>
<script>
import subjectTypeCreate from "../components/subjectTypeCreate";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    subjectTypeCreate
  },
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
          width: "10%"
        },
        {
          title: "类型名称",
          dataIndex: "subjectType",
          width: "32%"
        },
        {
          title: "描述",
          dataIndex: "subjectTypeDes",
          width: "40%"
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
      data: "subjectTypeList"
    })
  },
  methods: {
    ...mapActions("subjectType", ["_queryAllSubjectType", "_deleteSubjectTypeById"]),
    showDrawer() {
      this.$refs.subjectTypeCreate.visible = true;
    },
    handleNew() {
      this.isEdite = false;
      this.showDrawer();
    },
    handleTableChange(pagination) {
      console.log(pagination);
    },
    handlerEdite(id) {
      this.$refs.subjectTypeCreate.editeId = id;
      this.isEdite = true;
      this.showDrawer();
    },
    handlerDelete(id) {
      this._deleteSubjectTypeById({id});
    },
    async fetch(page) {
      this.loading = true;
      const res = await this._queryAllSubjectType(page);
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
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
    <user-type-create ref="userTypeCreate" :isEdite="isEdite" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import userTypeCreate from "../components/userTypeCreate";
export default {
  components: {
    userTypeCreate
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
          title: "所属科目",
          dataIndex: "subjectType",
          width: "32%"
        },
        {
          title: "适用人群",
          dataIndex: "userTypeText",
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
    ...mapState("userType", {
      data: "userTypeList"
    })
  },
  methods: {
    ...mapActions("subjectType", ["_queryAllSubjectType"]),
    ...mapActions("userType", ["_queryAllUserType", "_deleteSubjectTypeById"]),
    showDrawer() {
      this.$refs.userTypeCreate.visible = true;
    },
    handleNew() {
      this.isEdite = false;
      this.showDrawer();
    },
    handleTableChange(pagination) {
      console.log(pagination);
    },
    handlerEdite(id) {
      this.$refs.userTypeCreate.editeId = id;
      this.isEdite = true;
      this.showDrawer();
    },
    handlerDelete(id) {
      this._deleteSubjectTypeById({id});
    },
    async fetch(page) {
      this.loading = true;
      const res = await this._queryAllUserType(page);
      if (this.httpStateCheck(res)) {
        this.loading = false;
      }
    }
  },
  created() {
    this.fetch(this.pagination);
    this._queryAllSubjectType();
  }
};
</script>
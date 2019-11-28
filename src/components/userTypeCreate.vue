<template>
  <a-drawer
    :title="isEdite ? '编辑用户类型' : '新建用户类型'"
    placement="right"
    closable
    @close="onClose"
    :visible="visible"
    width="400"
  >
    <a-form :form="form" @submit="handlerSubmit">
      <a-form-item label="所属科目" colon :label-col="{span: 6}" :wrapper-col="{ span: 18 }">
        <a-select v-decorator="rules.subjectId">
          <a-select-option
            v-for="(item, index) in subjectTypeList"
            :key="`subjectId-${index}`"
            :value="item.id"
          >{{ item.subjectType }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="适用人群" colon :label-col="{span: 6}" :wrapper-col="{ span: 18 }">
        <a-textarea :rows="1" v-decorator="rules.userTypeText" placeholder="请输入" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24 }">
        <a-row type="flex" justify="center">
          <a-col :span="6">
            <a-button html-type="submit" type="primary">提交</a-button>
          </a-col>
          <a-col :span="6">
            <a-button @click="onClose">取消</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["isEdite"],
  data() {
    return {
      visible: false,
      editeId: null,
      form: this.$form.createForm(this, { name: "subjectForm" }),
      rules: {
        subjectId: [
          "subjectId",
          {
            rules: [
              {
                required: true,
                message: "请选择所属科目"
              }
            ],
            validateTrigger: "blur"
          }
        ],
        userTypeText: [
          "userTypeText",
          {
            rules: [
              {
                required: true,
                message: "请输入适用人群"
              }
            ],
            validateTrigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    visible(val) {
      if (val && this.isEdite) {
        const currentSubject = this.userTypeList.reduce((init, current) => {
          if (current.id === this.editeId) {
            init = {
              ...current
            };
          }
          return init;
        }, {});
        Reflect.deleteProperty(currentSubject, "id");
        this.$nextTick(() => {
          this.form.setFieldsValue({
            ...currentSubject
          });
        });
      }
    }
  },
  computed: {
    ...mapState("userType", ["userTypeList"]),
    ...mapState("subjectType", ["subjectTypeList"])
  },
  methods: {
    ...mapActions("userType", ["_addUserType", "_editeUserType"]),
    onClose() {
      this.visible = false;
    },
    handlerSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { data } = await (this.isEdite
            ? this._editeUserType({ id: this.editeId, values })
            : this._addUserType(values));
          if (this.httpStateCheck(data)) {
            this.$message.success("操作成功！");
            this.$parent.fetch();
            this.visible = false;
            this.clear();
          }
        }
      });
    },
    clear() {
      this.form.resetFields();
    }
  }
};
</script>
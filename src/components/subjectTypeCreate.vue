<template>
  <a-drawer
    :title="isEdite ? '编辑题目类型' : '新建题目类型'"
    placement="right"
    closable
    @close="onClose"
    :visible="visible"
    width="400"
  >
    <a-form :form="form" @submit="handlerSubmit">
      <a-form-item label="类型名称" colon :label-col="{span: 6}" :wrapper-col="{ span: 18 }">
        <a-textarea :rows="1" v-decorator="rules.subjectType" placeholder="请输入类型名称" />
      </a-form-item>
      <a-form-item label="类型描述" colon :label-col="{span: 6}" :wrapper-col="{ span: 18 }">
        <a-textarea :rows="1" v-decorator="rules.subjectTypeDes" placeholder="请输入类型描述" />
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
        subjectType: [
          "subjectType",
          {
            rules: [
              {
                required: true,
                message: "请输入类型名称"
              }
            ],
            validateTrigger: "blur"
          }
        ],
        subjectTypeDes: [
          "subjectTypeDes",
          {
            rules: [
              {
                required: true,
                message: "请输入类型描述"
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
        const currentSubject = this.data.reduce((init, current) => {
          if (current.id === this.editeId) {
            init = {
              ...current
            };
          }
          return init;
        }, {});
        Reflect.deleteProperty(currentSubject, 'id');
        this.$nextTick(() => {
          this.form.setFieldsValue({
            ...currentSubject
          });
        });
      }
    }
  },
  computed: {
    ...mapState("subjectType", {
      data: "subjectTypeList"
    })
  },
  methods: {
    ...mapActions("subjectType", ["_addSubject", "_editeSubject"]),
    onClose() {
      this.visible = false;
    },
    handlerSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { data } = await (this.isEdite ? this._editeSubject({ id: this.editeId, values}) : this._addSubject(values));
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
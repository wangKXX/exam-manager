<template>
  <div class="choice">
    <a-form :form="form" @submit="handlerSubmit">
      <a-divider orientation="left">基本信息</a-divider>
      <a-row :gutter="8">
        <a-col :span="12">
          <a-form-item label="题目类型：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-select
              @change="handleSubjectTypeChange"
              v-decorator="['subjectType', { rules: rules.subjectType }]"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in subjectTypeList"
                :key="`subjectType${index}`"
              >{{ item.subjectType }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="适用人群：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-select @change="handleChange" v-decorator="rules.userType">
              <a-select-option
                :value="item.id"
                v-for="(item, index) in userTypeList"
                :key="`userType-${index}`"
              >{{item.userTypeText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="科目：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-select @change="handleChange" v-decorator="rules.subjectSubject">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="disabled">Disabled</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">题目内容</a-divider>
      <a-row :gutter="8">
        <a-col :span="12">
          <a-form-item label="题干：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-textarea
              placeholder="请输入题干"
              :rows="1"
              v-decorator="rules.subjectTitle"
              @blur="() => handlerBlur('subjectTitle')"
            />
          </a-form-item>
        </a-col>
        <a-col></a-col>
      </a-row>
      <a-divider orientation="left">题目答案</a-divider>
      <a-row type="flex" justify="end">
        <a-col :span="4">
          <a-button type="primary" @click="handlerAdd">添加选项</a-button>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" v-if="!selectItem.length">
        <a-col :span="4">
          <div class="subject-answer-nodata">暂无选项</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" v-for="(item, index) in selectItem" :key="`select-${index}`">
          <a-form-item
            :label="selectLabel[index] + '：'"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-textarea
              placeholder="请输入"
              :rows="1"
              style="width: 94%;"
              v-decorator="[ `answer[${index}]`, { rules: [{required: true,
                message: '请输入答案'}]}]"
              @blur="() => handlerBlur('subjectAnwser')"
            />
            <a-icon
              class="dynamic-delete-button"
              type="minus-circle-o"
              @click="() => selectItem.splice(index, 1)"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">正确答案</a-divider>
      <a-row type="flex" justify="center" v-if="!selectItem.length">
        <a-col :span="4">
          <div class="subject-answer-nodata">暂无选项</div>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start" v-else>
        <a-col :span="4" v-for="(item, index) in selectItem" :key="`checkbox-${index}`">
          <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
            <a-checkbox-group v-decorator="rules.ranswer">
              <a-checkbox :value="selectLabel[index]">{{ selectLabel[index] }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">答案解析</a-divider>
      <a-row>
        <a-col :span="12">
          <a-form-item label="解析" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-textarea placeholder="请输入解析" :rows="1" v-decorator="rules.analysis" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="2">
          <a-form-item :wrapper-col="{ span: 20 }">
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <a-form-item :wrapper-col="{ span: 20 }">
            <a-button>重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "form" }),
      selectItem: [],
      userTypeList: [],
      rules: {
        subjectType: [{ required: true, message: "请选择题目类型" }],
        userType: [
          "userType",
          { rules: [{ required: true, message: "请选择适用人群" }] }
        ],
        subjectTitle: [
          "subjectTitle",
          {
            rules: [
              {
                required: true,
                message: "请输入题干"
              }
            ]
          }
        ],
        subjectSubject: [
          "subjectSubject",
          {
            rules: [
              {
                required: true,
                message: "请选择科目"
              }
            ]
          }
        ],
        ranswer: [
          "ranswer",
          {
            rules: [
              {
                required: true,
                message: "请选择正确答案"
              }
            ]
          }
        ],
        analysis: [
          "analysis",
          {
            rules: []
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("choiceQuestion", ["selectLabel"]),
    ...mapState("subjectType", ["subjectTypeList", "subjectList"]),
    isEdite() {
      return this.$route.query.isEdite;
    },
    subjectId() {
      return this.$route.query.subjectId;
    }
  },
  methods: {
    ...mapActions("subjectType", ["_queryAllSubjectType"]),
    ...mapActions("choiceQuestion", [
      "_querySubjectDetialByID",
      "_createSubject"
    ]),
    ...mapActions("userType", ["_queryUserTypeBySubjectId"]),
    async handleSubjectTypeChange(id) {
      if (id) {
        const res = await this._queryUserTypeBySubjectId({ id });
        if (this.httpStateCheck(res)) {
          this.userTypeList = res.data;
        }
      }
    },
    handleChange(value) {
      console.log(value);
    },
    handlerAdd() {
      this.selectItem.push(1);
    },
    onCheckBoxChange() {},
    handlerSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (!this.selectItem.length) {
            this.$message.error("请填写答案和正确答案");
            return false;
          }
          const res = await this._createSubject(this.paramsCreat(values));
          if (this.httpStateCheck(res)) {
            this.$message.success("操作成功！");
            this.$router.push({ name: "subjectList", query: { id: 1 } });
          }
        }
      });
    },
    paramsCreat(params) {
      return Object.assign({}, params, {
        answer: params.answer.join("~"),
        ranswer: params.ranswer.join("~")
      });
    },
    handlerBlur(type) {
      this.form.validateFields([type], { force: true });
    }
  },
  async created() {
    this._queryAllSubjectType();
    const res = await this._querySubjectDetialByID({ id: this.subjectId });
    if (this.httpStateCheck(res)) {
      const { data } = res;
      Reflect.deleteProperty(data[0], "id");
      this.selectItem.length = data[0].answer.split("~").length;
      const insertData = Object.assign({}, data[0], {
        answer: data[0].answer.split("~"),
        ranswer: data[0].ranswer.split("~")
      });
      this.$nextTick(() => {
        this.isEdite &&
          this.form.setFieldsValue({
            ...insertData
          });
      });
    }
  }
};
</script>
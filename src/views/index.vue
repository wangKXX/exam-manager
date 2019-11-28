<template>
  <div class="home">
    <a-layout class="components-layout-demo-custom-trigger">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :defaultOpenKeys="['sub-0']" :defaultSelectedKeys="['inner-0']">
          <template class="menu-wrap" v-for="(item, index) in meanConfig">
            <a-sub-menu :key="`sub-${index}`" v-if="item.children">
              <span slot="title"><a-icon :type="item.type" /><span>{{ item.label }}</span></span>
              <a-menu-item v-for="(child, index) in item.children" :key="`inner-${index}`" @click="$router.push({name: child.name, query: { id: child.id }})">
                <a-icon :type="child.type" />
                <span>{{ child.label }}</span>
              </a-menu-item>
            </a-sub-menu>
            <template v-else>
              <a-menu-item :key="index"  @click="$router.push({name: item.name })">
                <a-icon :type="item.type" />
                <span>{{ item.label }}</span>
              </a-menu-item>
            </template>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0; border-bottom: 1px solid #e8e8e8;">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content
          :style="{ padding: '24px', background: '#fff', minHeight: '280px', overflowY: 'auto', position: 'relative' }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      meanConfig: [
        {
          label: "新增试题",
          type: "database",
          children: [
            {
              name: "subjectList",
              id: 1,
              label: "选择题",
              type: "gold"
            }
          ]
        }, {
          label: "题目类型",
          type: "switcher",
          name: "subjectType"
        }, {
          label: "适用人群",
          type: "team",
          name: "userType"
        }, {
          label: "科目",
          type: "calculator",
          name: "subject"
        }, {
          label: "用户管理",
          type: "user",
          name: "userManager"
        }
      ]
    };
  }
};
</script>
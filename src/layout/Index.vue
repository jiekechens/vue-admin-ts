<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="200px" class="sidebar">
        <el-menu :default-active="$route.path" class="sidebar-menu">
          <el-menu-item index="/home">
            <template #icon>
              <el-icon><HomeFilled /></el-icon>
            </template>
            首页
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <span>管理系统</span>
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
}

.sidebar-menu {
  height: 100%;
  color: #fff;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.main {
  padding: 20px;
}
</style>
<template>
  <div class="content">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 185px);
}
</style>
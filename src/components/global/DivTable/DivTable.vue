<template>
    <div class="div-table" style="text-align: left">
      <div class="div-tr div-thead">
        <slot name="thead"></slot>
      </div>
      <slot name="tbody"></slot>
    </div>
</template>

<style lang="scss">
 @import "@/styles/component/_divtable.scss";
</style>

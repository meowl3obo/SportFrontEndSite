<template>
  <div class="success-content">
    <icon :icon="['far', 'check-circle']" class="fa-7x" />
    <h2>{{ t("Stored.SuccessStep") }}</h2>
    <div class="all-field">
      <div>
        <div>{{ t("Stored.ID") }}</div>
        <div>477460840874</div>
      </div>
      <div>
        <div>{{ t("Stored.StoredPoint") }}</div>
        <div>10</div>
      </div>
      <div>
        <div>{{ t("Stored.StoredPrice") }}</div>
        <div>$100</div>
      </div>
      <div>
        <div>{{ t("Stored.StoredDate") }}</div>
        <div>2022-05-16</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.success-content {
  padding-block: 20px;
  text-align: center;

  & > svg {
    color: var(--hint-success);
  }
}

.all-field {
    display: table;
    margin-inline: auto;

    & > div {
        display: table-row;
        div {
            display: table-cell;
            white-space: nowrap;
            padding-inline: 10px;
        }
        div:nth-child(2) {
          text-align: left;
        }
    }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { t } = useI18n()
    
    return { t }
  },
})
</script>

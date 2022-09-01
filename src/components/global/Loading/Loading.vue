<template>
  <div class="loading">
    <div>
      <div class="spin-div_cont">Loading...</div>
      <div class="loading-one spin-div"></div>
      <div class="loading-two spin-div"></div>
      <div class="loading-three spin-div"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(3px);
  & > div {
    position: relative;
    height: 160px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.spin-div_cont {
  position: absolute;
  top: 50%;
  left: 50%;
  color: var(--main-font);
  font-weight: 700;
  font-size: 20px;
  width: 8.5ch;
  transform: translateY(-50%) translateX(-50%);
  overflow-x: hidden;
  white-space: nowrap;

  animation: point 3s linear infinite;
}

.spin-div {
  position: absolute;
  width: 140px;
  height: 140px;
  top: 10px;
  left: calc(50% - 70px);
  border: 1px solid var(--main-font);
  background: transparent;
}
.loading-one {
  animation: spin 3s linear infinite;
  border-radius: 69% 31% 27% 73% / 46% 36% 64% 54%;
}
.loading-two {
  animation: re-spin 3s linear infinite;
  border-radius: 40% 60% 74% 26% / 29% 77% 23% 71%;
}
.loading-three {
  animation: spin 1.5s linear infinite;
  border-radius: 64% 36% 40% 60% / 29% 49% 51% 71%;
}
@keyframes spin {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}

@keyframes re-spin {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
@keyframes point {
  0% {
    width: 7ch;
  }
  30% {
    width: 7.5ch;
  }
  60% {
    width: 8ch;
  }
  90% {
    width: 8.5ch;
  }
}
</style>
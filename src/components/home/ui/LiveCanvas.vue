<template>
  <input type="text" v-model="inputContent" :ref="el => { canvasInput = el }" class="canvas-input" />
  <canvas
    v-if="Memo"
    :ref="el => { canvas = el }"
    @mousemove="draw"
    @mousedown="beginDrawing"
    @mouseup="stopDrawing"
  />
</template>

<style lang="scss" scoped>
canvas {
  position: absolute;
  z-index: 10;
}

.canvas-input {
  position: absolute;
  z-index: -1;
  background-color: transparent;
  outline: unset;
  border: unset;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref, inject, onMounted, watch } from 'vue'
import { useStore } from "vuex"
import mitt from "@/library/global/Mitt"
export default defineComponent({
  setup() {
    const store = useStore();
    const color = ref(inject("color") as string);
    const size = ref(inject("size") as number);
    const font = ref(inject("font") as boolean);
    const eraser = ref(inject("eraser") as boolean);
    const pen = ref(inject("pen") as boolean);
    const Memo = computed(() => store.getters["Component/GetMemo"]);
    let canvas = ref<HTMLCanvasElement>();
    let canvasInput = ref<HTMLInputElement>();
    let ctx = ref<CanvasRenderingContext2D>();
    let inputContent = ref<string>("");
    let drawing = ref<boolean>(false);
    let mouseX = ref<number>(0);
    let mouseY = ref<number>(0);
    let inputing = ref<boolean>(false);
    let inputX = ref<number>(0);
    let inputY = ref<number>(0);

    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext('2d') as CanvasRenderingContext2D
        canvas.value.width = canvas.value.parentElement?.offsetWidth as number
        canvas.value.height = canvas.value.parentElement?.offsetHeight as number
      }
    })

    const draw = (e: MouseEvent) => {
      if (drawing.value && ctx.value) {
        if (eraser.value) {
          ctx.value.lineCap = "round";
          ctx.value.clearRect(e.offsetX - size.value/2, e.offsetY - size.value/2, size.value, size.value);
        } else if (pen.value) {
          ctx.value.beginPath();
          ctx.value.strokeStyle = color.value;
          ctx.value.lineCap = "round";
          ctx.value.lineWidth = size.value
          ctx.value.moveTo(mouseX.value, mouseY.value);
          ctx.value.lineTo(e.offsetX, e.offsetY);
          ctx.value.stroke();
          ctx.value.closePath();
          mouseX.value = e.offsetX;
          mouseY.value = e.offsetY;
        }
      }
    }

    const beginDrawing = (e: MouseEvent) => {
      mouseX.value = e.offsetX;
      mouseY.value = e.offsetY;
      if (font.value && ctx.value) {
        if (!inputing.value) {
          inputing.value = true
          inputX.value = e.offsetX;
          inputY.value = e.offsetY;
        } else {
          ctx.value.fillStyle = color.value;
          ctx.value.lineWidth = size.value;
          ctx.value.save();
          ctx.value.beginPath();

          ctx.value.font = `${size.value}px orbitron`
          ctx.value.fillText(inputContent.value, inputX.value, inputY.value + (size.value/2) + 2)
          ctx.value.restore()

          inputContent.value = ""
          inputing.value = false
        }
      } else {
        drawing.value = true;
      }
    }

    const stopDrawing = () => {
      drawing.value = false
    }

    const clear = () => { 
      if (canvas.value && ctx.value) {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
      }
    }

    mitt.on("clear", clear)
    
    watch(
      () => { return inputing.value },
      () => { 
        if (inputing.value && canvas.value && canvasInput.value ) {
          canvasInput.value.setAttribute('style', `z-index: 30; left: ${mouseX.value}px; top: ${mouseY.value}px; color: ${color.value}; font-size: ${size.value}px; max-width: ${canvas.value.width - mouseX.value - 5}px`)
        } else {
          canvasInput.value?.setAttribute('style', `z-index: 0`)
        }
      }
    )

    return { Memo, canvas, canvasInput, inputContent, draw, beginDrawing, stopDrawing, clear }
  }
})
</script>
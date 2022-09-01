<template>
  <div class="chat">
    <div class="chat-content">
      <div class="chat-messages" :ref="(el) => { messageDiv = el }">
        <div class="chat-message" v-for="item in messages" :key="`${item.time}_${item.username}`">
          <div class="chat-user" :style="`color: ${item.color}`">{{ item.username }}：</div>
          <div class="chat-msg">{{ item.message }}</div>
          <div class="chat-time">{{ item.time }}</div>
        </div>
      </div>
      <div class="chat-input">
        <textarea v-model="message" maxlength="500" :placeholder="`${disabled ? status ? `輸入倒數${sec}秒` : '請先登入' : ''}`" :disabled="disabled" :sec="sec" @keydown="checkAction" />
        <button class="submit" @click="submit()">
          <icon :icon="['far', 'paper-plane']" class="fa-lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_scroll.scss";
@import "@/styles/_common.scss";

@include mixin-pc {
  .chat-messages {
    height: calc(100vh - 296px);
  }
}
@include mixin-phone {
  .chat-messages {
    height: calc(100vh - 370px);
  }
}

.chat {
  .chat-title {
    cursor: default;
    background-color: var(--minor-color);
    opacity: 0.7;
    height: 35px;
    width: 200px;
    line-height: 35px;
    padding-inline: 30px;
    font-weight: bold;
    color: var(--main-font);
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  .chat-input {
    position: relative;
  }

  .chat-content {
    height: calc(100vh - 296px);
    padding: 5px 10px;
    background-color: #0f1110;
    transition: height 0.2s ease;
  }

  .chat-messages {
    // height: calc(100vh - 296px);
    color: var(--main-font);
    overflow-y: auto;
    @extend %scroll !optional;
    .chat-message {
      display: flex;
      word-break: break-all;
      align-items: flex-start;
      max-width: 97%;
    }
    .chat-user {
      font-weight: bold;
      white-space: nowrap;
      align-content: flex-start;
    }
    .chat-msg {
      margin-left: 3px;
    }
    .chat-time {
      font-size: 12px;
      margin-left: 5px;
      color: var(--sub-font);
      white-space: nowrap;
    }
  }

  textarea {
    resize: none;
    width: 80%;
    height: 70px;
    border-radius: 5px;
    padding-right: 45px;
    background-color: var(--textarea-bg-color);
    color: var(--main-font);
  }

  .submit {
    cursor: pointer;
    position: absolute;
    right: 40px;
    bottom: 30px;
    background-color: transparent;
    color: var(--minor-font);
    outline: unset;
    border: unset;
    padding: 5px;

    svg {
      transition: all 0.2s ease;
    }

    &:hover {
      animation: hover-dowm 0.3s linear;

      svg {
        filter: drop-shadow(1px 1px 5px #b2ce8e);
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeUnmount } from "vue";
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import { IUserInfo } from "@/type/Vuex"
import { IDict, IKeyup } from "@/type/Global"
import { IChatMessage } from "@/type/Chat"
import Websocket from "@/library/chat/ChatWS"
import { WSChatConfig } from "@/config/application/Websocket"
export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const status = computed(() => store.getters['User/GetStatus'] as boolean)
    const user = computed(() => { return store.getters["User/GetUserInfo"] as IUserInfo })
    const allMesssages = computed(() => { return store.getters["Chat/GetMessage"] as IDict<Array<IChatMessage>> })
    const params = computed(() => { return route.params })
    const messages = ref<Array<IChatMessage>>([])
    const wsChat = new Websocket();
    const message = ref<string>("")
    const channel = ref<string>("")
    const colorList = ref<Array<string>>(["#f94aaa", "#7458ff", "#5887ff", "#58d8ff", "#58ffc2", "#ffb958", "#ff5e58"])
    const disabled = ref<boolean>(false);
    const sec = ref<number>(0)
    const messageDiv = ref<HTMLElement>()

    const connectWSChat = async () => {
      channel.value = params.value.gid as string
      if (status.value) disabled.value = false
      else disabled.value = true
      await wsChat.ConnectHub(WSChatConfig.url as string);
      wsChat.AddChannel(user.value.Name, channel.value)
      messages.value = allMesssages.value[channel.value]
    }

    const submit = () => {
      wsChat.SendMessage(channel.value, message.value, user.value.Name)
      disabled.value = true
      sec.value = 15
      message.value = ""
      const interval = setInterval(() => {
        sec.value -= 1
        if (sec.value <= 0) {
          disabled.value = false
          clearInterval(interval)
        }
      }, 1000)
    };


    const checkAction = (evt: IKeyup) => {
      if (!evt.shiftKey && evt.keyCode == 13) submit()
    }

    const randomColor = () => {
      const index = Math.floor(Math.random() * (colorList.value.length - 1))
      return colorList.value[index]
    }

    connectWSChat()

    onBeforeUnmount(() => {
      wsChat.LeaveChannel(channel.value)
    })

    watch(
      () => { return status.value },
      () => {
        if (status.value) disabled.value = false
        else disabled.value = true
      }
    )

    watch(
      () => { return allMesssages.value[channel.value] },
      () => { 
        messages.value = allMesssages.value[channel.value]
        messages.value[messages.value.length - 1].color = randomColor()
        if (messageDiv.value!.offsetHeight + messageDiv.value!.scrollTop == messageDiv.value!.scrollHeight) {
          setTimeout(() => {
            messageDiv.value!.scrollTop = messageDiv.value!.scrollHeight
          }, 50)
        }
      },
      { deep: true }
    )

    return { status, message, messages, disabled, sec, messageDiv, submit, checkAction };
  },
});
</script>


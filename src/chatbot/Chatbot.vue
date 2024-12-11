<script setup lang="ts">
const isOpenChatbot = ref(true);

const handleOpenChatbot = () => {
  isOpenChatbot.value = !isOpenChatbot.value;
};
</script>

<template>
  <div
    class="fixed flex right-16 bottom-16 transition-all duration-500 ease-in-out"
  >
    <div
      v-if="!isOpenChatbot"
      class="relative transition-all duration-500 ease-in-out"
    >
      <!-- <div class="flex justify-end items-center mb-3 mr-[-12px]">
        <img
          src="/images/close.png"
          alt="close"
          @click="handleOpenChatbot"
          class="w-9 cursor-pointer"
        />
      </div> -->

      <ChatbotContainer />
      <span class="absolute container-after"></span>
    </div>

    <img
      src="/images/icon-bot.png"
      alt="bot"
      class="w-24 h-24 cursor-pointer rounded-full icon-bot ml-5 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
      @click="handleOpenChatbot"
    />
  </div>
</template>

<style scoped>
.container-after {
  border-left: 20px solid #fff;
  border-right: 0px solid transparent;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  position: absolute;
  top: 23px;
  right: -16px;
}

.icon-bot {
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
}
</style>

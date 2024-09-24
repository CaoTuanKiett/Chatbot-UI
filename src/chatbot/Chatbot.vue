<script setup lang="ts">
const isOpenChatbot = ref(true);

const handleOpenChatbot = () => {
  isOpenChatbot.value = !isOpenChatbot.value;
};
</script>

<template>
  <div class="absolute right-16 bottom-16">
    <div v-if="isOpenChatbot" @click="handleOpenChatbot">
      <img src="/images/bot.png" alt="bot" class="w-24 cursor-pointer" />
    </div>
    <div v-else class="relative">
      <div class="flex justify-end items-center mb-3 mr-[-12px]">
        <img
          src="/images/close.png"
          alt="close"
          @click="handleOpenChatbot"
          class="w-9 cursor-pointer"
        />
      </div>
      <ChatbotContainer />
    </div>
  </div>
</template>

<style scoped></style>

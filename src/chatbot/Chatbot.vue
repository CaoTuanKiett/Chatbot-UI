<script setup lang="ts">
const isOpenChatbot = ref(true);

const handleOpenChatbot = () => {
  isOpenChatbot.value = !isOpenChatbot.value;
};
</script>

<template>
  <div class="absolute right-16 bottom-28">
    <div v-if="isOpenChatbot" @click="handleOpenChatbot">
      <img src="/images/bot.png" alt="bot" class="w-24 cursor-pointer" />
    </div>
    <div v-else @click="handleOpenChatbot">
      <h1>Chatbot</h1>
      <ChatbotContainer />
    </div>
  </div>
</template>

<style scoped></style>

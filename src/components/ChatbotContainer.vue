<script setup lang="ts">
import axios from 'axios';
// import dataFake from '../api/dataFake.json';

import type { Message, User } from '../types/index';

// const dataMessage: Message[] = dataFake.messages;
const isLoading = ref<boolean>(false);
const isLoadResponse = ref<boolean>(false);

// console.log(dataFake);

const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;
const data = ref<Message[]>([]);
const scrollToEnd = ref<HTMLElement | null>(null);

const dataMess = ref<Message[]>([]);

const fetchMessages = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(`${apiUrl}/${apiVersion}/messages`);
    data.value = await response.json();
    isLoading.value = false;
    console.log('data', data.value);

    await nextTick();
    scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchMessages();
  localStorage.setItem('dataMess', JSON.stringify(data.value));

  dataMess.value = data.value;
  // console.log('dataMess', dataMess.value);
});

// const handleLoadResponse = async () => {
//   isLoadResponse.value = false;
// };

const handleResponseChat = async (valueInput: string) => {
  if (valueInput.trim() === '') {
    console.log('Không được để trống');

    return;
  }
  // fetchMessages();
  isLoadResponse.value = true;
  scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });
  try {
    const response = await axios.post(`${apiUrl}/${apiVersion}/messages`, {
      content: valueInput,
      sender: 'user',
      createdAt: new Date().toISOString(),
    });

    console.log('handleResponseChat', response.data);

    let dataString = localStorage.getItem('dataMess') ?? '[]';
    let data = JSON.parse(dataString);
    console.log('localStorage', data);

    data.push(response.data);
    localStorage.setItem('dataList', JSON.stringify(data));
    dataMess.value = data;

    scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error(error);
  }
  // valueInput.value = '';
};
</script>

<template>
  <div
    class="chatbot-container bg-white w-[500px] h-[700px] rounded-lg overflow-hidden flex flex-col justify-between text-black"
  >
    <Header />
    <div v-if="isLoading" class="flex justify-center items-center">
      <img src="/icons/loading.svg" alt="loading" class="w-28 h-28" />
    </div>
    <div v-else class="chatbot-content h-full p-3 overflow-y-scroll">
      <ItemMessage
        v-for="message in dataMess"
        :key="message.id"
        :sender="message.sender"
        :message="message"
      />
      <div
        v-if="isLoadResponse"
        class="w-fit max-w-96 bg-gray-300 p-2 rounded-lg"
      >
        <AppLoading />
      </div>
      <div ref="scrollToEnd"></div>
    </div>
    <Footer :handleResponseChat="handleResponseChat" />
  </div>
</template>

<style scoped>
.chatbot-container {
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 0px 45px,
    rgba(0, 0, 0, 0.1) 0px 0px 34px;
}

.chatbot-content {
  --sb-track-color: #ffffff;
  --sb-thumb-color: #151377;
  --sb-size: 6px;
}

.chatbot-content::-webkit-scrollbar {
  width: var(--sb-size);
}

.chatbot-content::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 12px;
}

.chatbot-content::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 12px;
}

@supports not selector(::-webkit-scrollbar) {
  .chatbot-content {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>

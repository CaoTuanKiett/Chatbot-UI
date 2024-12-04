<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, nextTick, h } from 'vue';
import { ElNotification, NotificationOptions } from 'element-plus';
// import dataFake from '../api/dataFake.json';

import type { Message, User } from '../types/index';
import FormQuestion from './chatbot/FormQuestion.vue';
import FormFeedback from './chatbot/FormFeedback.vue';

// const dataMessage: Message[] = dataFake.messages;
const isLoading = ref<boolean>(false);
const isLoadResponse = ref<boolean>(false);

// console.log(dataFake);

const apiUrl = import.meta.env.VITE_API_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;
const data = ref<Message[]>([]);
const scrollToEnd = ref<HTMLElement | null>(null);
const isShowFormQuestion = ref<boolean>(false);
const isShowFeedback = ref<boolean>(false);

const dataMess = ref<Message[]>([]);

type NotificationType = '' | 'error' | 'success' | 'warning' | 'info';

const fetchMessages = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${apiUrl}/${apiVersion}/messages`);
    if (response.status !== 200) {
      console.error('Error', response.status);
      return;
    }

    data.value = response.data;

    // data.value = await response.data;
    isLoading.value = false;
    console.log('data', data.value);

    await nextTick();

    setTimeout(() => {
      scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

  isLoadResponse.value = true;

  scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });

  const dataInput = ref<Message[]>([]);
  dataInput.value = {
    id: Math.random().toString(36).substr(2, 9),
    content: valueInput,
    sender: 'user',
    createdAt: new Date().toISOString(),
  };

  let dataString = localStorage.getItem('dataMess') ?? '[]';
  let data = JSON.parse(dataString);
  console.log('localStorage', data);

  data.push(dataInput.value);

  // Thêm vào dataMess để hiển thị lên giao diện
  dataMess.value = data;

  try {
    const response = await axios.post(`${apiUrl}/${apiVersion}/messages`, {
      content: valueInput,
      sender: 'user',
      createdAt: new Date().toISOString(),
    });

    const responseFake = {
      data: {
        id: Math.random().toString(36).substr(2, 9),
        content: 'Chào bạn',
        sender: 'bot',
        createdAt: new Date().toISOString(),
      },
    };

    console.log('handleResponseChat', response.data);

    data.push(responseFake.data);
    localStorage.setItem('dataList', JSON.stringify(data));
    isLoadResponse.value = false;
    setTimeout(() => {
      scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });
    }, 5);
  } catch (error) {
    console.error(error);
  }
  // valueInput.value = '';
};

const showNotification = (
  type: NotificationType,
  title: string,
  message: string
) => {
  const options: Partial<NotificationOptions> = {
    title: title,
    type: type,
    message: h('i', { style: 'color: teal' }, message),
    duration: 4500, // Default duration in milliseconds
    offset: 20, // Default offset from the top
    position: 'top-right', // Default position
  };

  ElNotification(options as NotificationOptions);
};

const handleSendQuestion = (name: string, email: string, question: string) => {
  console.log('handleSendQuestion', name, email, question);
  showNotification(
    'success',
    'Gửi câu hỏi thành công',
    'Cảm ơn bạn đã gửi câu hỏi, chúng tôi sẽ trả lời bạn sớm nhất có thể!'
  );
  handleCancelQuestion();
};

const handleCancelQuestion = () => {
  isShowFormQuestion.value = false;
  console.log('handleCancelQuestion');
};

const handleSendFeedback = (
  name: string,
  email: string,
  question: string,
  typeQuestion: string
) => {
  console.log('handleSendFeedback', name, email, question, typeQuestion);
  showNotification(
    'success',
    'Gửi góp ý thành công',
    'Cảm ơn bạn đã gửi góp ý'
  );
  handleCancelFeedback();
};

const handleCancelFeedback = () => {
  isShowFeedback.value = false;
  console.log('handleCancelFeedback');
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
      <button
        @click="
          () => {
            isShowFormQuestion = !isShowFormQuestion;
          }
        "
      >
        show
      </button>
      <div
        v-if="isShowFormQuestion"
        class="w-full flex justify-center items-center my-5"
      >
        <FormQuestion
          :handleSendQuestion="handleSendQuestion"
          :handleCancelQuestion="handleCancelQuestion"
        />
      </div>
      <button
        @click="
          () => {
            isShowFeedback = !isShowFeedback;
          }
        "
      >
        showFeedback
      </button>
      <div
        v-if="isShowFeedback"
        class="w-full flex justify-center items-center my-5"
      >
        <FormFeedback
          :handleSendFeedback="handleSendFeedback"
          :handleCancelFeedback="handleCancelFeedback"
        />
      </div>
      <div ref="scrollToEnd"></div>
    </div>
    <Footer :handleResponseChat="handleResponseChat" />
  </div>
</template>

<style scoped>
.chatbot-container {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 45px, rgba(0, 0, 0, 0.1) 0px 0px 34px;
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

.chatbot-container .form-question {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>

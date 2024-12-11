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
const VITE_BE_API = import.meta.env.VITE_BE_API;
const VITE_CHATBOT_ID = import.meta.env.VITE_CHATBOT_ID;
const VITE_CONTENT_SHOW_FORM = import.meta.env.VITE_CONTENT_SHOW_FORM;
const VITE_CONTENT_SHOW_FORM_FEEDBACK = import.meta.env
  .VITE_CONTENT_SHOW_FORM_FEEDBACK;

const data = ref<Message[]>([]);
const scrollToEnd = ref<HTMLElement | null>(null);
const isShowFormQuestion = ref<boolean>(false);
const isShowFeedback = ref<boolean>(false);

const dataMess = ref<Message[]>([]);

type NotificationType = '' | 'error' | 'success' | 'warning' | 'info';

const fetchMessages = async () => {
  // Lấy threadId từ localStorage
  const threadId = localStorage.getItem('threadId') || 0;

  isLoading.value = true;
  try {
    const response = await axios.get(`${VITE_BE_API}/messages/${threadId}`);
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
    }, 10);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchMessages();
  localStorage.setItem('dataMess', JSON.stringify(data.value));

  dataMess.value = data.value;
  // console.log('dataMess', dataMess.value);

  if (dataMess.value.length === 0) {
    const welcomeMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: 'Xin chào, tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      sentTime: new Date().toISOString(),
    };

    dataMess.value.push(welcomeMessage);
    localStorage.setItem('dataMess', JSON.stringify(dataMess.value));
  }
});

const handleResponseChat = async (valueInput: string) => {
  if (!valueInput.trim()) {
    console.log('Không được để trống');
    return;
  }

  handleCancelFeedback();
  handleCancelQuestion();

  // Hiển thị trạng thái loading
  isLoadResponse.value = true;

  // Cuộn đến cuối màn hình chat
  setTimeout(() => {
    scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });
  }, 10);

  // Tạo message của người dùng
  const userMessage: Message = {
    id: Math.random().toString(36).substr(2, 9),
    content: valueInput.trim(),
    sender: 'user',
    sentTime: new Date().toISOString(),
  };

  // Lấy danh sách đoạn chat từ localStorage
  let chatHistory: Message[] = JSON.parse(
    localStorage.getItem('dataMess') || '[]'
  );

  // Thêm message người dùng vào lịch sử
  chatHistory.push(userMessage);
  localStorage.setItem('dataMess', JSON.stringify(chatHistory));

  // Cập nhật giao diện
  dataMess.value = chatHistory;

  // Lấy threadId từ localStorage
  const threadId = localStorage.getItem('threadId') || 0;

  try {
    // Gửi yêu cầu đến API
    const response = await axios.post(`${VITE_BE_API}/chat`, {
      content: valueInput.trim(),
      sender: 'user',
      chatbotId: VITE_CHATBOT_ID,
      threadId: threadId,
    });

    if (response.data) {
      // Thêm phản hồi từ chatbot vào lịch sử

      chatHistory.push(response.data);
      localStorage.setItem('dataMess', JSON.stringify(chatHistory));
      localStorage.setItem('threadId', response.data.threadId);

      // Cập nhật giao diện
      dataMess.value = chatHistory;

      if (
        String(response.data.content)
          .trim()
          .includes(String(VITE_CONTENT_SHOW_FORM).trim())
      ) {
        isShowFormQuestion.value = true;
      }

      if (
        String(response.data.content)
          .trim()
          .includes(String(VITE_CONTENT_SHOW_FORM_FEEDBACK).trim())
      ) {
        isShowFeedback.value = true;
      }

      // Cuộn xuống cuối màn hình sau khi nhận phản hồi
      setTimeout(() => {
        scrollToEnd.value?.scrollIntoView({ behavior: 'smooth' });
      }, 10);
    }
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu đến API:', error);
  } finally {
    // Tắt trạng thái loading
    isLoadResponse.value = false;
  }
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
        class="w-fit relative max-w-96 bg-gray-300 p-2 pr-3 rounded-lg"
      >
        <AppLoading />
        <span class="after-message-bot"></span>
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
    <Footer
      :handleResponseChat="handleResponseChat"
      :isLoadResponse="isLoadResponse"
    />
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

.after-message-bot {
  position: absolute;
  left: -7px;
  bottom: 0;
  border-bottom: 17px solid rgb(209 213 219 / var(--tw-bg-opacity));
  border-left: 13px solid transparent;
  /* border-end-start-radius: 0px;
  border-start-start-radius: 18px; */
}
</style>

<script setup lang="ts">
import type { Message, User } from '../../types/index';
defineProps<{
  sender: string;
  message: Message;
}>();

const TimeAgo = (date: string) => {
  return useTimeAgo(date).value;
};

const dataMessage: Message[] = onmessage;

// console.log('message', dataMessage);
</script>

<template>
  <div class="p-1">
    <div v-if="sender === 'user'" class="flex justify-end">
      <div class="flex flex-col items-end max-w-96">
        <time class="text-xs opacity-50 pr-3">{{
          TimeAgo(`${message?.sentTime}`)
        }}</time>
        <div
          class="w-fit relative max-w-96 bg-blue-500 text-white p-3 px-3 rounded-xl"
        >
          <!-- style: break-all -->
          <p class="w-full h-fit text-left">
            {{ message?.content }}
          </p>
          <span class="after-message-user"></span>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-start">
      <div class="flex flex-col items-start max-w-96">
        <time class="text-xs opacity-50 pr-3">{{
          TimeAgo(`${message?.sentTime}`)
        }}</time>
        <div class="w-fit relative max-w-96 bg-gray-300 p-2 px-3 rounded-xl">
          <p class="w-full h-fit text-left">
            {{ message?.content }}
          </p>
          <span class="after-message-bot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.after-message-user {
  position: absolute;
  right: -7px;
  bottom: 0;
  border-bottom: 21px solid rgb(59 130 246 / var(--tw-bg-opacity));
  border-right: 18px solid transparent;
  /* border-end-end-radius: 0px;
  border-start-end-radius: 18px; */
}

.after-message-bot {
  position: absolute;
  left: -7px;
  bottom: 0;
  border-bottom: 21px solid rgb(209 213 219 / var(--tw-bg-opacity));
  border-left: 18px solid transparent;
  /* border-end-start-radius: 0px;
  border-start-start-radius: 18px; */
}
</style>

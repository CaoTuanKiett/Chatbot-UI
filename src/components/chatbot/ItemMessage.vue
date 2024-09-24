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
        <time class="text-xs opacity-50">{{
          TimeAgo(`${message?.createdAt}`)
        }}</time>
        <div class="w-fit max-w-96 bg-blue-500 text-white p-2 rounded-lg">
          <!-- style: break-all -->
          <p class="w-full h-fit text-left">
            {{ message?.content }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-start">
      <div class="flex flex-col items-start max-w-96">
        <time class="text-xs opacity-50">{{
          TimeAgo('2024-08-20T08:30:00Z')
        }}</time>
        <div class="w-fit max-w-96 bg-gray-300 p-2 rounded-lg">
          <p class="w-full h-fit text-left">
            {{ message?.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

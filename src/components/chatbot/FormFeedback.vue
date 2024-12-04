<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps<{
  handleSendFeedback: Function;
  handleCancelFeedback: Function;
}>();

const name = ref<string>('');
const email = ref<string>('');
const question = ref<string>('');
const typeQuestion = ref<string>('');

const optionsQuestion = [
  {
    value: '1',
    label: 'Câu hỏi 1',
  },
  {
    value: '2',
    label: 'Câu hỏi 2',
  },
  {
    value: '3',
    label: 'Câu hỏi 3',
  },
];

const handleSendQuestion = () => {
  props.handleSendFeedback(name.value, email.value, question.value);

  resetValue();
};

const handleCancelQuestion = () => {
  props.handleCancelFeedback();
  resetValue();
};

const resetValue = () => {
  name.value = '';
  email.value = '';
  question.value = '';
  typeQuestion.value = '';
};
</script>

<template>
  <div
    class="form-feedback w-[90%] border-[1px] rounded-xl p-6 py-7 shadow-xl transition-all duration-300 ease-in-out delay-75"
  >
    <div class="w-full flex flex-col items-center">
      <div class="w-full flex flex-col mb-2">
        <label for="" class="font-medium ml-1">Họ tên:</label>
        <input
          type="text"
          v-model="name"
          class="border-2 p-2 px-3 rounded-lg shadow-sm"
        />
      </div>
      <div class="w-full flex flex-col mb-2">
        <label for="" class="font-medium" ml-1>Email:</label>
        <input
          type="email"
          v-model="email"
          class="border-2 p-2 px-3 rounded-lg shadow-sm"
        />
      </div>
      <div class="w-full flex flex-col mb-2">
        <label for="" class="font-medium ml-1">Chọn loại góp ý:</label>
        <el-select
          v-model="typeQuestion"
          placeholder="Loại góp ý"
          class="text-base placeholder:text-base rounded-lg shadow-sm"
          size="large"
        >
          <el-option
            v-for="item in optionsQuestion"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="w-full flex flex-col mb-2">
        <label for="" class="font-medium ml-1">Nhập góp ý:</label>
        <textarea
          rows="3"
          v-model="question"
          class="border-2 p-2 px-3 rounded-lg shadow-sm"
        />
      </div>
    </div>
    <div class="flex justify-center">
      <button
        @click="handleCancelQuestion"
        class="py-3 px-7 rounded-lg mt-2 font-semibold text-sm border-[1px] mr-2 shadow-md hover:opacity-75"
      >
        Hủy
      </button>
      <button
        @click="handleSendQuestion"
        class="bg-blue-500 text-white py-3 px-7 rounded-lg mt-2 font-semibold text-sm shadow-md hover:opacity-75"
      >
        Gửi góp ý
      </button>
    </div>
  </div>
</template>

<style>
.form-feedback .el-select__wrapper {
  height: 44px;
  border-radius: 12px;
}

.form-feedback .el-select__selected-item {
  font-size: 16px;
  color: black;
}
</style>
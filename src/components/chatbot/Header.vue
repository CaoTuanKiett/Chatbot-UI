<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { decodeToken } from '@/utils/config';

const VITE_BE_API = import.meta.env.VITE_BE_API;
const VITE_SCHOOL_ID = import.meta.env.VITE_SCHOOL_ID;
const VITE_CHATBOT_TOKEN = import.meta.env.VITE_CHATBOT_TOKEN;

const inForSchool = ref({
  schoolName: '',
  schoolCode: '',
  description: '',
  avatarUrl: '',
  dateEstablished: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  createdTime: '',
  logo: '',
});

const getInForSchool = async (idSchool: number) => {
  try {
    const res = await axios.get(`${VITE_BE_API}/school/${idSchool}`);
    inForSchool.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  const dataInfor = decodeToken(VITE_CHATBOT_TOKEN);
  console.log('dataInfor', dataInfor);

  getInForSchool(VITE_SCHOOL_ID);
  // getInForSchool(dataInfor?.school_id);
  console.log('inForSchool', inForSchool);
});
</script>

<template>
  <div
    class="header-chatbot bg-white flex items-center justify-between p-3 px-4"
  >
    <div class="flex">
      <img
        :src="inForSchool?.avatarUrl || '/icons/school.svg'"
        alt="avt"
        class="w-[64px] h-[64px] rounded-full mr-3"
      />
      <div class="text-black flex flex-col justify-center items-start">
        <el-tooltip
          placement="right"
          :content="inForSchool?.schoolName"
          effect="light"
        >
          <h2 class="font-bold text-xl truncate max-w-[310px]">
            {{ inForSchool?.schoolName }}
          </h2>
        </el-tooltip>
        <p>Tư vấn viên tuyển sinh</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <el-tooltip placement="top-start" content="Đặt câu hỏi" effect="light">
        <img
          src="/icons/circle-question-regular.svg"
          alt="help"
          class="w-7 cursor-pointer hover:opacity-50"
        />
      </el-tooltip>
      <el-tooltip placement="top-start" content="Hỗ trợ 24/7" effect="light">
        <img
          src="/icons/headset-solid.svg"
          alt="support"
          class="w-7 cursor-pointer hover:opacity-50"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
.header-chatbot {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px,
    rgba(0, 0, 0, 0.04) 0px 4px 4px, rgba(0, 0, 0, 0.04) 0px 8px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 16px;
}
</style>

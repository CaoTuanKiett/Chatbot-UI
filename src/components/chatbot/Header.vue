<script setup lang="ts"></script>

<template>
  <div class="header-chatbot bg-white flex items-center justify-between p-3">
    <div class="flex">
      <img src="/images/avt.gif" alt="avt" class="w-[72px] rounded-full mr-3" />
      <div class="text-black flex flex-col justify-center items-start">
        <h2 class="font-bold text-xl">Tư Vấn viên...</h2>
        <p>Trường ABC</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <img
        src="/images/help.png"
        alt="help"
        class="w-9 cursor-pointer hover:opacity-50"
      />
      <img
        src="/images/support.png"
        alt="support"
        class="w-9 cursor-pointer hover:opacity-50"
      />
    </div>
  </div>
</template>

<style scoped>
.header-chatbot {
  box-shadow:
    rgba(0, 0, 0, 0.04) 0px 1px 1px,
    rgba(0, 0, 0, 0.04) 0px 2px 2px,
    rgba(0, 0, 0, 0.04) 0px 4px 4px,
    rgba(0, 0, 0, 0.04) 0px 8px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 16px;
}
</style>

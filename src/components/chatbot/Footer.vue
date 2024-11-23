<script setup lang="ts">
const valueInput = ref<string>('');

// Định nghĩa props
const props = defineProps<{
  handleResponseChat: (message: string) => void;
}>();

const handleSendChat = () => {
  console.log('handleSendChat');
  props.handleResponseChat(valueInput.value);
  valueInput.value = '';
};
</script>

<template>
  <div class="flex justify-center p-3 px-5">
    <div class="messageBox w-full">
      <div class="fileUploadWrapper">
        <label for="file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 337 337"
          >
            <circle
              stroke-width="20"
              stroke="#6c6c6c"
              fill="none"
              r="158.5"
              cy="168.5"
              cx="168.5"
            ></circle>
            <path
              stroke-linecap="round"
              stroke-width="25"
              stroke="#6c6c6c"
              d="M167.759 79V259"
            ></path>
            <path
              stroke-linecap="round"
              stroke-width="25"
              stroke="#6c6c6c"
              d="M79 167.138H259"
            ></path>
          </svg>
          <span class="tooltip">Add an image</span>
        </label>
        <input type="file" id="file" name="file" />
      </div>
      <input
        required
        placeholder="Bạn muốn biết thông tin gì?"
        type="text"
        id="messageInput"
        v-model="valueInput"
        @keydown.enter="handleSendChat"
      />
      <button
        id="sendButton"
        @click="handleSendChat"
        @keydown.enter="handleSendChat"
      >
        <SendChat />
      </button>
    </div>
  </div>
</template>

<style scoped>
.messageBox {
  width: fit-content;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #2d2d2d; */
  color: black;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid rgb(63, 63, 63);
}
.messageBox:focus-within {
  border: 1px solid rgb(110, 110, 110);
}
.fileUploadWrapper {
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}

#file {
  display: none;
}
.fileUploadWrapper label {
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.fileUploadWrapper label svg {
  height: 26px;
}
.fileUploadWrapper label svg path {
  transition: all 0.3s;
}
.fileUploadWrapper label svg circle {
  transition: all 0.3s;
}
.fileUploadWrapper label:hover svg path {
  stroke: #fff;
}
.fileUploadWrapper label:hover svg circle {
  stroke: #fff;
  fill: #3c3c3c;
}
.fileUploadWrapper label:hover .tooltip {
  display: block;
  opacity: 1;
}
.tooltip {
  position: absolute;
  top: -40px;
  display: none;
  opacity: 0;
  color: white;
  font-size: 10px;
  text-wrap: nowrap;
  background-color: #000;
  padding: 6px 10px;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
  transition: all 0.3s;
}
#messageInput {
  width: 360px;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  padding-left: 10px;
  color: black;
}
/* #messageInput:focus ~ #sendButton svg path,
#messageInput:valid ~ #sendButton svg path {
  fill: #3c3c3c;
  stroke: white;
} */

#sendButton {
  width: fit-content;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

/* #sendButton svg {
  height: 26px;
  transition: all 0.3s;
}
#sendButton svg path {
  transition: all 0.3s;
}
#sendButton:hover svg path {
  fill: #3c3c3c;
  stroke: white;
} */
</style>

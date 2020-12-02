<template>
  <section class="chat-room">
    <div class="title">
      <div class="user-pict">
        G
      </div>
      <div class="user-name">
        <span>{{ state.selectedFriend.name }}</span>
      </div>
    </div>
    <ul class="conversation">
      <li class="chat" v-for="chat in state.chats" :key="chat.key">
        <div :class="chat.uid === state.uid ? 'my-message' : 'friends-message'">
          <p class="message-balloon">
            <div class="msg">
              {{ chat.message }}
            </div>
            <div class="timestamp">
              {{ new Date(chat.timestamp).getHours() }}:{{ new Date(chat.timestamp).getMinutes() }}
            </div>
          </p>
        </div>
      </li>
      <li class="chat" v-for="chat in 40" :key="chat">
        <div class="friends-message">
          <p class="message-balloon">
            <div class="msg">
              {{ chat }} chat we
            </div>
            <div class="timestamp">
              waktu
            </div>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    state: Object,
  },

  setup(props) {
    return{}
  },
};
</script>

<style scoped>
::-webkit-scrollbar-track {
  background: transparent;
}

.chat-room {
  height: 100%;
  background: rgb(51 58 60);
}

.title{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 2rem;
  background:white;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
}

.conversation{
  overflow: scroll;
  overflow-wrap: normal;
  scroll-behavior: smooth;
  padding : 1rem;
  height: 70%;
}

.my-message {
  display: flex;
  justify-content: flex-end;
}

.friends-message {
  display: flex;
  justify-content: flex-start;
}

.chat * {
  font-family: "Roboto", sans-serif !important;
  font-weight: 300;
  font-size: 0.8rem;
}

.message-balloon {
  background: white;
  max-width: 20rem;
  min-width: 2rem;
  padding: 0.5rem 0.8rem;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
}

.timestamp{
  text-align: right;
  color: rgba(0,0,0,0.5);
  margin-top: 0.2rem;
}
</style>
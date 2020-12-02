<template>
  <section class="chat-container">
    <section class="chats">
      <Suspense>
        <template #default >
          <ChatList :state="state" >
            <MainMenu :logout="logout"/>
          </ChatList>
        </template>
        <template #fallback>
          <div>loading...</div>
        </template>
      </Suspense>
      <div class="room">
        <ChatRoom :state="state" />
        <div class="message">
          <input
            type="text"
            class="msg"
            placeholder="ketik sesuatu..."
            v-model="state.message"
            @keypress.enter="send"/>
          <button @click="send" class="send">S</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { reactive, onMounted, Suspense } from "vue";
import firebase, { chatsRef } from "../js/utilities/firebase.js";
import ChatRoom from "../components/Chats/ChatRoom";
import ChatList from "../components/Chats/ChatList";
import MainMenu from "../components/Chats/MainMenu";

export default {
  components: {
    ChatRoom,
    ChatList,
    MainMenu
  },

  setup() {
    const state = reactive({
      isLogin: false,
      msgRef: null,
      dataLoaded: false,
      friends: [],
      selectedFriend: {
        email: "ismail@gmail%com",
        name: "ismail"},
      chats: [],
      uid: "",
      message: "",
    });

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          state.isLogin = false;
          return window.location.assign("/");
        } else {
          state.isLogin = true;
          state.uid = firebase.auth().currentUser.uid;

          const userRef = chatsRef.child(state.uid);
          userRef.on("value",(snap)=>{
            snap.forEach(data=>{
              state.friends.push({ email: data.key, name: data.val()["name"] });
            })
            state.dataLoaded= true;
          })
          state.msgRef = userRef.child(state.selectedFriend.email)
          state.msgRef.on("child_added", (snap) => {
            let chat = []
            if(snap.key !== 'name'){
              snap.forEach((data, i)=>{
                chat.push(data.val())
              })
              state.chats.push({message: chat[0], timestamp: chat[1], uid: chat[2]});
            }
          });
        }
      });
    });

    const send = () => {
      const newChat = chatsRef.push();
      if (state.message != "") {
        newChat.set({
          uid: state.uid,
          message: state.message,
          timestamp: Date.now(),
        });
        state.message = "";
      }
    };

    const logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          return window.location.assign("/");
        });
    };

    return {
      state,
      logout,
      send,
    };
  },
};
</script>

<style scoped>
input,
button {
  color: black;
}

.chats {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  height: 90vh;
  width: 70vw;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}

.logout{
  text-align: right;
}

.room {
  width: 70vw;
  height: 100%;
}

.message {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 1rem;
  bottom: 5rem;
  left: -1rem;
  z-index: 1;
  overflow: hidden;
  transition: 0.15s all linear;
  
}

.message .msg {
  position: relative;
  min-width: 40vw;
  margin-left: 1.5rem;
  border-radius: 3rem;
  word-wrap: break-word;
  word-break: break-all;
  border: none;
  padding: 0.3rem;
  padding-left: 1.5rem;
  height: 2rem;
  transition: 0.15s all linear;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  /* margin: 0; */
}

.message .send {
  position: relative;
  left: 0.5rem;
  width: 3rem;
  height: 3rem;
  border: none;
  box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.15);
  background : #fff;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.15s all linear;
}

.message .send:hover{
  background : rgba(230, 230, 230, 1);
  transition: 0.15s all linear;
}

@media (max-width: 1366px) {
  .chats {
    width: 90vw;
  }

  .message .msg {
    width: 80%;
  }
}

@media (max-width: 1024px) {
  .chats {
    width: 85vw;
  }

  .message .msg {
    width: 70%;
  }
}

@media (max-width: 700px) {
  .chats {
    width: 700px;
  }

  body{
    overflow: scroll !important;
  }

  .message .msg {
    width: 65%;
  }
}
@media(max-width:600px){
  .room {
    width: 400px;
  }
}
</style>
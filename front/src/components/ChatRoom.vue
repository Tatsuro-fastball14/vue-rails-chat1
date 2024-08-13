<template>
  <div>
    <h1>チャットルーム {{ roomId }}</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <strong>{{ message.sender_name }}:</strong> {{ message.content }}
      </li>
    </ul>
    <form @submit.prevent="sendMessage">
      <div>
        <h3>名前</h3>
        <input type="text" v-model="senderName" placeholder="名前を入力" required />
      </div>
      <div>
        <h3>メッセージ</h3>
        <input type="text" v-model="newMessageContent" placeholder="メッセージを入力" required />
      </div>
      <div>
        <button type="submit">送信</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { inject } from 'vue';

export default {
  props: ['roomId'],
  data() {
    return {
      roomName: '',
      messages: [],
      senderName: '',
      newMessageContent: '',
    };
  },
  setup() {
    const cable = inject('cable');
    return { cable };
  },
  created() {
    this.fetchMessages();
    this.createSubscription();
  },
  methods: {
    createSubscription() {
      this.subscription = this.cable.subscriptions.create(
        { channel: 'RoomChannel', room_id: this.roomId },
        {
          received: message => {
            console.log(message);
            this.messages.push(message);
          },
        }
      );
    },
    fetchMessages() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/rooms/${this.roomId}/messages`)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    sendMessage() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/rooms/${this.roomId}/messages`, {
          content: this.newMessageContent,
          sender_name: this.senderName
        })
        .then(() => {
          this.newMessageContent = ''; // メッセージをクリア
          this.fetchMessages(); // メッセージリストを更新
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};
</script>

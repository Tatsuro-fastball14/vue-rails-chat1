<template>
  <div>
    <h1>VueChat - チャットルーム一覧</h1>
    <ul>
      <li v-for="room in chatRooms" :key="room.id">
        <router-link :to="`/rooms/${room.id}`">{{ room.name }}</router-link>
      </li>
    </ul>
    <!-- 新しいチャットルームを作成するためのフォーム -->
    <input v-model="newRoomName" placeholder="新しいルーム名">
    <button @click="createRoom">ルーム作成</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      chatRooms: [],
      newRoomName: ''
    };
  },
  created() {
    this.fetchChatRooms();
  },
  methods: {
    fetchChatRooms() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/rooms`)
        .then((response) => {
          this.chatRooms = response.data;
        })
        .catch((error) => {
          console.error('チャットルームの取得に失敗しました:', error);
        });
    },
    createRoom() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/rooms`, {
          name: this.newRoomName
        })
        .then((response) => {
          this.chatRooms.push(response.data);
          this.newRoomName = '';
        })
        .catch((error) => {
          console.error('チャットルームの作成に失敗しました:', error);
        });
    }
  }
}
</script>

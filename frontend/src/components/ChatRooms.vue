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
// ...
  methods: {
    fetchChatRooms() {
      axios
        .get('http://localhost:3000/rooms')
        .then((response) => {
          this.chatRooms = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    createRoom() {
      axios
        .post('http://localhost:3000/rooms', {
          name: this.newRoomName
        })
        .then((response) => {
          this.chatRooms.push(response.data)
          this.newRoomName = ''
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
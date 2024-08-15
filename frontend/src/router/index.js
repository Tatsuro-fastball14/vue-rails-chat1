import { createRouter, createWebHistory } from 'vue-router';
import ChatRooms from '../components/ChatRooms.vue';
import ChatRoom from '../components/ChatRoom.vue'; // 追加

const routes = [
  { path: '/', component: ChatRooms },
  { path: '/rooms/:id', component: ChatRoom, props: route => ({ roomId: route.params.id }) }, // 追加
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
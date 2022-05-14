import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from '@/views/Login.vue';
import Anotacao from '@/views/anotacao/Anotacao.vue';
import Anotacoes from '@/views/Anotacoes.vue';
import Lista from '@/views/anotacao/Lista.vue';

export const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/anotacoes',
    name: 'Anotacoes',
    component: Anotacoes,
    children: [
      {
        path: '',
        name: 'Lista',
        component: Lista
      },
      {
        path: 'novo',
        name: 'Anotacoes Cadastrar',
        component: Anotacao,
        props: true
      },
      {
        path: ':id',
        name: 'Anotacoes Editar',
        component: Anotacao,
        props: true
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: rotas
});

export default router;
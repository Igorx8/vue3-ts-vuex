import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from '@/views/Login.vue';
import Anotacao from '@/views/anotacao/Anotacao.vue';
import Anotacoes from '@/views/Anotacoes.vue';
import Lista from '@/views/anotacao/Lista.vue';

export const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      public: true,
    }
  },
  {
    path: '/anotacoes',
    name: 'Anotacoes',
    component: Anotacoes,
    children: [
      {
        path: '',
        name: 'Lista',
        component: Lista,
        meta: {
          public: false,
        },
      },
      {
        path: 'novo',
        name: 'Anotacoes Cadastrar',
        component: Anotacao,
        meta: {
          public: false,
        },
        
      },
      {
        path: ':id',
        name: 'Anotacoes Editar',
        component: Anotacao,
        props: true,
        meta: {
          public: false,
        },
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: rotas
});

export default router;
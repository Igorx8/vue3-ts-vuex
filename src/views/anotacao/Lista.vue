<template>
    <section class="projetos">
        <h1 class="title">Anotações</h1>
        <router-link to="/anotacoes/novo" class="button">
            <span class="icon is-small">
                <i class="fa fa-plus"></i>
            </span>
            <span>Nova anotação</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Nome
                    </th>
                    <th>
                        Opções
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="anotacao in anotacoes" :key="anotacao.id">
                    <td> {{ anotacao.id }} </td>
                    <td> {{ anotacao.descricao }}</td>
                    <td>
                        <router-link :to="`/anotacoes/${anotacao.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(anotacao.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </section>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { CARREGAR_ANOTACOES, DELETAR_ANOTACAO } from '@/store/tipo-acoes';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
export default defineComponent({
    name: 'ListaView',
    setup() {
        const store = useStore();

        store.dispatch(CARREGAR_ANOTACOES);

        const anotacoes =computed(() => store.state.anotacao.anotacoes)

        const excluir = (id: string) => {
            store.dispatch(DELETAR_ANOTACAO, id);
            store.commit(NOTIFICAR, {
                titulo: 'Excluido com sucesso',
                texto: 'O projeto foi excluído',
                tipo: TipoNotificacao.FALHA
            })
        }
        
        return {
            anotacoes,
            store,
            excluir
        }
    }
});
</script>
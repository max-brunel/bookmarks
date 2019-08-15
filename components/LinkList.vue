<template>
    <section>
        <link-item v-for='item of items' :key="item.id" :address="item.link" :tags='item.tags' />
    </section>
</template>

<script>
import LinkItem from './LinkItem'
import axios from 'axios'
import {HTTP} from '../.nuxt/http-common'

export default {
    components: {
        LinkItem
    },
    data() {
        return{
            items: [],
            errors: []
        }
    },
    created() {
        axios.get('links.json').then(response => {
            this.items = response.data
        })
        .catch(e => {
            this.errors.push(e)
        })
    },
}
</script>

<style lang="scss" scoped>

section{
    grid-column: 4 / 13;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 30px;

    div{
        grid-column: span 3;
    }
}

</style>
<template>
    <section>
        <input type="search" autocomplete="false" placeholder="Search"/>
        <div class="tags">
            <button class="small addTag">New tag</button>
            <ul class="tags">
                <li v-for="tag in tags" :key="item">
                            {{item.tags}}
                </li>
            </ul>
        </div>
    </section>    
</template>

<script>
import axios from 'axios'
import {HTTP} from '../.nuxt/http-common'

export default {
    data() {
        return{
            items: [],
            tags: [],
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
    }    
}
</script>

<style lang="scss" scoped>

section{
    grid-column: 1 / 4;

    input{
        width: 100%;
        margin-bottom: 30px;
    }
}

</style>
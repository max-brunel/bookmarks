<template>
    <section>
        <input type="text" autocomplete="false" placeholder="Search" v-model="search" v-on:keyup="emitToParent"/>
        <div class="tags">
            <button class="small addTag" @click="existingTag">New tag</button>
            <ul class="tags" v-for="item in items" :key="item.link">
                <li v-for="tag in item.tags" :key="tag" :class="tag" :aria-label="tag">{{tag}}</li>
            </ul>
        </div>
    </section>    
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            search: '',
            items: [],
            tags: null,
            errors: []
        }
    },
    methods: {
        emitToParent: function() {
            this.$emit('searchValue', this.search)
        },
        existingTag: function() {
            var i=0,
                j=0
            for(i = 0; this.items[i]; i++){
                for(j = 0; this.items[i].tags[j]; j++){
                    if( this.items[i].tags[j] == this.items[i].tags ){
                        console.log(this.items[i].tags)
                    }
                }
            }
            return false
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
    grid-column: span 3;

    @media screen and (max-width: 1200px){
        grid-column: span 4;
    }
    @media screen and (max-width: 1024px){
        grid-column: 2 / 12; 
    }
    @media screen and (max-width: 768px){
        grid-column: span 12;
    }

    input{
        width: 100%;
        margin-bottom: 30px;
    }
}

</style>
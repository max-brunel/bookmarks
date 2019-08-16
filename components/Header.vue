<template>
    <header>
        <h1>Bookmarks</h1>
        <div class="controls">
            <button class="secondary manage">Manage</button>
            <details ref='addBookmark'>
                <summary class="primary newBookmark">New bookmark</summary>
                <div class="overlay" v-on:click="closeDetail()" @keydown.esc="closeDetail()"></div>
                <createbookmark />
            </details>
        </div>
    </header>
</template>

<script>
import Createbookmark from '~/components/CreateBookmark.vue'

export default {
  components: {
    Createbookmark
  },
  methods: {
    closeDetail: function () {
        this.$refs.addBookmark.removeAttribute("open")
    }
}
}
</script>

<style lang="scss" scoped>
header{
    grid-column: 1 / 13;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px){
        flex-direction: column;
        align-items: flex-start;
    }

    h1 {
        font-size: 4rem;
        font-weight: 100;
        margin: 0;
        @media screen and (max-width: 768px){
            margin: 0 0 15px;
        }
    }

    .controls{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        > *{
            margin: 0 5px;
        }
        .overlay{
                z-index: 2;
                position: fixed;
                width: 100vw;
                height: 100vh;
                background: rgba(255, 255, 255, .3);
                backdrop-filter: blur(10px);
                top: 0;
                left: 0;
        }
    }
}

</style>
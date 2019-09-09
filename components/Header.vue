<template>
    <header>
        <h1>Bookmarks</h1>
        <transition-group tag="div" name="edit" class="controls">
            <button v-if="!isEdit" key='edit' class="secondary manage" @click="toggleEdit">
                Manage
            </button>
            <button v-else key='edit' class="secondary manage" @click="toggleEdit">
                Done
            </button>
            <details key='add' ref='addBookmark' v-if="!isEdit">
                <summary class="primary newBookmark">New bookmark</summary>
                <div class="overlay" v-on:click="closeDetail()" @keydown.esc="closeDetail()"></div>
                <createbookmark />
            </details>
        </transition-group>
    </header>
</template>

<script>
import Createbookmark from '~/components/CreateBookmark.vue'

export default {
  components: {
    Createbookmark
  },
  data() {
      return{
          isEdit: false
      }
  },
  methods: {
    closeDetail: function () {
        this.$refs.addBookmark.removeAttribute("open")
    },
    toggleEdit: function() {
        this.isEdit = !this.isEdit
        this.$emit("manage", this.isEdit)
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

.edit-item {
    display: inline;
  }
  .edit-enter-active,
  .edit-leave-active,
  .edit-move {
    transition: all 0.4s ease;
  }
  .edit-enter,
  .edit-leave-to {
    opacity: 0;
  }

</style>
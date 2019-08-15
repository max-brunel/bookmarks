<template>
  <div class="container">
    <heading />
    <sidebar />
    <linklist />
  </div>
</template>

<script>
import Heading from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
import Linklist from '~/components/LinkList.vue'

export default {
  components: {
    Heading,
    Sidebar,
    Linklist
  },
  mounted() {
        if(localStorage.getItem('links')) {
            try{
                this.links = JSON.parse(localStorage.getItem('links'));
            } catch(e) {
                localStorage.removeItem('links');
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
  display: grid;
  grid-template-columns: repeat(12, 70px);
  grid-gap: 30px;
  margin: 90px auto;

  @media screen and (max-width: 1200px){
    width: 960px;
  }
  @media screen and (max-width: 1024px){
    width: 640px;
  }
  @media screen and (max-width: 768px){
    width: 90%;
  }
}

</style>
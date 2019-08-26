<template>
  <div class="container">
    <heading />
    <sidebar v-on:searchValue="onSearch" v-on:checkboxFilter='filterTags'/>
    <linklist :filter="filterTags" :search="search" />
  </div>
</template>

<script>
import Heading from "~/components/Header.vue";
import Sidebar from "~/components/Sidebar.vue";
import Linklist from "~/components/LinkList.vue";
import LinkPrevue from "link-prevue";
import axios from "axios";

export default {
  components: {
    Heading,
    Sidebar,
    Linklist,
    LinkPrevue
  },

  data() {
    return {
      search: "",
      items: []
    };
  },
  methods: {
    onSearch: function(value) {
      this.search = value;
    }
  },
  computed: {
    filterItems: function() {
      return this.items.filter(item => {
        return item.link.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      })
    },
    filterTags: function() {
      return this.items.filter(item => {
        return item.tags.indexOf(this.tag) > -1;
      })
    }
  },
  created() {
    axios
      .get("/bookmarks")
      .then(response => {
        this.items = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  mounted() {
    if (localStorage.getItem("links")) {
      try {
        this.links = JSON.parse(localStorage.getItem("links"));
      } catch (e) {
        localStorage.removeItem("links");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 30px;
  margin: 90px auto;
  width: 1170px;

  @media screen and (max-width: 1200px) {
    width: 960px;
  }
  @media screen and (max-width: 1024px) {
    width: 640px;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
</style>
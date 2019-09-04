<template>
  <div class="container">
    <heading />
    <sidebar v-on:searchValue="onSearch" @filterTags="onFilterTags" />
    <linklist :items="filterItems" :search="search" :isEdit="manage" @change="refreshLinkList()" />
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
      filteredTags: [],
      items: [],
      manage: Boolean
    };
  },
  methods: {
    onSearch: function(value) {
      this.search = value;
    },
    onFilterTags: function(values) {
      this.filteredTags = values;
    },
    refreshLinkList: function() {
      axios
        .get("/bookmarks")
        .then(response => {
          this.items = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  computed: {
    filterItems: function() {
      const itemsFilteredBySearch = this.items.filter(item => {
        return item.link.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
      if (this.filteredTags.length) {
        return itemsFilteredBySearch.filter(i => {
          const isTagIsInItem = this.filteredTags.reduce((mem, tag) => {
            return mem && i.tags.indexOf(tag) > -1;
          }, true);
          return isTagIsInItem;
        });
      } else {
        return itemsFilteredBySearch;
      }
    },
    manageBookmarks: function() {
      return this.isManage;
    }
  },
  created() {
    this.refreshLinkList();
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
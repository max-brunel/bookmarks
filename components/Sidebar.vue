<template>
  <section id="sidebar">
    <input
      type="text"
      autocomplete="false"
      placeholder="Search"
      v-model="search"
      v-on:keyup="emitSearch"
    />
    <form class="tags">
      <h3>Filter by tag</h3>
      <tags @change="emitCheckbox" />
    </form>
  </section>
</template>

<script>
import axios from "axios";
import Tags from "./Tags";

export default {
  components: {
    Tags
  },
  data() {
    return {
      search: "",
      items: [],
      tags: null,
      errors: []
    };
  },
  methods: {
    emitSearch: function() {
      this.$emit("searchValue", this.search);
    },
    emitCheckbox: function(values) {
      this.$emit("filterTags", values);
    }
  },
  computed: {
    uniqueTags: function() {
      return this.items
        .flatMap((item, index) => {
          return item.tags;
        })
        .filter((tag, index, self) => {
          return self.indexOf(tag) === index;
        });
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
  }
};
</script>

<style lang="scss">
@import "~/assets/tags.scss";

#sidebar {
  grid-column: span 3;

  @media screen and (max-width: 1200px) {
    grid-column: span 4;
  }
  @media screen and (max-width: 1024px) {
    grid-column: 2 / 12;
  }
  @media screen and (max-width: 768px) {
    grid-column: span 12;
  }

  input[type="text"] {
    width: 100%;
    margin-bottom: 30px;
  }

  .tags {
    padding: 0;
    @media screen and (max-width: 1024px) {
      position: relative;
      &:before, &:after{
          z-index: 1;
          height: 45px;
          width: 15px;
          background: red;
          position: absolute;
          bottom: 0;
          content: '';
          background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0));
        }

        &:before{ left: 0px; }
        &:after{ right: 0px; transform: rotate(180deg);}

      .tag-list{
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        position: relative;
        padding: 0 15px;
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        .input{
          margin: 15px 10px 15px 0;
        }
      }
    }

    h3 {
      margin-bottom: 15px;
    }

  }
}
</style>
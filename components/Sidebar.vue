<template>
  <section>
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

<style lang="scss" scoped>
@import "~/assets/tags.scss";

section {
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

  input {
    width: 100%;
    margin-bottom: 30px;
  }

  .tags {
    padding: 0;

    h3 {
      margin-bottom: 15px;
    }
  }
}
</style>
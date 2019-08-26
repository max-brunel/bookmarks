<template>
  <section>
    <input
      type="text"
      autocomplete="false"
      placeholder="Search"
      v-model="search"
      v-on:keyup="emitToParent"
    />
    <div class="tags">
      <ul class="tags">
        <li v-for="tag in uniqueTags" :key="tag" :class="tag" :aria-label="tag">{{tag}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      items: [],
      tags: null,
      errors: []
    };
  },
  methods: {
    emitToParent: function() {
      this.$emit("searchValue", this.search);
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
}
</style>
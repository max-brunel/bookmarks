<template>
  <transition-group name="list" tag="section" v-if="items.length">
    <link-item
      v-for="item in items.slice().reverse()"
      :key="item.date"
      :address="item.link"
      :tags="item.tags"
      :isEdit="isEdit"
      @askForDeletion="deleteBookmark"
    />
  </transition-group>
  <section v-else class="error">
    <h2>No result for {{search}}</h2>
  </section>
</template>

<script>
import LinkItem from "./LinkItem";
import axios from "axios";

export default {
  components: {
    LinkItem
  },
  props: {
    items: { type: [Array, Number], required: true },
    search: "",
    isEdit: false
  },
  methods: {
    deleteBookmark: function(url) {
      const self = this;
      axios
        .delete("/delete-bookmark", {
          params: {
            url: url
          }
        })
        .then(function(response) {
          self.$emit("change");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  grid-column: span 9;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 30px;
  @media screen and (max-width: 1200px) {
    grid-column: span 8;
    grid-template-columns: repeat(8, 1fr);
  }

  @media screen and (max-width: 1024px) {
    grid-column: 2 / 12;
    grid-template-columns: repeat(12, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-column: span 12;
  }

  div {
    grid-column: span 3;
    @media screen and (max-width: 1200px) {
      grid-column: span 4;
    }
    @media screen and (max-width: 1024px) {
      grid-column: span 6;
    }
    @media screen and (max-width: 768px) {
      grid-column: span 12;
    }
  }

  &.error {
    display: block;

    h2 {
      font-size: 5rem;
      color: #e0e7ec;
    }
  }

  .list-item {
    display: inline;
  }
  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: all 0.4s ease;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
  }
}
</style>
<template>
  <section v-if="items.length">
    <link-item v-for="item in items" :key="item.id" :address="item.link" :tags="item.tags" />
  </section>
  <section v-else class="error">
    <h2>No results for {{search}}</h2>
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
    search: ""
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
}
</style>
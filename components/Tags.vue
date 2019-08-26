<template>
  <div>
    <div class="input" v-for="tag in uniqueTags" :key="tag" :class="tag">
      <input
        type="checkbox"
        :id="tag"
        :aria-label="tag"
        v-model="checkboxFilter"
        :value="tag"
        @change="emitCheckbox"
      />
      <label :for="tag">{{tag}}</label>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      checkboxFilter: [],
      items: [],
      tags: null,
      errors: []
    };
  },
  methods: {
    emitCheckbox: function() {
      this.$emit("change", this.checkboxFilter);
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
$tags: (
  "inspiration": #fcbd49,
  "resources": #fc8749,
  "website": #fe6060,
  "app": #ff669b,
  "interaction": #d367df,
  "dev": #666aff,
  "social": #389ef7,
  "illustration": #5fcdb4
);

input {
  width: 100%;
  margin-bottom: 30px;
}

.tags {
  padding: 0;

  h3 {
    margin-bottom: 15px;
  }

  .input {
    position: relative;
    margin: 15px 0;
    cursor: pointer;
    font-size: inherit;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
      display: none;
    }

    label {
      cursor: pointer;
      position: relative;
      text-transform: capitalize;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 99px;
      transition: all ease 0.2s;

      &:before {
        position: absolute;
        transition: all ease 0.2s;
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 4px;
        background: #fff;
        opacity: 0;
        transform: scale(0);
        top: 11px;
        left: 10px;
      }
    }
    @each $name, $color in $tags {
      &.#{$name} {
        label {
          background: lighten($color, 25%);
          color: desaturate($color, 50%);
        }

        input:checked ~ label {
          background: $color;
          color: #fff;
          padding-left: 20px;
        }
        label:hover {
          background: lighten($color, 10%);
          color: white;
        }
        input:checked ~ label:before {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }
}
</style>
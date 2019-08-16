<template>
    <div class="modal">
        <h2>New bookmark</h2>
        <form>
            <input type="url" v-model="link" v-on:keyup.enter="formSubmit" placeholder="Paste URL" focus>
            <button class="primary" @click="formSubmit">Submit</button>
        </form>
        <div class="preview" v-if="link">
            <h3>Preview</h3>
            <link-item :address="link" />
        </div>
    </div>
</template>

<script>
import LinkItem from './LinkItem'
import axios from 'axios'

export default {
    components: {
        LinkItem
    },
    data () {
        return {
            link: null,
            tags: [],
            errors: []
        }
    },
    methods: {
        formSubmit(e) {
            var passedLink = this.link
            e.preventDefault();
            let currentObj = this;
            axios.post('links.json', {
                link: passedLink
            })
            .then(function (response) {
                currentObj.output = response.data;
            })
            .catch(function (error) {
                currentObj.output = error;
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.modal{
    z-index: 3;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    grid-column: 4 / 7;
    padding: 30px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(95, 128, 155, .2);
    max-width: 570px;
    width: 100%;
    overflow-y: auto;

    h2{
        font-size: 2rem;
        font-weight: 400;
        margin: 0 0 20px;
    }

    form{
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        margin: 0 0 30px;

        input{
            margin-right: 15px;
            width: 100%;
        }
    }

    .preview{
        width: fit-content;
        padding: 15px;
        box-shadow: 0 12px 24px 0 rgba(95,128,155,0.20);
        border-radius: 8px;

        h3{
            margin: 0 0 15px;
        }

        .card{
            max-width: 100%;
        }
    }
}

</style>
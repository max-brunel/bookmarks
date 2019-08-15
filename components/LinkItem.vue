<template>
    <link-prevue :url="address">
        <template slot-scope="props">
            <div class="card">
                <div class='card-img'>
                    <a v-bind:href="props.url">
                        <img class="card-img-top" :src="props.img" :alt="props.title" loading="lazy" />
                        <img class="card-img-shadow" :src="props.img" loading="lazy" />
                    </a>
                </div>
                <div class="tags">
                    <div v-for="tag in tags" :key="tag" :class="tag">
                        {{tag}}
                    </div>
                </div>
                <div class="card-block">
                    <a v-bind:href="props.url">
                        <h4 class="card-title">{{props.title}}</h4>
                        <small class="card-url">{{props.url}}</small>
                    </a>
                    <p class="card-text">{{props.description}}</p>
                </div>
            </div>
        </template>
    </link-prevue>
</template>

<script>
import LinkPrevue from 'link-prevue'

export default {
    components: {
        LinkPrevue
    },
    props: {
        address: String,
        tags: null
    }
}
</script>

<style lang="scss" scoped>

.card{
    max-width: 270px;
    width: 100%;

    .card-img{
        position: relative;
        width: 100%;
        display: block;

        img{
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 180px;
            border-radius: 8px;
            object-fit: cover;

            &.card-img-top{
                position: relative;
                box-shadow: 0 6px 9px rgba(0, 0, 0, .05);
            }

            &.card-img-shadow{
                position: absolute;
                z-index: 0;
                transform: scale(.9) translateY(6%);
                filter: blur(10px);
                opacity: .6;
            }
        }
    }

    .card-block{
        margin-top: 15px;

        h4{
            margin: 0 0 3px;
        }

        small{
            margin: 0 0 10px;
        }

        p{
            width: 100%;
            margin: 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
}

</style>
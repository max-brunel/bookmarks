<template>
    <transition name='fade'>
        <link-prevue :url="address">
            <template slot-scope="props">
                <div class="card">
                    <div class='card-img'>
                        <a target="_blank" v-bind:href="props.url">
                            <img class="card-img-top" :src="props.img" :alt="props.title" loading="lazy" />
                            <img class="card-img-shadow" :src="props.img" loading="lazy" />
                        </a>
                    </div>
                    <div class="tags">
                        <div v-for="tag in tags" :key="tag" :class="tag" :aria-label="tag"></div>
                    </div>
                    <div class="card-block">
                        <a target="_blank" v-bind:href="props.url">
                            <h4 class="card-title">{{props.title}}</h4>
                            <small class="card-url">{{props.url}}</small>
                        </a>
                        <p class="card-text">{{props.description}}</p>
                    </div>
                </div>
            </template>

            <template slot="loading">
                <div class="card">
                    <div class="card-img"></div>
                    <div class="card-block">
                        <h4></h4>
                        <small></small>
                        <p></p>
                    </div>
                </div>
            </template>
        </link-prevue>
    </transition>
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
    },
    methods: {
        onClickDescription: function(prevue) {
        console.log('click', prevue.images, prevue.title, prevue.url, prevue.description)
        }
    } 
}
</script>

<style lang="scss" scoped>

$inspiration: #FCBD49;
$resources: #FC8749;
$website: #FE6060;
$app: #FF669B;
$interaction: #D367DF;
$dev: #666AFF;
$social: #389EF7;
$illustration: #5FCDB4;

.card{
    max-width: 270px;
    width: 100%;

    @media screen and (max-width: 1200px){
        max-width: 100%;
    }

    &:hover{
        .card-img{
            transform: scale(1.05);
            
            &.card-img-shadow{
                transform: scale(1) translateY(0);
                filter: blur(30px);
                opacity: 1;
            }
        }
    }

    .card-img{
        margin: 0 0 10px;
        position: relative;
        width: 100%;
        display: block;
        transition: all .3s ease;

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
                transform: scale(.9) translateY(8%);
                filter: blur(10px);
                opacity: .5;
            }
        }
    }

    .tags{
        margin: 0 0 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        div{
            position: relative;
            margin: 0 5px;
            width: 10px;
            height: 10px;
            border-radius: 10px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
            &.inspiration{ background: $inspiration; }
            &.resources{ background: $resources; }
            &.website{ background: $website; }
            &.app{ background: $app; }
            &.interaction{ background: $interaction; }
            &.dev{ background: $dev; }
            &.social{ background: $social; }
            &.interaction{ background: $interaction; }

            &:after{
                position: absolute;
                content: attr(aria-label);
                z-index: 2;
                transition: all ease .2s;
                pointer-events: none;
                bottom: 15px;
                background: #F0F7FC;
                box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
                text-transform: capitalize;
                font-size: .8rem;
                line-height: 1rem;
                font-weight: 600;
                color: #5EA6E0;
                padding: 5px 10px;
                border-radius: 3px;
                left: 50%;
                transform: translateX(-50%);
                opacity: 0;
            }

            &:hover:after{
                opacity: 1;
                bottom: 20px;
            }
        }
    }

    .card-block{

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
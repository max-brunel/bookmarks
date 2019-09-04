<template>
    <transition name='fade'>
        <link-prevue :url="address">
            <template slot-scope="props">
                <div class="card">
                    <div class="edit" v-if="isEdit" @click="isDeleted">Delete</div>
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
                <div class="card card-loading">
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
import axios from "axios"
export default {
    components: {
        LinkPrevue
    },
    props: {
        address: String,
        isEdit: false,
        tags: null,
        isDeleted: ''
    }
}
</script>

<style lang="scss" scoped>
@import './tags';

.card{
    max-width: 270px;
    width: 100%;
    position: relative;

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
            @each $name, $color in $tags {
                &.#{$name} {
                    background: $color;

                    &:after{
                        position: absolute;
                        content: attr(aria-label);
                        z-index: 2;
                        transition: all ease .2s;
                        pointer-events: none;
                        bottom: 15px;
                        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
                        text-transform: capitalize;
                        font-size: .8rem;
                        line-height: 1rem;
                        font-weight: 600;
                        background: $color;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 3px;
                        left: 50%;
                        transform: translateX(-50%);
                        opacity: 0;
                    }
                }
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        small{
            margin: 0 0 10px;
        }

        p{
            text-align: left;
            width: 100%;
            margin: 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }

    .edit{
        cursor: pointer;
        z-index: 9;
        position: absolute;
        right: -10px;
        top: -10px;
        background: #5EA6E0;
        filter: hue-rotate(145deg);
        padding: 5px 10px;
        border-radius: 15px;
        font-weight: 700;
        color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    }
}

.card-loading{
    *{
        background: linear-gradient(to right, #F0F7FC 8%, #ecf3f7 18%, #F0F7FC 33%);
        background-size: 810px;
        animation: loading 1s infinite linear;
    }
    .card-img{
        width: 100%;
        height: 180px;
        border-radius: 10px;
    }

    .card-block{
        background: transparent;
        h4{
            width: 75%;
            height: 19px;
            margin-bottom: 10px;
            display: block;
        }
        small{
            width: 66%;
            height: 6px;
            display: block;
        }

        p{
            width: 100%;
            height: 9px;
            display: block;
        }
    }
}

@keyframes loading {
    from{background-position: -270px 0;}
    to{background-position: 270px 0;}
}

</style>
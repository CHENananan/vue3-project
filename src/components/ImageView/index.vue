<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const props = defineProps({
    imageList: {
        type: Array,
        default: () => []
    },
    imgWidth: {
        type: Number,
        default: 400
    },
    imgHeight: {
        type: Number,
        default: 400
    },
    layerWidth: {
        type: Number,
        default: 200
    },
    layerHeight: {
        type: Number,
        default: 200
    }
})
// 图片列表

const activeIndex = ref(0)

const onEnterImg = (index) => {
    activeIndex.value = index
}

// 控制滑块的移动
const target = ref(null)
const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)
const { elementX, elementY, isOutside } = useMouseInElement(target)

watch([elementX, elementY], () => {
    if (isOutside.value) return

    if (elementX.value > props.layerWidth / 2 && elementX.value < props.imgWidth - props.layerWidth / 2) {
        left.value = elementX.value - props.layerWidth / 2
    }
    if (elementX.value > props.imgWidth - props.layerWidth / 2) {
        left.value = props.imgWidth - props.layerWidth
    }
    if (elementX.value < props.layerWidth / 2) {
        left.value = 0
    }

    if (elementY.value > props.layerHeight / 2 && elementY.value < props.imgHeight - props.layerHeight / 2) {
        top.value = elementY.value - props.layerHeight / 2
    }
    if (elementY.value > props.imgHeight - props.layerHeight / 2) {
        top.value = props.imgHeight - props.layerHeight
    }
    if (elementY.value < props.layerHeight / 2) {
        top.value = 0
    }

    // 控制大图
    positionX.value = - left.value * 2
    positionY.value = - top.value * 2
})
</script>


<template>
    <div class="goods-image">
        <!-- 左侧大图-->
        <div class="middle" ref="target" :style="{ width: `${imgWidth}px`, height: `${imgHeight}px` }">
            <img :src="imageList[activeIndex]" alt="" />
            <!-- 蒙层小滑块 -->
            <div class="layer" v-show="!isOutside"
                :style="{ width: `${layerWidth}px`, height: `${layerHeight}px`, left: `${left}px`, top: `${top}px` }">
            </div>
        </div>
        <!-- 小图列表 -->
        <ul class="small">
            <li v-for="( img, i ) in  imageList " :key="i" @mouseenter="onEnterImg(i)"
                :class="{ active: i === activeIndex }">
                <img :src="img" alt="" />
            </li>
        </ul>
        <!-- 放大镜大图 -->
        <div class="large" :style="[
            {
                backgroundImage: `url(${imageList[activeIndex]})`,
                backgroundPositionX: `${positionX}px`,
                backgroundPositionY: `${positionY}px`,
                backgroundSize: `${2 * imgWidth}px ${2 * imgHeight}px`,
                width: `${imgWidth}px`,
                height: `${imgHeight}px`
            },
        ]" v-show="!isOutside"></div>
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        background: #f5f5f5;
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
        background-color: #f8f8f8;
    }

    .layer {
        background: rgba(0, 0, 0, 0.2);
        // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
        left: 0;
        top: 0;
        position: absolute;
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>
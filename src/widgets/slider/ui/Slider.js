//import { commonComponentProps, getAttrs } from "../../../shared/lib";

//export function Slider(props) {
export function Slider() {

    // const {
    //     extraClasses = {},
    //     extraAttrs = {},
    //     baseClass = "slider",
    //     getCN
    // } = { ...commonComponentProps, ...props }

    //const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="/images/Rectangle 3107.png">
                </div>
                <div class="swiper-slide">
                    <img src="/images/Rectangle 3108.png">
                </div>
                <div class="swiper-slide">
                    <img src="/images/Rectangle 3109.png">
                </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
        </div>
        `
}
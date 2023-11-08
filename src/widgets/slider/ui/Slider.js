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

            </div>
            <div class="swiper-buttonNext">
                <img src="/images/Arrow right black.svg">
            </div>
            <div class="swiper-buttonPrev">
                <img src="/images/Arrow left black.svg">
            </div>
        </div>
        </div>
        `
}
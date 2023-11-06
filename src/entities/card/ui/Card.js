import { commonComponentProps, getAttrs } from "../../../shared/lib";

export function Card(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "card",
        getCN,
        type,
        imageSrc,
        label,
        productName,
        idProduct,
        startDate,
        endDate,
        startCourse,
        children
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    if (type == "small") {
        return `
                <div class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-card="" data-js-idProduct="${idProduct}">
                    <img src="${imageSrc}" class="${getClassName("image")}" alt="course"/>
                    <div class="${getClassName("textBlock")}">
                        <div class="${getClassName("title")}">
                            <p class="${getClassName("label")}">${label}</p>
                            <h6 class="${getClassName("productName")}">${productName}</h6>
                        </div>
                        <div class="${getClassName("dates")}">
                            <div class="${getClassName("registration")}">
                                <p>Регистрация на курс:</p>
                                <p>${startDate}</p>
                                <img src="/images/Rectangle 2564.svg">
                                <p>${endDate}</p>
                            </div>
                            <div class="${getClassName("startCourse")}">
                                <p>Начало курса:</p>
                                <p>${startCourse}</p>
                            </div>
                        </div>
                    </div>
                    ${children || `<p>тут могла быть ваша кнопка</p>`}
                </div>
                `
    } else {
        return `
                <div class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-card="" data-js-idProduct="${idProduct}">
                    <img src="${imageSrc}" class="${getClassName("image")}" alt="course"/>
                    <div class="${getClassName("textBlock")}">
                        <p class="${getClassName("label")}">${label}</p>
                        <h6 class="${getClassName("productName")}">${productName}</h6>
                    </div>
                    ${children || `<p>тут могла быть ваша кнопка</p>`}
                </div>
                `
    }
} 
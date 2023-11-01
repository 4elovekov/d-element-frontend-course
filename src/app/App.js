import HeaderModel from "../widgets/header/model"
import FilterModel from "../widgets/filter/model"
import SliderModel from "../widgets/slider/model"

const runApp = async () => {
    const runWidgets = async() => {
        new HeaderModel()
        new FilterModel()
        new SliderModel()
        await Promise.all(Object.keys(import.meta.glob("../**/*.pcss", { "query": "?inline" })).map(path => import(/* @vite-ignore */`${path}`).then((module) => module?.default ?? module)))
    }
    switch (process.env.NODE_ENV) {
        case "development":
            await import("../shared/api/browser.js")
                .then(async ({ worker }) => {
                    await worker.start().then(() => {
                        console.debug("App dev run")
                        runWidgets()
                    })
                })

    }
}

runApp()
    .catch((err) => {
        console.error(err)
    })
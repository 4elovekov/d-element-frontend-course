import HeaderModel from "../widgets/header/model"

const runApp = async () => {
    const runWidgets = async() => {
        new HeaderModel()
        await Promise.all(Object.keys(import.meta.glob("../**/*.pcss", { "query": "?inline" })).map(path => import(/* @vite-ignore */`${path}`).then((module) => module?.default ?? module)))
    }
    switch (process.env.NODE_ENV) {
        case "development":
            await import("../shared/api/browser.js")
                .then(async ({ worker }) => {
                    await worker.start().then(() => {

                        // Добавление товара в корзину
                        const productId = 123; // ID товара для добавления в корзину
                        const quantity = 1; // Количество товара

                        fetch(`/api/add-to-cart`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ productId, quantity }),
                        })
                        .then(response => {
                            if (!response.ok) {
                            throw new Error("Сетевая ошибка");
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.debug("Товар добавлен в корзину:", data);
                        })
                        .catch(error => {
                            console.error("Произошла ошибка:", error);
                        });

                        // Удаление товара из корзины

                        fetch(`/api/remove-from-cart/`, {
                        method: "DELETE",
                        })
                        .then(response => {
                            if (!response.ok) {
                            throw new Error("Сетевая ошибка");
                            }
                            console.debug("Товар удален из корзины");
                        })
                        .catch(error => {
                            console.error("Произошла ошибка:", error);
                        });
                        
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
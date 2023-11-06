import { rest } from "msw"
import { Filtering } from "./filtering"
import { GetCart } from "./getCart"

export const handlers = [

  rest.get("/catalog.html", (req, res, ctx) => {
    const queryParams = new URL(req.url).search.toString();
    return res(
      ctx.status(200), ctx.json(Filtering(queryParams))
    )
  }),

  rest.get("/cart.html", (req, res, ctx) => {
    return res(
      ctx.status(200), ctx.json(GetCart())
    )
  }),

  // rest.post("/login", (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem("is-authenticated", "true")

  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200),
  //   )
  // }),

  // rest.get("/user", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200), ctx.json({
  //       username: "admin",
  //     }),
  //   )
  // }),

  // rest.get("/api/getProducts", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200), ctx.json({
  //       "isSuccess": "true",
  //       "data": {
  //           "idProduct": "123",
  //           "label": "Бесплатный офлайн курс",
  //           "productName": "«Frontend-разработчик»",
  //           "category": [
  //               "Веб-разработка",
  //               "Мобильная разработка"
  //           ],
  //           "imageSrc": "/images/course-image.png",
  //           "registration": {
  //                   "startDate": "298347302984",
  //                   "endDate": "239847320984"
  //           },
  //           "startCourse": "2389047320",
  //           "price": 10000,
  //           "isPopular": true
  //       }
  //     })
  //   )
  // }),

  // rest.post("/api/cartSubmit", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200), ctx.json({
  //       "isSuccess": true,
  //     })
  //   )
  // }),

  // rest.post("/api/add-to-cart", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200), ctx.json({
  //       "isSuccess": true,
  //     })
  //   )
  // }),

  // rest.delete("/api/remove-from-cart", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200), ctx.json({
  //       "isSuccess": true,
  //     })
  //   )
  // }),
]
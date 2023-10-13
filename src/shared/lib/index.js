import { metaTag } from "./meta.js";

export const getPage = ({ body = ``, title = ``, meta  = `${metaTag}` }) => {
  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        ${meta}
        <title>${title}</title>
        <script src="/src/app/App.js" defer type="module"></script>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
}
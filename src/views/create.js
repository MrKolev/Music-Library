import { html } from "../../node_modules/lit-html/lit-html.js"
import { createAlbum } from "../api/data.js";


export async function createPageView(ctx) {
  ctx.render(createPageTemp(ctx))
}

function createPageTemp(ctx) {
  return html` 
<section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form @submit=${(e) => onSubmit(e, ctx)} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`
}

async function onSubmit(e, ctx) {
  e.preventDefault();
  const {
    singer,
    album,
    imageUrl,
    release,
    label,
    sales
  } = Object.fromEntries(new FormData(e.target));

  try {
    if (!singer || !album || !imageUrl ||
      !release || !label || !sales) {
      throw new Error("Fill in all the fields!")
    }
    await createAlbum({
      singer,
      album,
      imageUrl,
      release,
      label,
      sales
    })
    ctx.page.redirect("/dashboard")

  } catch (error) {
    alert(error.message)
  }
}
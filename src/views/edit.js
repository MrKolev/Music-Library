import { html } from "../../node_modules/lit-html/lit-html.js"
import { editAlbum, getAlbumInfo } from "../api/data.js";


export async function editPageView(ctx) {
  const data = await getAlbumInfo(ctx.params.id);
  ctx.render(editPageTemp(ctx, data))
}

function editPageTemp(ctx, data) {
  return html` 
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form @submit=${(e) => onSubmit(e, ctx)} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${data.singer}" />
            <input type="text" name="album" id="album-album" placeholder="Album" value="${data.album}" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${data.imageUrl}" />
            <input type="text" name="release" id="album-release" placeholder="Release date" value="${data.release}" />
            <input type="text" name="label" id="album-label" placeholder="Label" value="${data.label}" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value ="${data.sales}" />

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
    await editAlbum(ctx.params.id, {
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
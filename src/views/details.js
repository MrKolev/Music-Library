import { html } from "../../node_modules/lit-html/lit-html.js"
import { addLike, daeAlbum, getAlbumInfo, getLikeFsorSpecificUser, getLikes } from "../api/data.js"


export async function detailsPageView(ctx) {
  const id = ctx.params.id;
  const user = ctx.getUserData();
  ctx.isCreator = false;
 const [data, likes]= await Promise.all([getAlbumInfo(id), getLikes(id)]);
 ctx.likes = likes;
  if (user) {
    ctx.user = true;
    ctx.possibleLike = await getLikeFsorSpecificUser(id,user._id);
    if (user._id === data._ownerId) {
      ctx.isCreator = true;
      ctx.possibleLike = 1;
    }
  }
  ctx.render(detailsPageTemp(data, ctx));
}

function detailsPageTemp(data, ctx) {
  return html` 
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${data.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${data.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${ctx.likes}</span></div>

          ${ctx.user ? html`
          <div id="action-buttons">
          ${ctx.possibleLike ? "" : html`
            <a @click=${()=>{
              addLike(data._id)
            }} href="/details/${data._id}" id="like-btn">Like</a>
            `}
            ${ctx.isCreator ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click=${() => {
          if (confirm("Neeeeeee go pravi!")) {
            daeAlbum(data._id);
            ctx.page.redirect("/dashboard");
          }
        }} href="javascript:void(0)" id="delete-btn">Delete</a>
            ` : ""}            
          </div>
          `: ""}          
        </div>
</section>
`
}
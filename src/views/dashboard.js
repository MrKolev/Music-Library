import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllalbums } from "../api/data.js"


export async function dashboardPageView(ctx) {

  ctx.render(dashboardPageTemp(await getAllalbums(),ctx.getUserData()));
}

function dashboardPageTemp(data, user) {
  return html` 
<section id="dashboard">
        <h2>Albums</h2>
        
          ${data.length > 0 ? html`
        <ul class="card-wrapper">
          ${data.map((x) => {
    return html`
          <li class="card">
            <img src="${x.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${x.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${x.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${x.sales}</span></p>
            <a class="details-btn" href="/details/${x._id}">Details</a>            
          </li>
            `})}
        </ul>` :
      html`
        <h2>There are no albums added yet.</h2>
        `}        
      </section>
`}
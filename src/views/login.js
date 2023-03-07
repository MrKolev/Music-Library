import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/data.js";


export async function loginPageView(ctx) {
  ctx.render(loginPageTemp(ctx))
}

function loginPageTemp(ctx) {
  return html` 
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form @submit=${(e) => onSubmit(e, ctx)} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`
}

async function onSubmit(e, ctx) {
  e.preventDefault();
  const { email, password } = Object.fromEntries(new FormData(e.target));

  try {
    if (!email || !password) {
      throw new Error("Fill in all the fields")
    }
    const data = await login(email, password);
    ctx.setUserData(data);
    ctx.updateNavBar();
    ctx.page.redirect("/dashboard")

  } catch (error) {
    alert(error.message)
  }




}
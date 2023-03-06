import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/data.js";


export async function registerPageView(ctx){
    ctx.render(registerPageTemp(ctx))
}

function registerPageTemp(ctx){
return html` 
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${(e)=>onSubmit(e, ctx)} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
          </form>
        </div>
      </section>
`
}

async function onSubmit(e, ctx) {
  e.preventDefault();
  const formData = new FormData(e.target)
  const rePassword = formData.get('re-password')
  const { email, password } = Object.fromEntries(formData);

  try {
    if (!email || !password || !rePassword) {
      throw new Error("Fill in all the fields!")
    }

    if(password != rePassword){
      throw new Error("passwords must be the same!")
    }
    const data = await register(email, password);
    ctx.setUserData(data);
    ctx.updateNavBar()
    ctx.page.redirect("/dashboard")

  } catch (error) {
    alert(error.message)
  }
}
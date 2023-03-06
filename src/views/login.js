import { html } from "../../node_modules/lit-html/lit-html.js"


export async function loginPageView(ctx){
    ctx.render(loginPageTemp())
}

function loginPageTemp(){
return html` 
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`
}
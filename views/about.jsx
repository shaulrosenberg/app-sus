export function About() {
  return (
    <section className="about">
      <h2>About Us</h2>
      <div className="content">
        <div className="description">
          <h3>Adam Gertzkin</h3>
          <p>
            My name is Adam Gertzkin and I'm one of the creators of this app.
            I'm passionate about web development and have honed my skills during
            a coding academy bootcamp. Working with my partner, Shaul Rosenberg,
            we built this amazing React app and had a great time learning and
            collaborating together.
          </p>
          <img src="./assets/img/shaul.svg" alt="" />
        </div>
        <div className="description">
          <h3>Shaul Rosenberg</h3>
          <p>
            I'm Shaul Rosenberg, the other half of the development team behind
            this app. Like Adam, I also participated in a coding academy
            bootcamp where I discovered my passion for coding. Collaborating
            with Adam was a fantastic experience, and together we created an
            incredible React app that we're proud of.
          </p>
          <img src="./assets/img/adam.svg" alt="" />
        </div>
      </div>
    </section>
  )
}

export default About

import "./Home.css"

export const Home = () => {

    return <>
        <div className="head-name">
            <h1>Welcome to ClassApp!</h1>
        </div>
        <div className="intro-section">
            <div className="intro-text">
                ClassApp is a project built by <a className="profile-link" href="https://www.linkedin.com/in/hannah-papa/">Hannah Papa</a> and <a className="profile-link" href="https://www.linkedin.com/in/jenny-kaye-kitchen/">Jenny Kitchen</a> from Nashville Software School's Cohort-61 as a way to help our class stay connected and organized.
            </div>
            <div className="app-description">
                Whether we're getting together to work on a group project, looking for job leads, or we just want to hang out, ClassApp has Cohort-61 covered!
                With ClassApp, we'll be able to create, edit, and delete events with ease.
                <p className="intro-features">Want to get together for a "coffee and coding" meetup? No problem!</p>
                <p className="intro-features">How about a movie night or happy hour? ClassApp has our back.</p>
                Plus, with a special access code, only students in Cohort-61 will be able to register and access the site, ensuring a safe and supportive environment for all. Happy coding, C61!
            </div>
        </div>

    </>
}
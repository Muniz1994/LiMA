import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faCircleInfo, faPlus, faInfo, faSave, faTwitter, faInstagram, faLinkedin, faGithub);

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white mt-auto">
            {/* <!-- Grid container --> */}
            <div className="container p-4 pb-0">
                {/* <!-- Section: Social media --> */}
                <section className="mb-4">
                    {/* <!-- Twitter --> */}
                    <a className="btn rounded-circle btn-outline-light btn-floating m-1" href="#!" role="button">
                        <FontAwesomeIcon icon="fab fa-twitter" />
                    </a>

                    {/* <!-- Instagram --> */}
                    <a className="btn rounded-circle btn-outline-light btn-floating m-1" href="#!" role="button">
                        <FontAwesomeIcon icon="fab fa-instagram" />
                    </a>

                    {/* <!-- Linkedin --> */}
                    <a className="btn rounded-circle btn-outline-light btn-floating m-1" href="#!" role="button">
                        <FontAwesomeIcon icon="fab fa-linkedin" />
                    </a>

                    {/* <!-- Github --> */}
                    <a className="btn rounded-circle btn-outline-light btn-floating m-1" href="#!" role="button">
                        <FontAwesomeIcon icon="fab fa-github" />
                    </a>
                </section>
                {/* <!-- Section: Social media --> */}
            </div>
            {/* <!-- Grid container --> */}

            {/* <!-- Copyright --> */}
            <div className="text-center p-3">
                © 2022 Copyright: DiCE Group
            </div>
            {/* <!-- Copyright --> */}
        </footer>
    )
}

export default Footer;
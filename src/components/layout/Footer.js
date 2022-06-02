import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import styles from './Footer.module.css';

function Footer() {

    return(
    
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><a target="_blank" rel="norefrrer" href="https://www.facebook.com/allan.gadelhaxavier"><FaFacebook /></a></li>
                <li><a target="_blank" rel="norefrrer" href="https://www.instagram.com/allangadelhaxavier"><FaInstagram /></a></li>
                <li><a target="_blank" rel="norefrrer" href="https://www.linkedin.com/in/allan-gadelha-xavier-1659b428"><FaLinkedin /></a></li>
            </ul>
            <p className={styles.copy_right}>
                <span>
                    &copy; { new Date().getFullYear() }
                </span>
            </p>
        </footer>
    )

}

export default Footer;
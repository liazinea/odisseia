import './index.scss'
import ContatosFooter from './ContatosFooter'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-logo">
                    <div className="footer-logo-top">
                        <svg
                            className="logo-icon"
                            width="50"
                            height="50"
                            viewBox="0 0 28 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 4.86249V23.6125M8.6875 8.61249H5.875M9.625 12.3625H5.875M26.5 18.925V3.83749C26.5 2.33749 25.275 1.22499 23.7875 1.34999H23.7125C21.0875 1.57499 17.1 2.91249 14.875 4.31249L14.6625 4.44999C14.3 4.67499 13.7 4.67499 13.3375 4.44999L13.025 4.26249C10.8 2.87499 6.825 1.54999 4.2 1.33749C2.7125 1.21249 1.5 2.33749 1.5 3.82499V18.925C1.5 20.125 2.475 21.25 3.675 21.4L4.0375 21.45C6.75 21.8125 10.9375 23.1875 13.3375 24.5L13.3875 24.525C13.725 24.7125 14.2625 24.7125 14.5875 24.525C16.9875 23.2 21.1875 21.8125 23.9125 21.45L24.325 21.4C25.525 21.25 26.5 20.125 26.5 18.925Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className='logo-name'>
                            Odisseia
                        </span>
                    </div>

                    <div className="footer-logo-bottom">
                        <span className="logo-text">
                            E.E Ernesto Quissak
                        </span>
                    </div>
                </div>

                <div className="footer-content">
                    <div className="container-contact">
                        <ContatosFooter/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
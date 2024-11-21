import './index.scss'
import Location from  '../../../images/icons/location-icon.png'
import Phone from  '../../../images/icons/phone-icon.png'
import Cellphone from  '../../../images/icons/cellphone-icon.png'
const ContatosFooter = () => {
    return (
        <>
            <p className="contatos">
                Contatos
            </p>
            <ul className='lista-de-contatos'>
                <li className='contato-item'>
                    <div className='contato-container'>
                        <figure className='contato-bg'>
                            <img className='icone-contato' src={Location} alt="ícone de contato" />
                        </figure>
                        <p className="contato-text">
                            R. Benedicto Moreira de Barros, 120 <br /> - Eng. Neiva, <br /> Guaratinguetá
                        </p>
                    </div>
                </li>

                <li className='contato-item'>
                    <div className='contato-container'>
                        <figure className='contato-bg'>
                            <img className='icone-contato' src={Phone} alt="ícone de contato" />
                        </figure>
                        <p className="contato-text">
                            (12) 234567
                        </p>
                    </div>
                </li>

                <li className='contato-item'>
                    <div className='contato-container'>
                        <figure className='contato-bg'>
                            <img className='icone-contato' src={Cellphone} alt="ícone de contato" />
                        </figure>
                        <p className="contato-text">
                            81200 9188
                        </p>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default ContatosFooter
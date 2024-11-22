import './index.scss'

const ContatoItem = ({ contatoText, contatoIcon }) => {
    return (
        <div className='contato-container'>
            <figure className='contato-bg'>
              <div className='svg-div' dangerouslySetInnerHTML={{ __html: contatoIcon }} />
            </figure>
            <p className="contato-text">
                {Array.isArray(contatoText) ? (
                    <>
                        {contatoText[0]} <br />
                        {contatoText[1]} <br />
                        {contatoText[2]}
                    </>
                ) : (
                    contatoText
                )}
            </p>
        </div>
    )
}

export default ContatoItem
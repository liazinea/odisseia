import "./index.scss";

const ContatoItem = ({ contatoText, contatoIcon }) => {
  return (
    <div className="item-container">
      <figure className="contato-bg">
        <div
          className="svg-div"
          dangerouslySetInnerHTML={{ __html: contatoIcon }}
        />
      </figure>
      <p className="contato-text">
        {Array.isArray(contatoText)
          ? contatoText.map((text, index) => (
              <span key={index}>
                {text}
                <br />
              </span>
            ))
          : contatoText}
      </p>
    </div>
  );
};

export default ContatoItem;

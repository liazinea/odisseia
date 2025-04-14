import styles from './index.module.scss';


const Header = ({titulo}) => {
  return (
    <div>
        <div className= {styles.img}>
            <img src="/forma-header.svg" alt="" />
            <h1 className='titulo'>{titulo}</h1>
        </div>
    </div>
  )
}

export default Header
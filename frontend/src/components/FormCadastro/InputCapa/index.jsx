import styles from './index.module.scss';

import React from 'react'

const InputCapa = () => {
  return (
    <div>

<div className={styles.imageinput}>
  <label htmlFor="fileinput" className={styles.imagelabel}>
    <span>Capa do livro</span>
    <div className={styles.imageplaceholder}></div>
  </label>
  <input type="file" className={styles.fileinput} id="fileinput" accept="image/*" />
</div>
    </div>
  )
}
export default InputCapa
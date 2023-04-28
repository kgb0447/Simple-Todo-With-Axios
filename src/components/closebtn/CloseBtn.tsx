import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { closeBtnTypes } from '../../dto/closeBtn';
import styles from './CloseBtn.module.scss';


export default function CloseBtn({callback,top,left,bottom,right}:closeBtnTypes) {
  return (
    <div className={styles.closeBtnWrapper} style={{top:top,right:right,bottom:bottom,left:left}}>
        <AiOutlineClose className={styles.btn} onClick={()=> callback(false)}/>
    </div>
  )
}

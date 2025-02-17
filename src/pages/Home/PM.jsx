import React, { useState, useEffect } from 'react'
import Report from '../../components/Report'
import { getPmrSites } from '../../api';

const PM = () => {
  const [pmrSites, setPmrSites] = useState([])
    useEffect(() => {
      getPmrSites().then((data) => {
        setPmrSites(data)
      })
      .catch((error) => {
            toast.error(error.message)
          })
    }, [])
  return (
    <Report type="PMR" sites={pmrSites}/>
  )
}

export default PM
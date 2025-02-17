import React, { useState, useEffect } from 'react'
import Report from '../../components/Report'
import { getWoSites } from '../../api'
import { toast } from 'react-toastify'

const WO = () => {
   const [woSites, setWoSites] = useState([])
      useEffect(() => {
        getWoSites().then((data) => {
          if(!data) toast.error("No WO sites found")
          setWoSites(data)
        })
        .catch((error) => {
              toast.error(error.message)
            })
      }, [])
  return (
    <Report type="WO" sites={woSites}/>
  )
}

export default WO
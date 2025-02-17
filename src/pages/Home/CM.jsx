import { useEffect, useState } from "react";
import Report from "../../components/Report";
import { getCmrSites } from "../../api"
import { toast } from "react-toastify";


const CM = () => {
  const [cmrSites, setCmrSites] = useState([])
  useEffect(() => {
    getCmrSites().then((data) => {
      setCmrSites(data)
    })
    .catch((error) => {
      toast.error(error.message)
    })
  }, [])
  return (
    <Report type="CMR" sites={cmrSites}/>
  )
}

export default CM
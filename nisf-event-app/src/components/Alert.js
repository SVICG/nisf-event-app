import { useAppContext } from "../context/appContext"

const Alert = () => {
  const {alertType, alertText} = useAppContext()
  return (
    <div id='alert' className={`alert alert-${alertType}`}>{alertText}</div>
  )
}

export default Alert
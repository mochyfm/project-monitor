import { CardProperties } from "../../types/interface.types";

const ApplicationCard = (cardProperties : CardProperties) => {

  const { projectName, projectLanguage, preferedIDE } = cardProperties;

  return (
    <>
    <div className="cardBlock">
      <div>{projectName}</div>
      <div>{projectLanguage}</div>
      <div>{preferedIDE}</div>
    </div>
    </>
        
  )
}

export default ApplicationCard
import React from 'react';
import { Fade } from "react-awesome-reveal";

function PopupMessage(props) {

  setTimeout(() => {
    props.setPopupState({
      isVisible: false,
      messageType: "success",
      messageContent: ""
    });
  }, (props.popupState.messageType === "success") ? 1000 : 1500);

  let icon;
  let mess;
  if (props.popupState.messageType === "success") {
    icon = <span className="material-icons-round text-4xl text-cyan-500">check_circle_outline</span> 
    mess = <span className="text-cyan-500 text-xl">{props.popupState.messageContent}</span>
  } else {
    icon = <span className="material-icons-round text-4xl text-red-600">error_outline</span> 
    mess = <span className="text-red-600 text-xl">{props.popupState.messageContent}</span>
  }

  return (
    <Fade when={!props.popupState.isPopupVisible}>
      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-slate-100 bg-opacity-60">
        <div className="flex flex-col w-auto h-32 items-center justify-center bg-slate-200 rounded-2xl p-5">
          {icon}
          {mess}
        </div>
      </div>
    </Fade>
  )
}

export default PopupMessage;
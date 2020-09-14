import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

const Notification = (props) => {
  const [notification, toggleNotification] = useState(false);

  useEffect(() => {
    let timer;
    if (props.message.length) {
      toggleNotification(true);
      timer = setTimeout(() => {
        toggleNotification(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [props.message]);

  return (
    <div className={`${notification ? "show" : ""} notification`}>
      {props.message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;

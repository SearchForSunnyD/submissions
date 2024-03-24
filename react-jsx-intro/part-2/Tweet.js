const Tweet = (props) => (
  <div className="tweet">
    <h4 className="user">{props.user}</h4>
    <p className="message">{props.message}</p>
    <small className="date">{props.date}</small>
  </div>
);

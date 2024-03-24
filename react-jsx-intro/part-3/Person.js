const Person = (props) => (
  <div>
    <p>Learn some information about this person</p>
    <h1>
      {props.name.length > 8 ? props.name.slice(0, 5) : props.name}{" "}
      <small>Age: {props.age}</small>
    </h1>
    <ul>
      {props.hobbies ? props.hobbies.map(hobby => <li>{hobby}</li>): ''}
    </ul>
    <h3> {props.age > 18 ? "please go vote" : "you must be 18"}</h3>
  </div>
);

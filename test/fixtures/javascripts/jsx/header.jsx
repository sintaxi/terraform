
import Nav from "./nav.jsx"

export default function(props) {
  const { name, current } = props;
  return (
    <div class="header">
      <h1>{ name }</h1>
      <Nav />
    </div>
  );
}

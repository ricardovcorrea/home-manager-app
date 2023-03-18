import { Link } from "react-router-dom";

export const AppMenu = () => {
  return (
    <div className='app-layout__menu'>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"products"}>Products</Link>
        </li>
        <li>
          <Link to={"reader"} target={"_blank"}>Reader</Link>
        </li>
      </ul>
    </div>
  );
};

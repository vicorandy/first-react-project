import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onToggle, showAdd }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" ? (
        <Button
          color="green"
          text={showAdd ? "Close" : "Add"}
          onClick={onToggle}
        ></Button>
      ) : (
        ""
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propType = {
  title: PropTypes.string.isRequired,
};
// stling in java script
// const headerStyling = {
//   color: "red",
//   backgroundColor: "blue",
// };

export default Header;

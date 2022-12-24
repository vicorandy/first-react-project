import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <p>Copyright &copy; 2021</p>
      <Link to="/about">About</Link>
    </footer>
  );
}

export default Footer;

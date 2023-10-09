//stiil
import styles from "./Header.module.css";

//ugradjene komponente iz react-bootstrapa
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//rutiraje
import { Link } from "react-router-dom";

//hooks & redux
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { NavLink } from "react-bootstrap";
function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  const loginHandler = () => {
    dispatch(authActions.authPassed());
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link>
              <Link className={styles["a-tag"]} to="/">
                Home
              </Link>
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link>
                <Link className={styles["a-tag"]} to="/favorites">
                  Favorites
                </Link>
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <Navbar.Text>
                Signed in as: <a>Senior koji mi pregleda task</a>
              </Navbar.Text>
            ) : (
              <button className={styles["login-button"]} onClick={loginHandler}>
                Login
              </button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

import { Link } from "react-router-dom";

function NavBar() {

    return(
    
        <div>
          <Link to='/'>Home</Link>
          <Link to='/company'>Empresa</Link>
          <Link to='/contact'>Contato</Link>
          <Link to='/newproject'>Novo projeto</Link>
        </div>

    )

}

export default NavBar;
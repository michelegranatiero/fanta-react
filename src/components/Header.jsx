import { MdAddCircle, MdSportsSoccer } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="logo" onClick={() => navigate("/")}>
        <MdSportsSoccer />
        Fanta Draft
      </h1>
      <p>
        {/* <button className={classes.button} onClick={() => navigate('new-draft')}>
          <MdAddCircle size={22} />
          New Draft
        </button> */}
      </p>
    </header>
  );
};

export default Header;

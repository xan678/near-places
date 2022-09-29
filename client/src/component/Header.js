import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit"

const Header = () => {
    const [show, setShow] = useState(false);

    return (
        <MDBNavbar fixed='top' expand="lg" style={{backgroundColor: "#f0e6ea"}}>
            <MDBContainer>
                <MDBNavbarBrand href='/' style={{color: "#606080", fontWeight: "600", fontSize:"22px"}}>
                    Near Places
                </MDBNavbarBrand>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Header;
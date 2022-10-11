import React, {useEffect} from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBCardGroup,
    MDBCol
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { deleteTour, getToursByUsers } from "../redux/features/tourSlice";
import Spinner from "../component/Spinner";
import {toast} from "react-toastify"

const Dashboard = () => {
    const {user} = useSelector((state) => ({...state.auth}));
    const {userTour, loading} = useSelector((state) => ({...state.tour}));

    const userId = user?.result?._id;

    useEffect(() => {
        if(userId){
            dispatch(getToursByUsers(userId));
        }
    },[userId]);

    const dispatch = useDispatch();
    
    const excerpt = (str) => {
        if(str.length > 40) {
            str = str.substring(0,45) + " ...";
        }
        return str;
    };
    
    const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to delete this tour")){
        dispatch(deleteTour({id,toast}));
      }
    }

    if(loading){
        return <Spinner/>
    }
    return (
        <div style={{
            margin : "auto",
             padding: "120px",
             maxWidth: "900px",
             alignContent: "center"
        }}>
            <h4 className="text-center"> Dashboard : {user?.result?.name}</h4>
            <hr style={{maxWidth : "570px"}}/>
            {
                userTour.length > 0 ? (
                    userTour &&
                    userTour.map((item) => (
                      <MDBCardGroup key={item._id}>
                        <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
                          <MDBRow className="g-0">
                            <MDBCol md="4">
                              <MDBCardImage
                                className="rounded"
                                src={item.imageFile}
                                alt={item.title}
                                fluid
                              />
                            </MDBCol>
                            <MDBCol md="8">
                              <MDBCardBody>
                                <MDBCardTitle className="text-start">
                                  {item.title}
                                </MDBCardTitle>
                                <MDBCardText className="text-start">
                                  <small className="text-muted" style={{marginTop : "10px"}}>
                                    {excerpt(item.description)}
                                  </small>
                                </MDBCardText>
                                <div
                                  style={{
                                    marginLeft: "5px",
                                    float: "right",
                                    marginTop: "-70px",
                                  }}
                                >
                                  <MDBBtn className="mt-1" tag="a" color="none">
                                    <MDBIcon
                                      fas
                                      icon="trash"
                                      style={{ color: "#dd4b39" }}
                                      size="lg"
                                      onClick= {() => handleDelete(item._id)}
                                    />
                                  </MDBBtn>
                                  <Link to={`/editTour/${item._id}`}>
                                    <MDBIcon
                                      fas
                                      icon="edit"
                                      style={{ color: "#55acee", marginLeft: "10px" }}
                                      size="lg"
                                    />
                                  </Link>
                                </div>
                              </MDBCardBody>
                            </MDBCol>
                          </MDBRow>
                        </MDBCard>
                      </MDBCardGroup>
                    ))
                    
                 ) :
                   (
                    <h1>
                    No Records found
                    </h1>
                   )
                
                }
        </div>
    );
}

export default Dashboard
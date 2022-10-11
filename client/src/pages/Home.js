import React, {useEffect} from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from 'react-redux';
import { getTours } from "../redux/features/tourSlice.js";
import CardTour from "../component/CardTour.js"
import Spinner from "../component/Spinner.js";

const Home = () => {

    const {tours, loading} = useSelector((state) =>({...state.tour,}));

    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(tours);
        dispatch(getTours());
    },[]);

    if(loading){
        return <Spinner/>
    }

    return (
        <div style={{
            margin: "auto",
            marginTop: "100px",
            padding: "15px",
            maxWidth: "1000px",
            alignContent: "center"
        }}>
            <MDBRow className="mt-5">
                {tours.length === 0 &&(
                    <MDBTypography className="text-center mb-0" tag="h2">
                        
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {tours.length === 0 ?
                            (<h1>
                                No Tour Found 
                            </h1>):
                            (tours.map((item,index) =><>
                                <CardTour key={index} {...item}/>
                            </>))}
                                  
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Home;
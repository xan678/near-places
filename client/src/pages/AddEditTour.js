import React , {useState, useEffect} from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBSpinner,
} from 'mdb-react-ui-kit'
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import {toast} from "react-toastify"
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createTour, updateTour} from "../redux/features/tourSlice.js"


const initialState = {
    title: "",
    description : "",
    tags : [],
}

const AddEditTour = () => {
    const [tourData, setTourData] = useState(initialState);
    const {error, loading, userTour} = useSelector((state) => ({...state.tour}));
    const {user} = useSelector((state) => ({...state.auth}));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {title, description, tags} = tourData;
    const {id} = useParams();

    useEffect(() => {
        const singleTour = userTour.find((tour) => tour._id === id);
        setTourData({...singleTour});
    }, [id]);


    useEffect(() =>{
        error && toast.error(error);
    }, [error]);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setTourData({...tourData, [name]: value});
    };
    const handleAddTags = (tag) => {
        setTourData({...tourData, tags:[...tourData.tags, tag]});
    };
    const handleDeleteTag = (deleteTag) => {
        setTourData({...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag)});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && description && tags){
            const updatedTourData = {...tourData,name: user?.result?.name};

            if(!id){
                dispatch(createTour({updatedTourData, navigate, toast}));
            }else{
                dispatch(updateTour({id, updatedTourData, toast, navigate}))
            }
            handleClear();
        }
    };
    const handleClear = () => {
        setTourData({
            title: "",
            description: "",
            tags:[],
        });
    };
    return (
        <div style = {{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop : "120px"}}
        className = 'container'>
            <MDBCard alignment="center">
                <h5>{id ? "Update Tour" : "Add Tour"}</h5>
                <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                    <div className="col-md-12">
                        <input
                            placeholder="Enter Title"
                            type = "text"
                            value={title}
                            name = "title"
                            onChange={onInputChange}
                            className= "form-control"
                            required = "true"
                            invalid 
                            validation = "Please provide title"
                        />
                    </div>
                    <div className="col-md-12">
                        <textarea
                            placeholder="Enter Description"
                            type = "text"
                            value={description}
                            style = {{height: "100px"}}
                            name = "description"
                            onChange={onInputChange}
                            className= "form-control"
                            required = "true"
                            invalid 
                            validation = "Please provide title"
                        />
                    </div>

                    <div className="co-md-12">
                        <ChipInput 
                        name = "tags"
                        variant="outlined"
                        placeholder="Enter Tag"
                        fullWidth
                        value={tags}
                        onAdd={(tag) => handleAddTags(tag)}
                        onDelete = {(tag) => handleDeleteTag(tag)}
                        />
                    </div>
                    <div className="d-flex justify-content-start">
                        <FileBase type='file' multiple={false} onDone={(({base64}) => setTourData({...tourData, imageFile:base64}))}
                        />
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}}>
                            {id ? "Update" : "Submit"}
                        </MDBBtn>
                        <MDBBtn style={{width: "100%", marginTop: " 5px"}} className = 'mt-12' color="danger" onClick={handleClear}>
                            Clear
                        </MDBBtn>
                    </div>
                </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default AddEditTour;
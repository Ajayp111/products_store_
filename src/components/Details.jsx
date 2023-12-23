import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { getDetails } from "../redux/features/details/detailsSlice";

function Details() {
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(params.id));
  }, [dispatch, params.id]);

  const productDetails = useSelector((state) => state.detailsReducer.value);

  const loading = useSelector((state) => state.detailsReducer.loading);

  return (
    <div>
      <h1 id="details-heading">DETAILS</h1>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "200px" }}>
          Loading...
        </div>
      ) : (
        <SingleProduct productDetails={productDetails} />
      )}
    </div>
  );
}

export default Details;

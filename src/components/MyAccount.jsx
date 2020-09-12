import React, { useEffect, useState } from "react";
import axios from "axios";
import { Item, Label, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const [myListing, setMyListing] = useState([]);
  const [myBiddings, setMyBiddings] = useState([])


  useEffect(() => {
    getListing();
    getBids()
  }, []);

  const getListing = async () => {
    const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.get("account/listings", { headers: headers });
    setMyListing(response.data.listings);
  };


  const getBids = async () => {
    const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.get("/account/biddings", { headers: headers });
    setMyBiddings(response.data.biddings)
  }



  let bids

  if (myBiddings.length > 0) {
    bids = myBiddings.map(mybid => (
      <div data-cy='user-bids' >
        <div data-cy={`bid-${mybid.listing.id}`}>
          <img data-cy='listing-image' src={mybid.listing.image} alt="parking" />
          <h1 data-cy="listing-lead" >{mybid.listing.lead}</h1>
          <h1 data-cy="listing-scene" >{mybid.listing.scene}</h1>
          <h1 data-cy="listing-category" >{mybid.listing.category}</h1>
          <h1 data-cy="bid-status" >{mybid.status}</h1>
          <h1 data-cy="bid-offer" >{mybid.bid}</h1>
        </div>
      </div>
    ))
  } else {
    bids = (
      <>
        <h1 data-cy='message'>You have not placed any bids.</h1>
      </>
    ) 
  } 
    
  

  let content = myListing.map((listing) => (
    <Item.Group divided>
      <Item data-cy={`listing-${listing.id}`} data-id={listing.id}>
        <Item.Image data-cy="image" src={listing.image} alt="listing image" />
        <Item.Content>
          <Item.Header data-cy="lead">{listing.lead}</Item.Header>
          <Item.Meta data-cy="category">{listing.category}</Item.Meta>
          <Item.Extra>
            <Label data-cy="scene">{listing.scene}</Label>
            <Link to={`listings/${listing.id}`}>
              <Button data-cy="button" primary floated="right">
                Listing Details
                <Icon name="right chevron" />
              </Button>
            </Link>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  ));

  return (
    <div>
      <div>{bids}</div>
      <div>{content}</div>
    </div>
  );
};

export default MyAccount;

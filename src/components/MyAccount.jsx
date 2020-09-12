import React, { useEffect, useState } from "react";
import axios from "axios";
import { Item, Label, Button, Icon, Container, Header, Divider } from "semantic-ui-react";
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
      <Item.Group divided>
      <Item.Group data-cy='user-bids' >
        <Item data-cy={`bid-${mybid.listing.id}`}>
          <Item.Image data-cy='listing-image' src={mybid.listing.image} alt="parking" />
          <Item.Content>
          <Item.Header data-cy="listing-lead" >{mybid.listing.lead}</Item.Header>
          <Item.Meta data-cy="listing-category" >{mybid.listing.category}</Item.Meta>
          <Label data-cy="listing-scene" >{mybid.listing.scene}</Label><br /><br />
          <Item.Content >
          <Item.Extra>
          <Item.Header floated="right" data-cy="bid-status" ><h3>Bid status:</h3>{mybid.status}</Item.Header>
          <Item.Header data-cy="bid-offer" ><h3>Bid amount:</h3>{mybid.bid}</Item.Header>
          </Item.Extra>
          </Item.Content>
          </Item.Content>
        </Item>
      </Item.Group>
      </Item.Group>
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
      <Header as="h1" textAlign="center" icon>
        <Icon name="pin" />
        My Account
      </Header>
      <Divider section />
      <Container text>
      <Header as='h2'id="myaccount">My Bids</Header>
      <div>{bids}</div>
      </Container>
      <Divider section />
      <Header as='h2'id="myaccount">My Listings</Header>
      <div>{content}</div>
    </div>
  );
};

export default MyAccount;
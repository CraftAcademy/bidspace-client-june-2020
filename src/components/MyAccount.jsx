import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Item, Label, Button, Icon, Header, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SendMessage from "./SendMessage"
import { ActionCableProvider } from "actioncable-client-react";
import ListMessages from './ListMessages'
import { useSelector } from 'react-redux';



const MyAccount = () => {
  const [myListing, setMyListing] = useState([]);
  const [myBiddings, setMyBiddings] = useState([])
  const currentUser = useSelector(state => state.currentUser)

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
    bids = myBiddings.map(bid => (
      <div data-cy='user-bids' >
        <Card.Group>
          <Card style={{ width: "100vw", margin: '3%', padding: '3%' }}>
            <div data-cy={`bid-${bid.listing.id}`}>
              <img data-cy='listing-image' src={bid.listing.image} alt="parking" />
              <h1 data-cy="listing-lead" >{bid.listing.lead}</h1>
              <h1 data-cy="listing-scene" >{bid.listing.scene}</h1>
              <h1 data-cy="listing-category" >{bid.listing.category}</h1>
              <h1 data-cy="bid-status" >{bid.status}</h1>
              <h1 data-cy="bid-offer" >{bid.bid}</h1>
            </div>

            <Card.Content extra >

              <Header as="h3">Messages</Header>
              {bid.messages != [] &&
                <ListMessages bid={bid} />
              }
              <SendMessage
                bid={bid}
                userBids={true}
                getBids={getBids}
              />
            </Card.Content>
          </Card>
        </Card.Group>
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
    <Container>
      <ActionCableProvider
        url={`ws://localhost:3000/cable?uid=${currentUser.id}`}>
        <Header as="h1">Your current bids</Header>
        {bids}
        <Header as="h1">Your listings</Header>
        {content}
      </ActionCableProvider>
    </Container>
  );
};

export default MyAccount;

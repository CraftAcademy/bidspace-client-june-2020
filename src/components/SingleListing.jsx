import React, { useEffect, useState } from "react";
import axios from "axios";
import { Item, Label, Image, Grid, Container, Header, Divider, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";

const SingleListing = (props) => {
  const listingId = props.match.params.id;
  const [singleListing, setSingleListing] = useState({});
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [biddingValue, setBiddingValue] = useState("");
  const isUserAuthenticated = props.authenticated;

  const onChangeHandler = (e) => {
    setBiddingValue(e.target.value);
  };

  const submitBid = async (event) => {
    event.preventDefault();
    let responseMessage, bidParams, response;
    let bid = biddingValue;
    const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      bidParams = {
        bid: parseFloat(bid),
        listing_id: singleListing.id,
      };

      response = await axios.post(
        "/biddings",
        { bidding: bidParams },
        { headers: headers }
      );

      responseMessage = response.data.message;
    } catch (error) {
      responseMessage = error.response.data.message;
    } finally {
      setMessage(responseMessage);
    }
  };

  let biddingField;
  if (isUserAuthenticated) {
    biddingField = (
      <Form onSubmit={submitBid}>
        <Form.Input
          id={singleListing.id}
          value={biddingValue}
          onChange={onChangeHandler}
          data-cy="input"
          type="number"
        />
        <Button positive data-cy="button">Register Your Bid</Button>
      </Form>
    );
  } else {
    biddingField = (
      <>
        <Container text data-cy="message"><strong>You need to log in to bid</strong></Container>
      </>
    );
  }

  useEffect(() => {
    getSingleListing();
  }, []);

  const getSingleListing = async () => {
    let id = listingId;
    let response = await axios.get(`/listings/${id}`);
    setSingleListing(response.data.listing);
    setImages(response.data.listing.images);
  };

  let listingContent = (
    <>
      <Container textAlign="justified" divided
          data-cy={`listing-${singleListing.id}`}
          data-id={singleListing.id}
        >
            <Header as="h1" size="huge" data-cy="lead">{singleListing.lead}</Header>
            <Divider />
            <Container text data-cy="address"><strong>{singleListing.address}</strong></Container>
            <Divider />
            <Container text data-cy="description">
              {singleListing.description}
            </Container>
            <Divider />
            <Container text>
              <Label size="massive" data-cy="scene">{singleListing.scene}</Label>
              <Label size="massive" data-cy="category">{singleListing.category}</Label>
              <Label size="massive" data-cy="price">Target Price: {singleListing.price}kr</Label>
              </Container>
              <Divider />
            <Container>{biddingField}</Container>
      </Container>
    </>
  );

  return (
    <>
      <Grid centered column={1} divided padded>
        <Grid.Row stretched>
          <Grid.Column width={4}>
            {images.map((image) => (
              <Image
                id="listing-image"
                data-cy="image"
                src={image.url}
                alt="listing image"
              />
            ))}
          </Grid.Column>
          <Grid.Column width={8}>
            <div>{listingContent}</div>
            <div> {message && <p data-cy="message">{message}</p>}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps)(SingleListing);

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchResults from './results';

const $ = window.$;

function searchInput(handler) {
  const onKeyUp = (e) => {
    const input = $(e.target);
    if (e.which === 13) {
      const val = input.val();
      input.val('');
      if (!val) return;
      handler(val);
    }
  };
  return <input type="text" onKeyUp={onKeyUp} />;
}

class Root extends Component {
  state = {
    results: {},
  };

  search = (query) => {
    const payload = {
      size: 10,
      explain: true,
      highlight: {},
      query: {
        query: query,
      },
    };
    fetch('/api/search', {
      method: 'post',
      body: JSON.stringify(payload),
    }).then(res => res.json())
      .then(results => this.setState({ results }));
  };

  render() {
    return (
      <Grid className="app">
        <Row>
          <Col lg={12}>
            {searchInput(this.search)}
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <SearchResults results={this.state.results} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Root;

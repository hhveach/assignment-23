import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const CongMainList = React.createClass({

  render: function(){
    return (
      <div className="column-container">
        <input className="zip-code" type="text" placeholder="Enter ZIP" />
        {this.props.mainList.map(function(listEl){
          return <CreateCongList senInfo={listEl}/>;
        })};
      </div>
    )
  }
});

const CreateCongList = React.createClass({

    render: function(){
      return (
            <div className="main-list">
              <h2>{this.props.senInfo.first_name} {this.props.senInfo.last_name}</h2>
              <h2>{this.props.senInfo.title} --{this.props.senInfo.party}-{this.props.senInfo.state_name}</h2>
              <ul>
                <li>email: {this.props.senInfo.oc_email}</li>
                <li>website: {this.props.senInfo.website}</li>
                <li>facebook: {this.props.senInfo.facebook_id}</li>
                <li>twitter: {this.props.senInfo.twitter_id}</li>
              </ul>
              <p>{this.props.senInfo.term_end}</p>
            </div>
            )
        }
});

// const ZipCode = React.createClass({
//   inputSubmit: function(evt){
//
//   }
//
// });

$.getJSON('https://congress.api.sunlightfoundation.com/legislators?callback=?').then(function(serverRes){
  ReactDOM.render( <CongMainList mainList={serverRes.results}/>, document.querySelector('#app-container'));
});

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const ProfileList = React.createClass({
  render: function(){
    return (
      <div className="column-container">
        <SingleList congList={this.props.mainList}/>
      </div>
    )
  }
});

const SingleList = React.createClass({
    createCongInfo: function(arrOfObj){
      let jsxArray = arrOfObj.map(function(listEl){
        return <div className="main-list">
                <h2>{listEl.first_name} {listEl.last_name}</h2>
                <h2>{listEl.title} --{listEl.party}-{listEl.state_name}</h2>
                <ul>
                  <li>{listEl.oc_email}</li>
                  <li>{listEl.website}</li>
                  <li>{listEl.facebook_id}</li>
                  <li>{listEl.twitter_id}</li>
                </ul>
                <p>{listEl.term_end}</p>
              </div>
      });
      return jsxArray;
    },


    render: function(){
      let congressList = this.props.congList;
      return (
            <div class="main-list">
              {this.createCongInfo(congressList)}
            </div>
            )
        }
});

$.getJSON('https://congress.api.sunlightfoundation.com/legislators?callback=?').then(function(serverRes){
  ReactDOM.render( <ProfileList mainList={serverRes.results}/>, document.querySelector('#app-container'));
});

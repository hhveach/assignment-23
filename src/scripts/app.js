import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const CongMainList = React.createClass({

  // SyntheticEvent: function({
  //   console.log()
  // })

  _handleZipInput: function(evt){
    let input = evt.target.value;
    if(this._handleZipInput && evt.keyCode === 13){
      $.getJSON(`https://congress.api.sunlightfoundation.com/legislators/locate?zip=${input}&callback=?`).then(function(serverRes){
        ReactDOM.render( <CongMainList mainList={serverRes.results}/>, document.querySelector('#app-container'));
      });
    }
  },

  render: function(){
    const { mainList } = this.props;
    return (
      <div className="column-container">
        <input onKeyDown={this._handleZipInput} className="zip-code" type="text" placeholder="Search Legislators by ZIP" />
        {mainList.map(function(listEl){
          return <CreateCongList senInfo={listEl}/>
        })}
      </div>
    )
  }
});

const CreateCongList = React.createClass({

    render: function(){
      const {first_name, last_name, title, party, state_name, oc_email, website, facebook_id, twitter_id, term_end } = this.props.senInfo;
      return (
            <div className="main-list">
              <h2>{first_name} {last_name}</h2>
              <h2>{title} --{party}-{state_name}</h2>
              <ul>
                <li>email: {oc_email}</li>
                <li>website: {website}</li>
                <li>facebook: {facebook_id}</li>
                <li>twitter: {twitter_id}</li>
              </ul>
              <p>Term end: {term_end}</p>
            </div>
            )
        }
});

$.getJSON('https://congress.api.sunlightfoundation.com/legislators?callback=?').then(function(serverRes){
  ReactDOM.render( <CongMainList mainList={serverRes.results}/>, document.querySelector('#app-container'));
});

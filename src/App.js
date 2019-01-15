import React, { Component } from 'react';
import './css/main.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
		<body>
		<div class="container">
			<div id="dialog" class="modal">
			  	<div id="modalcontent" class="modalcontent"></div>
			  	<div id="modalbutton" class="modalbutton">aaaa</div>
			</div>
		</div>
		<div id="topbar"></div>
		<div id="map"></div>
		<div id="footer"><div id="menubar"></div></div>
		</body>
      </div>
    );
  }
}

export default App;

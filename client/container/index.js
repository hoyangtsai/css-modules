import React from 'react';
import ReactDOM from 'react-dom';

/*__sub__*/
/*__sub__*/

/*页面定制样式*/
import header from 'currentDir/client/style/header.css';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <header className={header.bar1}><h2>AI開放平台</h2><i className={header.icoSucc}></i></header>
      </div>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.querySelector('.wrapper')
);

import React from 'react';
import ReactDOM from 'react-dom';

/*__sub__*/
/*__sub__*/

/*页面定制样式*/
import style from 'currentDir/client/style/index.css';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <header className={style.headerBar1}><h2>AI開放平台</h2></header>
      </div>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.querySelector('.wrapper')
);

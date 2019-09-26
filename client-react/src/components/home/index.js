import './index.less';
// import logo from '../../assets/userLogo.jpeg';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkList: [
        {
          name: '文章',
          path: 'articles',
          type: 1
        },{
          name: '项目',
          path: 'project',
          type: 1
        },{
          name: 'Github',
          path: 'https://github.com/biaochenxuying', 
        },{
          name: '掘金',
          path: 'https://juejin.im/user/591d6b4d0ce463006926ae40', 
        },{
          name: '知乎',
          path: 'https://www.zhihu.com/people/gu-jian-qi-tan-shui/activities', 
        },{
          name: 'segmentfault',
          path: 'https://segmentfault.com/u/biaochenxuying'
        },{
          name: '简书',
          path: 'https://www.jianshu.com/u/91717b553bfd'
        }
      ]
    };
  }

  render() {
    return (
      <div className="home">
        <canvas id="sakura" />
        <div className="content">
          <div className="home-header">
            {/* <Link className="link" to={`/home`}>
              <img className="home-logo" src={logo} alt="biaochenxuying logo" />
            </Link> */}
          </div>
          <div className="home-body">
            <div className="list">
            {
              this.state.linkList.map((item, index) => (
                item.type === 1 ? <Link key={index} className="link" to={`/${item.path}`}>{item.name}</Link> :
                <a   target="_blank" rel="noopener noreferrer"
                className="link" key={index} href={item.path}>{item.name}</a>
              ))
            } 
            </div>
            <div className="logion"> 加班到天明，学习到昏厥 ！！！ </div>
            {/* <div className="introduce"> 时光正好，未来可期，加油 ！ </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

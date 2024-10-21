import React from 'react';

const InterviewPage = () => {
  return (
    <div className="interview-page">
      <div className="hero-section">
        <h1>面试突击</h1>
        <h2>mikechen</h2>
      </div>
      <div className="main-content">
        <div className="left-column">
          <p>大家好，我是mikechen。</p>
          <p>给大家总结了一份非常全面的大厂面试题并做了精讲，以后面试就不要东跑西跑了，都在这里了@mikechen</p>
          <p>非常的全面，包含了15大必考题目精讲：</p>
          <blockquote>
            <ol>
              <li>多线程与并发必考题精讲</li>
              <li>集合容器必考题精讲</li>
              <li>JVM虚拟机必考题精讲</li>
              {/* Add more list items for the remaining topics */}
            </ol>
          </blockquote>
        </div>
        <div className="right-column">
          <div className="card java-architecture">
            <h3>Java架构系列专题</h3>
            <p>覆盖阿里P6-P7-P8必备技能</p>
            <ul>
              <li>高性能</li>
              <li>高并发</li>
              <li>高可用</li>
              <li>云原生</li>
              <li>分布式</li>
              <li>微服务</li>
              <li>架构师</li>
              <li>大数据</li>
              <li>中间件</li>
            </ul>
          </div>
          <div className="card large-projects">
            <h3>大型项目实战落地</h3>
            <p>手把手带你搞定项目亮点</p>
            {/* Add project images here */}
          </div>
          <div className="card java-interview">
            <h3>Java大厂面试精讲</h3>
            <p>2024最新大厂面试真题精讲</p>
            {/* Add company logos here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
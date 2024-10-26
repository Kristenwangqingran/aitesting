import React, { useState } from 'react';
import './TestingProjects.css';

const testingProjects = [
  { id: 1, title: "电商网站全流程测试", description: "包括用户注册、登录、搜索、下单、支付等核心功能的全面测试" },
  { id: 2, title: "移动银行APP测试", description: "对银行APP进行功能、安全性和用户体验测试" },
  { id: 3, title: "企业级CRM系统测试", description: "对客户关系管理系统进行全面的功能和集成测试" },
  { id: 4, title: "物联网设备控制系统测试", description: "测试智能家居控制系统的功能和兼容性" },
  { id: 5, title: "在线教育平台测试", description: "对在线学习平台进行功能、性能和可访问性测试" },
  { id: 6, title: "社交媒体应用测试", description: "测试社交应用的核心功能、性能和安全性" },
  { id: 7, title: "医疗信息系统测试", description: "对医院管理系统进行全面的功能和数据安全测试" },
  { id: 8, title: "航空订票系统测试", description: "测试机票预订系统的准确性、性能和并发处理能力" },
  { id: 9, title: "在线游戏平台测试", description: "对多人在线游戏进行功能、性能和负载测试" },
  { id: 10, title: "企业资源规划(ERP)系统测试", description: "测试大型ERP系统的各模块功能和集成" },
  { id: 11, title: "车载信息娱乐系统测试", description: "测试汽车内置娱乐系统的功能和用户界面" },
  { id: 12, title: "智能手表应用测试", description: "对可穿戴设备应用进行功能和兼容性测试" },
  { id: 13, title: "电子政务系统测试", description: "测试政府在线服务平台的功能、安全性和可靠性" },
  { id: 14, title: "酒店预订系统测试", description: "对酒店预订网站进行全面的功能和集成测试" },
  { id: 15, title: "人力资源管理系统测试", description: "测试HR系统的各项功能和数据处理能力" },
  { id: 16, title: "在线支付网关测试", description: "对支付系统进行安全性、性能和兼容性测试" },
  { id: 17, title: "视频流媒体平台测试", description: "测试流媒体服务的视频质量、加载速度和用户体验" },
  { id: 18, title: "智能家居系统测试", description: "对智能家居设备和控制系统进行集成和功能测试" },
  { id: 19, title: "电子商务移动应用测试", description: "测试移动购物APP的各项功能和用户体验" },
  { id: 20, title: "云存储服务测试", description: "对云存储平台进行功能、性能和数据安全测试" },
  { id: 21, title: "在线约车平台测试", description: "测试打车应用的核心功能、地图集成和实时通信" },
  { id: 22, title: "企业协作工具测试", description: "对团队协作软件进行功能和多用户场景测试" },
  { id: 23, title: "电子阅读器软件测试", description: "测试电子书阅读器的各项功能和阅读体验" },
  { id: 24, title: "健康监测应用测试", description: "对健康追踪APP进行功能和数据准确性测试" },
  { id: 25, title: "在线音乐流媒体测试", description: "测试音乐流媒体服务的音质、推荐算法和用户界面" },
  { id: 26, title: "智能农业系统测试", description: "对农业物联网系统进行功能和数据分析测试" },
  { id: 27, title: "在线旅游预订平台测试", description: "测试旅游网站的预订流程、支付集成和用户评价系统" },
  { id: 28, title: "电子签名系统测试", description: "对电子签名服务进行安全性和法律合规性测试" },
  { id: 29, title: "虚拟现实(VR)应用测试", description: "测试VR应用的图形渲染、交互性和用户体验" },
  { id: 30, title: "智能客服系统测试", description: "对AI驱动的客服系统进行功能和自然语言处理能力测试" },
  { id: 31, title: "在线考试系统测试", description: "测试远程考试平台的功能、安全性和并发处理能力" },
  { id: 32, title: "电子钱包应用测试", description: "对移动支付应用进行功能、安全性和交易处理测试" },
  { id: 33, title: "智能交通系统测试", description: "测试城市交通管理系统的实时数据处理和控制功能" },
  { id: 34, title: "在线食品配送平台测试", description: "对外卖APP进行订单处理、配送追踪和用户评价测试" },
  { id: 35, title: "企业数据分析平台测试", description: "测试大数据分析工具的数据处理能力和可视化功能" },
  { id: 36, title: "智能家电控制应用测试", description: "对智能家电远程控制APP进行功能和设备兼容性测试" },
  { id: 37, title: "在线健身课程平台测试", description: "测试健身视频流媒体服务的播放质量和用户互动功能" },
  { id: 38, title: "电子商务推荐系统测试", description: "测试电商平台的个性化推荐算法和准确性" },
  { id: 39, title: "智能安防系统测试", description: "对智能监控和报警系统进行功能和可靠性测试" },
  { id: 40, title: "在线广告平台测试", description: "测试广告投放系统的定向功能、效果追踪和报表生成" },
  { id: 41, title: "区块链交易平台测试", description: "对加密货币交易所进行功能、安全性和性能测试" },
  { id: 42, title: "智能语音助手测试", description: "测试语音识别、自然语言处理和语音合成功能" },
  { id: 43, title: "在线招聘平台测试", description: "对求职网站进行功能、用户体验和数据匹配测试" },
  { id: 44, title: "电子医疗记录系统测试", description: "测试医疗数据管理系统的准确性、安全性和互操作性" },
  { id: 45, title: "智能工厂管理系统测试", description: "对工业4.0生产管理系统进行功能和集成测试" },
  { id: 46, title: "在线课程管理系统测试", description: "测试教育机构的课程安排、学生管理和成绩追踪功能" },
  { id: 47, title: "电子票务系统测试", description: "对演唱会、电影等票务系统进行功能和并发性能测试" },
  { id: 48, title: "智能投资顾问应用测试", description: "测试基于AI的金融投资建议系统的准确性和风险评估" },
  { id: 49, title: "在线法律咨询平台测试", description: "对法律服务网站进行功能、隐私保护和用户体验测试" },
  { id: 50, title: "区块链钱包应用测试", description: "测试加密货币钱包的安全性、交易功能和用户界面" }
];

function TestingProjects() {
  const [visibleProjects, setVisibleProjects] = useState(10);

  const loadMore = () => {
    setVisibleProjects(prevVisible => Math.min(prevVisible + 10, testingProjects.length));
  };

  return (
    <div className="testing-projects">
      <ul className="project-list">
        {testingProjects.slice(0, visibleProjects).map((project) => (
          <li key={project.id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
      {visibleProjects < testingProjects.length && (
        <button onClick={loadMore} className="load-more-btn">加载更多</button>
      )}
    </div>
  );
}

export default TestingProjects;
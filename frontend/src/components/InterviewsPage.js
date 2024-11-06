import React from 'react';
import './InterviewsPage.css';

function InterviewsPage() {
  const interviewTopics = [
    {
      title: "大厂必问一：设计测试用例",
      points: [
        "测试理论（黑盒测试、白盒测试、灰盒测试）",
        "测试用例设计方法（等价类划分,边界值分析,因果图,状态转移,等）",
        "测试流程和测试计划制定",
        "接口测试用例怎么设计",
        "给一个具体场景，设计测试用例",
        "......"
      ]
    },
    {
      title: "大厂必问二：代码基础知识",
      points: [
        "代码规范指南",
        "进程线程和协程",
        "常用包以及函数用法，装饰器",
        "可变对象和不可变对象区别",
        "如何理解代码的可读性和可扩展性",
        "......"
      ]
    },
    {
      title: "大厂必问三：自动化测试",
      points: [
        "介绍公司的自动化测试平台",
        "自动化测试异步场景用例",
        "如何提高自动化测试的稳定性",
        "持续集成/持续部署（CI/CD）工具（如 Jenkins）",
        "......"
      ]
    },
    {
      title: "大厂必问四：测试工具",
      points: [
        "接口测试工具（如 Postman、Swagger）",
        "UI测试工具（如 Selenium、Appium）",
        "性能测试工具（如 JMeter、LoadRunner）",
        "......"
      ]
    },
    {
      title: "大厂必问五：性能测试",
      points: [
        "性能测试主要关注的指标",
        "性能测试使用工具（如 JMeter、LoadRunner）",
        "如何进行性能测试",
        "压力测试或者并发测试为什么设置1000个并发用户，1000个线程，1000个连接",
        "......"
      ]
    },
    {
      title: "大厂必问六：项目中印象深刻的bug",
      points: [
        "电商项目中的库存超卖问题",
        "直播项目中的卡顿问题",
        "在线银行系统中的数据库和缓存一致性",
        "......"
      ]
    },
    {
      title: "大厂必问七：如何与团队合作完成工作",
      points: [
        "多团队合作如何沟通协作",
        "如何与开发人员、产品经理、项目经理等角色进行有效沟通",
        "如何处理团队中的冲突和分歧",
        "......"
      ]
    }
  ];

  return (
    <div className="interviews-page">
      <div className="interview-topics-list">
        {interviewTopics.map((topic, index) => (
          <div key={index} className="topic-section">
            <h2>{topic.title}</h2>
            <ul>
              {topic.points.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewsPage;
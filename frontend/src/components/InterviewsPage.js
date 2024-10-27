import React from 'react';
import './InterviewsPage.css';

function InterviewsPage() {
  const interviewTopics = [
    {
      title: "测试基础知识",
      points: [
        "测试理论（黑盒测试、白盒测试、灰盒测试）",
        "测试用例设计方法（等价类划分、边界值分析、因果图等）",
        "测试流程和测试计划制定"
      ]
    },
    {
      title: "技术能力",
      points: [
        "编程能力（常用语言如 Python、Java）",
        "数据结构与算法基础",
        "自动化测试框架使用（如 Selenium、Appium）",
        "API 测试（RESTful API、Postman、JMeter）",
        "性能测试（概念、工具使用如 LoadRunner、JMeter）",
        "安全测试基础知识"
      ]
    },
    {
      title: "测试工具",
      points: [
        "缺陷管理工具（如 JIRA、Bugzilla）",
        "测试管理工具（如 TestRail、QTest）",
        "版本控制系统（如 Git）",
        "持续集成/持续部署（CI/CD）工具（如 Jenkins）"
      ]
    },
    {
      title: "数据库知识",
      points: [
        "SQL 基础",
        "数据库测试方法"
      ]
    },
    {
      title: "操作系统和网络基础",
      points: [
        "Linux 基本命令",
        "网络协议（HTTP/HTTPS、TCP/IP）"
      ]
    },
    {
      title: "软技能",
      points: [
        "沟通能力",
        "团队协作",
        "问题分析与解决能力",
        "时间管理和优先级设定"
      ]
    },
    {
      title: "项目经验",
      points: [
        "过往项目中遇到的挑战及解决方案",
        "测试策略制定经验",
        "自动化测试实践"
      ]
    },
    {
      title: "行业知识",
      points: [
        "软件开发方法论（敏捷、Scrum等）",
        "测试新趋势（AI在测试中的应用、持续测试等）"
      ]
    },
    {
      title: "质量意识",
      points: [
        "质量保证的理解",
        "如何提高产品质量的建议"
      ]
    }
  ];

  return (
    <div className="interviews-page">
      <h1>大厂软件测试面试要点</h1>
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
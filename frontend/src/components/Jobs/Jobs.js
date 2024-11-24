import React, { useState } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('recruitment');
  const [isRemote, setIsRemote] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dummyRecruitments = [
    {
      id: 1,
      company: '测试科技有限公司',
      position: '测试工程师',
      salary: '15k-25k',
      requirements: '3年以上测试经验，熟悉自动化测试框架',
      location: '北京'
    },
    {
      id: 2,
      company: '智能软件科技',
      position: '自动化测试工程师',
      salary: '20k-35k',
      requirements: '熟悉 Selenium、Appium，具有 CI/CD 经验',
      location: '上海'
    },
    {
      id: 3,
      company: '互联网金融公司',
      position: '性能测试工程师',
      salary: '25k-40k',
      requirements: '精通 JMeter、LoadRunner，具有大型性能测试项目经验',
      location: '深圳'
    }
  ];

  const dummyJobSearches = [
    {
      id: 1,
      name: '张三',
      position: '高级测试工程师',
      experience: '5年',
      expectedSalary: '20k-30k',
      location: '上海',
      skills: 'Selenium, Python, Jenkins, 接口测试'
    },
    {
      id: 2,
      name: '李四',
      position: '自动化测试专家',
      experience: '8年',
      expectedSalary: '35k-50k',
      location: '北京',
      skills: 'Java, TestNG, Appium, 性能测试'
    },
    {
      id: 3,
      name: '王五',
      position: '测试开发工程师',
      experience: '3年',
      expectedSalary: '18k-25k',
      location: '杭州',
      skills: 'Python, Robot Framework, Docker'
    },
    {
      id: 4,
      name: '赵六',
      position: '性能测试工程师',
      experience: '4年',
      expectedSalary: '25k-35k',
      location: '广州',
      skills: 'JMeter, LoadRunner, K8s, 监控工具'
    }
  ];

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <div className="jobs-tabs">
          <button 
            className={`tab ${activeTab === 'recruitment' ? 'active' : ''}`}
            onClick={() => setActiveTab('recruitment')}
          >
            招聘信息
          </button>
          <button 
            className={`tab ${activeTab === 'jobSearch' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobSearch')}
          >
            求职信息
          </button>
        </div>
        <div className="remote-toggle">
          <span className="remote-label">远程</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isRemote}
              onChange={(e) => setIsRemote(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="jobs-content">
        {activeTab === 'recruitment' ? (
          <div className="recruitment-list">
            {dummyRecruitments.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.position}</h3>
                <p className="company">{job.company}</p>
                <p className="salary">{job.salary}</p>
                <p className="location">{job.location}</p>
                <p className="requirements">{job.requirements}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="job-search-list">
            {dummyJobSearches.map(seeker => (
              <div key={seeker.id} className="seeker-card">
                <h3>{seeker.position}</h3>
                <p className="name">{seeker.name}</p>
                <p className="experience">工作经验：{seeker.experience}</p>
                <p className="expected-salary">期望薪资：{seeker.expectedSalary}</p>
                <p className="location">期望城市：{seeker.location}</p>
                <p className="skills">技能特长：{seeker.skills}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs; 
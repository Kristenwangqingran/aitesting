import React, { useState } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('recruitment');
  const [isRemote, setIsRemote] = useState(false);
  const [showJobSeekerForm, setShowJobSeekerForm] = useState(false);
  const [newJobSeeker, setNewJobSeeker] = useState({
    name: '',
    position: '',
    experience: '',
    expectedSalary: '',
    location: '',
    skills: ''
  });

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

  const handleJobSeekerSubmit = (e) => {
    e.preventDefault();
    // 这里后续需要连接后端 API
    const newSeeker = {
      id: dummyJobSearches.length + 1,
      ...newJobSeeker
    };
    dummyJobSearches.push(newSeeker);
    setNewJobSeeker({
      name: '',
      position: '',
      experience: '',
      expectedSalary: '',
      location: '',
      skills: ''
    });
    setShowJobSeekerForm(false);
  };

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
              <div key={job.id} className="recruitment-card">
                <div className="recruitment-header">
                  <h3>{job.position}</h3>
                  <span className="post-time">发布于 3 天前</span>
                </div>
                <div className="recruitment-info">
                  <div className="company-info">
                    <span className="company-name">{job.company}</span>
                    <span className="dot-separator">·</span>
                    <span className="location">{job.location}</span>
                  </div>
                  <div className="job-tags">
                    <span className="job-tag">远程工作</span>
                    <span className="job-tag">同城站场</span>
                  </div>
                  <p className="salary">{job.salary}</p>
                  <p className="requirements">{job.requirements}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <button 
              className="post-job-btn"
              onClick={() => setShowJobSeekerForm(true)}
            >
              发布求职信息
            </button>

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

            {showJobSeekerForm && (
              <div className="job-form-overlay">
                <form className="job-form" onSubmit={handleJobSeekerSubmit}>
                  <h3>发布求职信息</h3>
                  
                  <input
                    type="text"
                    placeholder="姓名"
                    value={newJobSeeker.name}
                    onChange={(e) => setNewJobSeeker({...newJobSeeker, name: e.target.value})}
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="期望职位"
                    value={newJobSeeker.position}
                    onChange={(e) => setNewJobSeeker({...newJobSeeker, position: e.target.value})}
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="工作经验（如：3年）"
                    value={newJobSeeker.experience}
                    onChange={(e) => setNewJobSeeker({...newJobSeeker, experience: e.target.value})}
                    required
                  />

                  <input
                    type="text"
                    placeholder="期望薪资（如：15k-25k）"
                    value={newJobSeeker.expectedSalary}
                    onChange={(e) => setNewJobSeeker({...newJobSeeker, expectedSalary: e.target.value})}
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="期望城市"
                    value={newJobSeeker.location}
                    onChange={(e) => setNewJobSeeker({...newJobSeeker, location: e.target.value})}
                    required
                  />
                  
                  <textarea
                    placeholder="技能特长"
                    value={newJobSeeker.skills}
                    onChange={(e) => setNewJobSeeker({...newJobSeeker, skills: e.target.value})}
                    required
                  />
                  
                  <div className="form-buttons">
                    <button type="submit">发布</button>
                    <button type="button" onClick={() => setShowJobSeekerForm(false)}>取消</button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs; 
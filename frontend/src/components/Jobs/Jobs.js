import React, { useState, useEffect } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('recruitment');
  const [isRemote, setIsRemote] = useState(false);
  const [showJobSeekerForm, setShowJobSeekerForm] = useState(false);
  const [recruitments, setRecruitments] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [newJobSeeker, setNewJobSeeker] = useState({
    name: '',
    position: '',
    experience: '',
    expectedSalary: '',
    location: '',
    skills: '',
    resume: null
  });

  // 获取招聘信息
  const fetchRecruitments = async () => {
    try {
      const url = `http://localhost:3000/api/recruitments${isRemote ? '?remote=true' : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('获取招聘信息失败');
      }
      const data = await response.json();
      setRecruitments(data);
    } catch (error) {
      console.error('获取招聘信息出错:', error);
      // 这里可以添加错误提示UI
    }
  };

  // 获取求职信息
  const fetchJobSeekers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/job-seekers');
      if (!response.ok) {
        throw new Error('获取求职信息失败');
      }
      const data = await response.json();
      setJobSeekers(data);
    } catch (error) {
      console.error('获取求职信息出错:', error);
      // 这里可以添加错误提示UI
    }
  };

  // 处理文件上传
  const handleFileChange = (e) => {
    setNewJobSeeker({
      ...newJobSeeker,
      resume: e.target.files[0]
    });
  };

  // 修改提交处理函数，使用 FormData 处理文件上传
  const handleJobSeekerSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newJobSeeker.name);
      formData.append('position', newJobSeeker.position);
      formData.append('experience', newJobSeeker.experience);
      formData.append('expectedSalary', newJobSeeker.expectedSalary);
      formData.append('location', newJobSeeker.location);
      formData.append('skills', newJobSeeker.skills);
      if (newJobSeeker.resume) {
        formData.append('resume', newJobSeeker.resume);
      }

      const response = await fetch('http://localhost:3000/api/job-seekers', {
        method: 'POST',
        body: formData,  // 不需要设置 Content-Type，浏览器会自动设置
      });

      if (!response.ok) {
        throw new Error('发布求职信息失败');
      }

      // 发布成功后刷新列表
      await fetchJobSeekers();
      
      // 重置表单
      setNewJobSeeker({
        name: '',
        position: '',
        experience: '',
        expectedSalary: '',
        location: '',
        skills: '',
        resume: null
      });
      setShowJobSeekerForm(false);
    } catch (error) {
      console.error('发布求职信息出错:', error);
    }
  };

  // 发布新的招聘信息
  const postRecruitment = async (recruitmentData) => {
    try {
      const response = await fetch('http://localhost:3000/api/recruitments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recruitmentData,
          jobTitle: recruitmentData.jobTitle,    // 确保包含新字段
          salary: recruitmentData.salary         // 确保包含新字段
        }),
      });

      if (!response.ok) {
        throw new Error('发布招聘信息失败');
      }

      await fetchRecruitments();
    } catch (error) {
      console.error('发布招聘信息出错:', error);
    }
  };

  // 组件加载时获取数据
  useEffect(() => {
    fetchRecruitments();
    fetchJobSeekers();
  }, []);

  // 当切换标签时重新获取对应数据
  useEffect(() => {
    if (activeTab === 'recruitment') {
      fetchRecruitments();
    } else {
      fetchJobSeekers();
    }
  }, [activeTab, isRemote]);

  const handleRemoteToggle = (e) => {
    setIsRemote(e.target.checked);
    fetchRecruitments();
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
              onChange={handleRemoteToggle}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="jobs-content">
        {activeTab === 'recruitment' ? (
          <div className="recruitment-list">
            {recruitments.map(job => (
              <div key={job.id} className="recruitment-card">
                <div className="recruitment-title">
                  <h3>【{job.jobType}】{job.jobTitle}</h3>
                </div>
                <div className="recruitment-meta">
                  <div className="meta-tags">
                    <span className="meta-tag">招聘&找人</span>
                    {job.isRemote && <span className="meta-tag">远程工作</span>}
                    <span className="meta-tag">{job.position}</span>
                    <span className="meta-tag">{job.salary}</span>
                    {job.tags && job.tags.map((tag, index) => (
                      <span key={index} className="meta-tag">{tag}</span>
                    ))}
                  </div>
                  <span className="post-time">发布于 {job.createdAt}</span>
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
              {jobSeekers.map(seeker => (
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
                  
                  <div className="file-input-container">
                    <label htmlFor="resume">上传简历</label>
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"  // 限制文件类型
                      onChange={handleFileChange}
                    />
                    {newJobSeeker.resume && (
                      <span className="file-name">
                        已选择: {newJobSeeker.resume.name}
                      </span>
                    )}
                  </div>
                  
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
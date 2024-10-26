import React from 'react';
import './AITestingTools.css';

// 辅助函数：根据字符串生成颜色
const getColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

const aiTestingTools = [
  {
    name: 'Testim',
    description: 'Testim是一个AI驱动的端到端测试自动化平台。它使用机器学习来创建稳定的测试，可以适应应用程序的变化。Testim支持多种编程语言和框架，并提供详细的测试报告和分析。',
    link: 'https://www.testim.io/'
  },
  {
    name: 'Functionize',
    description: 'Functionize利用AI和机器学习来简化测试创建和维护过程。它可以自动修复破损的测试，提供智能测试管理，并支持跨浏览器和设备的测试。Functionize还提供详细的性能分析和异常检测。',
    link: 'https://www.functionize.com/'
  },
  {
    name: 'Applitools',
    description: 'Applitools是一个基于AI的视觉测试和监控平台。它使用计算机视觉算法来检测UI中的视觉差异，支持跨浏览器和设备的测试。Applitools还提供自动维护和智能学习功能，可以显著减少误报。',
    link: 'https://applitools.com/'
  },
  {
    name: 'Mabl',
    description: 'Mabl是一个智能测试自动化平台，它使用机器学习来适应应用程序的变化。Mabl可以自动创建和更新测试，提供详细的测试洞察，并与CI/CD管道无缝集成。它还支持跨浏览器测试和性能监控。',
    link: 'https://www.mabl.com/'
  },
  {
    name: 'Eggplant',
    description: 'Eggplant提供智能自动化测试和监控解决方案。它使用AI来生成测试用例，预测用户行为，并自动化测试执行。Eggplant支持各种应用类型，包括移动、Web和桌面应用，并提供详细的分析和报告。',
    link: 'https://www.eggplantsoftware.com/'
  },
  {
    name: 'Sauce Labs',
    description: 'Sauce Labs是一个云端持续测试平台，支持AI驱动的测试。它提供了大规模的真实设备和浏览器测试能力，支持自动化和手动测试。Sauce Labs的AI功能可以帮助识别测试模式，优化测试套件，并提供详细的错误分析。',
    link: 'https://saucelabs.com/'
  },
  {
    name: 'Perfecto',
    description: 'Perfecto是一个智能测试自动化平台，支持Web和移动应用测试。它提供了基于AI的测试创建、执行和分析功能。Perfecto支持持续测试，可以与主流CI/CD工具集成，并提供详细的测试报告和智能洞察。',
    link: 'https://www.perfecto.io/'
  },
  {
    name: 'TestCraft',
    description: 'TestCraft是一个基于AI的无代码测试自动化平台。它使用机器学习来维护测试，适应应用程序的变化。TestCraft支持Selenium测试，提供可视化测试创建界面，并能自动更新测试脚本。它还提供详细的测试报告和分析。',
    link: 'https://www.testcraft.io/'
  },
  {
    name: 'ReTest',
    description: 'ReTest使用AI进行差异测试。它可以自动检测UI变化，生成测试用例，并提供详细的变更报告。ReTest的AI功能可以帮助减少误报，提高测试效率，并支持回归测试。它还提供了与CI/CD工具的集成。',
    link: 'https://retest.de/en/'
  },
  {
    name: 'Mesmer',
    description: 'Mesmer是一个AI驱动的移动应用测试自动化平台。它使用计算机视觉和自然语言处理来理解应用界面，自动生成测试用例。Mesmer可以模拟真实用户行为，支持跨设备测试，并提供详细的测试报告和分析。',
    link: 'https://www.mesmerhq.com/'
  },
  {
    name: 'Testleft',
    description: 'Testleft是一个AI增强的测试自动化工具，集成于开发环境。它支持从IDE内直接创建和运行测试，使用AI来生成测试脚本和定位元素。Testleft支持多种编程语言和框架，并提供详细的测试报告。',
    link: 'https://smartbear.com/product/testleft/'
  },
  {
    name: 'Appsurify',
    description: 'Appsurify使用AI来优化测试套件。它可以智能地选择最相关的测试用例，预测可能的故障，并提供详细的风险分析。Appsurify与主流CI/CD工具集成，支持多种测试框架，并提供实时的测试洞察。',
    link: 'https://www.appsurify.com/'
  },
  {
    name: 'Parasoft',
    description: 'Parasoft提供AI驱动的测试自动化解决方案。它覆盖了API测试、UI测试、单元测试等多个测试领域。Parasoft的AI功能可以帮助生成测试用例、优化测试执行、分析代码覆盖率，并提供详细的合规性报告。',
    link: 'https://www.parasoft.com/'
  },
  {
    name: 'Diffblue',
    description: 'Diffblue使用AI自动生成Java单元测试。它可以分析代码并创建高覆盖率的单元测试，无需手动编写测试用例。Diffblue支持主流的测试框架，可以与CI/CD流程集成，并提供详细的覆盖率报告。',
    link: 'https://www.diffblue.com/'
  },
  {
    name: 'Kobiton',
    description: 'Kobiton是一个AI驱动的移动应用测试平台。它提供真机测试和云端设备农场，支持手动和自动化测试。Kobiton的AI功能可以帮助生成测试脚本、检测视觉差异、优化测试执行，并提供详细的测试分析。',
    link: 'https://www.kobiton.com/'
  },
  {
    name: 'Testbirds',
    description: 'Testbirds是一个结合众包和AI的软件测试平台。它利用全球测试人员网络和AI技术来提供全面的测试解决方案。Testbirds支持功能测试、可用性测试、兼容性测试等，并使用AI来分析测试结果和用户反馈。',
    link: 'https://www.testbirds.com/'
  },
  {
    name: 'Autify',
    description: 'Autify是一个AI驱动的无代码Web应用测试自动化平台。它使用机器学习来维护测试脚本，适应UI变化。Autify提供了简单的点击式测试创建界面，支持跨浏览器测试，并能与CI/CD工具集成。它还提供详细的测试报告和失败分析。',
    link: 'https://autify.com/'
  },
  {
    name: 'Testim Automate',
    description: 'Testim Automate是Testim的一个子产品，专注于AI驱动的测试自动化。它使用机器学习来创建稳定的定位器，自动调整测试以适应应用程序的变化。Testim Automate支持codeless和coded测试，并提供详细的测试分析和报告。',
    link: 'https://www.testim.io/testim-automate/'
  },
  {
    name: 'Appvance IQ',
    description: 'Appvance IQ是一个AI驱动的测试自动化平台，它可以自动生成测试用例。它使用机器学习来理解应用程序的行为，并生成覆盖所有可能路径的测试。Appvance IQ支持功能测试、性能测试和安全测试，并提供详细的分析报告。',
    link: 'https://www.appvance.ai/'
  },
  {
    name: 'Sealights',
    description: 'Sealights是一个基于AI的质量智能平台。它使用机器学习来分析代码变更的影响，优化测试套件，并提供详细的质量指标。Sealights可以帮助团队识别高风险区域，优先执行最重要的测试，从而提高测试效率和软件质量。',
    link: 'https://www.sealights.io/'
  }
];

function AITestingTools() {
  return (
    <div className="ai-testing-tools">
      <div className="tool-grid">
        {aiTestingTools.map((tool, index) => (
          <a href={tool.link} key={index} className="tool-card-link" target="_blank" rel="noopener noreferrer">
            <div className="tool-card">
              <div className="tool-logo" style={{color: getColorFromString(tool.name)}}>
                <span className="tool-name">{tool.name}</span>
              </div>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default AITestingTools;
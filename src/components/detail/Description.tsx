import React, { useState } from 'react';
import MarkdownView, { ShowdownExtension } from 'react-showdown';
import { baseUrl } from '../../api/marketApi';
import './Description.css';

type DescriptionProps = {
  description: string;
  assetBaseUrl: string;
};

const Description = ({ description, assetBaseUrl }: DescriptionProps) => {
  const [activeTab, setActiveTab] = useState<string>('description');
  const setupContent = description.split('## Setup');
  const demoContent = setupContent[0].split('## Demo');
  const desc = demoContent[0];
  const demo = demoContent[1];
  const setup = setupContent[1];

  const imageUrlFixer: ShowdownExtension = {
    type: 'output',
    regex: /<img src="images/g,
    replace: `<img src="${baseUrl + assetBaseUrl}/images`
  };

  const tabChange = (newActiveTab: string) => setActiveTab(newActiveTab);

  return (
    <div className='product-description'>
      <Tab name='Description' activeTab={activeTab} onClick={tabChange} />
      {demo && <Tab name='Demo' activeTab={activeTab} onClick={tabChange} />}
      {setup && <Tab name='Setup' activeTab={activeTab} onClick={tabChange} />}

      <div id='description' className='readme-content'>
        <MarkdownView markdown={desc} extensions={[imageUrlFixer]} />
      </div>
      <div id='demo' className='readme-content' style={{ display: 'none' }}>
        <MarkdownView markdown={demo} extensions={[imageUrlFixer]} />
      </div>
      <div id='setup' className='readme-content' style={{ display: 'none' }}>
        <MarkdownView markdown={setup} extensions={[imageUrlFixer]} />
      </div>
    </div>
  );
};

type TabProps = {
  name: string;
  activeTab: string;
  onClick: (newActiveTab: string) => void;
};

const Tab = (props: TabProps) => {
  return (
    <span
      className={`tab-button ${props.activeTab === props.name.toLocaleLowerCase() ? ' selected' : ''}`}
      onClick={() => props.onClick(props.name.toLocaleLowerCase())}
    >
      <a href='#tabs' className='product-description-tab'>
        {props.name}
      </a>
    </span>
  );
};

export default Description;

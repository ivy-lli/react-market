import React, { useState } from 'react';
import MarkdownView, { ShowdownExtension } from 'react-showdown';
import { baseUrl } from '../../api/marketApi';
import './Description.css';

type DescriptionProps = {
  description: string;
  assetBaseUrl: string;
};

const Description = ({ description, assetBaseUrl }: DescriptionProps) => {
  const [activeTab, setActiveTab] = useState<string>('desc');
  const setupContent = description.split('## Setup');
  const demoContent = setupContent[0].split('## Demo');
  const desc = demoContent[0];
  const demo = demoContent[1];
  const setup = setupContent[1];

  const tabChange = (newActiveTab: string) => setActiveTab(newActiveTab);

  const imageUrlFixer: ShowdownExtension = {
    type: 'output',
    regex: /<img src="images/g,
    replace: `<img src="${baseUrl + assetBaseUrl}/images`
  };

  return (
    <div className='product-description'>
      <Tab id='desc' name='Description' activeTab={activeTab} onClick={tabChange} />
      {demo && <Tab id='demo' name='Demo' activeTab={activeTab} onClick={tabChange} />}
      {setup && <Tab id='setup' name='Setup' activeTab={activeTab} onClick={tabChange} />}
      <DescriptionView id='desc' activeView={activeTab} content={desc} imageUrlExt={imageUrlFixer} />
      <DescriptionView id='demo' activeView={activeTab} content={demo} imageUrlExt={imageUrlFixer} />
      <DescriptionView id='setup' activeView={activeTab} content={setup} imageUrlExt={imageUrlFixer} />
    </div>
  );
};

type TabProps = {
  id: string;
  name: string;
  activeTab: string;
  onClick: (newActiveTab: string) => void;
};

const Tab = (props: TabProps) => {
  return (
    <span className={`tab-button ${props.activeTab === props.id ? ' selected' : ''}`} onClick={() => props.onClick(props.id)}>
      <a href='#tabs' className='product-description-tab'>
        {props.name}
      </a>
    </span>
  );
};

type DescriptionViewProps = {
  id: string;
  content: string;
  activeView: string;
  imageUrlExt: ShowdownExtension;
};

const DescriptionView = (props: DescriptionViewProps) => {
  return (
    <div className='readme-content' style={props.activeView !== props.id ? { display: 'none' } : {}}>
      <MarkdownView markdown={props.content} extensions={[props.imageUrlExt]} />
    </div>
  );
};

export default Description;

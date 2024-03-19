/**
 * @author wou
 */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TopicOptionsModal from '../../modal/TopicOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useSelector } from 'react-redux';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

const MENU_ID = 'topic';

const TopicGridItem = ({ tag }) => {

  const [topicOptionsModalOpen, setTopicOptionsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const navigate = useNavigate();

  // context menu

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event){
      show({
        event,
        props: {
            key: 'value'
        }
      })
  }

  // I'm using a single event handler for all items
  // but you don't have too :)
  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "copy":
        console.log(event, props)
        break;
      case "cut":
        console.log(event, props);
        break;
      //etc...
    }
  }

  const containedNotes = useSelector((state) => {
    const documents = state.documents.documents;
    const filtered = documents.filter((document) => {
        return document[4] && document[4].includes(tag);
    })
    return filtered;
  })

  const handleTopicOptionsModalOpen = (value) => {
    setTopicOptionsModalOpen(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    show({
      event,
      props: {
          key: 'value'
      }
    })
    setSelectedTopic(tag);
  }

  return (
    <div className='topicItem' key={tag}>

      {/* <TopicOptionsModal
        show={topicOptionsModalOpen}
        selectedTopic={selectedTopic}
        onHide={() => setTopicOptionsModalOpen(false)}
      /> */}
      <Menu id={MENU_ID}>
        <Item id="copy" onClick={handleItemClick}>Copy</Item>
        <Item id="cut" onClick={handleItemClick}>Cut</Item>
        <Separator />
        <Item disabled>Disabled</Item>
        <Separator />
        <Submenu label="Foobar">
          <Item id="reload" onClick={handleItemClick}>Reload</Item>
          <Item id="something" onClick={handleItemClick}>Do something else</Item>
        </Submenu>
      </Menu>

      <div className='topicTextContainer' onClick={() => navigate(`/topics/${tag}`)}>
        <div className='topicTextWrapper'>
          <div className='topicTitle'>
            <span>{tag}</span>
          </div>
          <div className='topicInfo'>
            {containedNotes.length == 1 && <span>{containedNotes.length} Note</span>}
            {containedNotes.length > 1 && <span>{containedNotes.length} Notes</span>}
          </div>
          <div className='topicOptionsMenuContainer' onClick={handleClick}>
            <img src={moreDots} className='moreDots'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicGridItem;
